import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'notetm',
  webDir: 'build',
  bundledWebRuntime: false,
  server: { 
    allowNavigation: [ "localhost:8080" ],
    url: "http://192.168.1.37:3000",
		cleartext: true,
    hostname: "localhost:3000"
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
