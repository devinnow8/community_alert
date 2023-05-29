import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const TextField = ({error, onFocus = () => {}, ...props}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View>
      <TextInput
        {...props}
        style={[
          {...styles.textFieldStyle, ...props.fieldStyle},
          {
            borderColor: isFocused ? 'red' : '#BCBCBC',
            alignItems: 'center',
          },
        ]}
        autoCorrect={false}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
      />
      {error && (
        <Text
          style={{
            color: 'red',
            fontSize: 13,
            justifyContent: 'flex-start',
          }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  textFieldStyle: {
    width: 330,
    borderWidth: 1,
    paddingLeft: 11,
    borderColor: '#BCBCBC',
    borderRadius: 5,
    marginBottom: 16,
    textAlign: 'left',
    fontFamily: 'Jaldi-Regular',
    fontSize: 17,
    color: '#000000',
    textAlignVertical: 'top',
  },
});
