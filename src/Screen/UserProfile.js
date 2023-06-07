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
const logoutIcon = require('../assets/Image/logOut.png');
const width = Dimensions.get('window').width;

import {UserContext} from './CommunityApp';
import axios from 'axios';

const UserProfile = props => {
  // return <Text>Hello</Text>;

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
  const Left = () => (
    <View style={styles.headerView}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => props.navigation.goBack()}>
        <Image style={{height: 20, width: 30, padding: 20}} source={backIcon} />
      </TouchableOpacity>
      {/* <View style={styles.headerTextView}>
        <Text style={styles.headerText}>User Profile</Text>
      </View> */}
    </View>
  );
  return (
    <>
      {/* <Left /> */}
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameContainerText}>
              {usersDetails.name.charAt(0)}
            </Text>
          </View>
          <View style={{margin: 16, width: '60%'}}>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                marginBottom: 5,
                fontFamily: 'Poppins',
                fontWeight: 700,
              }}>
              {usersDetails.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#000',
                opacity: 0.4,
                fontFamily: 'Poppins',
                fontWeight: 500,
              }}>
              {usersDetails.phoneNo}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 25,
          }}
          onPress={logOut}>
          <Image source={logoutIcon} style={{marginLeft: 20}} />
          <View style={styles.button}>
            <Text style={styles.buttonText}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  buttonText: {
    color: '#000',
    fontFamily: 'Poppins',
    fontWeight: 500,
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
  button: {
    marginHorizontal: 11,
  },
  touchable: {alignSelf: 'flex-start'},
  nameContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginRight: ,
  },
  nameContainerText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
});
