// Importeer React en benodigde navigatiecomponenten
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Importeer je schermen (pages)
import HomeScreen from '../screens/HomeScreen';
import ProductDetails from '../screens/ProductDetails';
import BlogScreen from '../screens/BlogScreen';
import LandingPage from '../screens/LandingPage';
import BlogDetails from '../screens/BlogDetails';
import WishlistScreen from '../screens/WishlistScreen';
import AboutScreen from '../screens/AboutScreen';

// Maak navigators aan
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ShopStack is een stack navigator voor de Shop tab
const ShopStack = ({ wishlist, toggleWishlist }) => (
  <Stack.Navigator>
    {/* HomeScreen krijgt props mee via render-functie */}
    <Stack.Screen
      name="ShopHome"
      options={{ headerShown: false }}
    >
      {props => (
        <HomeScreen
          {...props}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      )}
    </Stack.Screen>
    {/* Details scherm voor producten */}
    <Stack.Screen
      name="Details"
      component={ProductDetails}
      options={({ route }) => ({
        // Haal de titel uit de route params (props)
        title: route.params.product.title,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          elevation: 0,
          height: 160,
        },
        headerTitleStyle: {
          fontSize: 40,
          color: '#222020',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontFamily: 'Golos-Bold',
        },
        headerBackImage: () => (
          <Icon name="arrow-back" size={40} color="#222020" />
        ),
      })}
    />
  </Stack.Navigator>
);

// BlogStack is een stack navigator voor de Blog tab
const BlogStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BlogHome"
      component={BlogScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="BlogDetails"
      component={BlogDetails}
      options={{
        title: 'Blog Details',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          elevation: 0,
          height: 160,
        },
        headerTitleStyle: {
          fontSize: 40,
          color: '#222020',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontFamily: 'Golos-Bold',
        },
        headerBackImage: () => (
          <Icon name="arrow-back" size={40} color="#222020" />
        ),
      }}
    />
  </Stack.Navigator>
);

// Hoofdcomponent voor navigatie
const AppNavigator = () => {
  // State voor wishlist (array van producten)
  const [wishlist, setWishlist] = useState([]);
// een state is een manier om gegevens op te slaan die kunnen veranderen in je component
  // wishlist is een array die de producten bevat die de gebruiker aan zijn/haar wishlist heeft toegevoegd$
  // setWishlist is een functie die gebruikt wordt om de wishlist state bij te werken
  
  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.find((p) => p.id === product.id)   // Check of product al in wishlist zit (via .find).
        ? prev.filter((p) => p.id !== product.id) // Als het product er al in zit, verwijder het
        : [...prev, product] // Anders voeg het toe
    );
  };

//[...] (spread syntax) zorgt voor immutabiliteit — je maak een nieuwe array zonder de oude muteren.
  // Dit is belangrijk in React om te zorgen dat de UI correct wordt bijgewerkt. Immutabiliteit betekent dat ik de originele data niet verander, maar een kopie maak met aanpassingen. In React is dit belangrijk omdat React dan goed ziet dat er iets veranderd is, en zo de juiste componenten opnieuw rendert

  return (
    <NavigationContainer>
      {/* Tab navigator voor de hoofdnavigatie */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // Kies het juiste icoon op basis van de tab naam
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Shop') iconName = focused ? 'cart' : 'cart-outline';
            else if (route.name === 'Blog') iconName = focused ? 'book' : 'book-outline';
            else if (route.name === 'Wishlist') iconName = focused ? 'heart' : 'heart-outline';
            else if (route.name === 'About') iconName = focused ? 'information-circle' : 'information-circle-outline';
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#222020',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {/* LandingPage als Home tab */}
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {props => <LandingPage {...props} />}
        </Tab.Screen>
        {/* About tab */}
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{ headerShown: false }}
        />
        {/* Shop tab met ShopStack */}
        <Tab.Screen
          name="Shop"
          options={{ headerShown: false }}
        >
          {props => (
            <ShopStack
              {...props}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          )}
        </Tab.Screen>
        {/* Wishlist tab */}
        <Tab.Screen
          name="Wishlist"
          options={{ headerShown: false }}
        >
          {props => (
            <WishlistScreen
              {...props}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          )}
        </Tab.Screen>
        {/* Blog tab met BlogStack */}
        <Tab.Screen
          name="Blog"
          component={BlogStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
