// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';

const quotes = [
  "Preserve your moments. Relive the future.",
  "Today’s memory is tomorrow’s magic.",
  "Your future self will thank you.",
  "Seal the past, unlock it in 2035.",
];

const themeImages = [
  require('../assets/themes/Theme1.png'),
  require('../assets/themes/Theme2.png'),
  require('../assets/themes/Theme3.png'),
  require('../assets/themes/Theme4.png'),
  require('../assets/themes/Theme5.png'),
  require('../assets/themes/Theme6.png'),
];

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [bgImage, setBgImage] = useState(themeImages[0]);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const random = Math.floor(Math.random() * themeImages.length);
    setBgImage(themeImages[random]);

    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.background}
          imageStyle={{ opacity: 0.5 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>WELCOME TO CAPTURE</Text>
            <Text style={styles.year}>2035</Text>
            <Text style={styles.subtitle}>Preserve memories for the future.</Text>
            <Text style={styles.motivator}>{quotes[quoteIndex]}</Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.link}>Create a new account</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  year: {
    fontSize: 42,
    color: '#00ffe1',
    fontWeight: 'bold',
    marginTop: -6,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 12,
    textAlign: 'center',
  },
  motivator: {
    color: '#a78bfa',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#7c3aed',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: width * 0.8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#a78bfa',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1.2,
  },
  link: {
    color: '#a78bfa',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});






















