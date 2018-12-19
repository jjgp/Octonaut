import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { createFragmentContainer, graphql } from "react-relay";
import Colors from "../common/colors";
import RepositoryContributors from "./RepositoryContributors";
import RepositoryStats from "./RepositoryStats";
import RepositoryTopics from "./RepositoryTopics";

class RepositoryItem extends React.PureComponent {
  render = () => {
    const { repository } = this.props;
    const { description, nameWithOwner } = repository;
    return (
      <TouchableOpacity style={styles.touchable}>
        <View style={styles.repositoryView}>
          <Text style={styles.name}>{nameWithOwner}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          <RepositoryContributors nameWithOwner={nameWithOwner} />
          <RepositoryTopics topics={repository} />
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
      ...RepositoryTopics_topics
      ...RepositoryStats_stats
    }
  `
);

const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
    justifyContent: "flex-start"
  },
  touchable: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 3
  }
});
