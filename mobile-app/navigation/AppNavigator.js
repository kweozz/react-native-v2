import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Importeer je schermen
import HomeScreen from '../components/HomeScreen';
import ProductDetails from '../components/ProductDetails';
import BlogScreen from '../components/BlogScreen'; // Importeer je BlogScreen component
import LandingPage from '../components/LandingPage'; // Importeer je LandingPage component


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Shop"
        component={HomeScreen}
        options={{ headerShown: false }} // Hide the header for the HomeScreen
      />
      <Stack.Screen
        name="Details"
        component={ProductDetails} // only show the back arrow when navigating to this screen, not the name
        options={({ route }) => ({
          title: route.params.product.title, // Show the product title in the header
          headerBackTitleVisible: false, // Hide the back button text
          //  FONTSIZE 44 
          headerStyle: {
            backgroundColor: '#fff', // Change the header background color to match your theme
            shadowColor: 'transparent', // Remove the shadow on iOS
            elevation: 0, // Remove the shadow on Android
            height: 200, // Set the height of the header
            display: 'flex', // Ensure the header is displayed
          },
          headerTitleStyle: {
            fontSize: 40, // Change the font size of the title
            color: '#222020', // Change the title color to match your theme
            fontWeight: 'bold', // Make the title bold
            textTransform: 'uppercase', // Make the title uppercase
          },
          //back arrow size
          headerBackImage: () => (
            <Icon name="arrow-back" size={40} color="#222020" /> // Change the back arrow icon size and color
          ),
        
        })}
       
      />
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
            } else if (route.name === 'Blog') {
              iconName = focused ? 'book' : 'book-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#222020',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={LandingPage} options={{ headerShown: false }} />
        <Tab.Screen name="Shop" component={ShopStack} options={{ headerShown: false }} />
        <Tab.Screen name="Blog" component={BlogScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;