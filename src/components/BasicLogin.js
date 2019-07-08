import React, { useCallback, useReducer, useRef } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../common/colors';
import { getOrCreateAuthorization } from '../api/authorization';
import Input from './Input';

const UsernameAndPasswordInput = props => {
  const passwordInputRef = useRef();
  const onUsernameSubmitEditting = useCallback(
    () => passwordInputRef.current.focus(),
    []
  );

  return (
    <>
      <Input
        autoCapitalize={'none'}
        autoCorrect={false}
        blurOnSubmit={false}
        containerStyle={{ marginBottom: 20 }}
        onChangeText={props.onUsernameChangeText}
        onSubmitEditing={onUsernameSubmitEditting}
        placeholder={'Username or email address'}
        returnKeyType={'next'}
        selectTextOnFocus={true}
      />
      <Input
        containerStyle={{ marginBottom: 20 }}
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
      keyboardType={'numeric'}
      onChangeText={props.onCodeChangeText}
      placeholder={'Authentication code'}
      returnKeyType={'done'}
      secureTextEntry
      selectTextOnFocus={true}
    />
  ) : null;

const initialState = {
  code: '',
  error: '',
  inProgress: false,
  password: '',
  requiresCode: false,
  username: '',
};

const reducer = (state, action) => {
  const { type, ...rest } = action;
  switch (type) {
    case 'error':
      return { ...state, ...rest, inProgress: false };
    case 'progress':
      return { ...state, ...rest, error: '' };
    case 'password':
    case 'username':
      return { ...state, ...rest, code: '', requiresCode: false };
    default:
      return { ...state, ...rest };
  }
};

const BasicLogin = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onPress = useCallback(() => {
    Keyboard.dismiss();
    dispatch({ type: 'progress', inProgress: true });
    (async () => {
      let response;
      try {
        response = await getOrCreateAuthorization(
          state.username,
          state.password,
          state.code
        );
        dispatch({ type: 'progress', inProgress: false });
      } catch (_) {
      } finally {
        dispatch({ type: 'error', message: 'Errored, please try again...' });
      }
      if (response == null) {
        return;
      }
      if (response.ok) {
        props.onAuthorizationComplete();
      } else if (response.headers.has('x-github-otp')) {
        dispatch({ requiresCode: true });
      } else if (response.message) {
        dispatch({ type: 'error', message: response.message });
      }
    })();
  }, [props, state.code, state.password, state.username]);
  const isValid =
    state.username.length > 0 &&
    state.password.length > 0 &&
    (!state.requiresCode || state.code.length > 0);

  return (
    <View style={styles.loginContainer}>
      <UsernameAndPasswordInput
        onPasswordChangeText={text =>
          dispatch({ type: 'password', password: text })
        }
        onUsernameChangeText={text =>
          dispatch({ type: 'password', username: text })
        }
        requiresCode={state.requiresCode}
      />
      <CodeInput
        isRequired={state.requiresCode}
        onCodeChangeText={text => dispatch({ code: text })}
      />
      <TouchableOpacity
        disabled={!isValid}
        onPress={onPress}
        style={[styles.touchable, isValid ? null : styles.touchableDisabled]}
      >
        <Text style={styles.touchableText}>
          {state.inProgress ? 'Signing in...' : 'Sign in to GitHub'}
        </Text>
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
    borderRadius: 5,
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
