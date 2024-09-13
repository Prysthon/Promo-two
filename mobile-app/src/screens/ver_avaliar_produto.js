import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

export default function AvaliarProduto({ route, navigation }) {
  const [comentario, setComentario] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [aspectosSelecionados, setAspectosSelecionados] = useState({
    bomAtendimento: false,
    entregaRapida: false,
    produtoDanificado: false,
    pedidoIncorreto: false,
  });
  const [produto, setProduto] = useState({
    nome: route.params.item.nome,
    imagem: route.params.item.imagem,
    preco: route.params.item.total,
  });

  const enviarAvaliacao = () => {
    const dadosAvaliacao = {
      avaliacao,
      comentario,
      aspectosSelecionados,
    };
    
    // Exibir alerta e navegar de volta
    Alert.alert(
      'Avaliação Enviada', 
      'Sua avaliação foi enviada com sucesso!',
      [
        { text: 'OK', onPress: () => navigation.goBack() } // Redireciona para a página anterior ao clicar "OK"
      ]
    );
  };

  const alternarAspecto = (aspecto) => {
    setAspectosSelecionados({
      ...aspectosSelecionados,
      [aspecto]: !aspectosSelecionados[aspecto],
    });
  };

  return (
    <View style={styles.container}>
      {/* Resumo do Produto */}
      <View style={styles.resumoProduto}>
        <Image source={{ uri: produto.imagem }} style={styles.imagemProduto} />
        <View>
          <Text style={styles.nomeProduto}>{produto.nome}</Text>
          <Text style={styles.precoProduto}>{produto.preco}</Text>
        </View>
      </View>

      {/* Avaliação com estrelas */}
      <Text style={styles.subtitulo}>Avalie o produto:</Text>
      <AirbnbRating
        count={5}
        reviews={['Péssimo', 'Ruim', 'Ok', 'Bom', 'Excelente']}
        defaultRating={0}
        size={30}
        onFinishRating={(rating) => setAvaliacao(rating)}
      />

      {/* Comentário */}
      <Text style={[styles.subtitulo, { marginTop: 30 }]}>Deixe um comentário:</Text>
      <TextInput
        style={styles.inputComentario}
        placeholder="Digite aqui o seu comentário..."
        value={comentario}
        onChangeText={setComentario}
        multiline
      />

      {/* Checklist de aspectos positivos/negativos */}
      <Text style={styles.subtitulo}>Selecione o que você achou:</Text>
      <TouchableOpacity
        style={[
          styles.botaoAspecto,
          aspectosSelecionados.bomAtendimento && styles.aspectoSelecionado,
        ]}
        onPress={() => alternarAspecto('bomAtendimento')}
      >
        <Text style={styles.textoBotaoAspecto}>Bom Atendimento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.botaoAspecto,
          aspectosSelecionados.entregaRapida && styles.aspectoSelecionado,
        ]}
        onPress={() => alternarAspecto('entregaRapida')}
      >
        <Text style={styles.textoBotaoAspecto}>Entrega Rápida</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.botaoAspecto,
          aspectosSelecionados.produtoDanificado && styles.aspectoSelecionado,
        ]}
        onPress={() => alternarAspecto('produtoDanificado')}
      >
        <Text style={styles.textoBotaoAspecto}>Produto Danificado</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.botaoAspecto,
          aspectosSelecionados.pedidoIncorreto && styles.aspectoSelecionado,
        ]}
        onPress={() => alternarAspecto('pedidoIncorreto')}
      >
        <Text style={styles.textoBotaoAspecto}>Pedido Incorreto</Text>
      </TouchableOpacity>

      {/* Botão para enviar a avaliação */}
      <TouchableOpacity style={styles.botaoEnviar} onPress={enviarAvaliacao}>
        <Text style={styles.textoBotaoEnviar}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  resumoProduto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagemProduto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  nomeProduto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  precoProduto: {
    fontSize: 16,
    color: '#666666',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  inputComentario: {
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333333',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  botaoAspecto: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  aspectoSelecionado: {
    backgroundColor: '#3ad3f3',
  },
  textoBotaoAspecto: {
    color: '#000000',
    fontSize: 16,
  },
  botaoEnviar: {
    backgroundColor: '#ff6f61',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotaoEnviar: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
