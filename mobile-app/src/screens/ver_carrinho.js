import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  getProdutosSacola, 
  addProdutoSacola, 
  removeProdutoSacola, 
  subscribeToSacolaAtualizada,
} from '../services/servico_sacola'; 

export default function VerCarrinho() {
  const navigation = useNavigation();

  const [produtos, setProdutos] = useState([]);
  const sale_id = 1;  // Exemplo de sale_id

  const carregarSacola = async () => {
    try {
      const result = await getProdutosSacola(1);  // Pede os produtos da sacola com sale_id = 1  
      if (result && result.produtos) {
        // Caso sucesso, atualiza a lista de produtos no estado
        setProdutos(result.produtos);
      } else {
        console.error('Erro ao carregar sacola: Nenhum produto encontrado.');
      }
    } catch (error) {
      console.error('Erro ao carregar sacola:', error.message);
    }
  };
  
  useEffect(() => {
    carregarSacola();  // Carrega a sacola quando o componente é montado

    // Escuta atualizações da sacola via WebSocket
    subscribeToSacolaAtualizada((data) => {
      if (data && data.produtos) {
        setProdutos(data.produtos);
      }
    });
  }, [produtos]);

  const adicionarQuantidade = (id) => {
    const produto = produtos.find(p => p.produto_id === id);
    if (produto) {
      addProdutoSacola(sale_id, id, produto.quantity + 1, produto.price);
    }
  };

  const diminuirQuantidade = (id) => {
    const produto = produtos.find(p => p.produto_id === id);
    if (produto) {
      if (produto.quantity > 1) {
        addProdutoSacola(sale_id, id, produto.quantity - 1, produto.price);
      } else {
        removeProdutoSacola(sale_id, id);
      }
    }
  };

  const removerProduto = (id) => {
    removeProdutoSacola(sale_id, id);
  };

  const handleProdutoPress = (produto) => {
    navigation.navigate('DetalhesProduto', { produto: produto });
  };

  const renderizarProduto = ({ item }) => (
    <TouchableOpacity onPress={() => handleProdutoPress(item)}>
      <View style={styles.produto}>
        <Image source={{ uri: item.imagem }} style={styles.imagem_produto} />
        <View style={styles.detalhes_produto}>
          <Text style={styles.nome_produto}>{item.nome}</Text>
          <Text style={styles.preco_produto}>R$ {item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.controle_quantidade}>
          {item.quantity > 1 ? (
            <TouchableOpacity onPress={() => diminuirQuantidade(item.produto_id)}>
              <Text style={styles.botao_quantidade}>-</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => removerProduto(item.produto_id)}>
              <Text style={styles.botao_lixeira}>🗑️</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.quantidade}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => adicionarQuantidade(item.produto_id)}>
            <Text style={styles.botao_quantidade}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const calcularSubtotal = () => {
    if (Array.isArray(produtos) && produtos.length > 0) {
      return produtos.reduce((total, produto) => total + produto.price * produto.quantity, 0);
    }
    return 0; // Retorna 0 caso não haja produtos
  };

  const TAXA_ENTREGA = 5.99;
  const subtotal = calcularSubtotal();
  const total = subtotal + TAXA_ENTREGA;

  const finalizarCompra = () => {
    navigation.navigate('Checkout');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.nome_loja}>Nome da Loja</Text>
      <TouchableOpacity
        style={styles.botao_adicionar}
        onPress={() => navigation.navigate('Inicio')}
      >
        <Text style={styles.texto_botao_adicionar}>Adicionar mais itens</Text>
      </TouchableOpacity>

      {produtos.map((produto) => (
        <View key={produto.produto_id} style={styles.lista_produtos}>
          {renderizarProduto({ item: produto })}
        </View>
      ))}

      <View style={styles.resumo_valores}>
        <View style={styles.linha_resumo}>
          <Text style={styles.texto_resumo}>Subtotal</Text>
          <Text style={styles.texto_resumo}>R$ {subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.linha_resumo}>
          <Text style={styles.texto_resumo}>Taxa de Entrega</Text>
          <Text style={styles.texto_resumo}>R$ {TAXA_ENTREGA.toFixed(2)}</Text>
        </View>
        <View style={styles.linha_resumo}>
          <Text style={[styles.texto_resumo, styles.texto_total]}>Total</Text>
          <Text style={[styles.texto_resumo, styles.texto_total]}>R$ {total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.botao_finalizar}
        onPress={finalizarCompra}
      >
        <Text style={styles.texto_botao_finalizar}>Finalizar Compra</Text>
      </TouchableOpacity>
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
  resumo_valores: {
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
  botao_finalizar: {
    backgroundColor: '#3ad3f3',
    paddingVertical: 15,
    borderRadius: 5,
  },
  texto_botao_finalizar: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});
