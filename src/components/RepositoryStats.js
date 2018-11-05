import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { createFragmentContainer, graphql } from "react-relay";

const styles = StyleSheet.create({
  statsView: {
    alignContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  colorView: {
    borderRadius: 6,
    height: 12,
    marginRight: 3,
    width: 12
  },
  image: {
    height: 14,
    marginRight: 3,
    width: 14,
    resizeMode: "contain",
    tintColor: "#767C84"
  },
  text: {
    color: "#767C84",
    fontFamily: "System",
    fontSize: 13,
    marginRight: 12
  }
});

const RepositoryStats = ({ stats }) => {
  const {
    forkCount,
    languages: {
      nodes: [
        language = {},
        color = language.color,
        languageName = language.name
      ]
    },
    pushedAt,
    stargazers: { totalCount: starCount }
  } = stats;
  const date = new Date(pushedAt);
  const fromNow = moment(date).fromNow();
  return (
    <View style={styles.statsView}>
      {color && <View style={[styles.colorView, { backgroundColor: color }]} />}
      {languageName && <Text style={styles.text}>{languageName}</Text>}
      <Image style={styles.image} source={require("./img/star.png")} />
      <Text style={styles.text}>{starCount}</Text>
      <Image style={styles.image} source={require("./img/fork.png")} />
      <Text style={styles.text}>{forkCount}</Text>
      <Image style={styles.image} source={require("./img/clock.png")} />
      <Text style={styles.text}>{fromNow}</Text>
    </View>
  );
};

export default createFragmentContainer(
  RepositoryStats,
  graphql`
    fragment RepositoryStats_stats on Repository {
      forkCount
      languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
        nodes {
          color
          name
        }
      }
      pushedAt
      stargazers {
        totalCount
      }
    }
  `
);
