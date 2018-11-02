import React from "react";
import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    borderWidth: 1,
    flexDirection: "row",
    height: 40,
    justifyContent: "flex-start",
    margin: 5,
    paddingHorizontal: 10
  }
});

export default (Input = props => (
  <TextInput style={[styles.input, props.styles]} {...props} />
));
