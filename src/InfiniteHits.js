import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';
import Highlight from './Highlight';

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontWeight: 'bold',
  },
  desc: {
    marginHorizontal: 20,
  },
  brand: {
    fontSize: 14,
    fontWeight: '800',
  },
});

const InfiniteHits = ({ hits, hasMore, refineNext }) => (
  <FlatList
    data={hits}
    keyExtractor={(item) => item.objectID}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    onEndReached={() => hasMore && refineNext()}
    renderItem={({ item }) => (
      <View style={styles.item}>
        <Image
          source={{ uri: item.small_image.url }}
          style={{ height: 100, width: 100 }}
        />

        <View style={styles.desc}>
          <Text style={styles.titleText}>
            <Highlight attribute="sku" hit={item} /> ---{' '}
            <Text>{item.objectID}</Text>
          </Text>
          <Text style={styles.brand}>{item.brand_object.value_en}</Text>
          <Text>{item.name_en}</Text>
          <Text>{item.name_ar}</Text>
          <Text>{item.stores}</Text>
        </View>
      </View>
    )}
  />
);

InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refineNext: PropTypes.func.isRequired,
};

export default connectInfiniteHits(InfiniteHits);
