import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Input from "../components/Input";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  }
});

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    code: ""
  };

  onPress = () => {
    const { username, password, code } = this.state;
    this.props.onSubmit(username, password, code);
  };

  render = () => (
    <View style={styles.container}>
      <Input
        selectTextOnFocus={true}
        placeholder={"Username"}
        onChangeText={username => this.setState({ username })}
      />
      <Input
        selectTextOnFocus={true}
        placeholder={"Password"}
        onChangeText={password => this.setState({ password })}
        secureTextEntry
      />
      {this.props.requires2FA && (
        <Input
          selectTextOnFocus={true}
          placeholder={"2FA Code"}
          onChangeText={code => this.setState({ code })}
        />
      )}
      <Button title={"Submit"} onPress={this.onPress} />
    </View>
  );
}
