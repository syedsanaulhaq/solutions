package com.hostingocean.weathermap;

import android.os.Bundle;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.GeolocationPermissions;
import com.getcapacitor.BridgeActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;

public class MainActivity extends BridgeActivity {

    private static final int REQUEST_LOCATION_PERMISSION = 1002;
    private static final String APP_URL = "https://ho-route-weather.ai.studio";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Keep app content between the status and navigation bars.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);

        // Ensure status bar icons are visible (dark icons for light content)
        WindowInsetsControllerCompat windowInsetsController =
            WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        windowInsetsController.setAppearanceLightStatusBars(true);

        ensureLocationPermission();
    }

    @Override
    public void onResume() {
        super.onResume();
        if (getBridge() != null && getBridge().getWebView() != null) {
            setupWebView(getBridge().getWebView());
        }
    }

    private void setupWebView(WebView webView) {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setGeolocationEnabled(true);
        settings.setDatabaseEnabled(true);

        // Optimization for mobile layout
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setTextZoom(100);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            webView.addJavascriptInterface(new NativeBridge(), "AndroidSpeech");
        }

        // Refined CSS to handle safe areas properly without forcing height calc that might break some sites
        String css =
            "body { " +
            "  padding-top: env(safe-area-inset-top) !important; " +
            "  padding-bottom: env(safe-area-inset-bottom) !important; " +
            "} " +
            ".navbar-fixed-top { margin-top: env(safe-area-inset-top) !important; }";

        String js = "(function() {" +
                    "  var style = document.createElement('style');" +
                    "  style.innerHTML = '" + css + "';" +
                    "  document.head.appendChild(style);" +
                    "})();";

        // Instead of replacing the entire WebChromeClient (which Capacitor needs),
        // we just ensure the bridge is ready. Capacitor handles most of this.

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> request.grant(request.getResources()));
            }

            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, false);
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                view.evaluateJavascript(js, null);
            }
        });
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

    private void ensureLocationPermission() {
        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this,
                new String[]{
                    android.Manifest.permission.ACCESS_FINE_LOCATION,
                    android.Manifest.permission.ACCESS_COARSE_LOCATION
                },
                REQUEST_LOCATION_PERMISSION
            );
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_LOCATION_PERMISSION) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                WebView webView = getBridge() != null ? getBridge().getWebView() : null;
                if (webView != null) {
                    webView.reload();
                }
            }
        }
    }

    private class NativeBridge {
        @JavascriptInterface
        public void openExternalUrl(String url) {
            MainActivity.this.openExternalUrl(url);
        }
    }
}
