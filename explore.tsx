// app/explore.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';

const ExploreScreen = () => {
  const router = useRouter();
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0.6)).current;

  const playClickSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/click.mp3')
      );
      await sound.playAsync();
    } catch (err) {
      console.error('Sound error:', err);
    }
  };

  const fetchAIPrediction = async () => {
    playClickSound();
    setLoading(true);
    setPrediction('');

    // Simulate AI delay — replace this with your actual backend call
    setTimeout(() => {
      const mockPredictions = [
        "In 3 years, your digital twin will manage your calendar.",
        "AI will predict emotional trends in relationships by 2029.",
        "A voice note you send today will spark a future memory.",
        "You'll receive a message from your future self in 2033.",
        "Your capsule will be unlocked at the perfect time."
      ];
      const random = Math.floor(Math.random() * mockPredictions.length);
      setPrediction(mockPredictions[random]);
      setLoading(false);
    }, 2000);
  };

  const saveToCapsule = () => {
    playClickSound();
    if (!prediction.trim()) {
      Alert.alert("Nothing to Save", "Generate a prediction first.");
      return;
    }

    Alert.alert("Saved!", "Your AI prediction has been added to your capsule.");
    setPrediction('');
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/themes/theme21.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          🌌 AI Future Predictions
        </Animated.Text>

        <TouchableOpacity style={styles.generateButton} onPress={fetchAIPrediction}>
          <Text style={styles.buttonText}>Generate Prediction</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}

        {prediction ? (
          <View style={styles.predictionBox}>
            <Text style={styles.predictionText}>{prediction}</Text>

            <TouchableOpacity style={styles.saveButton} onPress={saveToCapsule}>
              <Text style={styles.buttonText}>Store in Capsule</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/dashboard')}>
          <Ionicons name="arrow-back-circle" size={30} color="#fff" />
          <Text style={styles.backText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default ExploreScreen;

import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: '#4e54c8',
    padding: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  predictionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    width: '100%',
  },
  predictionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#00c6ff',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  backText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
});







