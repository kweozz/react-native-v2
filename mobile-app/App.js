import React, { useEffect, useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Golos-Regular': require('./assets/fonts/GolosText-Regular.ttf'),
      'Golos-Bold': require('./assets/fonts/GolosText-Bold.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppNavigator />;
}