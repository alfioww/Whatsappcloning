import React from 'react';
import { TextInput, View, Text } from 'react-native';


const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { containerStyle, inputStyle, labelStyle } = styles;

  return (
      <View style={containerStyle}>
        <Text style={labelStyle}> {label}</Text>

            <TextInput
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              style={inputStyle}
              value={value}
              onChangeText={onChangeText}
              placeholderTextColor= "#075E54"
            />
      </View>
  );
};

const styles = {
  inputStyle: {
    color: 'white',
    borderColor: '#007aff',
    borderWidth: 1,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2

  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 10,
    flex: 1,
    color: 'white'
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

  }
};

export { Input };
