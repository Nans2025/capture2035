// components/SoundButton.tsx
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { playClickSound } from '../utils/sound';

export default function SoundButton(props: TouchableOpacityProps) {
  const handlePress = async (event: any) => {
    await playClickSound();
    props.onPress?.(event);
  };

  return (
    <TouchableOpacity {...props} onPress={handlePress}>
      {props.children}
    </TouchableOpacity>
  );
}
