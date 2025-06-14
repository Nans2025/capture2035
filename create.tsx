// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
  ImageBackground,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

// Mapping theme names to local image assets
const themeImageMap: { [key: string]: any } = {
  glowBlue: require('../assets/themes/glowBlue.jpg'),
  neonPurple: require('../assets/themes/neonPurple.png'),
  default: require('../assets/themes/createBackground.png'),
};

export default function CreateCapsule() {
  const router = useRouter();
  const { selectedTheme } = useLocalSearchParams<{ selectedTheme?: string }>();

  const [theme, setTheme] = useState(selectedTheme || 'default');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [revealDate, setRevealDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [mysteryCapsule, setMysteryCapsule] = useState(false);
  const [timeChain, setTimeChain] = useState(false);
  const [parentCapsuleId, setParentCapsuleId] = useState('');
  const [userCapsules, setUserCapsules] = useState<any[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [recipientEmails, setRecipientEmails] = useState('');
  const [notifyBeforeEmail, setNotifyBeforeEmail] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [music, setMusic] = useState('');

  useEffect(() => {
    const fetchUserCapsules = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const q = query(collection(db, 'capsules'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const capsulesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserCapsules(capsulesData);
    };
    fetchUserCapsules();
  }, []);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(revealDate);
      newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      setRevealDate(newDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(revealDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      newDate.setSeconds(0);
      setRevealDate(newDate);
    }
  };

  const pickMedia = async (type: 'image' | 'video' | 'music') => {
    try {
      let result;
      if (type === 'image') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.cancelled) setImage(result.uri);
      } else if (type === 'video') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.cancelled) setVideo(result.uri);
      } else if (type === 'music') {
        result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
        if (result.type === 'success') setMusic(result.uri);
      }
    } catch (err) {
      console.error('Media picker error:', err);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title.');
      return;
    }
    if (!agreeTerms) {
      Alert.alert('Error', 'You must agree to terms and conditions.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'You must be logged in.');
        return;
      }

      const capsuleData = {
        userId: user.uid,
        title,
        description,
        revealDate: mysteryCapsule ? null : revealDate,
        mysteryCapsule,
        timeChain,
        parentCapsuleId: timeChain ? parentCapsuleId : null,
        isPublic,
        recipientEmails: recipientEmails.split(',').map(email => email.trim()),
        notifyBeforeEmail,
        subscribe,
        agreeTerms,
        image,
        video,
        music,
        theme,
        createdAt: new Date(),
        revealed: false,
      };

      await addDoc(collection(db, 'capsules'), capsuleData);
      Alert.alert('Success', 'Capsule created successfully!');
      router.push('/dashboard');
    } catch (err) {
      console.error('Error creating capsule:', err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const getThemeImage = () => {
    return themeImageMap[theme] || themeImageMap.default;
  };

  return (
    <ImageBackground source={getThemeImage()} style={styles.background} imageStyle={{ opacity: 0.3 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Create a New Capsule</Text>

        {/* Select Theme Button */}
        <TouchableOpacity style={styles.themeButton} onPress={() => router.push('/themes')}>
          <Text style={styles.themeButtonText}>🎨 Select Theme</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Description"
          placeholderTextColor="#aaa"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
          disabled={mysteryCapsule}
        >
          <Text style={styles.dateButtonText}>
            {mysteryCapsule ? 'Mystery Capsule - No Date' : `Reveal Date: ${revealDate.toDateString()}`}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={revealDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Time Picker */}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowTimePicker(true)}
          disabled={mysteryCapsule}
        >
          <Text style={styles.dateButtonText}>
            {mysteryCapsule ? 'Mystery Capsule - No Time' : `Reveal Time: ${revealDate.toLocaleTimeString()}`}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={revealDate}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* Toggles */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Mystery Capsule:</Text>
          <Switch value={mysteryCapsule} onValueChange={setMysteryCapsule} />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Time-Chain Capsule:</Text>
          <Switch value={timeChain} onValueChange={setTimeChain} />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Make Capsule Public:</Text>
          <Switch value={isPublic} onValueChange={setIsPublic} />
        </View>

        {timeChain && (
          <View style={styles.parentSelector}>
            <Text style={styles.toggleLabel}>Select Parent Capsule:</Text>
            {userCapsules.map((capsule) => (
              <TouchableOpacity
                key={capsule.id}
                style={[styles.parentItem, parentCapsuleId === capsule.id && styles.selectedParent]}
                onPress={() => setParentCapsuleId(capsule.id)}
              >
                <Text style={styles.parentText}>{capsule.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Recipient Emails (comma separated)"
          placeholderTextColor="#aaa"
          value={recipientEmails}
          onChangeText={setRecipientEmails}
        />
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Notify by Email before Reveal:</Text>
          <Switch value={notifyBeforeEmail} onValueChange={setNotifyBeforeEmail} />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Subscribe to SAPEC Studio Newsletters:</Text>
          <Switch value={subscribe} onValueChange={setSubscribe} />
        </View>

        <View style={styles.mediaUploadRow}>
          <TouchableOpacity onPress={() => pickMedia('image')} style={styles.mediaButton}>
            <Text style={styles.mediaButtonText}>{image ? 'Change Image' : 'Upload Image'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickMedia('video')} style={styles.mediaButton}>
            <Text style={styles.mediaButtonText}>{video ? 'Change Video' : 'Upload Video'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickMedia('music')} style={styles.mediaButton}>
            <Text style={styles.mediaButtonText}>{music ? 'Change Music' : 'Upload Music'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>I agree to Terms and Conditions</Text>
          <Switch value={agreeTerms} onValueChange={setAgreeTerms} />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Confirm & Seal Capsule</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00f5ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  themeButton: {
    backgroundColor: '#00f5ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  themeButtonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#00f5ff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  description: { height: 100, textAlignVertical: 'top' },
  dateButton: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#00f5ff',
  },
  dateButtonText: { color: '#fff', textAlign: 'center' },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleLabel: { color: '#fff', fontSize: 16 },
  parentSelector: { marginBottom: 16 },
  parentItem: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00f5ff',
    marginTop: 8,
  },
  selectedParent: { backgroundColor: '#00f5ff20' },
  parentText: { color: '#fff' },
  mediaUploadRow: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
  mediaButton: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00f5ff',
    marginBottom: 8,
  },
  mediaButtonText: { color: '#fff', textAlign: 'center' },
  submitButton: {
    backgroundColor: '#00f5ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});







































