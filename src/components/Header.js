import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const Header = ({ sizeElements }) => {
  const size = sizeElements;

  return (
    <View style={styles.header}>
      <Fontisto name="cocktail" size={sizeElements+10} color="white" />
      <Text style={(({  fontSize: sizeElements, padding: 10, color: 'white', fontWeight: 'bold'  }))}>
        
        Cocktail-Finder
      
      </Text>
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
});
