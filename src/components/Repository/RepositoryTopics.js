import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import Topic from '../Topic';

class RepositoryTopics extends React.PureComponent {
  render = () => {
    const {
      topics: {
        repositoryTopics: { nodes },
      },
    } = this.props;
    return nodes.length > 0 ? (
      <View style={styles.topicsView}>
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
      repositoryTopics(first: 5) {
        nodes {
          id
          topic {
            ...Topic_topic
          }
        }
      }
    }
  `,
);

const styles = StyleSheet.create({
  topicsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
