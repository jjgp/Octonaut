import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import Colors from '../../common/colors';
import RepositoryStats from './RepositoryStats';

class RepositoryItem extends React.PureComponent {
  _onPress = () => this.props.onPress(this.props.repository.nameWithOwner);

  render = () => {
    const { repository } = this.props;
    const { description, nameWithOwner } = repository;
    return (
      <TouchableHighlight style={styles.touchable} onPress={this._onPress}>
        <>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode={'middle'}>
            {nameWithOwner}
          </Text>
          {description && (
            <Text style={styles.description} numberOfLines={1}>
              {description}
            </Text>
          )}
          <RepositoryStats stats={repository} />
        </>
      </TouchableHighlight>
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
  `,
);

const styles = StyleSheet.create({
  description: {
    color: Colors.grey,
    fontFamily: 'System',
    fontSize: 13,
    marginBottom: 5,
  },
  name: {
    color: Colors.blue,
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  touchable: {
    backgroundColor: Colors.white,
    height: 74,
    justifyContent: 'flex-start',
    paddingBottom: 5,
    paddingHorizontal: 10,
    paddingTop: 3,
  },
});
