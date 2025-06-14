// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.text}>
        Your privacy is important to us. This policy explains how we collect, use, and protect your information...
      </Text>
      {/* Add more privacy details as needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0e0e23',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  text: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
});
