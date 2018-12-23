import React from "react";
import * as Keychain from "react-native-keychain";
import { getOrCreateAuthorization } from "../api/authorization";
import Login from "../components/Login";

export default class Authorization extends React.Component {
  state = {
    requires2FA: false
  };

  static _createEntryInKeychain = async (id, token) => {
    await Keychain.setGenericPassword(id, token);
    await Keychain.setInternetCredentials(id, id, token);
  };

  static _setExistingEntryInKeychain = async id => {
    const { username, password } = await Keychain.getInternetCredentials(id);
    await Keychain.setGenericPassword(username, password);
  };

  _onSubmit = async (username, password, code) => {
    const response = await getOrCreateAuthorization(username, password, code);
    if (response.ok) {
      let { id, token } = await response.json();
      token
        ? await Authorization._createEntryInKeychain(id.toString(), token)
        : await Authorization._setExistingEntryInKeychain(id.toString());
      this.setState({ hasToken: true });
    } else if (response.headers.has("x-github-otp"))
      this.setState({ requires2FA: true });
  };

  render = () => (
    <Login requires2FA={this.state.requires2FA} onSubmit={this._onSubmit} />
  );
}
