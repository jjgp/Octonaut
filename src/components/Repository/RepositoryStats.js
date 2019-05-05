import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import Colors from '../../common/colors';

class Pair extends React.PureComponent {
  render = () => {
    const {
      children: [a, b],
    } = this.props;
    if (!a && !b) return null;
    return <View style={styles.pair} {...this.props} />;
  };
}

class RepositoryStats extends React.PureComponent {
  render = () => {
    const {
      forkCount,
      languages: {
        nodes: [
          language = {},
          color = language.color,
          languageName = language.name,
        ],
      },
      pushedAt,
      stargazers: { totalCount: starCount },
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
          <Image source={require('./img/star.png')} style={styles.image} />
          <Text style={styles.text}>{starCount}</Text>
        </Pair>
        <Pair>
          <Image source={require('./img/fork.png')} style={styles.image} />
          <Text style={styles.text}>{forkCount}</Text>
        </Pair>
        <Pair>
          <Image source={require('./img/clock.png')} style={styles.image} />
          <Text style={styles.text}>{fromNow}</Text>
        </Pair>
      </View>
    );
  };
}

export default createFragmentContainer(RepositoryStats, {
  stats: graphql`
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
  `,
});

const styles = StyleSheet.create({
  colorView: {
    borderRadius: 6,
    height: 12,
    marginRight: 3,
    width: 12,
  },
  image: {
    height: 14,
    marginRight: 3,
    resizeMode: 'contain',
    tintColor: Colors.grey,
    width: 14,
  },
  pair: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.white,
    borderRightWidth: 2,
    borderTopWidth: 1,
    flexDirection: 'row',
    marginRight: 5,
  },
  statsView: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: Colors.grey,
    fontFamily: 'System',
    fontSize: 13,
  },
});
