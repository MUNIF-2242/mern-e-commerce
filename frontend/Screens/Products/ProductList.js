import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const ProductList = () => {
  return (
    <TouchableOpacity style={{ width: "50%" }}>
      <View style={{ width: width / 2, backgroundColor: "gainsboro" }}></View>
    </TouchableOpacity>
  );
};

export default ProductList;

const styles = StyleSheet.create({});
