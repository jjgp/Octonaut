import React from "react";

export default class Repository extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  render = () => <></>;
}
