import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addProdutoSacola } from '../services/servico_sacola';  // Importando a função addProdutoSacola

export default function VerDetalhesProduto({ route, navigation }) {
  const { produto } = route.params;
  const sale_id = 1;  // Exemplo de sale_id (pode ser dinâmico se necessário)

  const [quantidade, setQuantidade] = useState(1);

  // Função para adicionar ao carrinho
  const adicionarAoCarrinho = async () => {
    try {
      // Chama a função addProdutoSacola passando os parâmetros corretos
      await addProdutoSacola(
        sale_id, 
        produto.id, 
        quantidade, 
        produto.price, 
        produto.name, 
        produto.imagem
      );

      // Exibe o alerta de sucesso
      Alert.alert(
        'Adicionado à Sacola',
        `${produto.name} (x${quantidade}) adicionado à sacola.`,
        [
          { text: 'OK', onPress: () => navigation.goBack() } // Redireciona para a página anterior ao clicar "OK"
        ]
      );
    } catch (error) {
      console.error('Erro ao adicionar produto à sacola:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o produto à sacola. Tente novamente.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Imagem do Produto sem restrição de padding */}
      <View style={styles.imagem_container}>
        <Image source={{ uri: produto.imagem }} style={styles.imagem_produto} />
      </View>

      {/* Nome do Produto */}
      <Text style={styles.nome_produto}>{produto.name}</Text>

      {/* Preço e Tamanho (se aplicável) */}
      <View style={styles.preco_tamanho_container}>
        <Text style={styles.preco}>R$ {produto.price.toFixed(2)}</Text>
        {produto.tamanho && <Text style={styles.tamanho}>Tamanho: {produto.tamanho}</Text>}
      </View>

      {/* Botão Adicionar à Sacola */}
      <TouchableOpacity style={styles.botao_adicionar_sacola} onPress={adicionarAoCarrinho}>
        <Text style={styles.texto_botao_adicionar}>Adicionar à Sacola</Text>
      </TouchableOpacity>

      {/* Opções de Quantidade */}
      <View style={styles.quantidade_container}>
        <TouchableOpacity style={styles.botao_quantidade} onPress={() => setQuantidade(2)}>
          <Text style={styles.texto_botao_quantidade}>+2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao_quantidade} onPress={() => setQuantidade(6)}>
          <Text style={styles.texto_botao_quantidade}>+6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao_quantidade} onPress={() => setQuantidade(12)}>
          <Text style={styles.texto_botao_quantidade}>+12</Text>
        </TouchableOpacity>
      </View>

      {/* Descrição do Produto */}
      <Text style={styles.descricao_titulo}>Descrição do Produto</Text>
      <Text style={styles.descricao}>{produto.description || 'Este produto não possui descrição disponível.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 15,
    paddingTop: 0, 
  },
  imagem_container: {
    width: '100%',
    marginBottom: 20,
  },
  imagem_produto: {
    width: '100%',
    height: 250,
  },
  nome_produto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  preco_tamanho_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  preco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tamanho: {
    fontSize: 16,
    color: '#777',
  },
  botao_adicionar_sacola: {
    backgroundColor: '#3ad3f3',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  texto_botao_adicionar: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantidade_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botao_quantidade: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '32%',
  },
  texto_botao_quantidade: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  descricao_titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
});
