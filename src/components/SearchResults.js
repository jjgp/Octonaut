import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { createPaginationContainer, graphql } from 'react-relay';
import Colors from '../common/colors';
import RepositoryItem from './Repository/RepositoryItem';

class SearchResults extends React.PureComponent {
  _onEndReached = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(50, error => {
      error && console.log(error);
    });
  };

  _onPress = title => {
    this.props.navigation.navigate('Repository', {
      title,
    });
  };

  _renderFooterView = () =>
    this.props.relay.hasMore() ? (
      <View style={styles.indicatorView}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;

  _renderItem = ({ item: { node } }) => (
    <RepositoryItem repository={node} onPress={this._onPress} />
  );

  _renderSeparatorComponent = () => (
    <View style={styles.separatorContainer}>
      <View style={styles.separatorView} />
    </View>
  );

  render = () => {
    data = {};
    return (
      <FlatList
        data={this.props.results.search.edges}
        initialNumToRender={50}
        keyExtractor={item => item.node.id}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.2}
        renderItem={this._renderItem}
        removeClippedSubviews={Platform.OS === 'android'}
        ItemSeparatorComponent={this._renderSeparatorComponent}
        ListFooterComponent={this._renderFooterView}
      />
    );
  };
}

export default createPaginationContainer(
  SearchResults,
  {
    results: graphql`
      fragment SearchResults_results on Query
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 50 }
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
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.results && props.results.search;
    },
    getVariables(_, { count, cursor }, { query, type }) {
      return {
        count,
        cursor,
        query,
        type,
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
    `,
  },
);

const styles = StyleSheet.create({
  indicatorView: {
    alignContent: 'center',
    height: 55,
    justifyContent: 'center',
  },
  separatorContainer: {
    backgroundColor: Colors.white,
    height: 1,
  },
  separatorView: {
    alignSelf: 'center',
    backgroundColor: Colors.lightGrey,
    height: 1,
    width: '95%',
  },
});
