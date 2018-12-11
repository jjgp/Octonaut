import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { createFragmentContainer, graphql } from "react-relay";
import Colors from "../common/colors";

class RepositoryStats extends React.PureComponent {
  render = () => {
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
    } = this.props.stats;
    const date = new Date(pushedAt);
    const fromNow = moment(date).fromNow();
    return (
      <View style={styles.statsView}>
        <Pair>
          {color && (
            <View style={[styles.colorView, { backgroundColor: color }]} />
          )}
          {languageName && <Text style={styles.text}>{languageName}</Text>}
        </Pair>
        <Pair>
          <Image style={styles.image} source={require("./img/star.png")} />
          <Text style={styles.text}>{starCount}</Text>
        </Pair>
        <Pair>
          <Image style={styles.image} source={require("./img/fork.png")} />
          <Text style={styles.text}>{forkCount}</Text>
        </Pair>
        <Pair>
          <Image style={styles.image} source={require("./img/clock.png")} />
          <Text style={styles.text}>{fromNow}</Text>
        </Pair>
      </View>
    );
  };
}

class Pair extends React.PureComponent {
  render = () => {
    const {
      children: [a, b]
    } = this.props;
    if (!a && !b) return null;
    return <View style={styles.pair} {...this.props} />;
  };
}

const styles = StyleSheet.create({
  statsView: {
    alignContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap"
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
    tintColor: Colors.grey
  },
  pair: {
    alignItems: "center",
    borderColor: Colors.white,
    borderBottomWidth: 1,
    borderRightWidth: 2,
    borderTopWidth: 1,
    flexDirection: "row",
    marginRight: 5
  },
  text: {
    color: Colors.grey,
    fontFamily: "System",
    fontSize: 13
  }
});

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
