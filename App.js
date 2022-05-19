import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';

import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  connectRefinementList,
} from 'react-instantsearch-native';
import SearchBox from './src/SearchBox';
import InfiniteHits from './src/InfiniteHits';
import Filters from './src/Filters';
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

const VirtualRefinementList = connectRefinementList(() => null);

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchState, setSearchState] = useState({});

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <InstantSearch
          searchClient={searchClient}
          indexName="international_flat_products"
          searchState={searchState}
          onSearchStateChange={setSearchState}
        >
          <VirtualRefinementList attribute="brand_object.value_en" />

          <Filters
            isModalOpen={isModalOpen}
            searchClient={searchClient}
            searchState={searchState}
            toggleModal={toggleModal}
            onSearchStateChange={setSearchState}
          />
          <SearchBox />
          <RefinementList attribute="brand_object.value_en" limit={5} />
          <Button title="Filters" color="#252b33" onPress={toggleModal} />
          <InfiniteHits />
        </InstantSearch>
      </View>
    </SafeAreaView>
  );
};

export default App;
