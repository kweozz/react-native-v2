import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Importeer je schermen
import HomeScreen from '../components/HomeScreen';
import ProductDetails from '../components/ProductDetails';
import BlogScreen from '../components/BlogScreen'; // Importeer je BlogScreen component

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator voor de Shop-sectie
const ShopStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Shop" component={HomeScreen} />
      <Stack.Screen name="Details" component={ProductDetails} />
    </Stack.Navigator>
  );
};

// Bottom Tab Navigator
const AppNavigator = () => {
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
            }  else if (route.name === 'Blog') {
                iconName = focused ? 'book' : 'book-outline'; // Blog icon
              }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Shop" component={ShopStack} options={{ headerShown: false }} />
        <Tab.Screen name="Blog" component={BlogScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;