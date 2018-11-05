import React from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { createFragmentContainer, graphql } from "react-relay";
import RepositoryStats from "./RepositoryStats";
import RepositoryTopics from "./RepositoryTopics";

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    borderRadius: 5,
    height: 50,
    margin: 10,
    width: 50
  },
  description: {
    color: "#767C84",
    fontFamily: "System",
    fontSize: 13,
    marginBottom: 5
  },
  name: {
    color: "#1268D1",
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  repositoryView: {
    flex: 1,
    paddingBottom: 3,
    paddingRight: 10,
    paddingTop: 3,
    justifyContent: "flex-start"
  },
  touchable: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    flexDirection: "row",
    marginBottom: 5
  }
});

const RepositoryItem = ({ repository }) => {
  const {
    description,
    name,
    owner: { avatarUrl }
  } = repository;
  return (
    <TouchableOpacity style={styles.touchable}>
      <Image style={styles.avatar} source={{ uri: avatarUrl }} />
      <View style={styles.repositoryView}>
        <Text style={styles.name}>{name}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <RepositoryTopics topics={repository} />
        <RepositoryStats stats={repository} />
      </View>
    </TouchableOpacity>
  );
};

export default createFragmentContainer(
  RepositoryItem,
  graphql`
    fragment RepositoryItem_repository on Repository {
      description
      name
      owner {
        avatarUrl
      }
      ...RepositoryTopics_topics
      ...RepositoryStats_stats
    }
  `
);
