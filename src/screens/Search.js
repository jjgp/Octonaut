import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { graphql, QueryRenderer } from 'react-relay';
import Colors from '../common/colors';
import SearchResults from '../components/SearchResults';
import SearchBar from '../components/SearchBar';
import UserBadge from '../components/UserBadge';
import environment from '../api/v4/environment';

const Search = props => {
  let [search, setSearch] = useState('react');
  const { navigation } = props;
  const onPress = () => navigation.navigate('Settings');
  const onSubmit = search => setSearch(search);
  const renderActivityIndicator = () => (
    <View style={styles.indicatorView}>
      <ActivityIndicator size="large" />
    </View>
  );
  const renderBarView = () => (
    <View style={styles.barView}>
      <SearchBar onSubmit={onSubmit} />
      <View style={{ width: 10 }} />
      <UserBadge {...props} onPress={onPress} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
      {renderBarView()}
      {search ? (
        <View style={styles.searchView}>
          <QueryRenderer
            environment={environment}
            query={query}
            render={({ error, props }) => {
              if (!props) return renderActivityIndicator();
              if (error) return <Text>{error}</Text>;
              return <SearchResults navigation={navigation} results={props} />;
            }}
            variables={{ query: search, type: 'REPOSITORY' }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

Search.navigationOptions = {
  header: null,
};

const query = graphql`
  query SearchQuery($cursor: String, $query: String!, $type: SearchType!) {
    ...SearchResults_results @arguments(query: $query, type: $type)
  }
`;

const styles = StyleSheet.create({
  barView: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    height: 55,
    padding: 10,
  },
  indicatorView: {
    flex: 1,
    justifyContent: 'center',
  },
  searchView: {
    backgroundColor: Colors.lightGrey,
    flex: 1,
    paddingTop: 2,
  },
});

export default Search;
