import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityLogin from './CommunityLogin';
import AlertButton from './AlertButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const CommunityApp = () => {
  const [isLoading, setLoading] = useState(true);
  const [isUserAlreadyLoggedIn, setIsUserAlreadyLoggedIn] = useState(false);
  useEffect(() => {
    loggedIn();
  }, []);

  const loggedIn = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_details');
      const userDetails = JSON.parse(jsonValue);

      if (userDetails && Object.keys(userDetails).length > 0) {
        setIsUserAlreadyLoggedIn(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      return false;
    }
  };

  console.log('isUserAlreadyLoggedIn', isUserAlreadyLoggedIn);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <NavigationContainer>
          {isUserAlreadyLoggedIn ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Button"
                component={AlertButton}
                options={{gestureEnabled: false, headerShown: false}}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={CommunityLogin}
                options={{
                  headerTitle: 'Register',
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    fontFamily: 'Poppins-Bold',
                    fontSize: 25,
                  },
                  headerStyle: {
                    backgroundColor: '#DBDBDB',
                  },
                }}
              />
              <Stack.Screen
                name="Button"
                component={AlertButton}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
};

export default CommunityApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
