# Setup Instructions for HO Weather Map Android App

## Prerequisites

- Node.js 20+ and npm
- Java 17+ (verify with `java -version`)
- Android Studio with SDK Platform 35 installed
- Capacitor CLI (install with `npm install -g @capacitor/cli`)

## Initial Setup

### 1. Install Node Dependencies

```powershell
npm install
```

### 2. Set Environment Variable (Optional)

If you need a custom weather map URL:

```powershell
$env:WEATHER_MAP_URL = "https://ho-weather-map.ai.studio/"
```

### 3. Initialize Capacitor Android Project

```powershell
npm run android:add
```

This will create the Capacitor bridge and initialize the Android project structure.

### 4. Sync Capacitor with Android

```powershell
npm run android:sync
```

### 5. Open in Android Studio

```powershell
npm run android:open
```

## Build & Run

### Build Debug APK

```powershell
npm run android:apk:debug
```

APK output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Run on Connected Device

```powershell
npm run android:run
```

## Important Notes

- The app loads from `https://ho-weather-map.ai.studio/` by default
- All external links in weather data will open in the device's browser
- CSS injection ensures the web content fits mobile screens
- The app has internet-only permissions; no microphone or location access (can be added as needed)

## Gradle Wrapper

The Gradle wrapper files are not included in the repo. On first build:

1. Android Studio will auto-download Gradle 8.11.1, OR
2. You can manually download from https://services.gradle.org/distributions/gradle-8.11.1-all.zip
3. Or copy from the ECP Trainer project: `../solutions-site/mobile-android/android/gradle`

## Troubleshooting

**Build fails with "Gradle not found":**
- Ensure gradlew scripts exist: `ls android/gradlew*`
- If missing, copy from ECP Trainer: `Copy-Item -Path "../solutions-site/mobile-android/android/gradlew*" -Destination "android/" -Force`

**APK installation fails:**
- Check device API level (minimum: 23)
- Ensure dev mode is enabled and USB debugging is ON

**Links not opening in browser:**
- Verify `MainActivity.java` has the `openExternalUrl()` method
- Check that `AndroidSpeech.openExternalUrl(url)` is called from web layer
