import React, { useCallback, useReducer, useRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { getOrCreateAuthorization } from '../api/authorization';
import Colors from '../common/colors';
import Input from '../components/Input';
import PopoverText from '../components/PopoverText';

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

const basicLoginInitialState = {
  code: '',
  message: '',
  inProgress: false,
  password: '',
  requiresCode: false,
  username: '',
};

const basicLoginReducer = (state, action) => {
  const { type, ...rest } = action;
  switch (type) {
    case 'error':
      return { ...state, ...rest, inProgress: false };
    case 'progress':
      return { ...state, ...rest, message: '' };
    case 'password':
    case 'username':
      return { ...state, ...rest, code: '', requiresCode: false };
    default:
      return { ...state, ...rest };
  }
};

const BasicLogin = props => {
  const [state, dispatch] = useReducer(
    basicLoginReducer,
    basicLoginInitialState
  );
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
      } catch (error) {
        dispatch({
          type: 'error',
          message: 'sorry, please try again later...',
        });
      }

      if (response.ok) {
        props.onAuthorizationComplete();
      } else if (!state.requiresCode && response.headers.has('x-github-otp')) {
        dispatch({ requiresCode: true });
      } else {
        const { message } = await response.json();
        // Two-factor authentication failed.
        // Incorrect username or password.
        message && dispatch({ type: 'error', message: message.toLowerCase() });
      }
    })();
  }, [props, state.code, state.password, state.requiresCode, state.username]);
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
          dispatch({ type: 'username', username: text })
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
      <PopoverText>Incorrect username or password.</PopoverText>
    </View>
  );
};

const Authorization = () => {
  const { navigate } = useNavigation();
  const onAuthorizationComplete = useCallback(() => navigate('Search'), [
    navigate,
  ]);

  return (
    <ScrollView
      contentContainerStyle={styles.basicLoginContainer}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        {...Platform.select({
          android: {
            enabled: false,
          },
          ios: {
            behavior: 'padding',
          },
        })}
      >
        <BasicLogin onAuthorizationComplete={onAuthorizationComplete} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  basicLoginContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginContainer: {
    marginVertical: 10,
    padding: 10,
  },
  touchable: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    marginBottom: 20,
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

export default Authorization;
