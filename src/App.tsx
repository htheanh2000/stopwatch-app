
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from '@/navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
const App = () => {
  return (
    <SafeAreaProvider >
      <NavigationContainer>
        <MainTab/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
