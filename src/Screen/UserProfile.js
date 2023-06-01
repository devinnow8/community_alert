import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';
import {UserContext} from './CommunityApp';

const UserProfile = () => {
  //   const navigation = useNavigation();
  const {userDetails, setUserDetails} = useContext(UserContext);
  const [usersDetails, setUsersDetails] = useState({
    name: '',
    phoneNo: '',
    address: '',
    groupId: '',
  });

  useEffect(() => {
    userDetail();
  });

  const userDetail = async () => {
    const jsonValue = await AsyncStorage.getItem('@user_details');
    const userDetails = JSON.parse(jsonValue);
    setUsersDetails({
      ...userDetail,
      name: userDetails['name'],
      phoneNo: userDetails['phoneNo'],
      address: userDetails['address'],
      groupId: userDetails['groupId'],
    });
  };

  const storeData = async detail => {
    try {
      console.log('details', detail);
      const userDetails = JSON.stringify(detail);
      await AsyncStorage.setItem('@user_details', userDetails);
      console.log('userDetails', userDetails);
    } catch (e) {
      console.log('error', e);
    }
  };

  const logOut = async () => {
    const user = {
      name: '',
      phoneNo: '',
      address: '',
      groupId: '',
    };
    setUsersDetails(user);
    await AsyncStorage.removeItem('@user_details');
    setUserDetails({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.9, margin: 10}}>
        <Text style={{fontSize: 30, marginBottom: 10, color: '#000'}}>
          Name : {usersDetails.name}{' '}
        </Text>
        <Text style={{fontSize: 30, marginBottom: 10, color: '#000'}}>
          PhoneNo : {usersDetails.phoneNo}{' '}
        </Text>
        <Text style={{fontSize: 30, marginBottom: 10, color: '#000'}}>
          Address : {usersDetails.address}{' '}
        </Text>
        <Text style={{fontSize: 30, marginBottom: 10, color: '#000'}}>
          GroupId : {usersDetails.groupId}{' '}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#000',
          borderRadius: 10,
          margin: 10,
          backgroundColor: 'red',
        }}>
        <TouchableOpacity style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
            Alert History
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: 'center',
          margin: 10,
          borderWidth: 2,
          borderColor: '#000',
          borderRadius: 100,
          backgroundColor: 'red',
        }}>
        <TouchableOpacity style={{margin: 20}} onPress={() => logOut()}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
