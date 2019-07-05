import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../common/colors';
import Input from './Input';

const BasicLogin = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const isValid = username.length > 0 && password.length > 0;
  const onChangeUsername = useCallback(username => setUsername(username), []);
  const onChangePassword = useCallback(password => setPassword(password), []);
  const onChangeCode = useCallback(code => setCode(code), []);
  const onPress = () => props.onSubmit(username, password, code);
  const passwordInputRef = useRef();
  const onUsernameSubmitEditting = useCallback(
    () => passwordInputRef.current.focus(),
    [passwordInputRef]
  );

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.signinText}>Sign in into your GitHub account</Text>
      <Input
        autoCapitalize={'none'}
        autoCorrect={false}
        blurOnSubmit={false}
        containerStyle={{ marginBottom: 20 }}
        editable={!props.requires2FA}
        onChangeText={onChangeUsername}
        onSubmitEditing={onUsernameSubmitEditting}
        placeholder={'Username'}
        returnKeyType={'next'}
        selectTextOnFocus={true}
      />
      <Input
        containerStyle={{ marginBottom: 20 }}
        editable={!props.requires2FA}
        onChangeText={onChangePassword}
        placeholder={'Password'}
        ref={passwordInputRef}
        returnKeyType={'done'}
        secureTextEntry
        selectTextOnFocus={true}
      />
      {props.requires2FA && (
        <Input
          containerStyle={{ marginBottom: 20 }}
          onChangeText={onChangeCode}
          placeholder={'2FA Code'}
          ref={passwordInputRef}
          returnKeyType={'done'}
          secureTextEntry
          selectTextOnFocus={true}
        />
      )}
      <TouchableOpacity
        disabled={!isValid}
        onPress={onPress}
        style={[styles.touchable, isValid ? null : styles.touchableDisabled]}
      >
        <Text style={styles.touchableText}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    marginVertical: 10,
    padding: 10,
  },
  signinText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  touchable: {
    backgroundColor: Colors.blue,
    borderRadius: 22.5,
    height: 45,
    justifyContent: 'center',
  },
  touchableDisabled: {
    backgroundColor: Colors.gray,
  },
  touchableText: {
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: 'System',
    fontSize: 16,
  },
});

export default BasicLogin;
