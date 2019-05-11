import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { getOrCreateAuthorization } from '../api/authorization';
import BasicLogin from '../components/BasicLogin';
import InProgress from '../components/InProgress';

const Authorization = props => {
  const [inProgress, setInProgress] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const onSubmit = useCallback(
    (username, password, code) => {
      (async () => {
        setInProgress(true);
        let response;
        try {
          response = await getOrCreateAuthorization(username, password, code);
        } catch (error) {
        } finally {
          setInProgress(false);
        }
        if (response && response.ok) {
          props.navigation.navigate('Search');
        } else if (response.headers.has('x-github-otp')) {
          setRequires2FA(true);
        }
      })();
    },
    [props.navigation]
  );

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
        <BasicLogin onSubmit={onSubmit} requires2FA={requires2FA} />
      </KeyboardAvoidingView>
      {inProgress && <InProgress />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  basicLoginContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Authorization;
