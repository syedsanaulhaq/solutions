# HO Weather Map Android (Internal)

This package builds an internal Android app wrapper around the HO Weather Map web app.

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

## Internal Signed Release (CLI)

1. Generate a keystore once:

```powershell
keytool -genkeypair -v -keystore ecp-internal.jks -alias ecpinternal -keyalg RSA -keysize 2048 -validity 3650
```

2. Sign release APK:

```powershell
"$env:LOCALAPPDATA/Android/Sdk/build-tools/35.0.0/apksigner.bat" sign --ks ecp-internal.jks --out app-release-signed.apk android/app/build/outputs/apk/release/app-release-unsigned.apk
```

3. Verify signature:

```powershell
"$env:LOCALAPPDATA/Android/Sdk/build-tools/35.0.0/apksigner.bat" verify --verbose app-release-signed.apk
```

## Notes

- This app loads the hosted site, so web deploys reflect in the app immediately.
- English trainer route: `/ecp-trainer`
- Urdu trainer route: `/ecp-trainer-ur`
