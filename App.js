import React, {useEffect} from 'react';

import {SafeAreaView, StyleSheet, View} from 'react-native';

import CommunityApp from './src/Screen/CommunityApp';

import {RequestUserPermission} from './src/Helper/RequestUserPermission';

const App = () => {
  useEffect(() => {
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
