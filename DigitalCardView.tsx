// components/DigitalCardView.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function DigitalCardView({
  title,
  description,
  type,
  theme,
  status,
  image,
  timestamp,
  onReveal,
}: {
  title: string;
  description: string;
  type: 'mystery' | 'geo' | 'dna' | 'chain' | 'gift';
  theme: string;
  status: 'locked' | 'revealed' | 'soon';
  image?: string;
  timestamp?: string;
  onReveal?: () => void;
}) {
  const typeLabel = {
    mystery: '🔒 Mystery Capsule',
    geo: '🌐 Geo-Locked Capsule',
    dna: '🧬 DNA Capsule',
    chain: '⛓️ Time-Chain Capsule',
    gift: '🎁 Gift Capsule',
  }[type];

  return (
    <ImageBackground
      source={require('../assets/themes/revealBackground.png')}
      style={styles.card}
      imageStyle={{ borderRadius: 20 }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.badge}>{typeLabel}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
        {status === 'locked' ? (
          <Text style={styles.status}>🔒 Locked</Text>
        ) : status === 'soon' ? (
          <Text style={styles.status}>⏳ Unlocking Soon</Text>
        ) : (
          <Text style={styles.status}>✅ Revealed</Text>
        )}

        {timestamp && <Text style={styles.date}>Sealed For: {timestamp}</Text>}

        {status === 'revealed' && image && (
          <Image source={{ uri: image }} style={styles.memoryImage} />
        )}

        {onReveal && (
          <TouchableOpacity style={styles.revealBtn} onPress={onReveal}>
            <Text style={styles.revealText}>Open Memory</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
    alignSelf: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    borderRadius: 20,
  },
  badge: {
    color: '#7dd3fc',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  desc: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  status: {
    color: '#00ffcc',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 12,
  },
  memoryImage: {
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 12,
  },
  revealBtn: {
    backgroundColor: '#7e57c2',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  revealText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
