import React from "react";
import * as Keychain from "react-native-keychain";
import { getOrCreateAuthorization } from "../authorization";
import Login from "../components/Login";

export default class Authorization extends React.Component {
  static navigationOptions = {
    drawerLabel: () => "Logout"
  };

  state = {
    requires2FA: false
  };

  static createEntryInKeychain = async (id, token) => {
    await Keychain.setGenericPassword(id, token);
    await Keychain.setInternetCredentials(id, id, token);
  };

  static setExistingEntryInKeychain = async id => {
    const { username, password } = await Keychain.getInternetCredentials(id);
    await Keychain.setGenericPassword(username, password);
  };

  onSubmit = async (username, password, code) => {
    const response = await getOrCreateAuthorization(username, password, code);
    if (response.ok) {
      let { id, token } = await response.json();
      token
        ? await Authorization.createEntryInKeychain(id.toString(), token)
        : await Authorization.setExistingEntryInKeychain(id.toString());
      this.setState({ hasToken: true });
    } else if (response.headers.has("x-github-otp"))
      this.setState({ requires2FA: true });
  };

  render = () => (
    <Login requires2FA={this.state.requires2FA} onSubmit={this.onSubmit} />
  );
}
