# HO Weather Map Android App - Project Overview

## Quick Facts

| Property | Value |
|----------|-------|
| **App Name** | HO Weather Map |
| **Package Name** | com.hostingocean.weathermap |
| **Framework** | Capacitor 7+ with Android |
| **Web Service URL** | https://ho-weather-map.ai.studio/ |
| **Target Android API** | 23-35 |
| **Min SDK** | API 23 (Android 6.0) |
| **Compile SDK** | API 35 (Android 15) |
| **Status** | Scaffold complete, ready for build |

## Project Structure

```
ho-weather-map-mobile/
├── android/                          # Gradle Android project
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/hostingocean/weathermap/
│   │   │   │   └── MainActivity.java # WebView setup + external URL handler
│   │   │   ├── res/
│   │   │   │   ├── layout/           # Activity XML layouts
│   │   │   │   ├── values/           # Colors, strings, styles
│   │   │   │   ├── mipmap-*/         # App icons (to be generated)
│   │   │   │   └── xml/              # FileProvider paths
│   │   │   └── AndroidManifest.xml   # Permissions & activities
│   │   └── build.gradle              # App-level Gradle config
│   ├── build.gradle                  # Project-level Gradle config
│   ├── settings.gradle               # Gradle subproject settings
│   ├── gradle.properties             # Gradle JVM args
│   └── variables.gradle              # SDK/library versions
│
├── capacitor.config.ts               # Capacitor configuration
├── package.json                      # Node dependencies & scripts
├── tsconfig.json                     # TypeScript config
├── .gitignore                        # Git ignore patterns
├── README.md                         # Quick start guide
├── SETUP.md                          # Detailed setup instructions
├── DEPLOYMENT.md                     # Production rollout guide
├── WEB_INTEGRATION.md                # Web service integration docs
├── ICON_GENERATION.md                # Icon generation guide
└── .git/                             # (After initialization)
```

## Key Differences from ECP Trainer App

| Feature | ECP Trainer | Weather Map |
|---------|-------------|------------|
| **Speech Recognition** | ✅ Yes (with Native bridge) | ❌ No |
| **Microphone Permission** | ✅ Required | ❌ Not needed |
| **External Links** | ✅ Yes (via NativeSpeechBridge) | ✅ Yes (via NativeBridge) |
| **Remote URL** | https://solutions.hostingocean.net/ecp-trainer | https://ho-weather-map.ai.studio/ |
| **Background Color** | #0b141e (dark) | #ffffff (light) |
| **Use Case** | AI trainer with voice I/O | Weather data + map viewing |

## File Generation Checklist

- [x] `capacitor.config.ts` - Configuration ✓
- [x] `package.json` - Dependencies & npm scripts ✓
- [x] `tsconfig.json` - TypeScript config ✓
- [x] Android Gradle files (build.gradle, settings.gradle, etc.) ✓
- [x] `MainActivity.java` - WebView & external URL handler ✓
- [x] `AndroidManifest.xml` - Permissions & activities ✓
- [x] Layout files (activity_main.xml) ✓
- [x] Resource strings & styles ✓
- [x] `FileProvider` configuration (file_paths.xml) ✓
- [x] Documentation (SETUP.md, DEPLOYMENT.md, WEB_INTEGRATION.md) ✓
- [ ] Icon files (mdpi-xxxhdpi) - Placeholder framework ready
- [ ] Gradle wrapper files (gradlew, gradle/) - Copy from ECP Trainer or download
- [ ] Build & test on physical device - Ready for user

## Next Steps

1. **Copy Gradle Wrapper** (Required for build)
   ```powershell
   Copy-Item -Path "../solutions-site/mobile-android/android/gradlew*" -Destination "android/" -Force
   Copy-Item -Path "../solutions-site/mobile-android/android/gradle" -Destination "android/" -Recurse -Force
   ```

2. **Generate App Icons** (Required for release)
   - Use Android Studio's Image Asset tool, OR
   - Run PowerShell script from `ICON_GENERATION.md`
   - Place 512x512 logo at `android/app/src/main/res/logo.png`

3. **Build & Test**
   ```powershell
   npm install
   npm run android:add
   npm run android:apk:debug
   ```

4. **Deploy to Device**
   ```powershell
   adb install -r android/app/build/outputs/apk/debug/app-debug.apk
   ```

5. **Commit to GitHub**
   ```powershell
   git add .
   git commit -m "feat: Add HO Weather Map Android app scaffold"
   git push origin develop
   ```

## Integration Points

### With ECP Trainer
- Shares same Capacitor version (7.4.2+)
- Shared Android SDK versions (minSdk 23, compileSdk 35)
- Shared Gradle version (8.7.2)
- Can reuse build infrastructure/CI-CD pipeline

### With Frontend Solutions Site
- Both in `frontend/` folder
- Can share Next.js deployment if web service adds Next.js layer
- Can share TypeScript configuration patterns

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `WEATHER_MAP_URL` | Override weather service URL | `http://localhost:3000/` |

Set before running:
```powershell
$env:WEATHER_MAP_URL = "https://custom-weather-api.com/"
npm run android:sync
```

## Performance Notes

- **App Size**: ~20-50 MB (depends on native dependencies)
- **Startup Time**: 2-3 seconds typical
- **Memory Usage**: ~100-150 MB while running
- **Network**: Requires HTTPS internet connectivity

## Security Considerations

- No local data storage (all remote)
- No permissions beyond INTERNET
- No API keys/secrets stored in APK
- External links open in system browser (prevent clickjacking)

## Known Limitations

- No offline functionality (pure web wrapper)
- No background services
- No camera, location, or microphone access by default
- Requires Android 6.0+ (API 23)

## Architecture Decisions

1. **Capacitor** instead of React Native
   - Same build infrastructure as ECP Trainer
   - Minimal native code needed
   - Easy to add features via plugins

2. **Remote Web Service** instead of embedded app
   - Easier to update without app redistribution
   - Leverages existing web infrastructure
   - Simpler build/deployment pipeline

3. **CSS Injection** instead of custom WebView client
   - Works with any remote service
   - Responsive design adaptation at runtime
   - No need to modify remote service

4. **Native Intent for External Links** instead of in-app browser
   - Better user experience (system-wide link handling)
   - Prevents app from becoming a browser
   - Users can choose their preferred browser

---

**Created:** 2026-08-03  
**Last Updated:** 2026-08-03  
**Scaffold Status:** ✅ Complete - Ready for build & test
