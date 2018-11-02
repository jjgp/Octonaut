import React from "react";
import * as Keychain from "react-native-keychain";
import { getOrCreateAuthorization } from "../authorization";
import Login from "./Login";

export default class Authorization extends React.Component {
  state = {
    requires2FA: false
  };

  onSubmit = async (username, password, code) => {
    const response = await getOrCreateAuthorization(username, password, code);
    if (response.ok) {
      let { id, idString = id.toString(), token } = await response.json();
      if (token) {
        await Keychain.setGenericPassword(idString, token);
        await Keychain.setInternetCredentials(idString, idString, token);
      } else {
        const { username, password } = await Keychain.getInternetCredentials(
          idString
        );
        await Keychain.setGenericPassword(username, password);
      }
      this.setState({ hasToken: true });
    } else if (response.headers.has("x-github-otp"))
      this.setState({ requires2FA: true });
  };

  render = () => {
    <Login requires2FA={this.state.requires2FA} onSubmit={this.onSubmit} />;
  };
}
