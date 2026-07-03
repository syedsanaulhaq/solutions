# ECP Trainer Android (Internal)

This package builds an internal Android app wrapper around the live ECP trainer web app.

## Prerequisites

- Node.js 20+
- Java 17+
- Android Studio (latest)
- Android SDK + platform tools configured in Android Studio

## Configure Target URL

Set the production URL before running add/sync:

PowerShell:

```powershell
$env:ECP_APP_URL = "https://solutions.hostingocean.com/ecp-trainer"
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

## Notes

- This app loads the hosted site, so web deploys reflect in the app immediately.
- English trainer route: `/ecp-trainer`
- Urdu trainer route: `/ecp-trainer-ur`
