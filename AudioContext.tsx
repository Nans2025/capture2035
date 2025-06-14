import React, { createContext, useContext, useState } from 'react';
import { Audio } from 'expo-av';

const tracks = [
  {
    name: 'Echo Memory Track',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    name: 'Galactic Dreams',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    name: 'Stellar Pulse',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    name: 'Future Drift',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
];

export const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nowPlaying, setNowPlaying] = useState('');

  const loadAndPlay = async (index: number) => {
    if (sound) await sound.unloadAsync();
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: tracks[index].uri });
    setSound(newSound);
    setNowPlaying(tracks[index].name);
    setCurrentIndex(index);
    await newSound.playAsync();
    setIsPlaying(true);
  };

  const togglePlayPause = async () => {
    if (!sound) {
      loadAndPlay(currentIndex);
    } else {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const stop = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      setNowPlaying('');
    }
  };

  const nextTrack = () => {
    const next = (currentIndex + 1) % tracks.length;
    loadAndPlay(next);
  };

  const prevTrack = () => {
    const prev = (currentIndex - 1 + tracks.length) % tracks.length;
    loadAndPlay(prev);
  };

  return (
    <AudioContext.Provider
      value={{
        nowPlaying,
        isPlaying,
        togglePlayPause,
        stop,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);




