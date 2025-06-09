import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

const ProductList = ({ products, onProductPress }) => (
  <ScrollView contentContainerStyle={styles.cardContainer}>
    <View style={styles.row}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          subtitle={product.smallDescription}
          price={product.price}
          image={product.image}
          onPress={() => onProductPress(product)}
        />
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
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
});

export default ProductList;