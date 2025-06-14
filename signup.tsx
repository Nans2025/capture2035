// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 7000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 7000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/zapsplat_cartoon_water_bubble2.mp3')
      );
      await sound.playAsync();
    };
    playSound();
  }, []);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ New user registered:', auth.currentUser?.email);
      router.replace('/dashboard');
    } catch (error: any) {
      console.error('Signup Error:', error.message);
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
      <ImageBackground
        source={require('../assets/themes/Theme7.png')}
        style={styles.background}
        imageStyle={{ opacity: 0.85 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>CREATE YOUR ACCOUNT</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text style={styles.link}>Already have an account? Log In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width, height },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  input: {
    backgroundColor: '#1F1F2E',
    width: '100%',
    borderRadius: 10,
    padding: 14,
    color: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#7C3AED',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', letterSpacing: 1.2 },
  link: { color: '#A78BFA', fontSize: 14, marginTop: 8 },
});











