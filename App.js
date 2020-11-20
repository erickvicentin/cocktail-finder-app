import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Button, Text, View, TextInput } from "react-native";


export default function App() {

  const handleText = (str) => {
    console.log(str);
  };

  const [string, setString] = useState("Cocktail-Finder!");
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["violet", "red", "orange"]}
        style={styles.gradient}
      >
        <Text style={{ color: "white", fontSize: 24 }}>{string}</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          placeholderTextColor="white"
          onChangeText={(str) => handleText(setString(str))}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 20,
    marginTop: 10,
    color: "white",
    textAlign: "center",
    width: "95%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  gradient: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
