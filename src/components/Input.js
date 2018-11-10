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
    justifyContent: "flex-start",
    paddingHorizontal: 10
  }
});

export default props => {
  const { style, ...rest } = props;
  return <TextInput style={[styles.input, style]} {...rest} />;
};
