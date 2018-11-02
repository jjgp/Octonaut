import React, { Component } from "react";
import { View } from "react-native";
import * as Keychain from "react-native-keychain";
import Authorization from "./containers/Authorization";

export default class App extends Component {
  state = {};

  componentDidMount = async () =>
    this.setState({ hasToken: !!(await Keychain.getGenericPassword()) });

  render = () => {
    if (typeof this.state.hasToken === "undefined") return null;
    return this.state.hasToken ? <View /> : <Authorization />;
  };
}
