// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent.');
      router.replace('/login');
    } catch (error: any) {
      console.error('Reset Error:', error.message);
      Alert.alert('Reset Failed', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/themes/Theme5.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Reset Password</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.link}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1F1F2E',
    width: '100%',
    borderRadius: 10,
    padding: 14,
    color: '#fff',
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#7C3AED',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#A78BFA', fontSize: 14 },
});





