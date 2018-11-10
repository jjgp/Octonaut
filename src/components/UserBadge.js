import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { graphql, QueryRenderer } from "react-relay";
import Colors from "../common/colors";
import environment from "../relay/environment";

const query = graphql`
  query UserBadgeQuery {
    viewer {
      avatarUrl
    }
  }
`;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    flex: 1,
    resizeMode: "cover"
  },
  view: {
    alignContent: "center",
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 5
  }
});

export default () => (
  <View style={styles.view}>
    <QueryRenderer
      environment={environment}
      query={query}
      render={({ error, props }) => {
        if (!props || error) return null;
        return (
          <Image
            style={styles.avatar}
            source={{ uri: props.viewer.avatarUrl }}
          />
        );
      }}
    />
  </View>
);
