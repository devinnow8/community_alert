import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityLogin from './CommunityLogin';
import AlertButton from './AlertButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from './UserProfile';
import AlertHistory from './AlertHistory';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const UserContext = createContext({});

function Root() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <UserProfile {...props} />}>
      {/* <Drawer.Screen name="Profile" component={UserProfile} /> */}
      <Drawer.Screen
        name="Button"
        component={AlertButton}
        options={{gestureEnabled: false, headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

const CommunityApp = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setLoading] = useState(true);

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
                  name="Root"
                  component={Root}
                  // name="Button"
                  // component={AlertButton}
                  options={{gestureEnabled: false, headerShown: false}}
                />
                {/* <Stack.Screen
                  name="Profile"
                  component={UserProfile}
                  options={{
                    headerShown: false,
                  }}
                /> */}
                <Stack.Screen
                  name="History"
                  component={AlertHistory}
                  options={{headerShown: false}}
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
