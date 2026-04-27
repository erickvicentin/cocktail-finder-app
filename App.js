import React, { useState, useEffect, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Modal,
  Keyboard,
  TouchableOpacity,
  Text,
  SafeAreaView
} from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Header from "./src/components/Header";
import DrinkCard from "./src/components/DrinkCard";
import DrinkDetailModal from "./src/components/DrinkDetailModal";
import useDebounce from "./src/hooks/useDebounce";
import styles from "./src/styles/AppStyles";

export default function App() {
  const [drinks, setDrinks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrinkId, setSelectedDrinkId] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const handleDrinkPress = (drink) => {
    setSelectedDrinkId(drink.idDrink);
    setIsDetailModalVisible(true);
  };
  
  // Debounce the search query to avoid calling the API on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchDrinks = useCallback(async (query) => {
    setIsLoading(true);
    try {
      const safeQuery = query.length >= 3 ? query : 'a';
      
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${safeQuery}`);
      const data = await response.json();
      setDrinks(data.drinks || []);
    } catch (error) {
      console.error("Error fetching drinks:", error);
      setDrinks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch drinks whenever the debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery.length >= 3 || debouncedSearchQuery === "") {
      fetchDrinks(debouncedSearchQuery);
    } else {
      setDrinks([]);
    }
  }, [debouncedSearchQuery, fetchDrinks]);

  const handleClear = () => {
    setSearchQuery("");
    Keyboard.dismiss();
  };

  const handleModalSearch = (text) => {
    setSearchQuery(text);
    if (text.length >= 3) {
      setIsModalVisible(false);
      Keyboard.dismiss();
    }
  };

  if (isModalVisible) {
    return (
      <Modal animationType="slide" transparent={false} visible={isModalVisible}>
        <LinearGradient
          colors={["#8200cc", "#ff5f6d", "#ffc371"]}
          style={styles.linearGradient}
        >
          <SafeAreaView style={styles.modalContent}>
            <Header sizeElements={30} />
            <View style={styles.searchBarModal}>
              <Ionicons name="search" size={20} color="white" style={styles.modalSearchIcon} />
              <TextInput
                placeholder="Search your favorite drink..."
                onChangeText={handleModalSearch}
                value={searchQuery}
                placeholderTextColor="rgba(255,255,255,0.7)"
                style={styles.modalInput}
                autoFocus={true}
                autoCorrect={false}
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
        <StatusBar style="light" hidden={true} />
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8200cc", "#ff5f6d", "#ffc371"]}
        style={styles.linearGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <Header sizeElements={25} />
          
          <View style={styles.searchBar}>
            <Ionicons name="search" size={24} color="white" />
            <TextInput
              style={styles.input}
              placeholder="Search your favorite drink..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="search"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity style={styles.iconButton} onPress={handleClear}>
                <MaterialIcons name="clear" size={24} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.iconButton} onPress={() => setIsModalVisible(true)}>
              <AntDesign name="home" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="white" style={styles.loader} />
            ) : drinks.length > 0 ? (
              <FlatList
                data={drinks}
                renderItem={({ item }) => <DrinkCard drink={item} onPress={handleDrinkPress} />}
                keyExtractor={(item) => item.idDrink}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No drinks found.</Text>
                <Text style={styles.emptySubText}>Try a different search term.</Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>
      <StatusBar style="light" hidden={false} />
      <DrinkDetailModal 
        isVisible={isDetailModalVisible}
        drinkId={selectedDrinkId}
        onClose={() => setIsDetailModalVisible(false)}
      />
    </View>
  );
}


