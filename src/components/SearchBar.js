import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import Colors from "../common/colors";
import Input from "../components/Input";

export default ({ onSubmit }) => (
  <View style={styles.view}>
    <Image style={styles.image} source={require("./img/search.png")} />
    <Input
      style={styles.input}
      onSubmitEditing={event => onSubmit(event.nativeEvent.text)}
    />
  </View>
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.lightGrey,
    flex: 1
  },
  image: {
    height: 20,
    marginVertical: 5,
    resizeMode: "contain",
    tintColor: Colors.blue,
    width: 20
  },
  view: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 5
  }
});
