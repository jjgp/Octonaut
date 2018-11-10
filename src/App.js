import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import * as Keychain from "react-native-keychain";
import { createDrawerNavigator } from "react-navigation";
import Colors from "./common/colors";
import Authorization from "./screens/Authorization";
import Search from "./screens/Search";

export default class App extends Component {
  state = {};

  componentDidMount = async () =>
    this.setState({ hasToken: !!(await Keychain.getGenericPassword()) });

  screens = () => ({
    authorization: {
      screen: Authorization
    },
    search: {
      screen: Search
    }
  });

  render = () => {
    const { hasToken } = this.state;
    if (typeof hasToken === "undefined") return null;
    const Navigator = createDrawerNavigator(this.screens(), {
      initialRouteName: hasToken ? "search" : "authorization"
    });
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
        <Navigator />
      </SafeAreaView>
    );
  };
}
