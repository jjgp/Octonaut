import React, { Component } from "react";
import { View } from "react-native";
import * as Keychain from "react-native-keychain";
import Authorization from "./containers/Authorization";
import environment from "./relay/environment";

export default class App extends Component {
  state = {
    hasToken: undefined
  };

  componentDidMount = async () =>
    this.setState({ hasToken: await Keychain.getGenericPassword() });

  render = () =>
    typeof hasToken === "undefined" ? null : hasToken ? (
      <View />
    ) : (
      <Authorization />
    );
}
