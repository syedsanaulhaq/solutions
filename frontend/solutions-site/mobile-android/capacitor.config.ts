import type { CapacitorConfig } from '@capacitor/cli';

const PROD_URL = process.env.ECP_APP_URL || 'https://solutions.hostingocean.net/ecp-trainer';

const config: CapacitorConfig = {
  appId: 'com.hostingocean.ecptrainer',
  appName: 'ECP Trainer',
  webDir: 'www',
  server: {
    url: PROD_URL,
    cleartext: false,
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#0b141e'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: '#0b141e'
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#0b141e',
      overlaysWebView: false
    }
  }
};

export default config;
