import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function VerProdutosCategoria({ route }) {
  const { categoryName } = route.params;
  const [sortBy, setSortBy] = useState('preco');
  const navigation = useNavigation();

  // Mock de produtos para demonstração
  const produtos = [
    {
      id: '1',
      nome: 'Produto A',
      preco: 50,
      avaliacao: 4.5,
      tempo_entrega: '2 dias',
      distancia: '5 km',
      imagem: 'https://via.placeholder.com/150', // URL da imagem da loja
    },
    {
      id: '2',
      nome: 'Produto B',
      preco: 30,
      avaliacao: 4.0,
      tempo_entrega: '3 dias',
      distancia: '10 km',
      imagem: 'https://via.placeholder.com/150', // URL da imagem da loja
    },
    // Adicione mais produtos conforme necessário
  ];

  // Função para ordenar os produtos com base no critério selecionado
  const ordenarProdutos = (produtos, criterio) => {
    switch (criterio) {
      case 'preco':
        return produtos.sort((a, b) => a.preco - b.preco);
      case 'avaliacao':
        return produtos.sort((a, b) => b.avaliacao - a.avaliacao);
      case 'tempo_entrega':
        return produtos.sort((a, b) => {
          const tempoA = parseInt(a.tempo_entrega);
          const tempoB = parseInt(b.tempo_entrega);
          return tempoA - tempoB;
        });
      case 'distancia':
        return produtos.sort((a, b) => {
          const distanciaA = parseInt(a.distancia);
          const distanciaB = parseInt(b.distancia);
          return distanciaA - distanciaB;
        });
      default:
        return produtos;
    }
  };

  const produtosOrdenados = ordenarProdutos([...produtos], sortBy);

  // Função para tratar o clique no produto
  const handleProductPress = (produto) => {
    navigation.navigate('DetalhesProduto', { produto });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Categoria: {categoryName}</Text>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Ordenar por:</Text>
        <Picker
          selectedValue={sortBy}
          style={styles.picker}
          onValueChange={(itemValue) => setSortBy(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Preço" value="preco" />
          <Picker.Item label="Avaliação" value="avaliacao" />
          <Picker.Item label="Tempo de entrega" value="tempo_entrega" />
          <Picker.Item label="Distância" value="distancia" />
        </Picker>
      </View>

      {/* Lista de produtos */}
      <View style={styles.produtosContainer}>
        {produtosOrdenados.map((produto) => (
          <TouchableOpacity key={produto.id} onPress={() => handleProductPress(produto)}>
            <View style={styles.produtoItem}>
              <Image source={{ uri: produto.imagem }} style={styles.imagemLoja} />
              <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>{produto.nome}</Text>
                <Text style={styles.produtoDetalhes}>
                  Preço: R${produto.preco} • {produto.avaliacao}⭐
                </Text>
                <Text style={styles.produtoEntrega}>
                  Tempo de Entrega: {produto.tempo_entrega} • Distância: {produto.distancia}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  produtosContainer: {},
  produtoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  imagemLoja: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  produtoDetalhes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  produtoEntrega: {
    fontSize: 14,
    color: '#666',
  },
});
