import React, { useCallback, useReducer, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../common/colors';
import Input from './Input';

const reducer = (state, action) => ({ ...state, ...action });

const UsernameAndPasswordInput = props => {
  const passwordInputRef = useRef();
  const onUsernameSubmitEditting = useCallback(
    () => passwordInputRef.current.focus(),
    [passwordInputRef]
  );

  return (
    <>
      <Input
        autoCapitalize={'none'}
        autoCorrect={false}
        blurOnSubmit={false}
        containerStyle={{ marginBottom: 20 }}
        editable={!props.requires2FA}
        onChangeText={props.onUsernameChangeText}
        onSubmitEditing={onUsernameSubmitEditting}
        placeholder={'Username'}
        returnKeyType={'next'}
        selectTextOnFocus={true}
      />
      <Input
        containerStyle={{ marginBottom: 20 }}
        editable={!props.requires2FA}
        onChangeText={props.onPasswordChangeText}
        placeholder={'Password'}
        ref={passwordInputRef}
        returnKeyType={'done'}
        secureTextEntry
        selectTextOnFocus={true}
      />
    </>
  );
};

const CodeInput = props =>
  props.isRequired ? (
    <Input
      containerStyle={{ marginBottom: 20 }}
      onChangeText={props.onCodeChangeText}
      placeholder={'2FA Code'}
      returnKeyType={'done'}
      secureTextEntry
      selectTextOnFocus={true}
    />
  ) : null;

const BasicLogin = props => {
  const [{ code, password, username }, dispatch] = useReducer(reducer, {
    code: '',
    password: '',
    username: '',
  });
  const isValid = username.length > 0 && password.length > 0;
  const onPress = () => props.onSubmit(username, password, code);

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.signinText}>Sign in into your GitHub account</Text>
      <UsernameAndPasswordInput
        onPasswordChangeText={text => dispatch({ password: text })}
        onUsernameChangeText={text => dispatch({ username: text })}
        requires2FA={props.requires2FA}
      />
      <CodeInput
        isRequired={props.requires2FA}
        onCodeChangeText={text => dispatch({ code: text })}
      />
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
