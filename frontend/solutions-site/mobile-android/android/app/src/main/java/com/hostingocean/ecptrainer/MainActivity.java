package com.hostingocean.ecptrainer;

import android.os.Bundle;
import android.content.pm.PackageManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final int REQUEST_MIC_PERMISSION = 1001;

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
}
