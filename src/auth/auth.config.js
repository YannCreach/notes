import { device } from '@capacitor/device';

export const domain = 'dev-n0lb4ireiqf83cv2.eu.auth0.com';
export const clientId = 'jqI3I37mU5YoeX6ebSgQCoJlOpqtQxd6';
const appId = 'com.auth0.samples';

const auth0Domain = domain;
const { platform } = device;

export const callbackUri = platform === 'ios' || platform === 'android'
  ? `${appId}://${auth0Domain}/capacitor/${appId}/callback`
  : 'http://localhost:3000';
