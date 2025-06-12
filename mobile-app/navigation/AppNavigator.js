import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ProductDetails from '../screens/ProductDetails';
import BlogScreen from '../screens/BlogScreen';
import LandingPage from '../screens/LandingPage';
import BlogDetails from '../screens/BlogDetails';
import WishlistScreen from '../screens/WishlistScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ShopStack = ({ wishlist, toggleWishlist }) => (
  <Stack.Navigator>
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
    <Stack.Screen
      name="Details"
      component={ProductDetails}
      options={({ route }) => ({
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


const AppNavigator = () => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
    setWishlist(prev =>
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
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {props => <LandingPage {...props} />}
        </Tab.Screen>

        {/* ✅ SHOP met stack, inclusief wishlist props */}
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

        {/* ✅ Wishlist krijgt props en navigeert correct naar Details in Shop */}
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
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
