import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ProductCard from './ProductCard';
import teaImage from '../assets/tea1.png';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Our Teas</Text>
      <ProductCard
        title="Green Tea"
        subtitle="Refreshing and healthy"
        price="12.99"
        image={teaImage}
        onPress={() => navigation.navigate('Details', { product: { title: 'Green Tea', subtitle: 'Refreshing and healthy', price: '12.99', image: teaImage } })}
      />
      <ProductCard
        title="Black Tea"
        subtitle="Strong and bold"
        price="14.99"
        image={teaImage}
        onPress={() => navigation.navigate('Details', { product: { title: 'Black Tea', subtitle: 'Strong and bold', price: '14.99', image: teaImage } })}
      />
      {/* Add more ProductCard components as needed */}
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