import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProductCard from './ProductCard';
import teaImage from '../assets/tea1.png';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProductCard
        title="Green Tea"
        subtitle="Refreshing and healthy"
        price="12.99"
        image={teaImage}
        //onPress={() => navigation.navigate('Details', { product: { title: 'Green Tea', subtitle: 'Refreshing and healthy', price: '12.99', image: teaImage } })}
      />
      <ProductCard
        title="Black Tea"
        subtitle="Strong and bold"
        price="14.99"
        image={teaImage}
        //onPress={() => navigation.navigate('Details', { product: { title: 'Black Tea', subtitle: 'Strong and bold', price: '14.99', image: teaImage } })}
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
    padding: 10,
  },
});

export default HomeScreen;