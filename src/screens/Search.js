import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { graphql, QueryRenderer } from "react-relay";
import Colors from "../common/colors";
import RepositoryItem from "../components/RepositoryItem";
import SearchBar from "../components/SearchBar";
import UserBadge from "../components/UserBadge";
import environment from "../api/v4/environment";

export default class Search extends React.Component {
  static navigationOptions = {
    header: null,
  };  

  state = {
    search: "react"
  };

  onSubmit = search => this.setState({ search });

  renderActivityIndicator = () => (
    <View style={styles.indicatorView}>
      <ActivityIndicator size="large" />
    </View>
  );

  renderBarView = () => (
    <View style={styles.barView}>
      <SearchBar onSubmit={this.onSubmit} />
      <View style={{ width: 2 }} />
      <UserBadge {...this.props} onPress={() => this.props.navigation.navigate('Settings')} />
    </View>
  );

  renderRepositoryItems = props => (
    <FlatList
      data={props.search.nodes}
      keyExtractor={item => item.id}
      initialNumToRender={25}
      renderItem={({ item }) => <RepositoryItem repository={item} onPress={title => this.props.navigation.navigate('Repository', {
        title})}/>}
      ItemSeparatorComponent={this.renderSeparatorComponent}
    />
  );

  renderSeparatorComponent = () => <View style={{ height: 2 }} />;

  render = () => (
    <>
      {this.renderBarView()}
      {this.state.search ? (
        <View style={styles.searchView}>
          <QueryRenderer
            environment={environment}
            query={query}
            variables={{ search: this.state.search }}
            render={({ error, props }) => {
              if (!props) return this.renderActivityIndicator();
              if (error) return null;
              return this.renderRepositoryItems(props);
            }}
          />
        </View>
      ) : null}
    </>
  );
}

const query = graphql`
  query SearchQuery($search: String!, $before: String) {
    search(first: 25, query: $search, type: REPOSITORY, before: $before) {
      nodes {
        ... on Repository {
          id
          ...RepositoryItem_repository
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      repositoryCount
    }
  }
`;

const styles = StyleSheet.create({
  barView: {
    backgroundColor: Colors.lightGrey,
    flexDirection: "row",
    height: 45
  },
  searchView: {
    backgroundColor: Colors.lightGrey,
    flex: 1,
    paddingTop: 2
  },
  indicatorView: {
    flex: 1,
    justifyContent: "center"
  }
});
