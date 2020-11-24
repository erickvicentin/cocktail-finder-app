import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import Header from './src/components/Header'
import { StatusBar } from "expo-status-bar";


export default function App() {

  const [drinks, setDrinks] = useState([]);
  const [modal, setModal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState("");
  const [string, setString] = useState("");

  const handleSearch = (str) => {
        setString(str);
    if (str.length >= 3) {
        setSubmit(str);
      } else {
        setSubmit('unexistent')
      }
  };

  const clear = () => {
    console.log(`string: ${string}`);
    console.log(`submit: ${submit}`);
    setSubmit("unexistent");
    setString("");
  };

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${submit}`)
      .then((response) => response.json())
      .then((data) => {
        setDrinks(data.drinks);
        setLoading(false);
      });
  }, [submit]);

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      dismissKeyboard();
    }
  };

  const handleInputModal = (ent) => {
    if (ent.length >= 3) {
      setModal(!modal);
      setString(ent);
      
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (modal) {
    return (
      <>
        <Modal animationType="slide" transparent={false} visible={modal}>
          <LinearGradient
            colors={["#8200cc", "#ff5f6d", "#ffc371"]}
            style={styles.linearGradient}
          >
            <View
              style={{
                flex: 1,
                paddingTop: 200,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Header sizeElements={30}/>
              <View style={styles.searchBarModal}>
                <TextInput
                  placeholder="Search your favorite drink..."
                  onChangeText={(ent) => handleInputModal(ent)}
                  placeholderTextColor="white"
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
                />
              </View>
            </View>
          </LinearGradient>
          <StatusBar hidden={true} />
        </Modal>
      </>
    );
  }
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8200cc", "#ff5f6d", "#ffc371"]}
        style={styles.linearGradient}
      >
        <Header sizeElements={25}/>
        <View style={styles.searchBar}>
          <Ionicons
            name="ios-search"
            size={24}
            color="white"
            style={{ flex: 0.5 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Search your favorite drink..."
            placeholderTextColor="white"
            autoFocus={true}
            onChangeText={(str) => handleSearch(str)}
            onKeyPress={(e) => handleKeyDown(e)}
            value={string}
          />
          <TouchableNativeFeedback
            style={{ flex: 0.5 }}
            onPress={() => clear()}
          >
            <MaterialIcons name="clear" size={24} color="white" />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => setModal(!modal)}>
            <AntDesign name="home" size={20} color="white" />
          </TouchableNativeFeedback>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={drinks}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image
                  style={{ width: 80, height: 80, borderRadius: 30 }}
                  source={{ uri: item.strDrinkThumb }}
                />
                <View>
                  <Text style={{ paddingLeft: 10 }}>{item.strDrink}</Text>
                  <Text style={{ paddingLeft: 10 }}>
                    Categoria: {item.strCategory}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.idDrink}
          />
        </View>
      </LinearGradient>
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 22,
    height: 50,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    textAlign: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    paddingLeft: 10,
    paddingVertical: 10,
    marginVertical: 5,
    borderColor: "transparent",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 8,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 5,
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginVertical: 5,
    paddingBottom: 5,
  },
  searchBarModal: {
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 30,
    padding: 10,
    width: '80%',
  }
});
