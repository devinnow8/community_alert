import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const CommunityLogin = props => {
  const [detail, setDetail] = useState({
    name: '',
    phoneNo: '',
    address: '',
    groupID: '',
    error: '',
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
      detail.groupID.length === 4 &&
      detail.address !== ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onPressLogin = () => {
    storeData(detail);
    firestore()
      .collection(detail.groupID)
      .add({
        name: detail.name.trim(),
        groupID: detail.groupID.trim(),
        address: detail.address.trim(),
        phoneNo: detail.phoneNo.trim(),
      })
      .then(res => {
        props.navigation.navigate('Button');
      })
      .catch(err => {
        Alert.alert('Something went wrong', err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.text}>Name*</Text>
        <TextInput
          placeholder="Enter Name"
          value={detail.name}
          onChangeText={val => {
            setDetail({...detail, name: val});
          }}
          style={styles.textInput}
        />

        <Text style={styles.text}>Phone No.*</Text>

        <TextInput
          maxLength={10}
          keyboardType="number-pad"
          placeholder="Enter Phone No."
          value={detail.phoneNo}
          onChangeText={val => {
            setDetail({...detail, phoneNo: val});
          }}
          style={styles.textInput}
        />

        <Text style={styles.text}>Address*</Text>

        <TextInput
          placeholder="Enter House number, sector"
          value={detail.address}
          onChangeText={val => {
            setDetail({...detail, address: val});
          }}
          style={[styles.textInput, styles.addText]}
          multiline
        />

        <Text style={styles.text}>Group ID*</Text>

        <TextInput
          maxLength={4}
          keyboardType="number-pad"
          placeholder="Enter your group id shared by admin "
          value={detail.groupID}
          onChangeText={val => {
            setDetail({...detail, groupID: val});
          }}
          style={styles.textInput}
        />

        <Pressable
          disabled={handler()}
          style={[
            styles.button,
            {backgroundColor: handler() ? '#B6B6B6' : '#F80103'},
          ]}
          onPress={() => onPressLogin()}>
          <Text style={styles.buttonText}>Join</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CommunityLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  detail: {
    flex: 1,
    marginLeft: 34,
    marginRight: 34,
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
    width: 307,
    height: 40,
    borderWidth: 1,
    paddingLeft: 11,
    borderColor: '#BCBCBC',
    borderRadius: 5,
    marginBottom: 16,
    paddingTop: 9,
    paddingBottom: 9,
    fontSize: 16,
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
});
