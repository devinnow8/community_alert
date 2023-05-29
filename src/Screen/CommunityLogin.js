import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import axios from 'axios';
import TextField from '../Components/TextField';

const CommunityLogin = props => {
  const [detail, setDetail] = useState({
    name: '',
    phoneNo: '',
    address: '',
    groupId: '',
  });

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

  const handler = () => {
    if (
      detail.phoneNo.length === 10 &&
      detail.name !== '' &&
      detail.groupId.length === 4 &&
      detail.address !== ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onPressLogin = async () => {
    storeData(detail);
    await axios
      .post('http://13.233.123.182:4000/api/v1/auth/signup', {
        name: detail.name.trim(),
        groupId: detail.groupId.trim(),
        address: detail.address.trim(),
        phoneNo: detail.phoneNo.trim(),
        FCMToken: 123456789,
      })
      .then(res => {
        console.log('Response ====>', res);
        props.navigation.navigate('Button');
      })
      .catch(err => {
        console.log('Something went wrong1', err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.detail}>
            <Text style={styles.text}>Name*</Text>
            <TextField
              placeholder="Enter Name"
              placeholderTextColor="#BBBBBB"
              value={detail.name}
              onChangeText={val => {
                setDetail({...detail, name: val});
              }}
            />

            <Text style={styles.text}>Phone No.*</Text>
            <TextField
              maxLength={10}
              keyboardType="number-pad"
              placeholder="Enter Phone No."
              placeholderTextColor="#BBBBBB"
              value={detail.phoneNo}
              onChangeText={val => {
                let regex = /^[0-9]+$/;
                if (regex.test(val) || val === '') {
                  setDetail({...detail, phoneNo: val});
                }
              }}
            />

            <Text style={styles.text}>Address*</Text>
            <TextField
              placeholder="Enter House number, sector"
              placeholderTextColor="#BBBBBB"
              placeholderStyle={styles.somePlaceholderStyle}
              value={detail.address}
              onChangeText={val => {
                setDetail({...detail, address: val});
              }}
              fieldStyle={{
                ...styles.addText,
                alignItems: 'center',
              }}
              multiline
            />

            <Text style={styles.text}>Group ID*</Text>
            <TextField
              maxLength={4}
              keyboardType="number-pad"
              placeholder="Enter your group id shared by admin "
              placeholderTextColor="#BBBBBB"
              value={detail.groupId}
              onChangeText={val => {
                let regex = /^[0-9]+$/;
                if (regex.test(val) || val === '') {
                  setDetail({...detail, groupId: val});
                }
              }}
            />

            <TouchableOpacity
              disabled={handler()}
              style={[
                styles.button,
                {backgroundColor: handler() ? '#B6B6B6' : '#F80103'},
              ]}
              onPress={() => onPressLogin()}>
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CommunityLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  detail: {
    flex: 1,
    marginTop: 24,
  },
  text: {
    height: 22,
    fontSize: 16,
    fontWeight: 400,
    color: '#FE0003',
    marginBottom: 4,
  },

  textInput: {
    width: 330,
    height: 40,
    borderWidth: 1,
    paddingLeft: 11,
    borderColor: '#BCBCBC',
    borderRadius: 5,
    marginBottom: 16,
    paddingTop: 9,
    paddingBottom: 9,
    fontSize: 15,
    lineHeight: 20,
  },

  button: {
    width: 154,
    height: 40,
    marginTop: 30,
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
  addText: {
    height: 77,
  },
  somePlaceholderStyle: {
    color: 'red',
    fontSize: 30,
  },
});
