import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'; // Import ScrollView voor scrollbare inhoud

const ProductDetails = ({ route }) => {
  const { product } = route.params; // Haal het product op uit de route parameters
  // Controleer of het product bestaat

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product details are not available.</Text>
      </View>
    );
  }

  const [quantity, setQuantity] = useState(1); // deze functie werkt met de state van de hoeveelheid
  // Initialiseer de hoeveelheid op 1 
  // en zorg ervoor dat deze niet onder de 1 kan gaan
  // bij het laden van de pagina
  // en dat de gebruiker deze kan verhogen of verlagen
  // met de knoppen + en -.
  // De totale prijs wordt berekend op basis van de hoeveelheid en de prijs van het product

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = (quantity * parseFloat(product?.price || 0)).toFixed(2); // Default to 0 if price is undefined

  return (
    <ScrollView style={styles.container}>
      <Image source={product.image} style={styles.image} />
  
      <Text style={styles.subtitle}>{product.description}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalPrice}>Total: €{totalPrice}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222020',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222020',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222020',
  },
  button: {
    backgroundColor: '#222020',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProductDetails;