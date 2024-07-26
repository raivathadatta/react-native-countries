import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

import {requestNotificationPermission} from './pushNotificationConfig';

export async function requestUserPermission() {
  await requestNotificationPermission();
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  console.log(authStatus, enabled, 'auth state');
}

export async function getFcmToken() {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('FCM Token:', fcmToken);
  } else {
    console.log('Failed to get FCM token');
  }
}

export function setupNotificationListeners() {
  messaging().onMessage(async remoteMessage => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      ticker: 'My Notification Ticker',
      showWhen: true,
      autoCancel: true,
      largeIcon: 'ic_launcher',
      largeIconUrl: 'https://www.example.tld/picture.jpg',
      smallIcon: 'ic_notification',
      bigText: remoteMessage.notification.body,
      subText: 'My subtext',
      bigPictureUrl: 'https://www.example.tld/picture.jpg',
      color: 'red',
      vibrate: true,
      vibration: 300,
      group: 'group',
      ongoing: false,
      priority: 'high',
      visibility: 'private',
      importance: 'high',
      id: 0,
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      playSound: true,
      soundName: 'default',
    });
  });
}
