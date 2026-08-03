package com.hostingocean.weathermap;

import android.os.Bundle;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            webView.addJavascriptInterface(new NativeBridge(), "AndroidSpeech");
        }

        // CSS injection to make the weather map fit mobile screens
        String css =
            "html, body { " +
            "  margin: 0 !important; " +
            "  padding: 0 !important; " +
            "  overflow: hidden !important; " +
            "  height: 100vh !important; " +
            "  width: 100vw !important; " +
            "  font-size: 14px !important; " +
            "} " +
            "* { " +
            "  box-sizing: border-box !important; " +
            "  max-width: 100% !important; " +
            "} " +
            "h1, h2, h3 { font-size: 1.2rem !important; margin: 10px 0 !important; } " +
            "p, span, button { font-size: 0.9rem !important; } " +
            ".container, [class*='container'], [class*='wrapper'] { " +
            "  width: 100% !important; " +
            "  max-width: 100% !important; " +
            "  padding: 8px !important; " +
            "  margin: 0 !important; " +
            "  height: auto !important; " +
            "} " +
            "main, #root, #__next { " +
            "  display: flex !important; " +
            "  flex-direction: column !important; " +
            "  height: 100vh !important; " +
            "} " +
            "[class*='MapContainer'], [class*='WeatherCard'], [class*='Content'] { " +
            "  flex: 1 !important; " +
            "  overflow-y: auto !important; " +
            "  width: 100% !important; " +
            "} ";

        String js = "var style = document.createElement('style'); style.innerHTML = '" + css + "'; document.head.appendChild(style);";

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> request.grant(request.getResources()));
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

    private void openExternalUrl(String url) {
        if (url == null || url.trim().isEmpty()) {
            return;
        }

        runOnUiThread(() -> {
            try {
                Uri uri = Uri.parse(url.trim());
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                intent.addCategory(Intent.CATEGORY_BROWSABLE);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            } catch (Exception ignored) {
                // Ignore failures and let web fallback handle unsupported cases.
            }
        });
    }

    private class NativeBridge {
        @JavascriptInterface
        public void openExternalUrl(String url) {
            MainActivity.this.openExternalUrl(url);
        }
    }
}
