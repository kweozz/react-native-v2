import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import ProductCard from './ProductCard';
import { Picker } from '@react-native-picker/picker';
//hier staan al mijn categorieen
const categoryNames = {
  "": "All",
  "67d8627627222d6515eac4f1": "White Tea",
  "67d864b242f2d5d651e4c0db": "Black Tea",
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false); // Track Picker interaction
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  useEffect(() => {
    fetch('https://api.webflow.com/v2/sites/67b358f17af1e77acbdef54c/products', {
      headers: {
        Authorization: 'Bearer d075944cfe6d8779aeae94bf6a17e25ee464b3cc35bc8e83dd7284c7fbf0e6dd',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const mappedProducts = data.items.map((item) => ({
          id: item.product.id,
          title: item.product.fieldData.name,
          smallDescription: item.product.fieldData['small-description'],
          description: item.product.fieldData.description,
          price: item.skus[0]?.fieldData?.price?.value
            ? (item.skus[0].fieldData.price.value || 0) / 100
            : 0, // standaard 0 if undefined
          image: item.skus[0]?.fieldData['main-image']
            ? { uri: item.skus[0].fieldData['main-image'].url } //skus is een array, een variant van een product
            : null, 
          category: categoryNames[item.product.fieldData.category?.[0]] || "Unknown",
        }));
  
        setProducts(mappedProducts);
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  const filteredProducts = products
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    //localeCompare is used for string comparison, it compares two strings in the current locale. 
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Tea's</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Zoek een model..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          onFocus={() => setIsPickerOpen(true)} // Set flag when Picker is focused
          onBlur={() => setIsPickerOpen(false)} // Reset flag when Picker loses focus
          style={styles.picker}
        >
          <Picker.Item label="Alle categorieën" value="" />
          {[...new Set(products.map((p) => p.category))].map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>

      {/* Sorting Dropdown */}
      <View style={styles.sortContainer}>
        <Picker
          selectedValue={sortOption}
          onValueChange={(itemValue) => setSortOption(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Prijs oplopend" value="price-asc" />
          <Picker.Item label="Prijs aflopend" value="price-desc" />
          <Picker.Item label="Naam A-Z" value="name-asc" />
          <Picker.Item label="Naam Z-A" value="name-desc" />
        </Picker>
      </View>

      {/* Product List */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <View style={styles.row}>
          {sortedProducts.map((product) => (
           <ProductCard
           key={product.id}
           title={product.title}
           subtitle={product.smallDescription}
           price={product.price}
           image={product.image}
           onPress={() => navigation.navigate('Details', { product })}
         />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginTop: 64,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
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
  searchContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  sortContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;