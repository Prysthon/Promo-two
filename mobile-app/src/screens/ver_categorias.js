import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function VerCategoria() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const categories = [
    { id: '1', name: 'Elétricos', icon: 'bulb-outline' },
    { id: '2', name: 'Hidráulicos', icon: 'water-outline' },
    { id: '3', name: 'Ferragens', icon: 'hammer-outline' },
    { id: '4', name: 'Utensílios', icon: 'restaurant-outline' },
    { id: '5', name: 'Roupas', icon: 'shirt-outline' },
    { id: '6', name: 'Calçados', icon: 'walk-outline' },
    { id: '7', name: 'Acessórios', icon: 'bag-handle-outline' },
    { id: '8', name: 'Alimentos', icon: 'fast-food-outline' },
    { id: '9', name: 'Bebidas', icon: 'wine-outline' },
    { id: '10', name: 'Higiene', icon: 'hand-left-outline' },
    { id: '11', name: 'Beleza', icon: 'color-palette-outline' },
  ];

  const handleCategoryPress = (categoryName) => {
    navigation.navigate('VerProdutosCategoria', { categoryName });
  };

  const renderCategories = () => {
    const rows = [];
    for (let i = 0; i < categories.length; i += 2) {
      rows.push(
        <View key={i} style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(categories[i].name)}>
            <View style={styles.categoryIconContainer}>
              <Icon name={categories[i].icon} size={50} color="#fff" />
              <Text style={styles.categoryName}>{categories[i].name}</Text>
            </View>
          </TouchableOpacity>
          {categories[i + 1] && (
            <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(categories[i + 1].name)}>
              <View style={styles.categoryIconContainer}>
                <Icon name={categories[i + 1].icon} size={50} color="#fff" />
                <Text style={styles.categoryName}>{categories[i + 1].name}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar produtos..."
        placeholderTextColor="#666"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Text style={styles.sectionTitle}>Categorias</Text>
      <View style={styles.categoriesContainer}>
        {renderCategories()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  searchInput: {
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingBottom: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryItem: {
    flex: 1,
    marginRight: 10,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#3ad3f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
});
