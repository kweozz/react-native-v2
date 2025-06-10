import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Importeer je schermen
import HomeScreen from '../screens/HomeScreen';
import ProductDetails from '../screens/ProductDetails';
import BlogScreen from '../screens/BlogScreen'; // Importeer je BlogScreen component
import LandingPage from '../screens/LandingPage'; // Importeer je LandingPage component
import BlogDetails from '../screens/BlogDetails';
import WishlistScreen from '../screens/WishlistScreen'; // Importeer je WishlistScreen component


const Tab = createBottomTabNavigator(); // Create a Bottom Tab Navigator for the main sections of the app
const Stack = createStackNavigator(); // Create a Stack Navigator for the Shop section


const ShopStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShopHome" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={ProductDetails}
        options={({ route }) => ({
          title: route.params.product.title,
          //back button add

          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            elevation: 0,
            height: 160,
            display: 'flex',
          },
          headerTitleStyle: {
            fontSize: 40,
            color: '#222020',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontFamily: 'Golos-Bold', // <-- hier!
          },
          headerBackImage: () => (
            <Icon name="arrow-back" size={40} color="#222020" />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const BlogStack = () => {
  return (
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
            display: 'flex',
          },
          headerTitleStyle: {
            fontSize: 40,
            color: '#222020',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontFamily: 'Golos-Bold', // <-- hier!
          },
          headerBackImage: () => (
            <Icon name="arrow-back" size={40} color="#222020" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
const AppNavigator = () => {
  // Zet de wishlist state hier, zodat je hem overal kunt gebruiken
  const [wishlist, setWishlist] = useState([]);

  // Toggle-functie voor wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Shop') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Blog') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Wishlist') {
              iconName = focused ? 'heart' : 'heart-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#222020',
          tabBarInactiveTintColor: 'gray',
        })}
      >
      {/* Define the screens for the bottom tab navigator */}
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {props => (
            <LandingPage {...props} />
          )}
        </Tab.Screen>
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
        <Tab.Screen
          name="Blog"
          component={BlogStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Wishlist"
          options={{
            tabBarLabel: 'Wishlist',
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart" color={color} size={size} />
            ),
            headerShown: false,
          }}
        >
          {props => (
            <WishlistScreen
              {...props}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;