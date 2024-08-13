import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

export default function CategorySearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: '1', name: 'Elétricos', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Hidráulicos', image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Ferragens', image: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Utensílios', image: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Roupas', image: 'https://via.placeholder.com/150' },
    { id: '6', name: 'Calçados', image: 'https://via.placeholder.com/150' },
    { id: '7', name: 'Acessórios', image: 'https://via.placeholder.com/150' },
    { id: '8', name: 'Alimentos', image: 'https://via.placeholder.com/150' },
    { id: '9', name: 'Bebidas', image: 'https://via.placeholder.com/150' },
    { id: '10', name: 'Higiene', image: 'https://via.placeholder.com/150' },
    { id: '11', name: 'Beleza', image: 'https://via.placeholder.com/150' },
  ];

  const renderCategories = () => {
    const rows = [];
    for (let i = 0; i < categories.length; i += 2) {
      rows.push(
        <View key={i} style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryItem}>
            <ImageBackground source={{ uri: categories[i].image }} style={styles.categoryImage} imageStyle={{ borderRadius: 10 }}>
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>{categories[i].name}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          {categories[i + 1] && (
            <TouchableOpacity style={styles.categoryItem}>
              <ImageBackground source={{ uri: categories[i + 1].image }} style={styles.categoryImage} imageStyle={{ borderRadius: 10 }}>
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryName}>{categories[i + 1].name}</Text>
                </View>
              </ImageBackground>
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
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  categoryOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
  },
  categoryName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
});
