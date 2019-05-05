import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { graphql, QueryRenderer } from 'react-relay';
import environment from '../api/v4/environment';

export default props => (
  <TouchableOpacity onPress={props.onPress} style={styles.touchable}>
    <QueryRenderer
      environment={environment}
      query={query}
      render={({ error, props }) => {
        if (!props || error) return null;
        return (
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: props.viewer.avatarUrl }}
            style={styles.avatar}
          />
        );
      }}
    />
  </TouchableOpacity>
);

const query = graphql`
  query UserBadgeQuery {
    viewer {
      id
      avatarUrl
    }
  }
`;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    flex: 1,
  },
  touchable: {
    alignContent: 'center',
    aspectRatio: 1,
    borderRadius: 5,
    justifyContent: 'center',
  },
});
