// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const { width, height } = Dimensions.get('window');

const themeImageMap: { [key: string]: any } = {
  glowBlue: require('../assets/themes/glowBlue.jpg'),
  neonPurple: require('../assets/themes/neonPurple.png'),
  Theme1: require('../assets/themes/Theme1.png'),
  Theme2: require('../assets/themes/Theme2.png'),
  Theme3: require('../assets/themes/Theme3.png'),
  Theme4: require('../assets/themes/Theme4.png'),
  Theme5: require('../assets/themes/Theme5.png'),
  Theme6: require('../assets/themes/Theme6.png'),
  Theme7: require('../assets/themes/Theme7.png'),
  Theme8: require('../assets/themes/Theme8.png'),
  Theme9: require('../assets/themes/Theme9.png'),
  Theme10: require('../assets/themes/Theme10.png'),
  Theme11: require('../assets/themes/Theme11.png'),
  Theme12: require('../assets/themes/Theme12.png'),
  Theme13: require('../assets/themes/Theme13.png'),
  Theme14: require('../assets/themes/Theme14.png'),
};

const getThemeImage = (theme: string): any => {
  return themeImageMap[theme] || require('../assets/themes/revealBackground.png');
};

export default function ConfirmCapsule() {
  const router = useRouter();
  const {
    title,
    description,
    isMystery,
    isPublic,
    recipients,
    theme,
    coverImage,
    memoryVideo,
    revealTimestamp,
  } = useLocalSearchParams();

  const parsedRevealDate = useMemo(() => {
    if (isMystery === 'true') return null;
    const parsed = new Date(Number(revealTimestamp));
    return isNaN(parsed.getTime()) ? null : parsed;
  }, [revealTimestamp, isMystery]);

  const handleBackToEdit = () => {
    router.push({
      pathname: '/create',
      params: {
        title,
        description,
        isMystery,
        isPublic,
        recipients,
        selectedTheme: theme,
        revealDate: parsedRevealDate?.toISOString() || '',
        revealTime: parsedRevealDate?.toISOString() || '',
        coverImage,
        memoryVideo,
      },
    });
  };

  const handleConfirm = async () => {
    const user = auth.currentUser;
    if (!user) return Alert.alert('Error', 'Not logged in');

    const capsuleData: any = {
      userId: user.uid,
      title,
      description,
      isMystery: isMystery === 'true',
      isPublic: isPublic === 'true',
      recipients,
      theme,
      coverImage: coverImage || null,
      memoryVideo: memoryVideo || null,
      createdAt: new Date(),
    };

    if (isMystery !== 'true' && revealTimestamp) {
      const parsedDate = new Date(Number(revealTimestamp));
      if (!isNaN(parsedDate.getTime())) {
        capsuleData.revealDate = parsedDate;
      } else {
        return Alert.alert('Error', 'Invalid reveal date.');
      }
    }

    try {
      await addDoc(collection(db, 'capsules'), capsuleData);
      router.replace('/dashboard');
    } catch (err) {
      console.error('Error sealing capsule:', err);
      Alert.alert('Error', 'Failed to seal capsule');
    }
  };

  return (
    <ImageBackground source={getThemeImage(theme as string)} resizeMode="cover" style={styles.background}>
      <ScrollView contentContainerStyle={styles.overlay}>
        <TouchableOpacity onPress={handleBackToEdit} style={styles.backButton}>
          <Text style={styles.backText}>← Back to Edit</Text>
        </TouchableOpacity>

        <Text style={styles.header}>📦 Review Capsule</Text>

        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{title}</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{description}</Text>

        <Text style={styles.label}>Mystery Capsule:</Text>
        <Text style={styles.value}>{isMystery === 'true' ? 'Yes' : 'No'}</Text>

        <Text style={styles.label}>Public:</Text>
        <Text style={styles.value}>{isPublic === 'true' ? 'Yes' : 'Private'}</Text>

        <Text style={styles.label}>Recipients:</Text>
        <Text style={styles.value}>{recipients}</Text>

        <Text style={styles.label}>Reveal Date:</Text>
        <Text style={styles.value}>
          {parsedRevealDate ? parsedRevealDate.toLocaleString() : 'Mystery Capsule'}
        </Text>

        <Text style={styles.label}>Theme:</Text>
        <Text style={styles.value}>{theme || 'None'}</Text>

        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>CONFIRM & SEAL CAPSULE</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    backgroundColor: '#222',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    zIndex: 10,
  },
  backText: {
    color: '#00ffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ffcc',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 10,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3399ff',
    padding: 14,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});










