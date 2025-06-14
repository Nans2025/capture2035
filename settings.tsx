// app/settings.tsx
// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SoundButton from '../components/SoundButton';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>⚙️ Settings</Text>

        <SoundButton style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Privacy</Text>
        </SoundButton>
        <SoundButton style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Notifications</Text>
        </SoundButton>
        <SoundButton style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Preferences</Text>
        </SoundButton>
        {/* NEW: My Purchases Button */}
        <SoundButton style={styles.item} onPress={() => router.push('/vault')}>
          <Text style={styles.itemText}>My Purchases</Text>
        </SoundButton>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  item: {
    backgroundColor: '#2c2c3e',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    marginVertical: 10,
    width: '85%',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
});





