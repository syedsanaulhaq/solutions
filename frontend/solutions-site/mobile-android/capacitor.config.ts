import type { CapacitorConfig } from '@capacitor/cli';

const PROD_URL = process.env.ECP_APP_URL || 'https://solutions.hostingocean.com/ecp-trainer';

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
      backgroundColor: '#ffffff'
    }
  }
};

export default config;
