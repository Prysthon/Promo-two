import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getCategorias } from '../services/servico_get_categorias';

export default function VerCategoria() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      const response = await getCategorias();
      if (response.success) {
        setCategorias(response.categorias);
      } else {
        console.log(response.message);
      }
      setLoading(false);
    };
    fetchCategorias();
  }, []);

  const handleCategoryPress = (categoryName) => {
    navigation.navigate('VerProdutosCategoria', { categoryName });
  };

  const renderCategories = () => {
    const rows = [];
    for (let i = 0; i < categorias.length; i += 2) {
      rows.push(
        <View key={i} style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(categorias[i].name)}>
            <View style={styles.categoryIconContainer}>
              <Icon name={categorias[i].icon} size={50} color="#fff" />
              <Text style={styles.categoryName}>{categorias[i].name}</Text>
            </View>
          </TouchableOpacity>
          {categorias[i + 1] && (
            <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(categorias[i + 1].name)}>
              <View style={styles.categoryIconContainer}>
                <Icon name={categorias[i + 1].icon} size={50} color="#fff" />
                <Text style={styles.categoryName}>{categorias[i + 1].name}</Text>
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
        {loading ? <Text>Carregando...</Text> : renderCategories()}
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
