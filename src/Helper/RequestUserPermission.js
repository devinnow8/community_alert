import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export async function RequestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (!enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const requestNotificationPermission = async () => {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
    );
  } catch (err) {
    if (_DEV_) console.warn('requestNotificationPermission error: ', err);
  }
};
