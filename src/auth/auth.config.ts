// import { CapacitorPlatforms } from '@capacitor/core';
import { Device } from '@capacitor/device';

export const domain = 'dev-n0lb4ireiqf83cv2.eu.auth0.com';
export const clientId = 'jqI3I37mU5YoeX6ebSgQCoJlOpqtQxd6';
const appId = 'notesByYc';

const checkDeviceOS = async () => {
  const { platform } = await Device.getInfo();

  const callback = (platform === 'ios' || platform === 'android')
    ? `${appId}://${domain}/capacitor/${appId}/callback`
    : 'http://localhost:3000';

  console.log(callback);
  return callback;
};

export const callbackUri = checkDeviceOS();
// const iosOrAndroid = (CapacitorPlatforms ==='ios') || (Platform.is('android'));

// export const callbackUri = iosOrAndroid
//   ? `${appId}://${domain}/capacitor/${appId}/callback`
//   : 'http://localhost:3000';
