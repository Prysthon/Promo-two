import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function VerProdutosLoja({ route }) {
  const { lojaId } = route.params;

  // Dados da loja simulados
  const lojas = [
    {
      id: '1',
      nome: 'Loja A',
      bairro: 'Centro',
      estrelas: 4.5,
      tempo_espera: '30 min',
      preco_entrega: 'R$ 5,00',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBQtDg6Zr3tF-cD_rsd9ud4cCD-EWFPjyPQw&s',
      categorias: {
        Elétricos: [
          { id: '1', nome: 'Furadeira', preco: 'R$ 150,00', descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa', imagem: 'https://s2-ge.glbimg.com/RQvwAvQ6_8lPQJdfT37lE7LnnYg=/0x0:710x491/984x0/smart/filters:strip_icc()/s.glbimg.com/es/ge/f/original/2019/08/20/gorduras_saturadas_trans_fast_food.jpg' },
          { id: '2', nome: 'Parafusadeira', preco: 'R$ 200,00', descricao: 'BBBB' },
        ],
        Hidráulicos: [
          { id: '3', nome: 'Torneira', preco: 'R$ 50,00', descricao: 'CCC' },
          { id: '4', nome: 'Mangueira', preco: 'R$ 30,00', descricao: 'EEEE' },
        ],
        Alimentos: [
          { id: '5', nome: 'Arroz', preco: 'R$ 20,00', descricao: 'DDDD' },
          { id: '6', nome: 'Feijão', preco: 'R$ 10,00', descricao: 'FFFFF' },
        ],
        Bebidas: [
          { id: '7', nome: 'Refrigerante', preco: 'R$ 8,00', descricao: 'GGGG' },
          { id: '8', nome: 'Água Mineral', preco: 'R$ 3,00', descricao: 'HHHHHHH' },
        ],
      },
    },
  ];

  // Filtra a loja correspondente
  const loja_selecionada = lojas.find((loja) => loja.id === lojaId);

  if (!loja_selecionada) {
    return (
      <View style={styles.container}>
        <Text>Loja não encontrada</Text>
      </View>
    );
  }

  // Renderização de cada produto
  const renderizarProduto = ({ item }) => (
    <View style={styles.item_produto}>
      <View style={{width: '60%'}}>
        <Text style={styles.nome_produto}>{item.nome}</Text>
        <Text style={styles.descricao_produto}>{item.descricao}</Text>
        <Text style={styles.preco_produto}>{item.preco}</Text>
      </View>
      <Image source={{ uri: item.imagem }} style={styles.imagem_restaurante}/>
    </View>
  );

  // Renderização das categorias
  const renderizarCategorias = () => {
    return Object.keys(loja_selecionada.categorias).map((categoria) => (
      <View key={categoria} style={styles.categoria_section}>
        <Text style={styles.categoria_titulo}>{categoria}</Text>
        {loja_selecionada.categorias[categoria].map((produto) => (
          <View key={produto.id}>
            {renderizarProduto({ item: produto })}
          </View>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Painel Superior */}
      <View style={styles.painel_superior}>
        <Image source={{ uri: loja_selecionada.imagem }} style={styles.imagem_loja} />
        <View style={styles.detalhes_loja}>
          <Text style={styles.nome_loja}>{loja_selecionada.nome}</Text>
          <Text style={styles.info_loja}>Bairro: {loja_selecionada.bairro}</Text>
          <Text style={styles.info_loja}>⭐ {loja_selecionada.estrelas}</Text>
          <Text style={styles.info_loja}>Tempo de Espera: {loja_selecionada.tempo_espera}</Text>
          <Text style={styles.info_loja}>Preço da Entrega: {loja_selecionada.preco_entrega}</Text>
        </View>
      </View>

      {/* Lista de Produtos por Categorias */}
      {renderizarCategorias()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3ad3f3',
  },
  painel_superior: {
    position: 'relative',
    marginBottom: 50,
  },
  imagem_loja: {
    width: '100%',
    height: 150,
  },
  detalhes_loja: {
    position: 'absolute',
    bottom: -40,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  nome_loja: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  info_loja: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  categoria_section: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoria_titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  item_produto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome_produto: {
    fontSize: 16,
    color: '#333',
  },
  preco_produto: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  descricao_produto: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  imagem_restaurante: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
});
