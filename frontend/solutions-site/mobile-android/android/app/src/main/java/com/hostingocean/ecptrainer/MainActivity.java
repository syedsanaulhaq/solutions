package com.hostingocean.ecptrainer;

import android.os.Bundle;
import android.content.pm.PackageManager;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    private static final int REQUEST_MIC_PERMISSION = 1001;
    private SpeechRecognizer speechRecognizer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ensureMicPermission();
    }

    @Override
    public void onResume() {
        super.onResume();
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            setupWebView(webView);
        }
    }

    @Override
    public void onDestroy() {
        stopNativeSpeech();
        super.onDestroy();
    }

    private void setupWebView(WebView webView) {
        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setOverScrollMode(WebView.OVER_SCROLL_NEVER);
        webView.clearCache(true);
        webView.clearHistory();
        webView.clearFormData();

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        
        // Force content to fit screen
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        
        // Disable text zooming/scaling
        settings.setTextZoom(100); 

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            webView.addJavascriptInterface(new NativeSpeechBridge(), "AndroidSpeech");
        }

        // Comprehensive CSS injection to fix layout, fonts, and scrolling
        String css = 
            "html, body { " +
            "  margin: 0 !important; " +
            "  padding: 0 !important; " +
            "  overflow: hidden !important; " +
            "  height: 100vh !important; " +
            "  width: 100vw !important; " +
            "  background: #0b141e !important; " +
            "  font-size: 14px !important; " + // Reduce base font size
            "} " +
            "* { " +
            "  box-sizing: border-box !important; " +
            "  max-width: 100% !important; " +
            "} " +
            // Scale down large text and adjust containers
            "h1, h2, h3 { font-size: 1.2rem !important; margin: 10px 0 !important; } " +
            "p, span, button { font-size: 0.9rem !important; } " +
            ".container, [class*='container'], [class*='wrapper'] { " +
            "  width: 100% !important; " +
            "  max-width: 100% !important; " +
            "  padding: 8px !important; " +
            "  margin: 0 !important; " +
            "  height: auto !important; " +
            "} " +
            // Force the main layout to fit the viewport height
            "main, #root, #__next { " +
            "  display: flex !important; " +
            "  flex-direction: column !important; " +
            "  height: 100vh !important; " +
            "} " +
            // Make the chat/content area flexible and the input stay at bottom
            "[class*='ChatList'], [class*='MessageList'] { flex: 1 !important; overflow-y: auto !important; } " +
            "[class*='InputContainer'], footer { position: sticky !important; bottom: 0 !important; width: 100% !important; }";

        String js = "var style = document.createElement('style'); style.innerHTML = '" + css + "'; document.head.appendChild(style);";

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> {
                    boolean hasMicPermission = ContextCompat.checkSelfPermission(
                        MainActivity.this,
                        android.Manifest.permission.RECORD_AUDIO
                    ) == PackageManager.PERMISSION_GRANTED;

                    if (hasMicPermission) {
                        request.grant(request.getResources());
                    } else {
                        request.deny();
                        ensureMicPermission();
                    }
                });
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                view.evaluateJavascript(js, null);
                // Force a second injection to catch late-loading elements
                view.postDelayed(() -> view.evaluateJavascript(js, null), 500);
            }
        });
        
        webView.evaluateJavascript(js, null);
    }

    private void startNativeSpeech(String languageCode) {
        runOnUiThread(() -> {
            if (!SpeechRecognizer.isRecognitionAvailable(MainActivity.this)) {
                dispatchSpeechError("Speech recognition is not available on this Android device.");
                return;
            }

            boolean hasMicPermission = ContextCompat.checkSelfPermission(
                MainActivity.this,
                android.Manifest.permission.RECORD_AUDIO
            ) == PackageManager.PERMISSION_GRANTED;

            if (!hasMicPermission) {
                ensureMicPermission();
                dispatchSpeechError("Microphone permission is required for voice input.");
                return;
            }

            stopNativeSpeech();

            speechRecognizer = SpeechRecognizer.createSpeechRecognizer(MainActivity.this);
            speechRecognizer.setRecognitionListener(new RecognitionListener() {
                @Override
                public void onReadyForSpeech(Bundle params) {}

                @Override
                public void onBeginningOfSpeech() {}

                @Override
                public void onRmsChanged(float rmsdB) {}

                @Override
                public void onBufferReceived(byte[] buffer) {}

                @Override
                public void onEndOfSpeech() {}

                @Override
                public void onError(int error) {
                    dispatchSpeechError(mapSpeechError(error));
                    stopNativeSpeech();
                }

                @Override
                public void onResults(Bundle results) {
                    ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                    String transcript = (matches != null && !matches.isEmpty()) ? matches.get(0) : "";
                    dispatchSpeechResult(transcript);
                    stopNativeSpeech();
                }

                @Override
                public void onPartialResults(Bundle partialResults) {}

                @Override
                public void onEvent(int eventType, Bundle params) {}
            });

            Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, languageCode);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, languageCode);
            intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
            intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, false);

            speechRecognizer.startListening(intent);
        });
    }

    private void stopNativeSpeech() {
        runOnUiThread(() -> {
            if (speechRecognizer != null) {
                speechRecognizer.cancel();
                speechRecognizer.destroy();
                speechRecognizer = null;
            }
        });
    }

    private String mapSpeechError(int errorCode) {
        switch (errorCode) {
            case SpeechRecognizer.ERROR_AUDIO:
                return "Audio capture failed. Please try again.";
            case SpeechRecognizer.ERROR_CLIENT:
                return "Voice input was cancelled.";
            case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS:
                return "Microphone permission is required for voice input.";
            case SpeechRecognizer.ERROR_NETWORK:
            case SpeechRecognizer.ERROR_NETWORK_TIMEOUT:
                return "Speech service network error. Please check connection and try again.";
            case SpeechRecognizer.ERROR_NO_MATCH:
                return "No speech was recognized. Please speak clearly and try again.";
            case SpeechRecognizer.ERROR_RECOGNIZER_BUSY:
                return "Speech recognizer is busy. Please try again.";
            case SpeechRecognizer.ERROR_SERVER:
                return "Android speech service is temporarily unavailable. Please try again.";
            case SpeechRecognizer.ERROR_SPEECH_TIMEOUT:
                return "No speech detected. Please try again.";
            default:
                return "Voice input failed on this Android device.";
        }
    }

    private void dispatchSpeechResult(String text) {
        dispatchSpeechEvent("result", "text", text);
    }

    private void dispatchSpeechError(String message) {
        dispatchSpeechEvent("error", "error", message);
    }

    private void dispatchSpeechEvent(String type, String payloadKey, String payloadValue) {
        WebView webView = getBridge() != null ? getBridge().getWebView() : null;
        if (webView == null) {
            return;
        }

        String script = "window.dispatchEvent(new CustomEvent('ecp-native-speech',{detail:{type:" +
            JSONObject.quote(type) + "," + payloadKey + ":" + JSONObject.quote(payloadValue != null ? payloadValue : "") + "}}));";
        webView.post(() -> webView.evaluateJavascript(script, null));
    }

    private void ensureMicPermission() {
        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this,
                new String[]{android.Manifest.permission.RECORD_AUDIO},
                REQUEST_MIC_PERMISSION
            );
        }
    }

    private class NativeSpeechBridge {
        @JavascriptInterface
        public void startListening(String languageCode) {
            startNativeSpeech(languageCode == null || languageCode.trim().isEmpty() ? "en-US" : languageCode);
        }

        @JavascriptInterface
        public void stopListening() {
            stopNativeSpeech();
        }
    }
}
