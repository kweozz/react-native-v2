import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ProductCard from './ProductCard';
import { Picker } from '@react-native-picker/picker';

const categoryNames ={
  "" : "All",
  "67d8627627222d6515eac4f1" : "White Tea",
  "67d864b242f2d5d651e4c0db" : "Black Tea",
}
const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch('https://api.webflow.com/v2/sites/67b358f17af1e77acbdef54c/products', {
      headers: {
        Authorization: 'Bearer d075944cfe6d8779aeae94bf6a17e25ee464b3cc35bc8e83dd7284c7fbf0e6dd',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            smallDescription: item.product.fieldData['small-description'],
            description: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData.price.value || 0) / 100,
            image: { uri: item.skus[0]?.fieldData['main-image']?.url },
            category: categoryNames[item.product.fieldData.category [0]] || "Unknown",
          }))
        );
      })
      .catch((err) => console.error('Error:', err));
  }, []);
 const filteredProducts = selectedCategory ? products.filter(p => p.category === selectedCategory) : products;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Our Teas</Text>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          subtitle={product.smallDescription}
          price={product.price}
          image={product.image}
          onPress={() => navigation.navigate('Details', { product })}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: '100%',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    margin: 10,
    width: '100%',
    textAlign: 'center',
  },
});

export default HomeScreen;