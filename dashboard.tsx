// app/dashboard.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const [displayName, setDisplayName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setDisplayName(data.displayName || '');
        setProfilePhoto(data.profilePhoto || '');
      }
    });

    return unsubscribe;
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const playClickSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/click.mp3')
    );
    soundRef.current = sound;
    await sound.playAsync();
  };

  const handleNavigation = async (path: string) => {
    await playClickSound();
    router.push(path);
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/themes/dashboardbackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.header}>
          <Image source={{ uri: profilePhoto }} style={styles.avatar} />
          <Text style={styles.welcomeText}>Welcome, {displayName || 'Friend'}!</Text>
        </View>

        <View style={styles.grid}>
          {[
            { label: 'Explore AI', icon: 'rocket-outline', path: '/explore' },
            { label: 'My Capsules', icon: 'albums-outline', path: '/capsules' },
            { label: 'Create Capsule', icon: 'add-circle-outline', path: '/create' },
            { label: 'Subscriptions', icon: 'card-outline', path: '/subscription' },
            { label: 'Themes', icon: 'color-palette-outline', path: '/themes' },
            { label: 'Feedback', icon: 'chatbox-ellipses-outline', path: '/feedback' },
            { label: 'Rate Us', icon: 'star-outline', path: '/rate' },
            { label: 'Privacy', icon: 'shield-checkmark-outline', path: '/privacy' },
            { label: 'Profile', icon: 'person-circle-outline', path: '/profile' },
            { label: 'Terms', icon: 'document-text-outline', path: '/terms' },
            { label: 'More', icon: 'ellipsis-horizontal-circle-outline', path: '/more' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleNavigation(item.path)}
            >
              <Ionicons name={item.icon} size={30} color="white" />
              <Text style={styles.buttonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    width: width / 3.2,
    height: width / 3.2,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  buttonText: {
    marginTop: 8,
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});























































