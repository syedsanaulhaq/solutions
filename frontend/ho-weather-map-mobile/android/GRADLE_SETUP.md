# Initialize Gradle Wrapper

This directory needs the Gradle wrapper to build the Android app. You can:

1. Copy the gradlew scripts from the ECP Trainer project:
   ```powershell
   Copy-Item -Path "../solutions-site/mobile-android/android/gradlew*" -Destination "." -Force
   Copy-Item -Path "../solutions-site/mobile-android/android/gradle" -Destination "." -Recurse -Force
   ```

2. Or, initialize Gradle manually:
   ```powershell
   gradle wrapper --gradle-version 8.11.1
   ```

3. Or use Android Studio to open the android/ folder and it will auto-setup Gradle.

After setup, run: `npm run android:apk:debug` to build the APK.
