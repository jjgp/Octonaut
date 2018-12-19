import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "react-navigation";
import { hasToken } from "./api/authorization";
import Colors from "./common/colors";
import screens from "./screens";

export default class App extends Component {
  state = {
    hasToken: false
  };

  componentDidMount = async () => this.setState({ hasToken: await hasToken() });

  render = () => {
    const { hasToken } = this.state;
    if (!hasToken) return null;

    const Navigator = createStackNavigator(screens(), {
      initialRouteName: hasToken ? "Search" : "Authorization"
    });

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
        <Navigator />
      </SafeAreaView>
    );
  };
}
