import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';

export default function VerLojas() {
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
    <View style={styles.item_horizontal}>
      <Image source={{ uri: item.imagem }} style={styles.imagem_restaurante} />
      <Text style={styles.nome_restaurante}>{item.nome}</Text>
    </View>
  );

  const renderizarLojas = ({ item }) => {
    const estilo_container = item.aberta ? styles.item_vertical : [styles.item_vertical, styles.item_fechado];
    const estilo_imagem = item.aberta ? styles.imagem_loja : [styles.imagem_loja, { opacity: 0.5 }];
    const estilo_texto_nome = item.aberta ? styles.nome_loja : [styles.nome_loja, { color: '#ffffff' }];
    const estilo_texto_geral = item.aberta ? styles.texto_geral : [styles.texto_geral, { color: '#808080' }];

    return (
      <View style={estilo_container}>
        <Image source={{ uri: item.imagem }} style={estilo_imagem} />
        <Text style={estilo_texto_nome}>{item.nome}</Text>
        <Text style={estilo_texto_geral}>{`${item.estrelas} ⭐ | ${item.tipo} | ${item.distancia}`}</Text>
        <Text style={estilo_texto_geral}>{item.tempo_espera}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
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
  lista_horizontal: {
    marginBottom: 20,
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
});
