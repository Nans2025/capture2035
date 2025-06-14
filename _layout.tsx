// app/_layout.tsx
// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React from 'react';
import { AudioProvider } from '../context/AudioContext';
import { Stack, useSegments, useRouter } from 'expo-router';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { LinearGradient } from 'expo-linear-gradient';

export default function Layout() {
  const segments = useSegments();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const currentRoute = segments.join('/').replace(/^\//, '');
  const showNav = currentRoute === 'dashboard';

  return (
    <AudioProvider>
      <ActionSheetProvider>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
          {showNav && (
            <LinearGradient
              colors={['#0f172a', '#1e293b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.bottomNav, { paddingBottom: insets.bottom }]}
            >
              <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/dashboard')}>
                <Ionicons name="home" size={22} color="#7dd3fc" />
                <Text style={styles.navText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/capsules')}>
                <Ionicons name="cube" size={22} color="#7dd3fc" />
                <Text style={styles.navText}>Capsules</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/vault')}>
                <Ionicons name="lock-closed" size={22} color="#7dd3fc" />
                <Text style={styles.navText}>Vault</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/chainSummary')}>
                <Ionicons name="link" size={22} color="#7dd3fc" />
                <Text style={styles.navText}>Chains</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/settings')}>
                <Ionicons name="settings" size={22} color="#7dd3fc" />
                <Text style={styles.navText}>Settings</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}
        </View>
      </ActionSheetProvider>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    elevation: 8,
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    color: '#7dd3fc',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },
});














