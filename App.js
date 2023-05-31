import React, {useEffect} from 'react';

import {SafeAreaView, StyleSheet, View, Platform} from 'react-native';

import CommunityApp from './src/Screen/CommunityApp';

import {
  RequestUserPermission,
  requestNotificationPermission,
} from './src/Helper/RequestUserPermission';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
   Platform.OS==="ios"? RequestUserPermission(): requestNotificationPermission();
  
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: '#DBDBDB'}} />
      <CommunityApp />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
