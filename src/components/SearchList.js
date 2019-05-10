import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, View } from 'react-native';
import { createPaginationContainer, graphql } from 'react-relay';

const NativeSearchList = requireNativeComponent('SearchList', null);

const SearchList = props => {
  const onRefresh = () => {
    props.relay.loadMore(50, error => {
      error && console.log(error);
    });
  };

  return (
    <View style={[{ flex: 1 }, props.style]}>
      <NativeSearchList
        onRefresh={onRefresh}
        results={props.results}
        style={{ flex: 1 }}
      />
    </View>
  );
};

SearchList.propTypes = {
  onRefresh: PropTypes.func,
  results: PropTypes.object,
};

export default createPaginationContainer(
  SearchList,
  {
    results: graphql`
      fragment SearchList_results on Query
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 50 }
          query: { type: "String!" }
          cursor: { type: "String" }
          type: { type: "SearchType!" }
        ) {
        search(first: $count, after: $cursor, query: $query, type: $type)
          @connection(key: "SearchList_search") {
          edges {
            node {
              ... on Repository {
                id
                description
                nameWithOwner
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
                repositoryTopics(first: 5) {
                  nodes {
                    id
                    topic {
                      name
                    }
                  }
                }
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
      query SearchListForwardQuery(
        $count: Int
        $cursor: String
        $query: String!
        $type: SearchType!
      ) {
        ...SearchList_results
          @arguments(count: $count, cursor: $cursor, query: $query, type: $type)
      }
    `,
  }
);
