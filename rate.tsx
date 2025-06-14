// app/rate.tsx
// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function RateApp() {
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const handleRate = (value: number) => {
    setRating(value);
    Alert.alert('Thank you!', `You rated the app ${value} stars.`);
    router.back(); // Or redirect to dashboard
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enjoying Capture2035?</Text>
      <Text style={styles.subtitle}>Rate us to support our mission!</Text>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map(value => (
          <TouchableOpacity key={value} onPress={() => handleRate(value)}>
            <AntDesign
              name={value <= rating ? 'star' : 'staro'}
              size={32}
              color="#facc15"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e0e23',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: 8,
  },
});

