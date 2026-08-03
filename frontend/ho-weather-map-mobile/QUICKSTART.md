# HO Weather Map - Quick Start (5 Minutes)

## What Was Created

A complete Android app wrapper for the weather service at `https://ho-weather-map.ai.studio/`.

**Location**: `frontend/ho-weather-map-mobile/`

**Features**:
- ✅ Loads weather service in mobile-optimized WebView
- ✅ Opens external links in device browser
- ✅ Mobile-responsive CSS injection
- ✅ Ready to build and test

## Start Here

### Step 1: Get Gradle Wrapper (Required for first build)

Copy from ECP Trainer:

```powershell
cd frontend/ho-weather-map-mobile
Copy-Item -Path "../solutions-site/mobile-android/android/gradlew*" -Destination "android/" -Force
Copy-Item -Path "../solutions-site/mobile-android/android/gradle" -Destination "android/" -Recurse -Force
```

### Step 2: Install Dependencies

```powershell
npm install
```

### Step 3: Initialize Android

```powershell
npm run android:add
npm run android:sync
```

### Step 4: Build Debug APK

```powershell
npm run android:apk:debug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 5: Test on Device

```powershell
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

Open app on device → Should load weather service

## Customization

### Change App Icon

1. Create 512x512 logo image: `logo.png`
2. Run PowerShell script (see `ICON_GENERATION.md`)
3. Or use Android Studio: Right-click `android/app/src/main/res` → New → Image Asset

### Change Service URL

Edit `capacitor.config.ts`:

```typescript
const PROD_URL = process.env.WEATHER_MAP_URL || 'https://custom-url.com/';
```

Then rebuild.

### Add Permissions (if needed)

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

Then add permission handler in `MainActivity.java`.

## Documentation

- **`SETUP.md`** - Detailed setup & troubleshooting
- **`DEPLOYMENT.md`** - Production rollout steps
- **`WEB_INTEGRATION.md`** - Web service architecture
- **`PROJECT_OVERVIEW.md`** - Full project details

## Common Commands

```powershell
# Open in Android Studio
npm run android:open

# Run on connected device
npm run android:run

# Clean build
cd android && ./gradlew.bat clean && cd ..

# See full build output
npm run android:apk:debug -- --verbose
```

## After Testing

Commit and push:

```powershell
git add .
git commit -m "feat: Add HO Weather Map Android app"
git push origin develop
```

## Troubleshooting

**"gradle wrapper not found"?**
→ Run Step 1 (copy Gradle from ECP Trainer)

**"App won't start"?**
→ Check URL in `capacitor.config.ts` is correct and accessible

**"Links not opening in browser"?**
→ Verify `MainActivity.java` has `openExternalUrl()` method
→ Check web layer calls `AndroidSpeech.openExternalUrl(url)`

**"Icons look bad"?**
→ Generate new icons following `ICON_GENERATION.md`
→ Default placeholder icons are temporary

---

**Questions?** See the detailed docs in the project folder.

**Ready?** Run Step 1 above and let's build! 🚀
