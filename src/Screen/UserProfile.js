import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const backIcon = require('../assets/Image/back_icon.png');
const width = Dimensions.get('window').width;

import {UserContext} from './CommunityApp';
import axios from 'axios';

const UserProfile = props => {
  const {userDetails, setUserDetails} = useContext(UserContext);
  const [usersDetails, setUsersDetails] = useState({
    name: '',
    phoneNo: '',
    address: '',
    groupId: '',
    userId: '',
  });

  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = async () => {
    const jsonValue = await AsyncStorage.getItem('@user_details');
    const userDetails = JSON.parse(jsonValue);
    setUsersDetails({
      ...userDetail,
      name: userDetails['name'],
      phoneNo: userDetails['phoneNo'],
      address: userDetails['address'],
      groupId: userDetails['groupId'],
      userId: userDetails['userId'],
    });
  };

  const logOut = async () => {
    const user = {
      name: '',
      phoneNo: '',
      address: '',
      groupId: '',
      userId: '',
    };
    setUsersDetails(user);
    await AsyncStorage.removeItem('@user_details');
    setUserDetails({});
  };

  const alertHistory = () => {
    console.log('hgjyhghgkjhkjhkljlkjlkj', usersDetails);

    axios
      .post('http://13.233.123.182:4000/api/v1/alert/fetchAllAlerts', {
        userId: usersDetails.userId,
      })
      .then(res => {
        console.log(res.data.data);
        props.navigation.navigate('History', {alertHistory: res.data.data});
      });
  };

  const Left = () => (
    <View style={styles.headerView}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => props.navigation.goBack()}>
        <Image style={{height: 20, width: 30, padding: 20}} source={backIcon} />
      </TouchableOpacity>
      <View style={styles.headerTextView}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>
    </View>
  );

  return (
    <>
      <Left />
      <SafeAreaView style={styles.container}>
        <View style={{flex: 0.9, margin: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 60, color: '#000'}}>
            {usersDetails.name}{' '}
          </Text>
          <Text style={{fontSize: 15, color: '#000'}}>
            {usersDetails.phoneNo}
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={alertHistory}>
            <Text style={styles.buttonText}>Alert History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={logOut}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 154,
    height: 40,
    margin: 10,
    backgroundColor: '#F80103',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  headerTextView: {
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: width / 4.2,
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  touchable: {alignSelf: 'flex-start'},
});
