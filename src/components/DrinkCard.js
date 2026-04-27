import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const DrinkCard = ({ drink, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => onPress(drink)}>
      <Image
        style={styles.image}
        source={{ uri: drink.strDrinkThumb }}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{drink.strDrink}</Text>
        <Text style={styles.category} numberOfLines={1}>
          Categoría: {drink.strCategory}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    paddingLeft: 10,
    paddingVertical: 10,
    marginVertical: 6,
    borderRadius: 10,
    borderColor: '#2c2c05ff',
    borderWidth: 3,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80, 
    height: 80, 
    borderRadius: 10
  },
  info: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: "#666",
  }
});

export default DrinkCard;
