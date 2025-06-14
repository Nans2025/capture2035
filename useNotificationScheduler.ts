// utils/useNotificationScheduler.ts — Final Live Background Notification Version
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-notifications';
import { Platform } from 'react-native';

export const scheduleReminderNotification = async (capsule: any) => {
  try {
    const revealTime = new Date(capsule.revealDate);
    const now = new Date();
    const fiveMinutesBefore = new Date(revealTime.getTime() - 5 * 60 * 1000);

    if (fiveMinutesBefore > now) {
      const granted = await Notifications.requestPermissionsAsync();
      if (!granted.granted) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '⏳ Capsule Unlocking Soon!',
          body: `"${capsule.title}" will reveal in 5 minutes. Ready to relive the memory?`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          type: 'date',
          date: fiveMinutesBefore,
        },
      });
    }
  } catch (err) {
    console.warn('Notification scheduling failed:', err);
  }
};

// Optional: Dev test utility
export const triggerTestNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🔧 Test Notification',
      body: 'This is a simulated notification (10 sec).',
      sound: true,
    },
    trigger: { seconds: 10 },
  });
};


