import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Voor het hartje

// Extra props: wishlistActive (true/false) en onWishlistPress (functie)
const ProductCard = ({ title, subtitle, price, image, onPress, wishlistActive, onWishlistPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />
      {/* Wishlist-knop rechtsboven op de kaart */}
      <TouchableOpacity onPress={onWishlistPress} style={styles.wishlistButton}>
        <Icon
          name={wishlistActive ? 'heart' : 'heart-outline'}
          size={24}
          color={wishlistActive ? '#e63946' : '#222020'}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{subtitle}</Text>
        <Text style={styles.price}>€{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

/*
  Uitleg:
  - wishlistActive: bepaalt of het hartje gevuld is (♥) of leeg (♡)
  - onWishlistPress: wordt aangeroepen als je op het hartje drukt
  - Zo kun je elk product makkelijk aan/uit je wishlist zetten
*/

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Golos-Bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222020',
  },
});

export default ProductCard;