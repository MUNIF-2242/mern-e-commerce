import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import data from "../../data/products.json";
import ProductList from "./ProductList";

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
    return () => {
      setProducts([]);
    };
  }, []);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        data={products}
        renderItem={({ item }) => <ProductList key={item._id} item={item} />}
        keyExtractor={(item) => item._id.$oid}
      />
    </SafeAreaView>
  );
};

export default ProductsContainer;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    // fontSize: 32,
  },
});
