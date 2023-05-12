import {SafeAreaView, StyleSheet, Text, Image, Pressable} from 'react-native';
import React from 'react';
const alertImage = require('../assets/Image/Alert_Button.png');

const AlertButton = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.button} onPress={() => console.log('Pressed')}>
        <Image style={styles.tinyLogo} source={alertImage} />
      </Pressable>
      <Text style={styles.text}>
        Push the button to send SOS Alert in case of any emergency
      </Text>
    </SafeAreaView>
  );
};

export default AlertButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 250,
    width: 250,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  text: {
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 20,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 28,
  },
  tinyLogo: {
    alignSelf: 'center',
  },
});
