// app/vault.tsx
// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

export default function VaultScreen() {
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'Please log in to view your purchases.');
        return;
      }

      try {
        const q = query(collection(db, 'purchases'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPurchases(items);
      } catch (err) {
        console.error('Error fetching purchases:', err);
        Alert.alert('Error', 'Failed to fetch purchases.');
      }
    };

    fetchPurchases();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.productName}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={{ flex: 1 }}>
      <Text style={styles.title}>🗂️ My Purchases</Text>
      {purchases.length === 0 ? (
        <Text style={styles.empty}>No purchases yet.</Text>
      ) : (
        <FlatList
          data={purchases}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    color: '#7dd3fc',
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    color: '#00ffcc',
    fontSize: 14,
    marginTop: 4,
  },
  empty: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});





