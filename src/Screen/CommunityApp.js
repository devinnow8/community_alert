import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityLogin from './CommunityLogin';
import AlertButton from './AlertButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from './UserProfile';
// import {useContext} from 'react';

const Stack = createNativeStackNavigator();

export const UserContext = createContext({});

const CommunityApp = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setLoading] = useState(true);
  // const [isUserAlreadyLoggedIn, setIsUserAlreadyLoggedIn] = useState(false);
  useEffect(() => {
    loggedIn();
  }, []);

  const loggedIn = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_details');
      if (jsonValue !== null) {
        const userDetails1 = JSON.parse(jsonValue);
        if (userDetails1 && Object.keys(userDetails1).length > 0) {
          setUserDetails(userDetails1);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (e) {
      return false;
    }
  };
  return (
    <UserContext.Provider
      value={{userDetails: userDetails, setUserDetails: setUserDetails}}>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <NavigationContainer>
            {userDetails && Object.keys(userDetails).length > 0 ? (
              <Stack.Navigator>
                <Stack.Screen
                  name="Button"
                  component={AlertButton}
                  options={{gestureEnabled: false, headerShown: false}}
                />
                <Stack.Screen name="Profile" component={UserProfile} />
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
              </Stack.Navigator>
            )}
          </NavigationContainer>
        )}
      </SafeAreaView>
    </UserContext.Provider>
  );
};

export default CommunityApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
