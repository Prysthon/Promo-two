import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VerUltimosPedidos() {
  const navigation = useNavigation();

  const ultimo_pedido = {
    id: '1',
    nome: 'Restaurante A',
    imagem: 'https://via.placeholder.com/100',
    itens: 'Pizza, Coca-Cola',
    total: 'R$ 45,00',
  };

  const historico_pedidos = [
    {
      id: '1',
      data: '01/08/2024',
      nome: 'Restaurante B',
      imagem: 'https://via.placeholder.com/100',
      status: 'Entregue',
      numero_pedido: '#12345',
      itens: 'Sushi, Água',
      total: 'R$ 60,00',
    },
    {
      id: '2',
      data: '25/07/2024',
      nome: 'Restaurante C',
      imagem: 'https://via.placeholder.com/100',
      status: 'Cancelado',
      numero_pedido: '#12344',
      itens: 'Hambúrguer, Batata Frita',
      total: 'R$ 30,00',
    },
    // Adicione mais pedidos conforme necessário
  ];

  const renderizarItemPedido = ({ item }) => (
    <View style={styles.item_pedido}>
      <View style={styles.header_pedido}>
        <Text style={styles.data_pedido}>{item.data}</Text>
        <Image source={{ uri: item.imagem }} style={styles.imagem_pedido} />
      </View>
      <Text style={styles.nome_pedido}>{item.nome}</Text>
      <Text style={styles.detalhes_pedido}>{item.itens}</Text>
      <Text style={styles.total_pedido}>{item.total}</Text>
      <View style={styles.footer_pedido}>
        <Text style={styles.status_pedido}>{item.status}</Text>
        <Text style={styles.numero_pedido}>{item.numero_pedido}</Text>
      </View>
      <View style={styles.row_botoes}>
        <TouchableOpacity 
          style={styles.botao_ajuda}
          onPress={() => navigation.navigate('Ajuda', { item: item })}
        >
          <Text style={styles.texto_botao}>Ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.botao_avaliar} 
          onPress={() => navigation.navigate('AvaliarProduto', { item: item })}
        >
          <Text style={styles.texto_botao}>Avalie o pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const redirecionarParaProdutos = () => {
    navigation.navigate('Produtos', { lojaId: ultimo_pedido.id }); 
  };

  return (
    <ScrollView style={styles.container}>
      {/* Último Pedido */}
      <View style={styles.container_ultimo_pedido}>
        <Text style={styles.titulo_secao}>Loja do último pedido</Text>
        <Image source={{ uri: ultimo_pedido.imagem }} style={styles.imagem_ultimo_pedido} />
        <Text style={styles.nome_pedido}>{ultimo_pedido.nome}</Text>
        <Text style={styles.detalhes_pedido}>{ultimo_pedido.itens}</Text>
        <Text style={styles.total_pedido}>{ultimo_pedido.total}</Text>
        <TouchableOpacity style={styles.botao_visitar_loja} onPress={redirecionarParaProdutos}>
          <Text style={styles.texto_botao}>Visitar loja</Text>
        </TouchableOpacity>
      </View>

      {/* Histórico de Pedidos */}
      <Text style={styles.titulo_secao}>Histórico de Pedidos</Text>
      <View style={styles.lista_historico_pedidos}>
        {historico_pedidos.map((item) => (
          <View key={item.id}>
            {renderizarItemPedido({ item })}
          </View>
        ))}
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
  titulo_secao: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  container_ultimo_pedido: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  imagem_ultimo_pedido: {
    width: 100,
    height: 100,
    borderRadius: 10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  nome_pedido: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  detalhes_pedido: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  total_pedido: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  botao_visitar_loja: {
    backgroundColor: '#3ad3f3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  texto_botao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista_historico_pedidos: {
    marginBottom: 20,
  },
  item_pedido: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  header_pedido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  data_pedido: {
    fontSize: 14,
    color: '#666666',
  },
  imagem_pedido: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  footer_pedido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  status_pedido: {
    fontSize: 14,
    color: '#3ad3f3',
  },
  numero_pedido: {
    fontSize: 14,
    color: '#666666',
  },
  row_botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botao_ajuda: {
    backgroundColor: '#ff6f61',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '49%',
  },
  botao_avaliar: {
    backgroundColor: '#3ad3f3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '49%',
  },
});
