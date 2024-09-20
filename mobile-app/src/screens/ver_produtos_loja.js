import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getProdutosLoja } from '../services/servico_buscar_lojas';  // Importando a função para buscar produtos via WebSocket

export default function ProdutosLoja({ route }) {
  const { lojaId } = route.params;
  const navigation = useNavigation();

  const [carrinho, setCarrinho] = useState([]);
  const [exibirPromocoes, setExibirPromocoes] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [loja, setLoja] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [pesquisa, setPesquisa] = useState('');  // Novo estado para a pesquisa

  // Buscando os produtos da loja assim que o componente for montado
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await getProdutosLoja(lojaId);
        setLoja(response.produtosLoja.nome);
        setCategorias(response.produtosLoja.categorias); 

        if (response.produtosLoja && Array.isArray(response.produtosLoja.produtos)) {
          setProdutos(response.produtosLoja.produtos);
        } else {
          console.error('Formato inesperado de dados:', response);
          setProdutos([]); 
        }
      } catch (error) {
        console.error('Erro ao buscar produtos da loja:', error);
      }
    }

    fetchProdutos();
  }, [lojaId]);

  const adicionarAoCarrinho = (item) => {
    setCarrinho([...carrinho, item]);
    alert(`${item.name} adicionado ao carrinho`);
  };

  const renderizarProdutosPorCategoria = (categoria) => {
    const produtosFiltrados = (Array.isArray(produtos) ? produtos : [])
      .filter((produto) => 
        produto.category === categoria && 
        (exibirPromocoes ? produto.promotion === 'Sim' : true) &&
        produto.name.toLowerCase().includes(pesquisa.toLowerCase()) // Filtrando pelo nome
      );

    if (produtosFiltrados.length === 0) return null;

    return (
      <View key={categoria} style={styles.categoria_section}>
        <Text style={styles.categoria_titulo}>{categoria}</Text>
        <FlatList
          data={produtosFiltrados}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item_produto}
              onPress={() => navigation.navigate('DetalhesProduto', { produto: item })}
            >
              <Image source={{ uri: item.imagem }} style={styles.imagem_produto} />
              <Text style={styles.nome_produto}>{item.name}</Text>
              {item.promotion === 'Sim' ? (
                <View>
                  <Text style={styles.preco_promocao}>{`R$ ${item.promotion_price},00`}</Text>
                  <Text style={styles.preco_original}>{`R$ ${item.price},00`}</Text>
                </View>
              ) : (
                <Text style={styles.preco_produto}>{`R$ ${item.price}`}</Text>
              )}
              <TouchableOpacity style={styles.botao_adicionar} onPress={() => adicionarAoCarrinho(item)}>
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.info_loja}>
          <Text style={styles.nome_loja}>{ loja }</Text>
          <Text style={styles.horario_loja}>Distância: 3 Km</Text>
        </View>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.imagem_loja} />
      </View>

      {/* Barra de pesquisa */}
      <TextInput
        style={styles.inputPesquisa}
        placeholder="Pesquisar produto..."
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      {/* Botões para alternar entre promoção e todos os produtos */}
      <View style={styles.botoesFiltro}>
        <TouchableOpacity
          style={[styles.botaoFiltro, exibirPromocoes && styles.botaoAtivo]}
          onPress={() => setExibirPromocoes(true)}
        >
          <Text style={[styles.textoBotao, exibirPromocoes && styles.textoBotaoAtivo]}>Promoção</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botaoFiltro, !exibirPromocoes && styles.botaoAtivo]}
          onPress={() => setExibirPromocoes(false)}
        >
          <Text style={[styles.textoBotao, !exibirPromocoes && styles.textoBotaoAtivo]}>Padrão</Text>
        </TouchableOpacity>
      </View>

      {/* Categorias disponíveis - Scroll horizontal */}
      <Text style={styles.categoria_titulo}>Categorias</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorias_container}>
        {categorias.map((categoria) => (
          <View key={categoria} style={styles.item_categoria}>
            <Text style={styles.nome_categoria}>{categoria}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Renderizando produtos por categoria */}
      {categorias.map((categoria) => (
        <React.Fragment key={categoria}>
          {renderizarProdutosPorCategoria(categoria)}
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  info_loja: {
    flex: 1,
  },
  nome_loja: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  horario_loja: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  imagem_loja: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  inputPesquisa: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  botoesFiltro: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  botaoFiltro: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 5,
  },
  botaoAtivo: {
    backgroundColor: '#3ad3f3',
  },
  textoBotao: {
    fontSize: 16,
    color: '#3ad3f3',
  },
  textoBotaoAtivo: {
    color: '#fff',
  },
  categorias_container: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  item_categoria: {
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  nome_categoria: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  categoria_section: {
    marginBottom: 20,
  },
  categoria_titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  item_produto: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    position: 'relative',
    marginBottom: 3,
    marginTop: 3,
    marginLeft: 3,
    width: 130,
    height: 160,
  },
  imagem_produto: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  nome_produto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  preco_produto: {
    fontSize: 14,
    color: '#777',
  },
  preco_promocao: {
    fontSize: 14,
    color: '#d9534f',
    fontWeight: 'bold',
  },
  preco_original: {
    textDecorationLine: 'line-through',
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
  botao_adicionar: {
    position: 'absolute',
    bottom: 65,
    right: 10,
    backgroundColor: '#3ad3f3',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
