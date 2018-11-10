import React from "react";
import { StyleSheet, View } from "react-native";
import { createFragmentContainer, graphql } from "react-relay";
import Topic from "./Topic";

const styles = StyleSheet.create({
  topicsView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

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
