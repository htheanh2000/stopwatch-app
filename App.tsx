
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import * as Screens from './src/screens'
const App = () => {
  return (
    <SafeAreaProvider>
      <Screens.Stopwatch></Screens.Stopwatch>
    </SafeAreaProvider>
  );
};

export default App;
