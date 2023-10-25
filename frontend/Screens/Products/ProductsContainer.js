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

  return (
    <SafeAreaView>
      <FlatList
        numColumns="2"
        data={products}
        renderItem={({ item }) => <ProductList key={item.id} item={item} />}
        keyExtractor={(item) => item._id.$oid}
      />
    </SafeAreaView>
  );
};

export default ProductsContainer;

const styles = StyleSheet.create({});
