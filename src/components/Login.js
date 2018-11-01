import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { basic } from "../authorization";

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    code: "",
    requires2FA: false
  };

  onPress = () => {
    const { username, password, code } = this.state;
    basic(username, password, code).then(response => {
      if (!response.ok) this.setState({ requires2FA: true });
    });
  };

  render = () => (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        selectTextOnFocus={true}
        placeholder={"Username"}
        onChangeText={username => this.setState({ username })}
      />
      <TextInput
        style={styles.textInput}
        selectTextOnFocus={true}
        placeholder={"Password"}
        onChangeText={password => this.setState({ password })}
      />
      {this.state.requires2FA && (
        <TextInput
          style={styles.textInput}
          selectTextOnFocus={true}
          placeholder={"2FA Code"}
          onChangeText={code => this.setState({ code })}
        />
      )}
      <Button title={"Submit"} onPress={this.onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
  textInput: {
    alignSelf: "stretch",
    borderWidth: 1,
    flexDirection: "row",
    height: 40,
    justifyContent: "flex-start",
    margin: 5,
    paddingHorizontal: 10
  }
});
