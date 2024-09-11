import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VerLojas() {
  const navigation = useNavigation();

  const lojas_destacadas = [
    { id: '1', nome: 'Restaurante X', imagem: 'https://via.placeholder.com/100' },
    { id: '2', nome: 'Restaurante Y', imagem: 'https://via.placeholder.com/100' },
    { id: '3', nome: 'Restaurante Z', imagem: 'https://via.placeholder.com/100' },
    { id: '4', nome: 'Restaurante A', imagem: 'https://via.placeholder.com/100' },
  ];

  const lojas = [
    { id: '1', nome: 'Loja A', estrelas: 4.5, tipo: 'Pizza', distancia: '2km', tempo_espera: '30 min', imagem: 'https://via.placeholder.com/100', aberta: true },
    { id: '2', nome: 'Loja B', estrelas: 4.2, tipo: 'Sushi', distancia: '3km', tempo_espera: '25 min', imagem: 'https://via.placeholder.com/100', aberta: false },
    { id: '3', nome: 'Loja C', estrelas: 4.8, tipo: 'Hambúrguer', distancia: '1.5km', tempo_espera: '20 min', imagem: 'https://via.placeholder.com/100', aberta: true },
  ];

  const renderizarLojasDestacadas = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Produtos', { lojaId: item.id })}
    >
      <View style={styles.item_horizontal}>
        <Image source={{ uri: item.imagem }} style={styles.imagem_restaurante} />
        <Text style={styles.nome_restaurante}>{item.nome}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderizarLojas = ({ item }) => {
    const estilo_container = item.aberta ? styles.item_vertical : [styles.item_vertical, styles.item_fechado];
    const estilo_imagem = item.aberta ? styles.imagem_loja : [styles.imagem_loja, { opacity: 0.5 }];
    const estilo_texto_nome = item.aberta ? styles.nome_loja : [styles.nome_loja, { color: '#ffffff' }];
    const estilo_texto_geral = item.aberta ? styles.texto_geral : [styles.texto_geral, { color: '#808080' }];

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Produtos', { lojaId: item.id })}>
        <View style={estilo_container}>
          <Image source={{ uri: item.imagem }} style={estilo_imagem} />
          <Text style={estilo_texto_nome}>{item.nome}</Text>
          <Text style={estilo_texto_geral}>{`${item.estrelas} ⭐ | ${item.tipo} | ${item.distancia}`}</Text>
          <Text style={estilo_texto_geral}>{item.tempo_espera}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo_secao}>Produtos em Destaque</Text>
        <FlatList
          data={lojas_destacadas}
          renderItem={renderizarLojasDestacadas}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.lista_horizontal}
        />

        <Text style={styles.titulo_secao}>Lojas</Text>
        {lojas.map((loja) => (
          <View key={loja.id}>
            {renderizarLojas({ item: loja })}
          </View>
        ))}
      </ScrollView>
      
      {/* Botão Adicionar ao Carrinho */}
      <View style={styles.botao_adicionar_carrinho}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.imagem_loja_botao} />
        <View style={styles.informacoes_carrinho}>
          <Text style={styles.texto_total}>Total sem taxa</Text>
          <Text style={styles.texto_preco}>R$ 49,98 / 3 itens</Text>
        </View>
        <TouchableOpacity
          style={styles.botao_finalizar_compra}
          onPress={() => navigation.navigate('Carrinho')}
        >
          <Text style={styles.texto_botao_finalizar_compra}>Ver Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titulo_secao: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  lista_horizontal: {
    marginBottom: 20,
    paddingLeft: 15,
  },
  item_horizontal: {
    alignItems: 'center',
    marginRight: 15,
  },
  imagem_restaurante: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  nome_restaurante: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  item_vertical: {
    backgroundColor: '#3ad3f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    position: 'relative',
  },
  item_fechado: {
    backgroundColor: '#d3d3d3',
  },
  imagem_loja: {
    width: 80,
    height: 78,
    borderRadius: 40,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  nome_loja: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  texto_geral: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  // Estilos do Botão Adicionar ao Carrinho
  botao_adicionar_carrinho: {
    flexDirection: 'row',
    backgroundColor: '#3ad3f3',
    padding: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imagem_loja_botao: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  informacoes_carrinho: {
    flex: 1,
    marginLeft: 15,
  },
  texto_total: {
    color: '#fff',
    fontSize: 14,
  },
  texto_preco: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botao_finalizar_compra: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  texto_botao_finalizar_compra: {
    color: '#3ad3f3',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

