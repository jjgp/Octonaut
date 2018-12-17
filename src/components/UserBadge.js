import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { graphql, QueryRenderer } from "react-relay";
import Colors from "../common/colors";
import environment from "../api/v4/environment";

export default () => (
  <TouchableOpacity style={styles.touchable} onPress={() => {}}>
    <QueryRenderer
      environment={environment}
      query={query}
      render={({ error, props }) => {
        if (!props || error) return null;
        return (
          <FastImage
            style={styles.avatar}
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: props.viewer.avatarUrl }}
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
    flex: 1
  },
  touchable: {
    alignContent: "center",
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 5
  }
});
