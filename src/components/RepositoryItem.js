import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { createFragmentContainer, graphql } from "react-relay";
import Colors from "../common/colors";
import RepositoryStats from "./RepositoryStats";

class RepositoryItem extends React.PureComponent {
  onPress = () => this.props.onPress(this.props.repository.nameWithOwner);

  render = () => {
    const { repository } = this.props;
    const { description, nameWithOwner } = repository;
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.onPress}>
        <View style={styles.repositoryView}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode={"middle"}>
            {nameWithOwner}
          </Text>
          {description && (
            <Text style={styles.description} numberOfLines={1}>
              {description}
            </Text>
          )}
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
