import React from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { createFragmentContainer, graphql } from "react-relay";
import Colors from "../common/colors";
import RepositoryStats from "./RepositoryStats";
import RepositoryTopics from "./RepositoryTopics";

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    borderRadius: 5,
    height: 50,
    marginHorizontal: 10,
    width: 50
  },
  description: {
    color: Colors.grey,
    fontFamily: "System",
    fontSize: 13,
    marginBottom: 5
  },
  name: {
    color: Colors.blue,
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  repositoryView: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "flex-start"
  },
  touchable: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    paddingVertical: 3
  }
});

class RepositoryItem extends React.PureComponent {
  render = () => {
    const { repository, style } = this.props;
    const {
      description,
      nameWithOwner,
      owner: { avatarUrl }
    } = repository;
    return (
      <TouchableOpacity style={[styles.touchable, style]}>
        <Image style={styles.avatar} source={{ uri: avatarUrl }} />
        <View style={styles.repositoryView}>
          <Text style={styles.name}>{nameWithOwner}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          <RepositoryTopics style={{ marginBottom: 5 }} topics={repository} />
          <RepositoryStats stats={repository} />
        </View>
      </TouchableOpacity>
    );
  };
}

export default createFragmentContainer(
  RepositoryItem,
  graphql`
    fragment RepositoryItem_repository on Repository {
      description
      nameWithOwner
      owner {
        avatarUrl
      }
      ...RepositoryTopics_topics
      ...RepositoryStats_stats
    }
  `
);
