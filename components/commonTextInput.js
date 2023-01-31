import React from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';

export default function CommonTextInput({
  placeholder,
  label,
  onChange,
  onChangeText,
  value,
  secureTextEntry,
  autoCaps,
  editable,
  keyboardType,
  maxLength,
  editablestyle,
  type,
  textInputStyle,
  labelStyle,
  viewstyle
}) {
  return (
    <View style={[styles.mainstyle,viewstyle]}>
      <Text style={[styles.labelstyle,labelStyle]}>{label} </Text>
      <TextInput
        style={[styles.inputstyle, textInputStyle, editablestyle]}
        placeholder={placeholder}
        onChange={onChange}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCaps}
        editable={editable}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainstyle: {
    marginHorizontal: 20,
  },
  inputstyle: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    borderRadius: 8,
    paddingLeft: 8,
    fontSize: 16,
  },
  labelstyle: {
    color: 'grey',
    fontSize: 18,
    marginTop: 15,
    fontWeight: '400',
    fontStyle: 'normal',
  },
});
