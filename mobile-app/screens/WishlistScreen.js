import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';

const WishlistScreen = ({ wishlist = [], toggleWishlist, navigation }) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Wishlist</Text>
    <ScrollView contentContainerStyle={styles.cardContainer}>
      <View style={styles.row}>
        {wishlist.length === 0 && (
          <Text style={styles.empty}>Je wishlist is leeg.</Text>
        )}
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            subtitle={product.smallDescription}
            price={product.price}
            image={product.image}
            onPress={() =>
              navigation.navigate('Shop', {
                screen: 'Details',
                params: { product }
              })
            }
            wishlistActive={true}
            onWishlistPress={() => toggleWishlist(product)}
          />
        ))}
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  heading: {
    fontFamily: 'Golos-Bold',
    fontSize: 44,
    marginTop: 64,
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  empty: {
    fontSize: 18,
    color: '#888',
    fontFamily: 'Golos-Regular',
    marginTop: 40,
  },
});

export default WishlistScreen;