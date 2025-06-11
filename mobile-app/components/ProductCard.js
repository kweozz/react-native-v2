import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductCard = ({ title, subtitle, price, image, onPress, onWishlistPress, wishlistActive }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />
           {/* Heart icon for wishlist functionality */}
      <TouchableOpacity onPress={onWishlistPress} style={styles.heartIcon}>
        <Icon name={wishlistActive ? 'heart' : 'heart-outline'} size={22} color="#e63946" />
      </TouchableOpacity> 
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{subtitle}</Text>
        <Text style={styles.price}>€{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    minWidth: 160,
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
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
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
