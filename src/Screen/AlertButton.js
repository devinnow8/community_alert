import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View,
  BackHandler,
} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import React, {useContext, useEffect, useState} from 'react';
const alertImage = require('../assets/Image/Alert_Button.png');
const profileIcon = require('../assets/Image/profile_icon.png');
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {UserContext} from './CommunityApp';

const AlertButton = props => {
  const {userDetails, setUserDetails} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    userDetail();

    configurePushNotifications();

    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const configurePushNotifications = () => {
    // Configure notification channels (Android only)
    PushNotification.createChannel(
      {
        channelId: 'sound_channel', // Replace with your desired channel ID
        channelName: 'CommunityAlert', // Replace with your desired channel name
        soundName: 'firealarm.wav', // Replace with the name of your custom sound file
        importance: 4, // Set the importance level (0 - 4)
        vibrate: true, // Enable vibration
      },
      created => {
        console.log(`Channel 'custom-channel-id' created: ${created}`);
      },
    );
    // Initialize push notification library
    PushNotification.configure({
      onNotification: notification => {
        console.log('Received notification:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
      soundName: 'firealarm.wav', // Replace with the name of your custom sound file
      playSound: true, // Enable sound for notifications
      soundName: 'default', // Set the default sound for iOS (optional)
    });
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener('notification', notification => {
        console.log('Received iOS notification:', notification);
      });
    }
  };

  const userDetail = async () => {
    // const jsonValue = await AsyncStorage.getItem('@user_details');
    // const userDetails = JSON.parse(jsonValue);
    // console.log('22222', userDetails['groupId']);
    // setUsersDetails(userDetails);
    if (userDetails && Object.keys(userDetails).length > 0) {
      const ID = userDetails['groupId'];
      console.log('ID', ID.toString());
      subscribeTopic(ID);
    }
  };
  const subscribeTopic = async ID => {
    console.log('subscribeTopic', ID);
    messaging()
      .subscribeToTopic(ID)
      .then(() => console.log('Subscribed to topic!', ID))
      .catch(err => console.log(err));
    setIsLoading(false);
  };

  const unSubscribeTopic = async ID => {
    messaging()
      .unsubscribeFromTopic(ID)
      .then(() => console.log('Unsubscribed fom the topic!', ID));
  };

  const sendNotification = async () => {
    const jsonValue = await AsyncStorage.getItem('@user_details');
    const userDetails = JSON.parse(jsonValue);
    const ID = userDetails['groupId'];
    const Name = userDetails['name'];
    const Address = userDetails['address'];
    unSubscribeTopic(ID);
    await axios
      .post('http://13.233.123.182:4000/api/v1/alert/all', {
        groupId: ID,
        name: Name,
        address: Address,
      })
      .then(res => {
        console.log('Response ====>', res);
        subscribeTopic(ID);
      })
      .catch(err => {
        console.log('Something went wrong2', err);
      });
  };

  const profileHandler = () => {
    props.navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" alignSelf="center" />
      ) : (
        <View>
          <View>
            <TouchableOpacity onPress={() => profileHandler()}>
              <Image
                source={profileIcon}
                style={{
                  height: 60,
                  width: 60,
                  alignSelf: 'flex-end',
                  marginRight: 15,
                  marginTop: 15,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View style={styles.viewButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => sendNotification()}>
                <Image source={alertImage} resizeMode="contain" />
              </TouchableOpacity>
              <Text style={styles.text}>
                Push the button to send SOS Alert in case of any emergency
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AlertButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  viewButton: {
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

    fontFamily: 'Poppins-Bold',
    lineHeight: 28,
    color: '#000000',
  },
});
