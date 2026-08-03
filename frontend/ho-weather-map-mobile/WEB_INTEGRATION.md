# HO Weather Map - Web Integration

The HO Weather Map Android app is a Capacitor wrapper around the weather service hosted at `https://ho-weather-map.ai.studio/`.

## Architecture

```
┌─────────────────────────────────┐
│   HO Weather Map Web Service    │
│  (https://ho-weather-map.ai.studio/)│
└────────────────┬────────────────┘
                 │
                 │ (HTTPS loaded in WebView)
                 │
┌─────────────────▼────────────────┐
│   Android WebView (Capacitor)    │
│  - Mobile CSS injection          │
│  - External link handling        │
│  - Native Android bridge         │
└─────────────────────────────────┘
```

## Key Features

1. **Mobile Responsive Layout** - CSS injected at runtime to adapt web content to mobile screens
2. **External Link Handling** - Links open in the device's browser, not in-app
3. **Simplified Architecture** - No local web server; content served from remote URL

## If You Need Local Web Development

To develop the weather map web interface locally:

1. Create a Next.js app or static site in a separate folder
2. Update `capacitor.config.ts`:
   ```typescript
   const PROD_URL = process.env.WEATHER_MAP_URL || 'http://192.168.1.XX:3000/';
   ```
3. Run your development server on the same machine/network
4. Update the IP address and port as needed

## JavaScript Bridge

To open external URLs from the weather app web layer:

```javascript
if (typeof window.AndroidSpeech !== 'undefined' && window.AndroidSpeech.openExternalUrl) {
  window.AndroidSpeech.openExternalUrl(urlString);
} else {
  // Fallback for non-Android or web testing
  window.open(urlString, '_blank');
}
```

## Environment Variables

### Development

```powershell
$env:WEATHER_MAP_URL = "http://localhost:3000/"
npm run android:sync
npm run android:apk:debug
```

### Production

The app defaults to `https://ho-weather-map.ai.studio/` as configured in `capacitor.config.ts`.

## Deployment

To deploy updates to the weather map service:

1. Update your remote service at `https://ho-weather-map.ai.studio/`
2. Users who have the app installed will see updates when they restart the app (or on next app session)
3. APK redistribution not needed for web content changes

## Deep Linking (Optional)

To support deep links to specific weather data:

1. Add intent filters to `AndroidManifest.xml`
2. Handle navigation in the web layer based on URL parameters

Example:
```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https"
          android:host="ho-weather-map.ai.studio"
          android:pathPrefix="/location" />
</intent-filter>
```

## Troubleshooting

**Web content not loading:**
- Verify remote URL is accessible: `https://ho-weather-map.ai.studio/`
- Check device network connectivity
- Inspect Capacitor logs in Android Studio

**Mobile layout looks wrong:**
- CSS injection may not be covering all selectors
- Update CSS rules in `MainActivity.java` setupWebView() method
- Test in Chrome DevTools with mobile device emulation first
