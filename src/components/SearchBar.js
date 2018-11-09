import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import Colors from "../common/colors";

const styles = StyleSheet.create({
  image: {
    height: 20,
    marginVertical: 5,
    resizeMode: "contain",
    tintColor: Colors.blue,
    width: 20
  },
  input: {
    alignSelf: "stretch",
    color: Colors.grey,
    flex: 1,
    fontFamily: "System",
    fontSize: 16,
    marginLeft: 10
  },
  view: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: 5
  }
});

export default ({ style, onSubmit }) => (
  <View style={[styles.view, style]}>
    <Image style={styles.image} source={require("./img/search.png")} />
    <TextInput
      style={styles.input}
      onSubmitEditing={event => onSubmit(event.nativeEvent.text)}
    />
  </View>
);
