import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getLojas } from '../services/servico_buscar_lojas'  // Importando a função para obter as lojas via WebSocket

export default function VerLojas() {
  const navigation = useNavigation();
  const [lojas, setLojas] = useState([]);
  const [lojasDestacadas, setLojasDestacadas] = useState([]);

  useEffect(() => {
    // Obtendo as lojas assim que o componente carrega
    async function fetchLojas() {
      try {
        const { data } = await getLojas();
        setLojas(data);
        // Exemplo: pegando as três primeiras lojas como destaque
        setLojasDestacadas(data.slice(0, 3));
      } catch (error) {
        console.error('Erro ao buscar lojas:', error);
      }
    }

    fetchLojas();
  }, []);

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
    const estiloContainer = item.aberta ? styles.item_vertical : [styles.item_vertical, styles.item_fechado];
    const estiloImagem = item.aberta ? styles.imagem_loja : [styles.imagem_loja, { opacity: 0.5 }];
    const estiloTextoNome = item.aberta ? styles.nome_loja : [styles.nome_loja, { color: '#ffffff' }];
    const estiloTextoGeral = item.aberta ? styles.texto_geral : [styles.texto_geral, { color: '#808080' }];

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Produtos', { lojaId: item.id })}>
        <View style={estiloContainer}>
          <Image source={{ uri: item.imagem }} style={estiloImagem} />
          <Text style={estiloTextoNome}>{item.nome}</Text>
          <Text style={estiloTextoGeral}>{`${item.avaliacao} ⭐ | ${item.distancia}`}</Text>
          <Text style={estiloTextoGeral}>{item.tempo_entrega}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo_secao}>Produtos em Destaque</Text>
        <FlatList
          data={lojasDestacadas}
          renderItem={renderizarLojasDestacadas}
          keyExtractor={(item) => item.id.toString()}
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
