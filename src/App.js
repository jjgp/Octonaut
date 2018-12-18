import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "react-navigation";
import { hasToken } from "./api/authorization";
import Colors from "./common/colors";
import Authorization from "./screens/Authorization";
import Search from "./screens/Search";

export default class App extends Component {
  state = {};

  componentDidMount = async () => this.setState({ hasToken: await hasToken() });

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

    const Navigator = createStackNavigator(this.screens(), {
      headerMode: "none",
      initialRouteName: hasToken ? "search" : "authorization"
    });

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
        <Navigator />
      </SafeAreaView>
    );
  };
}
