import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductCard from './components/ProductCard';
import teaImage from './assets/tea1.png';

export default function App() {
  return (
    <View style={styles.container}>
      <ProductCard
        title="Product Title"
        subtitle="Product Subtitle"
        price="99.99"
        image={teaImage}
        onPress={() => alert('Product Details')}
      />
      <ProductCard
        title="Product Title"
        subtitle="Product Subtitle"
        price="99.99"
        image={teaImage}
        onPress={() => alert('Product Details')}
      />
      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
});