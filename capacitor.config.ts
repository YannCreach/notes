import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'notesByYc',
  appName: 'notetm',
  webDir: 'build',
  bundledWebRuntime: false,
  server: { 
    // allowNavigation: [ "localhost:8080" ],
    // url: "localhost:3000",
		// cleartext: true,
    hostname: "localhost:3000",
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
