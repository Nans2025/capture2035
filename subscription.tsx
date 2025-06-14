// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SubscriptionScreen() {
  const handleSubscribe = () => {
    // Implement subscription logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Subscription Plans</Text>
      <View style={styles.plan}>
        <Text style={styles.planTitle}>Monthly Plan</Text>
        <Text style={styles.planPrice}>$4.99/month</Text>
        <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
      {/* Add more plans as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0e0e23',
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  plan: {
    backgroundColor: '#1f1f2e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  planTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7c3aed',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
