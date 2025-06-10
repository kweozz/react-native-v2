import React from 'react';
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
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#222020',
          tabBarInactiveTintColor: 'gray',
        })}
      >
      {/* Define the screens for the bottom tab navigator */}
        <Tab.Screen name="Home" component={LandingPage} options={{ headerShown: false }} /> 
        <Tab.Screen name="Shop" component={ShopStack} options={{ headerShown: false }} />
        <Tab.Screen name="Blog" component={BlogStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;