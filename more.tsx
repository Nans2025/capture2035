// app/more.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function MoreScreen() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const mindfulPrompts = [
    "What is something you're afraid to lose in the future?",
    "What advice would you give your future self?",
    "If you had 10 minutes left in the world, who would you talk to and why?",
    "Write a message to yourself 10 years from now.",
    "What does a successful life look like for you?"
  ];

  const generatePrompt = () => {
    const random = Math.floor(Math.random() * mindfulPrompts.length);
    setPrompt(mindfulPrompts[random]);
  };

  const handleFeatureRequest = () => {
    Alert.alert('Feature Request', 'Feature request feature coming soon.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Vault+ Experiences</Text>

      <TouchableOpacity style={styles.card} onPress={generatePrompt}>
        <Text style={styles.cardText}>🧠 Generate Mindful Prompt</Text>
      </TouchableOpacity>
      {prompt ? (
        <View style={styles.promptBox}>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.card} onPress={() => Alert.alert('Coming Soon', '“On This Day” feature is coming.')}>
        <Text style={styles.cardText}>📆 On This Day</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/themes')}>
        <Text style={styles.cardText}>🎨 Themes Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleFeatureRequest}>
        <Text style={styles.cardText}>💡 Request a Feature</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/dashboard')}>
        <Text style={styles.backText}>⬅ Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e0e23',
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1f1f2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    width: '100%',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
  promptBox: {
    backgroundColor: '#2a2a3f',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    width: '100%',
  },
  promptText: {
    color: '#ccc',
    fontSize: 15,
    fontStyle: 'italic',
  },
  backBtn: {
    marginTop: 30,
  },
  backText: {
    color: '#4f8ef7',
    fontSize: 16,
  },
});

