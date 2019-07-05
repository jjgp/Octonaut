import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import Colors from '../common/colors';

// Attribution: https://medium.com/@kelleyannerose/react-native-activityindicator-for-a-quick-easy-loading-animation-593c06c044dc
const InProgress = () => (
  <Modal animationType="none" transparent={true} visible={true}>
    <View style={styles.modalContainer}>
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  modalContainer: {
    backgroundColor: Colors.transparent,
    flex: 1,
    justifyContent: 'center',
  },
});

export default InProgress;
