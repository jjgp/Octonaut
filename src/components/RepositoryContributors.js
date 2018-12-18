import React from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { fetchContributors } from "../api/v3/statistics";

export default class RepositoryContributors extends React.PureComponent {
  state = {
    avatarUrls: null
  };

  componentDidMount = async () => {
    const contributors = await fetchContributors(this.props.nameWithOwner);
    // TODO: package id too
    this.setState({ avatarUrls: contributors.slice(0, 5).map(c => c.author.avatar_url) });
  }

  render = () => {
    const { avatarUrls } = this.state;
    return (
      <View style={styles.contributorsView}>
      {avatarUrls && avatarUrls.map((uri, index) =>
          <FastImage
            key={index}
            style={styles.avatar}
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri }}
          />
      )}
      </ View>
    );
  } 
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
