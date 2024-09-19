import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { getProdutos } from '../services/servico_produtos'; // Importando o serviço

export default function VerProdutosCategoria({ route }) {
  const { categoryName } = route.params;
  const [produtos, setProdutos] = useState([]); // Inicialmente vazio
  const [sortBy, setSortBy] = useState('preco');
  const [loading, setLoading] = useState(true); // Estado para o carregamento
  const [error, setError] = useState(null); // Estado para erros na requisição
  const navigation = useNavigation();

  // Função para buscar os produtos da categoria ao carregar a página
  const fetchProdutos = async () => {
    setLoading(true); // Mostra o indicador de carregamento
    const result = await getProdutos(categoryName); // Chama o serviço com o nome da categoria
    if (result.success) {
      setProdutos(result.produtos); // Define os produtos se a requisição for bem-sucedida
    } else {
      setError(result.message); // Define a mensagem de erro
    }
    setLoading(false); // Esconde o indicador de carregamento
  };

  // Usa o useEffect para chamar a função assim que a tela for carregada
  useEffect(() => {
    fetchProdutos();
  }, [categoryName]); // Atualiza os produtos ao mudar de categoria

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

  // Exibe o estado de carregamento ou erro, se houver
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

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
              <Image source={{ uri: produto.image }} style={styles.imagemLoja} />
              <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>{produto.name}</Text>
                <Text style={styles.produtoDetalhes}>
                  Preço: R${produto.price} • {produto.avaliacao}⭐
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
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
