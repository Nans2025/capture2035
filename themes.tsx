import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const themeList = [
  { name: 'theme20', src: require('../assets/themes/theme20.jpg'), premium: true, description: 'A futuristic neon cityscape — perfect for tech visionaries.' },
  { name: 'theme21', src: require('../assets/themes/theme21.jpg'), premium: true, description: 'Peaceful mountains at sunset — ideal for dreamers and calm minds.' },
  { name: 'theme22', src: require('../assets/themes/theme22.jpg'), premium: true, description: 'Cosmic galaxy swirls — for those reaching for the stars.' },
  { name: 'theme23', src: require('../assets/themes/theme23.jpg'), premium: true, description: 'Golden hour beach view — capture memories in warmth and light.' },
  { name: 'theme24', src: require('../assets/themes/theme24.jpg'), premium: true, description: 'Abstract digital chaos — for bold and expressive personalities.' },
  { name: 'theme25', src: require('../assets/themes/theme25.jpg'), premium: true, description: 'Snowy forest calm — silence, solitude, and serenity.' },
  { name: 'theme26', src: require('../assets/themes/theme26.jpg'), premium: true, description: 'Urban night lights — for dreamers who never sleep.' },
  { name: 'theme27', src: require('../assets/themes/theme27.jpg'), premium: true, description: 'Cyberpunk haze — bold colors meet futuristic feels.' },
  { name: 'theme28', src: require('../assets/themes/theme28.jpg'), premium: true, description: 'Tropical lagoon escape — a visual vacation.' },
  { name: 'theme29', src: require('../assets/themes/theme29.jpg'), premium: true, description: 'Zen garden minimalism — beauty in simplicity.' },
  { name: 'theme30', src: require('../assets/themes/theme30.jpg'), premium: true, description: 'Floating city vibes — imagination meets design.' },
  { name: 'theme31', src: require('../assets/themes/theme31.jpg'), premium: true, description: 'A futuristic neon cityscape — perfect for tech visionaries.' },
  { name: 'theme32', src: require('../assets/themes/theme32.jpg'), premium: true, description: 'Peaceful mountains at sunset — ideal for dreamers and calm minds.' },
  { name: 'theme33', src: require('../assets/themes/theme33.jpg'), premium: true, description: 'Cosmic galaxy swirls — for those reaching for the stars.' },
  { name: 'theme34', src: require('../assets/themes/theme34.jpg'), premium: true, description: 'Golden hour beach view — capture memories in warmth and light.' },
  { name: 'theme35', src: require('../assets/themes/theme35.jpg'), premium: true, description: 'Abstract digital chaos — for bold and expressive personalities.' },
  { name: 'theme36', src: require('../assets/themes/theme36.jpg'), premium: true, description: 'Snowy forest calm — silence, solitude, and serenity.' },
  { name: 'theme37', src: require('../assets/themes/theme37.jpg'), premium: true, description: 'Urban night lights — for dreamers who never sleep.' },
  { name: 'theme38', src: require('../assets/themes/theme38.jpg'), premium: true, description: 'Cyberpunk haze — bold colors meet futuristic feels.' },
  { name: 'theme39', src: require('../assets/themes/theme39.jpg'), premium: true, description: 'Tropical lagoon escape — a visual vacation.' },
  { name: 'theme40', src: require('../assets/themes/theme40.jpg'), premium: true, description: 'Zen garden minimalism — beauty in simplicity.' },
  { name: 'theme41', src: require('../assets/themes/theme41.jpg'), premium: true, description: 'Floating city vibes — imagination meets design.' },
  { name: 'theme42', src: require('../assets/themes/theme42.jpg'), premium: true, description: 'A futuristic neon cityscape — perfect for tech visionaries.' },
  { name: 'theme43', src: require('../assets/themes/theme43.jpg'), premium: true, description: 'Peaceful mountains at sunset — ideal for dreamers and calm minds.' },
  { name: 'theme44', src: require('../assets/themes/theme44.jpg'), premium: true, description: 'Cosmic galaxy swirls — for those reaching for the stars.' },
  { name: 'theme45', src: require('../assets/themes/theme45.jpg'), premium: true, description: 'Golden hour beach view — capture memories in warmth and light.' },
  { name: 'theme46', src: require('../assets/themes/theme46.jpg'), premium: true, description: 'Abstract digital chaos — for bold and expressive personalities.' },
  { name: 'theme47', src: require('../assets/themes/theme47.jpg'), premium: true, description: 'Snowy forest calm — silence, solitude, and serenity.' },
  { name: 'theme48', src: require('../assets/themes/theme48.jpg'), premium: true, description: 'Urban night lights — for dreamers who never sleep.' },
  { name: 'theme49', src: require('../assets/themes/theme49.jpg'), premium: true, description: 'Cyberpunk haze — bold colors meet futuristic feels.' },
  { name: 'theme50', src: require('../assets/themes/theme50.jpg'), premium: true, description: 'Tropical lagoon escape — a visual vacation.' },
  { name: 'theme51', src: require('../assets/themes/theme51.jpg'), premium: true, description: 'Zen garden minimalism — beauty in simplicity.' },
  { name: 'theme52', src: require('../assets/themes/theme52.jpg'), premium: true, description: 'Floating city vibes — imagination meets design.' },
  { name: 'theme53', src: require('../assets/themes/theme53.jpg'), premium: true, description: 'A futuristic neon cityscape — perfect for tech visionaries.' },
  { name: 'theme54', src: require('../assets/themes/theme54.jpg'), premium: true, description: 'Peaceful mountains at sunset — ideal for dreamers and calm minds.' },
  { name: 'theme55', src: require('../assets/themes/theme55.jpg'), premium: true, description: 'Cosmic galaxy swirls — for those reaching for the stars.' },
  { name: 'theme56', src: require('../assets/themes/theme56.jpg'), premium: true, description: 'Golden hour beach view — capture memories in warmth and light.' },
  { name: 'theme57', src: require('../assets/themes/theme57.jpg'), premium: true, description: 'Abstract digital chaos — for bold and expressive personalities.' },
  { name: 'theme58', src: require('../assets/themes/theme58.jpg'), premium: true, description: 'Snowy forest calm — silence, solitude, and serenity.' },
  { name: 'theme59', src: require('../assets/themes/theme59.jpg'), premium: true, description: 'Urban night lights — for dreamers who never sleep.' },
  { name: 'theme60', src: require('../assets/themes/theme60.jpg'), premium: true, description: 'Cyberpunk haze — bold colors meet futuristic feels.' },
  { name: 'theme61', src: require('../assets/themes/theme61.jpg'), premium: true, description: 'Tropical lagoon escape — a visual vacation.' },
  { name: 'theme62', src: require('../assets/themes/theme62.jpg'), premium: true, description: 'Zen garden minimalism — beauty in simplicity.' },
  { name: 'theme63', src: require('../assets/themes/theme63.jpg'), premium: true, description: 'Floating city vibes — imagination meets design.' },
  { name: 'theme64', src: require('../assets/themes/theme64.jpg'), premium: true, description: 'A futuristic neon cityscape — perfect for tech visionaries.' },
  { name: 'theme65', src: require('../assets/themes/theme65.jpg'), premium: true, description: 'Peaceful mountains at sunset — ideal for dreamers and calm minds.' },
  { name: 'theme66', src: require('../assets/themes/theme66.jpg'), premium: true, description: 'Cosmic galaxy swirls — for those reaching for the stars.' },
  { name: 'theme67', src: require('../assets/themes/theme67.jpg'), premium: true, description: 'Golden hour beach view — capture memories in warmth and light.' },
  { name: 'theme68', src: require('../assets/themes/theme68.jpg'), premium: true, description: 'Abstract digital chaos — for bold and expressive personalities.' },
  { name: 'theme69', src: require('../assets/themes/theme69.jpg'), premium: true, description: 'Snowy forest calm — silence, solitude, and serenity.' },
  { name: 'theme70', src: require('../assets/themes/theme70.jpg'), premium: true, description: 'Urban night lights — for dreamers who never sleep.' },
  { name: 'theme71', src: require('../assets/themes/theme71.jpg'), premium: true, description: 'Cyberpunk haze — bold colors meet futuristic feels.' },
  { name: 'theme72', src: require('../assets/themes/theme72.jpg'), premium: true, description: 'Tropical lagoon escape — a visual vacation.' },
  { name: 'theme73', src: require('../assets/themes/theme73.jpg'), premium: true, description: 'Zen garden minimalism — beauty in simplicity.' },
  { name: 'theme74', src: require('../assets/themes/theme74.jpg'), premium: true, description: 'Floating city vibes — imagination meets design.' },
  { name: 'theme75', src: require('../assets/themes/theme75.jpg'), premium: true, description: 'A futuristic neon cityscape — perfect for tech visionaries.' },
  { name: 'theme76', src: require('../assets/themes/theme76.jpg'), premium: true, description: 'Peaceful mountains at sunset — ideal for dreamers and calm minds.' },
  { name: 'theme77', src: require('../assets/themes/theme77.jpg'), premium: true, description: 'Cosmic galaxy swirls — for those reaching for the stars.' },
  { name: 'theme78', src: require('../assets/themes/theme78.jpg'), premium: true, description: 'Golden hour beach view — capture memories in warmth and light.' },
  { name: 'theme79', src: require('../assets/themes/theme79.jpg'), premium: true, description: 'Abstract digital chaos — for bold and expressive personalities.' },
  { name: 'theme80', src: require('../assets/themes/theme80.jpg'), premium: true, description: 'Snowy forest calm — silence, solitude, and serenity.' },
  { name: 'theme81', src: require('../assets/themes/theme81.jpg'), premium: true, description: 'Urban night lights — for dreamers who never sleep.' },
  { name: 'theme82', src: require('../assets/themes/theme82.jpg'), premium: true, description: 'Cyberpunk haze — bold colors meet futuristic feels.' },
  { name: 'theme83', src: require('../assets/themes/theme83.jpg'), premium: true, description: 'Tropical lagoon escape — a visual vacation.' },
  
];

export default function ThemesScreen() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (theme) => {
    setSelectedTheme(theme);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTheme(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {themeList.map((theme, index) => (
          <TouchableOpacity
            key={index}
            style={styles.themeContainer}
            onPress={() => openModal(theme)}>
            <Image source={theme.src} style={styles.themeImage} resizeMode="cover" />
            <Text style={styles.themeName}>{theme.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTheme && (
              <>
                <Image source={selectedTheme.src} style={styles.modalImage} resizeMode="cover" />
                <Text style={styles.modalTitle}>{selectedTheme.name}</Text>
                <Text style={styles.modalDescription}>{selectedTheme.description}</Text>
                <TouchableOpacity style={styles.buyButton} onPress={() => alert('Go to payment screen')}>
                  <Text style={styles.buyButtonText}>Buy Theme</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  themeContainer: {
    margin: 10,
    alignItems: 'center',
    width: width * 0.4,
  },
  themeImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  themeName: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  modalDescription: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#00bfff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 6,
  },
  closeButtonText: {
    color: '#aaa',
  },
});























  








