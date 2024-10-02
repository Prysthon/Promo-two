import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';

const VerAjuda = ({ navigation, route }) => {
  const [faqExpandida, setFaqExpandida] = useState(null);
  const [problemaCliente, setProblemaCliente] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentarioAvaliacao, setComentarioAvaliacao] = useState(''); // Novo estado para o comentário

  const pedido = route.params.item;

  const faq = [
    { id: 1, pergunta: 'Meu pedido está atrasado, o que fazer?', resposta: 'Você pode aguardar mais alguns minutos ou entrar em contato conosco.' },
    { id: 2, pergunta: 'Recebi um item errado, como proceder?', resposta: 'Abra um chamado e descreveremos os próximos passos.' },
    { id: 3, pergunta: 'Posso cancelar meu pedido?', resposta: 'Se o pedido ainda não foi preparado, é possível cancelar.' },
  ];

  const toggleFaq = (id) => {
    setFaqExpandida(faqExpandida === id ? null : id);
  };

  const ligarSuporte = () => {
    Alert.alert('Ligar para Suporte', 'Ligando para o suporte...');
  };

  const avaliarExperiencia = () => {
    if (avaliacao === 0 || comentarioAvaliacao === '') {
      Alert.alert('Erro', 'Por favor, selecione uma avaliação por estrelas e adicione um comentário.');
      return;
    }

    // Lógica para enviar a avaliação e o comentário
    Alert.alert('Obrigado!', 'Sua avaliação foi registrada com sucesso!');
    // Aqui você enviaria a avaliação e o comentário ao backend
  };

  return (
    <View style={{ padding: 16 }}>
      {/* Título e descrição */}
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Ajuda com o pedido</Text>
      <Text style={{ marginVertical: 8 }}>Selecione uma opção abaixo ou entre em contato com nosso suporte.</Text>

      {/* Detalhes do pedido */}
      <View style={{ marginVertical: 16, padding: 16, borderWidth: 1, borderRadius: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Detalhes do Pedido</Text>
        <Text>Pedido #{pedido.id}</Text>
        <Text>Status: {pedido.status}</Text>
        <Text>Itens: {pedido.itens}</Text>
      </View>

      {/* FAQ */}
      <FlatList
        data={faq}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => toggleFaq(item.id)}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8 }}>{item.pergunta}</Text>
            </TouchableOpacity>
            {faqExpandida === item.id && <Text style={{ marginLeft: 16 }}>{item.resposta}</Text>}
          </View>
        )}
      />

      {/* Botões de contato */}
      <View style={{ marginVertical: 16 }}>
        <Button title="Ligar para suporte" onPress={ligarSuporte} style={{ marginTop: 8 }} />
      </View>

      {/* Feedback de experiência */}
      <Text style={{ fontSize: 18, marginVertical: 8 }}>Avalie sua experiência:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}>
        {[1, 2, 3, 4, 5].map((valor) => (
          <TouchableOpacity key={valor} onPress={() => setAvaliacao(valor)}>
            <Text style={{ fontSize: 24 }}>{valor <= avaliacao ? '⭐' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Comentário sobre a experiência */}
      <Text style={{ fontSize: 18, marginVertical: 8 }}>Deixe um comentário:</Text>
      <TextInput
        value={comentarioAvaliacao}
        onChangeText={setComentarioAvaliacao}
        placeholder="Escreva aqui seu comentário"
        style={{ height: 80, borderColor: 'gray', borderWidth: 1, marginBottom: 8, padding: 8 }}
        multiline
      />

      {/* Botão de enviar avaliação */}
      <Button title="Enviar Avaliação" onPress={avaliarExperiencia} />
    </View>
  );
};

export default VerAjuda;
