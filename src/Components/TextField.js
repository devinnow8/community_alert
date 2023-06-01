import {StyleSheet, Text, View, TextInput, Platform} from 'react-native';
import React, {forwardRef} from 'react';

const TextField = forwardRef(({error, onFocus = () => {}, ...props}, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={[styles.textView, {...props.fieldStyle}]}>
      <TextInput
        ref={ref}
        {...props}
        style={[
          {...styles.textFieldStyle},
          {
            borderColor: isFocused ? 'red' : '#BCBCBC',
            fontSize: Platform.OS === 'ios' ? 20 : 15,
          },
        ]}
        autoCorrect={false}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
});

export default TextField;

const styles = StyleSheet.create({
  textFieldStyle: {
    color: '#000',
  },
  textView: {
    height: 45,
    borderWidth: 1,
    borderColor: '#BCBCBC',
    marginBottom: 16,
    borderRadius: 5,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    paddingLeft: 10,
  },
});
