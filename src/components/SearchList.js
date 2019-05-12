import moment from 'moment';
import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  findNodeHandle,
  requireNativeComponent,
  UIManager,
  View,
} from 'react-native';
import { createPaginationContainer, graphql } from 'react-relay';
import Colors from '../common/colors';

const NATIVE_COMPONENT_NAME = 'SearchList';
const NativeSearchList = requireNativeComponent(NATIVE_COMPONENT_NAME);

const resultsReducer = results => {
  if (typeof results === 'undefined') return;
  return results.search.edges.map(edge => {
    const node = { ...edge.node };
    const date = new Date(node.pushedAt);
    node.fromNow = moment(date).fromNow();
    return node;
  });
};

const SearchList = props => {
  // TODO: likely can refactor this to useEffect with cancelation.
  const nativeComponentRef = useRef();
  const endRefreshing = useCallback(() => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(nativeComponentRef.current),
      UIManager.getViewManagerConfig(NATIVE_COMPONENT_NAME).Commands
        .endRefreshing,
      []
    );
  }, [nativeComponentRef]);
  const { count, relay, results } = props;
  const onEndReached = useCallback(() => {
    relay.loadMore(count, error => {
      error && console.log(error);
    });
  }, [count, relay]);
  const onRefresh = useCallback(() => {
    relay.refetchConnection(count, error => {
      endRefreshing();
      error && console.log(error);
    });
  }, [count, endRefreshing, relay]);

  return (
    <View style={[{ flex: 1 }, props.style]}>
      <NativeSearchList
        hasMore={relay.hasMore()}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        ref={nativeComponentRef}
        results={resultsReducer(results)}
        secondaryColor={Colors.gray}
        style={{ flex: 1 }}
      />
    </View>
  );
};

SearchList.propTypes = {
  hasMore: PropTypes.bool,
  onEndReached: PropTypes.func,
  onRefresh: PropTypes.func,
  primaryColor: PropTypes.string,
  results: PropTypes.object,
  secondaryColor: PropTypes.string,
};

export default createPaginationContainer(
  SearchList,
  {
    results: graphql`
      fragment SearchList_results on Query
        @argumentDefinitions(
          count: { type: "Int" }
          cursor: { type: "String" }
          query: { type: "String!" }
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
