import React from "react";
import { StyleSheet, View } from "react-native";
import { createFragmentContainer, graphql } from "react-relay";
import Topic from "./Topic";

class RepositoryTopics extends React.PureComponent {
  render = () => {
    const {
      style,
      topics: {
        repositoryTopics: { nodes }
      }
    } = this.props;
    return nodes.length > 0 ? (
      <View style={[styles.topicsView, style]}>
        {nodes.map(({ id, topic }) => (
          <Topic key={id} topic={topic} />
        ))}
      </View>
    ) : null;
  };
}

const styles = StyleSheet.create({
  topicsView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    height: 32
  }
});

export default createFragmentContainer(
  RepositoryTopics,
  graphql`
    fragment RepositoryTopics_topics on Repository {
      repositoryTopics(first: 3) {
        nodes {
          id
          topic {
            ...Topic_topic
          }
        }
      }
    }
  `
);
