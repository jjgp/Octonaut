import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createFragmentContainer, graphql } from "react-relay";

const styles = StyleSheet.create({
  text: {
    color: "#1268D1",
    fontFamily: "System",
    fontSize: 13
  },
  topicsView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5
  },
  touchable: {
    alignContent: "center",
    backgroundColor: "#F1F8FF",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 3,
    flexDirection: "row",
    padding: 7
  }
});

const RepositoryTopics = ({ topics }) => {
  const {
    repositoryTopics: { nodes }
  } = topics;
  return nodes.length > 0 ? (
    <View style={styles.topicsView}>
      {nodes.map(({ id, topic: { name } }) => (
        <TouchableOpacity style={styles.touchable} key={id}>
          <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  ) : null;
};

export default createFragmentContainer(
  RepositoryTopics,
  graphql`
    fragment RepositoryTopics_topics on Repository {
      repositoryTopics(first: 5) {
        nodes {
          id
          topic {
            name
          }
        }
      }
    }
  `
);
