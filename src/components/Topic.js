import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createFragmentContainer, graphql } from "react-relay";

const styles = StyleSheet.create({
  text: {
    color: "#1268D1",
    fontFamily: "System",
    fontSize: 13
  },
  touchable: {
    alignContent: "center",
    backgroundColor: "#F1F8FF",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    padding: 7
  }
});

const Topic = ({ topic: { name } }) => (
  <TouchableOpacity style={styles.touchable}>
    <Text style={styles.text}>{name}</Text>
  </TouchableOpacity>
);

export default createFragmentContainer(
  Topic,
  graphql`
    fragment Topic_topic on Topic {
      name
    }
  `
);
