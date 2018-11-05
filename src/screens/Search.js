import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { graphql, QueryRenderer } from "react-relay";
import RepositoryItem from "../components/RepositoryItem";
import environment from "../relay/environment";

const query = graphql`
  query SearchQuery($search: String!, $before: String) {
    search(first: 50, query: $search, type: REPOSITORY, before: $before) {
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
  searchView: { flex: 1, backgroundColor: "#F6F8FA" }
});

export default () => (
  <View style={styles.searchView}>
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{ search: "felix" }}
      render={({ error, props }) => {
        if (!props || error) return null;
        return (
          <FlatList
            data={props.search.nodes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <RepositoryItem repository={item} />}
          />
        );
      }}
    />
  </View>
);
