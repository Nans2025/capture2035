import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { playClickSound } from '../utils/sound';

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDisplayName(data.displayName || '');
          setProfilePhoto(data.profilePhoto || '');
        } else {
          // 👇 Create profile document if it doesn’t exist
          await setDoc(userRef, {
            displayName: '',
            profilePhoto: '',
            createdAt: new Date(),
          });
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;
      setProfilePhoto(selectedUri);
    }
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName,
        profilePhoto,
      });
      playClickSound();
      Alert.alert('Saved', 'Profile updated successfully!');
      router.back();
    } catch (err: any) {
      console.error('Save failed:', err.message);
      if (err.code === 'not-found') {
        // Fallback: create the doc
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          displayName,
          profilePhoto,
          createdAt: new Date(),
        });
        Alert.alert('Saved', 'Profile created and updated!');
        router.back();
      } else {
        Alert.alert('Error', 'Failed to save profile.');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profilePhoto ? { uri: profilePhoto } : require('../assets/default-avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.changePhoto}>Tap to change photo</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter Display Name"
          value={displayName}
          onChangeText={setDisplayName}
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#5cffb4',
  },
  changePhoto: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#5cffb4',
    borderRadius: 12,
    width: '100%',
    padding: 12,
    color: '#fff',
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: '#8f4dff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


