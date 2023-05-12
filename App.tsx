import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';

import CommunityApp from './src/Screen/CommunityApp';

function App(): JSX.Element {
  console.log('hum');
  return (
    <SafeAreaView style={styles.container}>
      <CommunityApp />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
