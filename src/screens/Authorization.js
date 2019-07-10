import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../common/colors';
import Octoscii from '../components/Octoscii';

const Authorization = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Octoscii />
      <TouchableOpacity style={[styles.touchable]}>
        <Text style={styles.touchableText}>Sign in to GitHub</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  touchable: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
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
