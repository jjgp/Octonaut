import React from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../common/colors';

class ToasterOven extends React.Component {
  state = {
    modalVisible: true,
  };

  closeModal = () => this.setState({ modalVisible: false });

  render = () => (
    <Modal
      onRequestClose={() => this.closeModal()}
      supportedOrientations={['portrait', 'landscape']}
      transparent={true}
      visible={this.state.modalVisible}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{this.props.children}</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  errorView: {
    backgroundColor: Colors.red,
    borderColor: Colors.darkRed,
    borderRadius: 5,
    borderWidth: 1,
    bottom: 0,
    marginHorizontal: 10,
    minHeight: 45,
    justifyContent: 'center',
    padding: 10,
  },
  errorText: {
    color: Colors.darkRed,
    fontFamily: 'System',
    fontSize: 14,
  },
});

export default PopoverText;
