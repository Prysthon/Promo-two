import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

export default function RestaurantSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: '1', name: 'Pizza', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Sushi', image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Hambúrguer', image: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Saladas', image: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Massas', image: 'https://via.placeholder.com/150' },
    { id: '6', name: 'Sobremesas', image: 'https://via.placeholder.com/150' },
    // Adicione mais categorias conforme necessário
  ];

  const renderCategories = () => {
    // Dividir as categorias em pares para renderização em duas colunas
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
      {/* Campo de busca */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar restaurante..."
        placeholderTextColor="#666"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Text style={styles.sectionTitle}>Categorias</Text>
      {/* Categorias */}
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

