import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { hasToken } from '../api/authorization';

const Launch = props => {
  useEffect(() => {
    (async () => {
      props.navigation.navigate(
        (await hasToken()) ? 'Landing' : 'Authorization'
      );
    })();
  }, [props.navigation]);

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
