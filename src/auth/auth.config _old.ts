// import { CapacitorPlatforms } from '@capacitor/core';
import { Device } from '@capacitor/device';

const { domain } = process.env.REACT_APP_AUTH0_DOMAIN;
const { client_id } = process.env.REACT_APP_AUTH0_CLIENT_ID;
const appId = 'notesByYc';

const checkDeviceOS = async () => {
  const { platform } = await Device.getInfo();

  const callback = (platform === 'ios' || platform === 'android')
    ? `${appId}://${domain}/capacitor/${appId}/callback`
    : 'http://localhost:3000';

  console.log(callback);
  return callback;
};

const callbackUri = 'http://localhost:3000';

// export const callbackUri = checkDeviceOS();
export default callbackUri;

// const iosOrAndroid = (CapacitorPlatforms ==='ios') || (Platform.is('android'));

// export const callbackUri = iosOrAndroid
//   ? `${appId}://${domain}/capacitor/${appId}/callback`
//   : 'http://localhost:3000';
