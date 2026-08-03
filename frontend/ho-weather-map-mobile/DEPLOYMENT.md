# HO Weather Map - Deployment & Rollout Guide

This document outlines the deployment process for the HO Weather Map Android app, aligned with the HostingOcean development workflow.

## Development Workflow

### 1. Local Development

Make changes to:
- `capacitor.config.ts` - App configuration
- `android/app/src/main/java/com/hostingocean/weathermap/MainActivity.java` - Android logic
- `package.json` - Dependencies
- Web service at `https://ho-weather-map.ai.studio/` (separate repo)

### 2. Build & Test Locally

```powershell
npm install
npm run android:apk:debug
```

- Test APK on physical device or emulator
- Verify external links open in browser
- Verify mobile layout is correct

### 3. Commit to GitHub (develop branch)

```powershell
git add .
git commit -m "feat: Initialize HO Weather Map Android app"
git push origin develop
```

Example commit messages:
- `feat: Initialize HO Weather Map Android app scaffold`
- `fix: Adjust CSS injection for weather card layouts`
- `feat: Add geolocation permission support (if needed)`

### 4. Production Deployment

#### Option A: Direct APK Deployment

1. Build release APK:
   ```powershell
   cd android
   ./gradlew.bat assembleRelease
   # or via Android Studio Build > Build Bundle(s) / APK(s)
   ```

2. Sign APK with release keystore:
   ```powershell
   cd android/app/build/outputs/apk/release/
   jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
     -keystore /path/to/my-release-key.keystore \
     app-release-unsigned.apk my-key-alias
   ```

3. Deploy to Play Store or distribute via APK file

#### Option B: Internal Distribution (Testing)

1. Push to develop:
   ```powershell
   git push origin develop
   ```

2. Build and distribute to internal testers:
   ```powershell
   npm run android:apk:debug
   adb install -r android/app/build/outputs/apk/debug/app-debug.apk
   ```

## Production Server Configuration

On the production server (95.111.247.141), no special database or environment setup is needed for this app since it's a web wrapper. The weather map service at `https://ho-weather-map.ai.studio/` must be running and accessible.

### Optional: If Weather Service Needs Backend DB

If the weather map service (`https://ho-weather-map.ai.studio/`) requires database deployment:

```bash
# SSH to production server
ssh root@95.111.247.141

# Deploy weather map service (if applicable)
# This depends on the weather service architecture
# Example:
cd /path/to/weather-map-service
git pull origin develop
npm install
npm run build
pm2 restart weather-map-app  # or appropriate restart command

# No special deployment needed for this Android wrapper
```

## Version Management

Update version in `android/app/build.gradle`:

```gradle
defaultConfig {
    versionCode 1  // Increment for each release
    versionName "1.0"  // Semantic versioning
}
```

## Rollback Plan

If issues arise:

1. Previous APK version stays on user devices (no auto-update)
2. If web service (`https://ho-weather-map.ai.studio/`) has issues, users can still access via browser
3. To push a fix:
   ```powershell
   git revert <commit-hash>
   git push origin develop
   # Rebuild and redistribute APK
   ```

## Testing Checklist

- [ ] App loads the weather service URL successfully
- [ ] Layout is responsive on various screen sizes (4", 5", 6"+)
- [ ] External links open in device browser, not in-app
- [ ] Permissions are appropriate (INTERNET only by default)
- [ ] APK file size is reasonable (~20-50 MB)
- [ ] App starts within 2-3 seconds
- [ ] No crashes on navigation or rotation

## Monitoring

After deployment:

1. Monitor weather service health: `https://ho-weather-map.ai.studio/`
2. No app-specific logging needed (content served remotely)
3. If users report issues, check:
   - Network connectivity
   - Remote service availability
   - Browser compatibility of weather service

## Future Enhancements

- Add push notifications (if weather alerts needed)
- Add offline caching (requires additional Capacitor plugins)
- Add location permissions (if location-based weather needed)
- Add dynamic theming based on weather conditions

---

**Last Updated:** 2026-08-03
**App Version:** 1.0 (initial release)
**Package Name:** com.hostingocean.weathermap
**Target URL:** https://ho-weather-map.ai.studio/
