import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { hasToken } from "./api/authorization";
import screens from "./screens";

export default class App extends Component {
  state = {};
  
  componentDidMount = async () => this.setState({ hasToken: await hasToken() });

  render = () => {
    if (typeof this.state.hasToken === 'undefined') return null;

    const Navigator = createStackNavigator(screens(), {
      initialRouteName: this.state.hasToken ? "Search" : "Authorization"
    });

    return <Navigator />;
  };
}
