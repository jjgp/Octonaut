import React from "react";
import { FlatList, View } from "react-native";
import { createPaginationContainer, graphql } from "react-relay";
import RepositoryItem from "./RepositoryItem";

class SearchResults extends React.PureComponent {
  onEndReached = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(25, error => {
      console.log(error);
    });
  };

  renderSeparatorComponent = () => <View style={{ height: 2 }} />;

  render = () => (
    <FlatList
      data={this.props.results.search.edges}
      keyExtractor={item => item.node.id}
      initialNumToRender={25}
      onEndReached={this.onEndReached}
      renderItem={({ item: { node } }) => (
        <RepositoryItem
          repository={node}
          onPress={title =>
            this.props.navigation.navigate("Repository", {
              title
            })
          }
        />
      )}
      ItemSeparatorComponent={this.renderSeparatorComponent}
    />
  );
}

export default createPaginationContainer(
  SearchResults,
  {
    results: graphql`
      fragment SearchResults_results on Query
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 25 }
          query: { type: "String!" }
          cursor: { type: "String" }
          type: { type: "SearchType!" }
        ) {
        search(first: $count, after: $cursor, query: $query, type: $type)
          @connection(key: "SearchResults_search") {
          edges {
            node {
              ... on Repository {
                id
                ...RepositoryItem_repository
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.results && props.results.search;
    },
    getVariables(_, { count, cursor }, { query, type }) {
      return {
        count,
        cursor,
        query,
        type
      };
    },
    query: graphql`
      query SearchResultsForwardQuery(
        $count: Int
        $cursor: String
        $query: String!
        $type: SearchType!
      ) {
        ...SearchResults_results
          @arguments(count: $count, cursor: $cursor, query: $query, type: $type)
      }
    `
  }
);
