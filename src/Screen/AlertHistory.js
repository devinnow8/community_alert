import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
const backIcon = require('../assets/Image/back_icon.png');
const width = Dimensions.get('window').width;
const AlertHistory = props => {
  const history = props.route.params.alertHistory;
  const [displayData, setDisplayData] = useState(history);

  const Left = () => (
    <View style={styles.headerView}>
      <TouchableOpacity
        hitSlop={20}
        style={styles.touchable}
        onPress={() => props.navigation.goBack()}>
        <Image style={styles.backIcon} source={backIcon} resizeMode="contain" />
      </TouchableOpacity>
      <View style={styles.headerTextView}>
        <Text style={styles.headerText}>History</Text>
      </View>
      <View style={styles.touchable} />
    </View>
  );

  const RenderItem = items => {
    return (
      <View style={styles.outerView}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameContainerText}>
            {items?.item.name.charAt(0)}
          </Text>
        </View>
        <View style={styles.textView}>
          <View style={styles.nameDateView}>
            <Text style={styles.nameText}>{items?.item.name}</Text>
            <Text style={styles.date}>
              {moment(`${items.item.createdAt}`).format('DD MMM YY hh:mm A')}
            </Text>
          </View>
          <View>
            <Text style={styles.msgText}>{items?.item.notificationMsg}</Text>
            {/* <View style={{alignSelf: 'flex-end'}}>
              <Text style={{color: '#000'}}>
                {moment(`${items.item.createdAt}`).format('hh :mm A')}
              </Text>
            </View> */}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Left />
      <FlatList data={displayData.reverse()} renderItem={RenderItem} />
    </SafeAreaView>
  );
};

export default AlertHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  touchable: {},
  outerView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
  },
  nameContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  nameContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  nameContainerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  textView: {marginLeft: 10, width: '80%'},
  nameDateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nameText: {fontSize: 18, color: '#000'},
  msgText: {fontSize: 15, color: '#000'},
  date: {
    color: '#000',
  },
  headerView: {
    flexDirection: 'row',
    paddingTop: 19,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    // paddingLeft: 34,
  },

  backIcon: {height: 20, width: 10},
  headerTextView: {
    // alignSelf: 'center',
    // alignItems: 'center',
    // marginLeft: width / 4.2,
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
