import React from "react";
import { StyleSheet, TextInput } from "react-native";
import Colors from "../common/colors";

const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    backgroundColor: Colors.white,
    borderRadius: 5,
    color: Colors.grey,
    fontFamily: "System",
    fontSize: 16,
    height: 40,
    justifyContent: "flex-start",
    margin: 5,
    paddingHorizontal: 10
  }
});

export default props => (
  <TextInput style={[styles.input, props.styles]} {...props} />
);
