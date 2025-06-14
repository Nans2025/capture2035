// app/capsules.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  onSnapshot,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { format, isValid } from 'date-fns';

const { width } = Dimensions.get('window');

export default function CapsulesScreen() {
  const router = useRouter();
  const [capsules, setCapsules] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(collection(db, 'capsules'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const capsuleList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCapsules(capsuleList);
    });
    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const parseTimestamp = (ts: any) => {
    try {
      if (!ts) return null;
      if (ts.seconds) return new Date(ts.seconds * 1000);
      if (ts.toDate) return ts.toDate();
      const d = new Date(ts);
      return isValid(d) ? d : null;
    } catch {
      return null;
    }
  };

  const getLiveCountdown = (revealDate: Date) => {
    const now = new Date().getTime();
    const target = revealDate.getTime();
    const diff = target - now;

    if (diff <= 0) {
      return '00:00:00';
    }

    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const pad = (n: number) => (n < 10 ? '0' + n : n);

  const deleteCapsule = async (capsuleId: string) => {
    try {
      await deleteDoc(doc(db, 'capsules', capsuleId));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const renderCapsule = ({ item }: any) => {
    const revealDate = parseTimestamp(item.revealDate);
    const isValidDate = revealDate && isValid(revealDate);
    const isRevealed = isValidDate && new Date() >= revealDate;

    return (
      <View style={[styles.capsuleBox, getThemeStyle(item.theme)]}>
        <Text style={styles.capsuleTitle}>{item.title}</Text>
        <Text style={styles.capsuleStatus}>{isRevealed ? '✅ Revealed' : '🔒 Locked'}</Text>
        <Text style={styles.capsuleTime}>
          {isValidDate ? format(revealDate, 'PPpp') : 'No reveal date set'}
        </Text>
        {!isRevealed && isValidDate && (
          <Text style={styles.countdown}>⏳ {getLiveCountdown(revealDate)}</Text>
        )}
        <TouchableOpacity onPress={() => deleteCapsule(item.id)}>
          <Text style={styles.deleteText}>🗑️ Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.revealButton}
          onPress={() => router.push({ pathname: '/reveal', params: { id: item.id } })}
        >
          <Text style={styles.revealText}>Reveal</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getThemeStyle = (theme: string) => {
    switch (theme) {
      case 'glowBlue':
        return { borderColor: '#00ffff' };
      case 'neonPurple':
        return { borderColor: '#cc33ff' };
      default:
        return { borderColor: '#999' };
    }
  };

  return (
    <ImageBackground
      source={require('../assets/themes/Theme1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <FlatList
          data={capsules}
          keyExtractor={(item) => item.id}
          renderItem={renderCapsule}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        {/* 🚀 Back to Dashboard Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/dashboard')}>
          <Text style={styles.backText}>⬅️ Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  capsuleBox: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  capsuleTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  capsuleStatus: { color: '#aaa', fontSize: 14, marginTop: 4 },
  capsuleTime: { color: '#999', fontSize: 13, marginTop: 2 },
  countdown: { color: '#00ffcc', fontWeight: 'bold', marginTop: 4 },
  deleteText: { color: '#ff4d4d', marginTop: 10, fontSize: 14, fontWeight: 'bold' },
  revealButton: {
    backgroundColor: '#00ffcc',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  revealText: { color: '#000', fontWeight: 'bold' },
  backBtn: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#7e57c2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
 






























