// utils/sound.ts
import { Audio } from 'expo-av';

let clickSound: Audio.Sound | null = null;

export async function playClickSound() {
  try {
    if (!clickSound) {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/click.mp3')
      );
      clickSound = sound;
    }
    await clickSound.replayAsync();
  } catch (error) {
    console.error('Click sound error:', error);
  }
}



