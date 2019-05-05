import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../common/colors';
import Input from '../components/Input';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    code: '',
  };

  _onPress = () => {
    const { username, password, code } = this.state;
    this.props.onSubmit(username, password, code);
  };

  render = () => (
    <View style={styles.inputView}>
      <Input
        onChangeText={username => this.setState({ username })}
        placeholder={'Username'}
        selectTextOnFocus={true}
        style={styles.input}
      />
      <Input
        onChangeText={password => this.setState({ password })}
        placeholder={'Password'}
        secureTextEntry
        selectTextOnFocus={true}
        style={styles.input}
      />
      {this.props.requires2FA && (
        <Input
          onChangeText={code => this.setState({ code })}
          placeholder={'2FA Code'}
          selectTextOnFocus={true}
          style={styles.input}
        />
      )}
      <TouchableOpacity onPress={this._onPress} style={styles.touchable}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginVertical: 5,
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: 'System',
    fontSize: 16,
  },
  touchable: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginVertical: 5,
  },
});
