// components/MusicControls.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../context/AudioContext';

export default function MusicControls() {
  const { nowPlaying, isPlaying, togglePlayPause, stop, nextTrack, prevTrack } = useAudio();

  return (
    <View style={styles.container}>
      {nowPlaying !== '' && <Text style={styles.track}>Now Playing: {nowPlaying}</Text>}

      <View style={styles.controls}>
        <TouchableOpacity onPress={prevTrack}>
          <Ionicons name="play-skip-back" size={28} color="#7dd3fc" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={40} color="#10b981" />
        </TouchableOpacity>

        <TouchableOpacity onPress={stop}>
          <Ionicons name="stop-circle" size={32} color="#f87171" />
        </TouchableOpacity>

        <TouchableOpacity onPress={nextTrack}>
          <Ionicons name="play-skip-forward" size={28} color="#7dd3fc" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    padding: 16,
    marginTop: 20,
    borderRadius: 14,
  },
  track: {
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

