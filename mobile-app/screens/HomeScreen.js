import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CategoryPicker from '../components/CategoryPicker';
import SortPicker from '../components/SortPicker';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';

const categoryNames = {
  "": "All",
  "67d8627627222d6515eac4f1": "White Tea",
  "67d864b242f2d5d651e4c0db": "Black Tea",
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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
            : 0,
          image: item.skus[0]?.fieldData['main-image']
            ? { uri: item.skus[0].fieldData['main-image'].url }
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
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  // Verzamel unieke categorieën voor de picker
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Tea's</Text>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <CategoryPicker
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
        categories={uniqueCategories}
      />
      <SortPicker sortOption={sortOption} onSortChange={setSortOption} />
      <ProductList
        products={sortedProducts}
        onProductPress={(product) => navigation.navigate('Details', { product })}
      />
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
    fontFamily: 'Golos-Bold',
    fontSize: 44,
    marginTop: 64,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Golos-Regular',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    color: '#666',
  },
});

export default HomeScreen;