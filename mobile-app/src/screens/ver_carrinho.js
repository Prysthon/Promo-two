import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VerCarrinho() {
  const navigation = useNavigation();

  // Simulação de produtos adicionados ao carrinho
  const [produtos, setProdutos] = useState([
    { id: '1', nome: 'Produto A', imagem: 'https://via.placeholder.com/100', preco: 29.99, quantidade: 1 },
    { id: '2', nome: 'Produto B', imagem: 'https://via.placeholder.com/100', preco: 19.99, quantidade: 2 },
  ]);

  // Simulação de produtos recomendados
  const produtosRecomendados = [
    { id: '3', nome: 'Produto C', imagem: 'https://via.placeholder.com/100', preco: 14.99 },
    { id: '4', nome: 'Produto D', imagem: 'https://via.placeholder.com/100', preco: 24.99 },
    { id: '5', nome: 'Produto E', imagem: 'https://via.placeholder.com/100', preco: 9.99 },
  ];

  const adicionarQuantidade = (id) => {
    setProdutos((produtos) =>
      produtos.map((produto) =>
        produto.id === id ? { ...produto, quantidade: produto.quantidade + 1 } : produto
      )
    );
  };

  const diminuirQuantidade = (id) => {
    setProdutos((produtos) =>
      produtos.map((produto) =>
        produto.id === id && produto.quantidade > 1
          ? { ...produto, quantidade: produto.quantidade - 1 }
          : produto
      )
    );
  };

  const removerProduto = (id) => {
    setProdutos((produtos) => produtos.filter((produto) => produto.id !== id));
  };

  const renderizarProduto = ({ item }) => (
    <View style={styles.produto}>
      <Image source={{ uri: item.imagem }} style={styles.imagem_produto} />
      <View style={styles.detalhes_produto}>
        <Text style={styles.nome_produto}>{item.nome}</Text>
        <Text style={styles.preco_produto}>R$ {item.preco.toFixed(2)}</Text>
      </View>
      <View style={styles.controle_quantidade}>
        {item.quantidade > 1 ? (
          <TouchableOpacity onPress={() => diminuirQuantidade(item.id)}>
            <Text style={styles.botao_quantidade}>-</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => removerProduto(item.id)}>
            <Text style={styles.botao_lixeira}>🗑️</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.quantidade}>{item.quantidade}</Text>
        <TouchableOpacity onPress={() => adicionarQuantidade(item.id)}>
          <Text style={styles.botao_quantidade}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderizarProdutoRecomendado = ({ item }) => (
    <View style={styles.produto_recomendado}>
      <Image source={{ uri: item.imagem }} style={styles.imagem_recomendada} />
      <Text style={styles.nome_produto}>{item.nome}</Text>
      <Text style={styles.preco_produto}>R$ {item.preco.toFixed(2)}</Text>
    </View>
  );

  const calcularSubtotal = () => {
    return produtos.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
  };

  const taxaEntrega = 5.99;
  const subtotal = calcularSubtotal();
  const total = subtotal + taxaEntrega;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.nome_loja}>Nome da Loja</Text>
      <TouchableOpacity
        style={styles.botao_adicionar}
        onPress={() => navigation.navigate('Início')}
      >
        <Text style={styles.texto_botao_adicionar}>Adicionar mais itens</Text>
      </TouchableOpacity>

      {
      produtos.map((produto) => (
          <View key={produto.id} style={styles.lista_produtos}>
            {renderizarProduto({ item: produto })}
          </View>
        ))
      }


      <Text style={styles.titulo_secao}>Peça Também</Text>
      <FlatList
        data={produtosRecomendados}
        renderItem={renderizarProdutoRecomendado}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.lista_recomendada}
      />

      <View style={styles.resumo_valores}>
        <View style={styles.linha_resumo}>
          <Text style={styles.texto_resumo}>Subtotal</Text>
          <Text style={styles.texto_resumo}>R$ {subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.linha_resumo}>
          <Text style={styles.texto_resumo}>Taxa de Entrega</Text>
          <Text style={styles.texto_resumo}>R$ {taxaEntrega.toFixed(2)}</Text>
        </View>
        <View style={styles.linha_resumo}>
          <Text style={[styles.texto_resumo, styles.texto_total]}>Total</Text>
          <Text style={[styles.texto_resumo, styles.texto_total]}>R$ {total.toFixed(2)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  nome_loja: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botao_adicionar: {
    backgroundColor: '#3ad3f3',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  texto_botao_adicionar: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  lista_produtos: {
    paddingBottom: 20,
  },
  produto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
  },
  imagem_produto: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  detalhes_produto: {
    flex: 1,
  },
  nome_produto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  preco_produto: {
    fontSize: 14,
    color: '#888',
  },
  controle_quantidade: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botao_quantidade: {
    fontSize: 20,
    color: '#3ad3f3',
    paddingHorizontal: 10,
  },
  botao_lixeira: {
    fontSize: 20,
    color: '#ff0000',
    paddingHorizontal: 10,
  },
  quantidade: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  // Estilos para a seção "Peça Também"
  titulo_secao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lista_recomendada: {
    paddingBottom: 20,
  },
  produto_recomendado: {
    alignItems: 'center',
    marginRight: 15,
  },
  imagem_recomendada: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  // Estilos para o resumo de valores
  resumo_valores: {
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  linha_resumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  texto_resumo: {
    fontSize: 16,
  },
  texto_total: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

