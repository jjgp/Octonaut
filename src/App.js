import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { hasToken } from "./api/authorization";
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

    return <Navigator />;
  };
}
