import React, {useEffect} from 'react';

import {SafeAreaView, StyleSheet, View} from 'react-native';

import CommunityApp from './src/Screen/CommunityApp';

import {RequestUserPermission} from './src/Helper/RequestUserPermission';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    // SplashScreen.hide();
    RequestUserPermission();
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
