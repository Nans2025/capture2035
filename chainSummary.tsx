// app/chainSummary.tsx
// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { format } from 'date-fns';

export default function ChainSummary() {
  const router = useRouter();
  const [chains, setChains] = useState<any[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, 'capsules'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chainData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChains(chainData);
    });

    return unsubscribe;
  }, []);

  const renderChainItem = ({ item }: any) => (
    <View style={styles.chainItem}>
      <Text style={styles.chainTitle}>{item.title}</Text>
      <Text style={styles.chainDate}>
        Reveal Date: {format(new Date(item.revealDate.seconds * 1000), 'PPpp')}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/themes/Theme7.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/dashboard')}
        >
          <Text style={styles.backButtonText}>← Back to Dashboard</Text>
        </TouchableOpacity>

        <Text style={styles.header}>⛓️ Time-Chain Capsules</Text>
        <FlatList
          data={chains}
          keyExtractor={(item) => item.id}
          renderItem={renderChainItem}
          contentContainerStyle={styles.list}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    backgroundColor: '#00ffcc',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  header: {
    color: '#00ffcc',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 100,
  },
  chainItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: '#00ffcc',
    borderWidth: 1,
  },
  chainTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  chainDate: {
    color: '#ccc',
    fontSize: 14,
  },
});






