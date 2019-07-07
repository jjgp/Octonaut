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
import Colors from '../../common/colors';

const NATIVE_COMPONENT_NAME = 'RepositoryList';
const NativeRepositoryList = requireNativeComponent(NATIVE_COMPONENT_NAME);

const repositoriesReducer = repositories => {
  if (typeof repositories === 'undefined') {
    return;
  }
  return repositories.search.edges.map(edge => {
    const node = { ...edge.node };
    const date = new Date(node.pushedAt);
    node.fromNow = moment(date).fromNow();
    return node;
  });
};

const RepositoryList = props => {
  const nativeComponentRef = useRef();
  const endRefreshing = useCallback(() => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(nativeComponentRef.current),
      UIManager.getViewManagerConfig(NATIVE_COMPONENT_NAME).Commands
        .endRefreshing,
      []
    );
  }, [nativeComponentRef]);
  const { count, relay, repositories } = props;
  const disposable = useRef(null);
  const onEndReached = useCallback(() => {
    disposable.current && disposable.current.dispose();
    disposable.current = relay.loadMore(count, _ => {});
  }, [count, disposable, relay]);
  const onRefresh = useCallback(() => {
    disposable.current && disposable.current.dispose();
    disposable.current = relay.refetchConnection(count, _ => {
      endRefreshing();
    });
  }, [count, disposable, endRefreshing, relay]);

  return (
    <View style={[{ flex: 1 }, props.style]}>
      <NativeRepositoryList
        hasMore={relay.hasMore()}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        ref={nativeComponentRef}
        repositories={repositoriesReducer(repositories)}
        secondaryColor={Colors.gray}
        style={{ flex: 1 }}
      />
    </View>
  );
};

RepositoryList.propTypes = {
  hasMore: PropTypes.bool,
  onEndReached: PropTypes.func,
  onRefresh: PropTypes.func,
  primaryColor: PropTypes.string,
  repositories: PropTypes.object,
  secondaryColor: PropTypes.string,
};

export default createPaginationContainer(
  RepositoryList,
  {
    repositories: graphql`
      fragment RepositoryList_repositories on Query
        @argumentDefinitions(
          count: { type: "Int" }
          cursor: { type: "String" }
          query: { type: "String!" }
          type: { type: "SearchType!" }
        ) {
        search(first: $count, after: $cursor, query: $query, type: $type)
          @connection(key: "RepositoryList_search") {
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
      return props.repositories && props.repositories.search;
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
      query RepositoryListForwardQuery(
        $count: Int
        $cursor: String
        $query: String!
        $type: SearchType!
      ) {
        ...RepositoryList_repositories
          @arguments(count: $count, cursor: $cursor, query: $query, type: $type)
      }
    `,
  }
);
