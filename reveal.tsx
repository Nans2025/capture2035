import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Dimensions,
  Share,
  Animated,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const themeAssets: Record<string, any> = {
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
  Theme15: require('../assets/themes/Theme15.png'),
  Theme16: require('../assets/themes/Theme16.png'),
  Theme17: require('../assets/themes/Theme17.png'),
  theme20: require('../assets/themes/theme20.jpg'),
  theme21: require('../assets/themes/theme21.jpg'),
  theme22: require('../assets/themes/theme22.jpg'),
  theme23: require('../assets/themes/theme23.jpg'),
  theme24: require('../assets/themes/theme24.jpg'),
  theme25: require('../assets/themes/theme25.jpg'),
  theme26: require('../assets/themes/theme26.jpg'),
  theme27: require('../assets/themes/theme27.jpg'),
  theme28: require('../assets/themes/theme28.jpg'),
  theme29: require('../assets/themes/theme29.jpg'),
  theme30: require('../assets/themes/theme30.jpg'),
  theme31: require('../assets/themes/theme31.jpg'),
  theme32: require('../assets/themes/theme32.jpg'),
  theme33: require('../assets/themes/theme33.jpg'),
  theme34: require('../assets/themes/theme34.jpg'),
  theme35: require('../assets/themes/theme35.jpg'),
  theme36: require('../assets/themes/theme36.jpg'),
  theme37: require('../assets/themes/theme37.jpg'),
  theme38: require('../assets/themes/theme38.jpg'),
  theme39: require('../assets/themes/theme39.jpg'),
  theme40: require('../assets/themes/theme40.jpg'),
  theme41: require('../assets/themes/theme41.jpg'),
  theme42: require('../assets/themes/theme42.jpg'),
  theme43: require('../assets/themes/theme43.jpg'),
  theme44: require('../assets/themes/theme44.jpg'),
  theme45: require('../assets/themes/theme45.jpg'),
  theme46: require('../assets/themes/theme46.jpg'),
  theme47: require('../assets/themes/theme47.jpg'),
  theme48: require('../assets/themes/theme48.jpg'),
  theme49: require('../assets/themes/theme49.jpg'),
  theme50: require('../assets/themes/theme50.jpg'),
  theme51: require('../assets/themes/theme51.jpg'),
  theme52: require('../assets/themes/theme52.jpg'),
  theme53: require('../assets/themes/theme53.jpg'),
  theme54: require('../assets/themes/theme54.jpg'),
  theme55: require('../assets/themes/theme55.jpg'),
  theme56: require('../assets/themes/theme56.jpg'),
  theme57: require('../assets/themes/theme57.jpg'),
  theme58: require('../assets/themes/theme58.jpg'),
  theme59: require('../assets/themes/theme59.jpg'),
  theme60: require('../assets/themes/theme60.jpg'),
  theme61: require('../assets/themes/theme61.jpg'),
  theme62: require('../assets/themes/theme62.jpg'),
  theme63: require('../assets/themes/theme63.jpg'),
  theme64: require('../assets/themes/theme64.jpg'),
  theme65: require('../assets/themes/theme65.jpg'),
  theme66: require('../assets/themes/theme66.jpg'),
  theme67: require('../assets/themes/theme67.jpg'),
  theme68: require('../assets/themes/theme68.jpg'),
  theme69: require('../assets/themes/theme69.jpg'),
  theme70: require('../assets/themes/theme70.jpg'),
  theme71: require('../assets/themes/theme71.jpg'),
  theme72: require('../assets/themes/theme72.jpg'),
  theme73: require('../assets/themes/theme73.jpg'),
  theme74: require('../assets/themes/theme74.jpg'),
  theme75: require('../assets/themes/theme75.jpg'),
  theme76: require('../assets/themes/theme76.jpg'),
  theme77: require('../assets/themes/theme77.jpg'),
  theme78: require('../assets/themes/theme78.jpg'),
  theme79: require('../assets/themes/theme79.jpg'),
  theme80: require('../assets/themes/theme80.jpg'),
  theme81: require('../assets/themes/theme81.jpg'),
  theme82: require('../assets/themes/theme82.jpg'),
  theme83: require('../assets/themes/theme83.jpg'),
};

export default function RevealCapsule() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [capsule, setCapsule] = useState<any>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchCapsule();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [id]);

  const fetchCapsule = async () => {
    if (!id || typeof id !== 'string') {
      Alert.alert('Error', 'Invalid capsule ID.');
      setLoading(false);
      return;
    }

    try {
      const snap = await getDoc(doc(db, 'capsules', id));
      if (!snap.exists()) {
        Alert.alert('Error', 'Capsule not found.');
        setLoading(false);
        return;
      }

      const data = snap.data();
      const revealDate = data?.revealDate?.toDate
        ? data.revealDate.toDate()
        : new Date();

      setCapsule(data);
      setIsRevealed(new Date() >= revealDate);
      setLoading(false);

      if (new Date() >= revealDate) {
        triggerRevealEffects();
      }
    } catch (err) {
      console.error('Error fetching capsule:', err);
      setLoading(false);
    }
  };

  const triggerRevealEffects = async () => {
    setShowConfetti(true);
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../assets/sounds/zapsplat_cartoon_water_bubble2.mp3')
    );
    setSound(newSound);
    await newSound.playAsync();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleSave = () => {
    Alert.alert('Background Saved!', 'This background has been saved (simulated).');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🎉 I just revealed a memory in Capture2035! "${capsule.title}" — download the app to experience it too!`,
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  if (loading || !capsule) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading Capsule...</Text>
      </View>
    );
  }

  const themeImage = themeAssets[capsule.selectedTheme] || themeAssets['glowBlue'];

  return (
    <ImageBackground source={themeImage} style={styles.bg} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.header}>📦 Capsule Reveal</Text>

        {!isRevealed ? (
          <View style={styles.lockedBox}>
            <Text style={styles.locked}>🔒 Locked</Text>
            <Text style={styles.lockedSub}>This memory unlocks at the reveal date!</Text>
          </View>
        ) : (
          <Animated.View style={[styles.revealBox, { opacity: fadeAnim }]}>
            <Text style={styles.title}>{capsule.title}</Text>
            <Text style={styles.desc}>{capsule.description}</Text>

            {capsule.image && (
              <Image source={{ uri: capsule.image }} style={styles.media} resizeMode="cover" />
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.btnText}>💾 Save Background</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                <Text style={styles.btnText}>📤 Share</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Text style={styles.backText}>⬅ Back to Dashboard</Text>
        </TouchableOpacity>

        {showConfetti && (
          <ConfettiCannon count={120} origin={{ x: width / 2, y: 0 }} fadeOut />
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    padding: 24,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0f1c',
  },
  loadingText: { color: '#fff' },
  header: {
    color: '#00ffcc',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lockedBox: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#111827',
    borderRadius: 16,
  },
  locked: {
    color: '#ffcc00',
    fontSize: 28,
    fontWeight: 'bold',
  },
  lockedSub: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  revealBox: {
    alignItems: 'center',
    backgroundColor: '#111827aa',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  desc: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  media: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    gap: 16,
  },
  saveBtn: {
    backgroundColor: '#00ffcc',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  shareBtn: {
    backgroundColor: '#7e57c2',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
  },
  backBtn: {
    marginTop: 24,
    backgroundColor: '#ffffff33',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});


 















