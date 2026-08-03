# HO Weather Map Android (Internal)

This package builds an internal Android app wrapper around the HO Weather Map web application.

## Prerequisites

- Node.js 20+
- Java 17+
- Android Studio (latest)
- Android SDK + platform tools configured in Android Studio

## Configure Target URL

Set the production URL before running add/sync:

PowerShell:

```powershell
$env:WEATHER_MAP_URL = "https://ho-weather-map.ai.studio/"
```

If not set, it defaults to the same value above.

## Install and Generate Android Project

```powershell
npm install
npx cap add android
npx cap sync android
```

## Open in Android Studio

```powershell
npx cap open android
```

## Build Internal APK

In Android Studio:

- Build > Build Bundle(s) / APK(s) > Build APK(s)

For signed release APK:

- Build > Generate Signed Bundle / APK
- Choose APK and your internal keystore

## CLI Artifact Outputs

After running build commands, artifacts are available at:

- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release unsigned APK: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

## Notes

- This app loads the hosted site, so web deploys reflect in the app immediately.
- External links (URLs in responses) open in the phone's installed browser app.
