// utils/useSoundManager.ts
import { Audio } from 'expo-av';

const sounds = {
  tap: require('../assets/sounds/tap.mp3'),
  confirm: require('../assets/sounds/confirm.mp3'),
  celebration: require('../assets/sounds/celebration.mp3'),
  unlock: require('../assets/sounds/unlock.mp3'),
  notify: require('../assets/sounds/notify.mp3'),
};

export const useSoundManager = () => {
  const playSound = async (type: keyof typeof sounds) => {
    try {
      const { sound } = await Audio.Sound.createAsync(sounds[type]);
      await sound.playAsync();
    } catch (error) {
      console.warn('Sound error:', error);
    }
  };

  return {
    playTap: () => playSound('tap'),
    playConfirm: () => playSound('confirm'),
    playCelebrate: () => playSound('celebration'),
    playUnlock: () => playSound('unlock'),
    playNotify: () => playSound('notify'),
  };
};
