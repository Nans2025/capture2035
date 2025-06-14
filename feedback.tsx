// app/feedback.tsx
// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function FeedbackScreen() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert('Empty Feedback', 'Please enter your feedback.');
      return;
    }

    console.log('Feedback submitted:', message);
    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setMessage('');
    router.back(); // Or navigate somewhere else
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>We value your feedback!</Text>
      <Text style={styles.subtitle}>Help us improve Capture2035</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your feedback here..."
        placeholderTextColor="#aaa"
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e0e23',
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1f1f2e',
    color: '#fff',
    borderRadius: 10,
    padding: 16,
    minHeight: 140,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#7c3aed',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

