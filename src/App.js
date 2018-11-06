import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import * as Keychain from "react-native-keychain";
import Colors from "./common/colors";
import Authorization from "./screens/Authorization";
import Search from "./screens/Search";

export default class App extends Component {
  state = {};

  componentDidMount = async () =>
    this.setState({ hasToken: !!(await Keychain.getGenericPassword()) });

  render = () => {
    const { hasToken } = this.state;
    if (typeof hasToken === "undefined") return null;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
        {hasToken ? <Search /> : <Authorization />}
      </SafeAreaView>
    );
  };
}
