import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const DrinkDetailModal = ({ isVisible, drinkId, onClose }) => {
  const [drinkDetail, setDrinkDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isVisible && drinkId) {
      setLoading(true);
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then(res => res.json())
        .then(data => {
          if (data.drinks && data.drinks.length > 0) {
            setDrinkDetail(data.drinks[0]);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setDrinkDetail(null);
    }
  }, [isVisible, drinkId]);

  const getIngredients = () => {
    if (!drinkDetail) return [];
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drinkDetail[`strIngredient${i}`];
      const measure = drinkDetail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({
          name: ingredient,
          measure: measure || ''
        });
      }
    }
    return ingredients;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={36} color="#333" />
          </TouchableOpacity>
          
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#8200cc" />
            </View>
          ) : drinkDetail ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image 
                source={{ uri: drinkDetail.strDrinkThumb }} 
                style={styles.image} 
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{drinkDetail.strDrink}</Text>
                
                <View style={styles.tagsRow}>
                  <Text style={styles.tag}>{drinkDetail.strCategory}</Text>
                  <Text style={styles.tag}>{drinkDetail.strAlcoholic}</Text>
                  <Text style={styles.tag}>{drinkDetail.strGlass}</Text>
                </View>
                
                <Text style={styles.sectionTitle}>Ingredients</Text>
                <View style={styles.ingredientsList}>
                  {getIngredients().map((item, index) => (
                    <Text key={index} style={styles.ingredientText}>
                      • {item.measure} {item.name}
                    </Text>
                  ))}
                </View>
                
                <Text style={styles.sectionTitle}>Instructions</Text>
                <Text style={styles.instructionsText}>{drinkDetail.strInstructions}</Text>
              </View>
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    height: '85%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 0,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 350,
  },
  detailsContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#ffc371',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8200cc',
    marginTop: 10,
    marginBottom: 8,
  },
  ingredientsList: {
    marginBottom: 15,
  },
  ingredientText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
    lineHeight: 24,
  },
  instructionsText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  }
});

export default DrinkDetailModal;
