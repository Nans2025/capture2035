// app/store.tsx
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
  Image,
  RefreshControl,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const PRODUCTS = [
  // Themes
  { id: 'theme_neon', name: 'Neon Purple Theme', category: 'Themes', price: 2.99, preview: require('../assets/themes/neonPurple.png') },
  { id: 'theme_starlight', name: 'Starlight Glow Theme', category: 'Themes', price: 2.79, preview: require('../assets/themes/Theme2.png') },
  { id: 'theme_galaxy', name: 'Galaxy Dream Theme', category: 'Themes', price: 3.49, preview: require('../assets/themes/Theme3.png') },
  { id: 'theme_midnight', name: 'Midnight Vibes Theme', category: 'Themes', price: 2.49, preview: require('../assets/themes/Theme4.png') },

  // Audio Packs
  { id: 'audio_memories', name: 'Memory Soundtrack', category: 'Audio Packs', price: 1.99, preview: require('../assets/themes/glowBlue.jpg') },
  { id: 'audio_lofi', name: 'LoFi Chill Vibes', category: 'Audio Packs', price: 2.49, preview: require('../assets/themes/Theme5.png') },
  { id: 'audio_focus', name: 'Focus Beats', category: 'Audio Packs', price: 2.29, preview: require('../assets/themes/Theme6.png') },

  // Tokens
  { id: 'token_time', name: 'Time-Chain Booster', category: 'Tokens', price: 1.49, preview: require('../assets/themes/Theme7.png') },
  { id: 'token_vip', name: 'VIP Time-Chain Token', category: 'Tokens', price: 2.99, preview: require('../assets/themes/Theme8.png') },
  { id: 'token_mystery', name: 'Mystery Unlocker Token', category: 'Tokens', price: 1.79, preview: require('../assets/themes/Theme9.png') },

  // Gifts
  { id: 'gift_capsule', name: 'Capsule Gift Voucher', category: 'Gifts', price: 3.99, preview: require('../assets/themes/Theme10.png') },
  { id: 'gift_premium', name: 'Premium Gift Capsule', category: 'Gifts', price: 5.99, preview: require('../assets/themes/Theme11.png') },

  // Wallpapers
  { id: 'wallpaper_starfield', name: 'Starfield Live Wallpaper', category: 'Wallpapers', price: 1.99, preview: require('../assets/themes/Theme12.png') },
  { id: 'wallpaper_sunset', name: 'Sunset Horizons', category: 'Wallpapers', price: 2.29, preview: require('../assets/themes/Theme13.png') },

  // Stickers
  { id: 'sticker_bundle', name: 'Time Capsule Sticker Pack', category: 'Stickers', price: 0.99, preview: require('../assets/themes/Theme14.png') },
  { id: 'sticker_neon', name: 'Neon Sticker Set', category: 'Stickers', price: 1.49, preview: require('../assets/themes/Theme15.png') },

  // Special Items
  { id: 'premium_subscription', name: 'Premium Subscription', category: 'Special', price: 9.99, preview: require('../assets/themes/Theme16.png') },
  { id: 'vault_pass', name: 'Vault Priority Pass', category: 'Special', price: 4.99, preview: require('../assets/themes/Theme17.png') },
];


const CATEGORIES = ['All', 'Themes', 'Audio Packs', 'Tokens', 'Gifts'];

export default function StoreScreen() {
  const router = useRouter();
  const [products, setProducts] = useState(PRODUCTS);
  const [refreshing, setRefreshing] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const shuffleProducts = () => {
    const shuffled = [...PRODUCTS].sort(() => 0.5 - Math.random());
    setProducts(shuffled);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    shuffleProducts();
    setTimeout(() => setRefreshing(false), 1200);
  };

  const handleBuy = async (item: any) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'Please log in to purchase.');
      return;
    }

    try {
      await addDoc(collection(db, 'purchases'), {
        userId: user.uid,
        productId: item.id,
        productName: item.name,
        category: item.category,
        price: item.price,
        purchasedAt: new Date(),
      });
      Alert.alert('Success', `${item.name} added to your Capsule Vault!`);
    } catch (err) {
      console.error('Error purchasing item:', err);
      Alert.alert('Error', 'Failed to complete purchase.');
    }
  };

  const handlePreview = async (item: any) => {
    if (item.category === 'Audio Packs') {
      try {
        if (sound) {
          await sound.unloadAsync();
          setSound(null);
        }
        const { sound: newSound } = await Audio.Sound.createAsync(item.preview);
        setSound(newSound);
        await newSound.playAsync();
      } catch (err) {
        console.error('Audio error:', err);
      }
    } else {
      setSelectedProduct(item);
      setPreviewModal(true);
    }
  };

  useEffect(() => {
    shuffleProducts();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((item) => item.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Themes':
        return 'color-palette';
      case 'Audio Packs':
        return 'musical-notes';
      case 'Tokens':
        return 'pricetag';
      case 'Gifts':
        return 'gift';
      default:
        return 'apps';
    }
  };

  const renderProductCard = ({ item }: any) => (
    <View key={item.id} style={styles.card}>
      <Image source={item.preview} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.buyBtn} onPress={() => handleBuy(item)}>
          <Ionicons name="cart" size={18} color="#fff" />
          <Text style={styles.buyText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.previewBtn} onPress={() => handlePreview(item)}>
          <Ionicons name="eye" size={18} color="#7dd3fc" />
          <Text style={styles.previewText}>Preview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Digital Store</Text>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/dashboard')}
        >
          <Ionicons name="home" size={24} color="#00ffcc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Tap to shop — Memory Marketplace</Text>

      {/* Category Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryPill,
              selectedCategory === category && styles.selectedCategoryPill,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Ionicons
              name={getCategoryIcon(category)}
              size={16}
              color={selectedCategory === category ? '#000' : '#7dd3fc'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductCard}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.productGrid}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {/* Modal Preview */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={previewModal}
        onRequestClose={() => setPreviewModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Image
                  source={selectedProduct.preview}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setPreviewModal(false)}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#0a0f1c' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#111827',
  },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  homeButton: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 8,
  },
  subtitle: {
    color: '#7dd3fc',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#7dd3fc',
  },
  selectedCategoryPill: {
    backgroundColor: '#7dd3fc',
  },
  categoryText: {
    color: '#7dd3fc',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  selectedCategoryText: {
    color: '#000',
  },
  productGrid: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    width: '48%',
    elevation: 4,
    shadowColor: '#00ffcc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  price: { color: '#7dd3fc', fontSize: 14, marginBottom: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  buyBtn: {
    backgroundColor: '#7e57c2',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewBtn: {
    borderColor: '#7dd3fc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyText: { color: '#fff', fontWeight: 'bold' },
  previewText: { color: '#7dd3fc', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  closeBtn: {
    backgroundColor: '#00ffcc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeBtnText: {
    color: '#000',
    fontWeight: 'bold',
  },
});









