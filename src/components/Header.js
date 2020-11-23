import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <Fontisto name="cocktail" size={30} color="white" />
      <Text style={styles.title}>Cocktail-Finder</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    paddingTop: 25,
  },
  title: {
    fontSize: 20,
    padding: 10,
    color: "white",
    fontWeight: "bold",
  },
});
