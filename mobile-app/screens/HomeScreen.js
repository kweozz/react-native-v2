import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import CategoryPicker from '../components/CategoryPicker';
import SortPicker from '../components/SortPicker';
import Search from '../components/Search';
import ProductCard from '../components/ProductCard';
import Icon from 'react-native-vector-icons/Ionicons'; // Voor het wishlist-icoon
import Button from '../components/Button';

const categoryNames = {
  "": "All",
  "67d8627627222d6515eac4f1": "White Tea",
  "67d864b242f2d5d651e4c0db": "Black Tea",
  "68422e818f346b6d0e57311d": "Green Tea"
};

const HomeScreen = ({ navigation, wishlist = [], toggleWishlist }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
// useEffect is een React Hook die code uitvoert bij het laden van het component (of als dependencies veranderen)
  useEffect(() => {
    fetch('https://api.webflow.com/v2/sites/67b358f17af1e77acbdef54c/products', {
      headers: {
        Authorization: 'Bearer d075944cfe6d8779aeae94bf6a17e25ee464b3cc35bc8e83dd7284c7fbf0e6dd',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // .map() is een array method om elk item om te zetten naar een nieuw object
        const mappedProducts = data.items.map((item) => ({
           // object destructuring: haalt velden uit het item object
          id: item.product.id,
          title: item.product.fieldData.name,
          smallDescription: item.product.fieldData['small-description'],
          description: item.product.fieldData.description,
          // Arrow function en ternary operator: als er een prijs is, deel door 100, anders 0
          price: item.skus[0]?.fieldData?.price?.value
            ? item.skus[0].fieldData.price.value / 100
            : 0,
          image: item.skus[0]?.fieldData['main-image']
            ? { uri: item.skus[0].fieldData['main-image'].url }
            : null,
          category: categoryNames[item.product.fieldData.category?.[0]] || "Unknown",
        }));
        setProducts(mappedProducts); // Zet de producten in de state
      })
      .catch((err) => console.error('Error:', err));
  }, []);
 // Filteren op categorie en zoekterm (array methods: .filter(), .includes())
  const filteredProducts = products
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  // Sorteren op prijs of naam (array method: .sort())
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const uniqueCategories = [...new Set(products.map((p) => p.category))]; 
// products.map((p) => p.category) maakt een array van alle categorieën van je producten.
//new Set(...) haalt de dubbele categorieën eruit, zodat je alleen unieke categorieën overhoudt.
//[...new Set(...)] gebruikt de spread-operator om de unieke categorieën uit de Set te halen en in een gewone array te stoppen.
// waarom maken we een nieuwe array? Omdat we de unieke categorieën willen gebruiken in de CategoryPicker component, die een array verwacht. 


  return (
    <View style={styles.container}>
            {/* Props doorgeven aan Search, CategoryPicker, SortPicker */}
      <Text style={styles.heading}>Our Tea's</Text>
      <Search value={searchQuery} onChange={setSearchQuery} />
      <CategoryPicker
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
        categories={uniqueCategories}
      />
      <SortPicker sortOption={sortOption} onSortChange={setSortOption} />

      {/* Wishlist-knop rechtsboven, toont het aantal producten in de wishlist */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
        {/* Wishlist-knop: props doorgeven aan Button, en Icon als child */}
        <Button
          title={`Wishlist (${wishlist.length})`}
          onPress={() => navigation.navigate('Wishlist')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#222020',
            fontSize: 12,
            paddingVertical: 6,
            paddingHorizontal: 16,
          }}
          textStyle={{ color: '#fff', fontFamily: 'Golos-Bold' }}
        >
          <Icon name="heart" size={20} color="#fff" style={{ marginRight: 6 }} />
        </Button>
      </View>
{/* ProductCard krijgt props: data, wishlistActive, onWishlistPress */}
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
              // Geef door of het product in de wishlist zit
              wishlistActive={wishlist.some((p) => p.id === product.id)} // array method: .some() is een boolean die aangeeft of er een product in de wishlist zit met dezelfde id
              // Geef de toggle functie door aan het hartje
              onWishlistPress={() => toggleWishlist(product)} // arrow function als prop
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
    fontFamily: 'Golos-Bold',
    fontSize: 44,
    marginTop: 64,
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: 20,
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
});

export default HomeScreen;
