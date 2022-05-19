import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-native';
import SearchBox from './src/SearchBox';
import InfiniteHits from './src/InfiniteHits';
import RefinementList from './src/RefinementList';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
const searchClient = algoliasearch(
  'FHGWOFHPQW',
  'a66b02a8ea7088a0dce0efdca9eb348a'
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#e93766',
    marginBottom: 34,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <InstantSearch
          searchClient={searchClient}
          indexName="international_flat_products"
        >
          <SearchBox />
          <RefinementList attribute="brand_object.value_en" limit={5} />

          <InfiniteHits />
        </InstantSearch>
      </View>
    </SafeAreaView>
  );
};

export default App;
