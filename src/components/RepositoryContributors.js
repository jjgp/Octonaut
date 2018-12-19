import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { fetchContributors } from "../api/v3/statistics";

export default class RepositoryContributors extends React.PureComponent {
  state = {
    contributors: []
  };

  componentDidMount = async () => {
    const contributors = await fetchContributors(this.props.nameWithOwner);
    if (Array.isArray(contributors))
      this.setState({
        contributors: contributors
          .slice(0, 5)
          .map(c => ({ id: c.author.id, uri: c.author.avatar_url }))
      });
  };

  render = () => {
    const { contributors } = this.state;
    return (
      <View style={styles.contributorsView}>
        {contributors.map(({ id, uri }) => (
          <TouchableOpacity key={id}>
            <FastImage
              style={styles.avatar}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    height: 32,
    marginRight: 2,
    width: 32
  },
  contributorsView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 3
  }
});
