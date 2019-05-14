import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { hasToken } from '../api/authorization';

const Launch = props => {
  const { navigate } = useNavigation();
  useEffect(() => {
    (async () => {
      navigate((await hasToken()) ? 'Landing' : 'Authorization');
    })();
  }, [navigate]);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Launch;
