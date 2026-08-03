import type { CapacitorConfig } from '@capacitor/cli';

const PROD_URL = process.env.WEATHER_MAP_URL || 'https://ho-weather-map.ai.studio/';

const config: CapacitorConfig = {
  appId: 'com.hostingocean.weathermap',
  appName: 'HO Weather Map',
  webDir: 'www',
  server: {
    url: PROD_URL,
    cleartext: false,
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#ffffff'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: '#ffffff'
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#ffffff',
      overlaysWebView: false
    }
  }
};

export default config;
