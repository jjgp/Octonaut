import React, { useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import BasicLogin from '../components/BasicLogin';

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
});

export default Authorization;
