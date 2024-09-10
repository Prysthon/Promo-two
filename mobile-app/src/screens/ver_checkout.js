import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function VerCheckout() {
  const navigation = useNavigation();

  // Dados simulados de endereço, pagamento e CPF
  const endereco = {
    rua: 'Rua Exemplo, 123',
    bairro: 'Bairro Exemplo',
    complemento: 'Apto 45B',
  };

  const cartao = {
    nome: 'Cartão Visa',
    bandeira: 'Visa',
    ultimos_digitos: '1234',
  };

  const cpf = '123.456.789-09';

  const subtotal = 74.97;
  const TAXA_ENTREGA = 5.99;
  const itens_promocao = 10.00;  // Simulação de desconto em itens
  const total = subtotal + TAXA_ENTREGA - itens_promocao;

  const revisarPedido = () => {
    // Implementar lógica de revisar pedido
    alert('Revisando pedido...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo_secao}>Entregar no Endereço</Text>
      <View style={styles.item_checkout}>
        <View style={styles.icon_item}>
          <MaterialIcons name="location-on" size={24} color="#3ad3f3" />
        </View>
        <View style={styles.detalhes_item}>
          <Text style={styles.texto_item}>{endereco.rua}</Text>
          <Text style={styles.texto_subitem}>{`${endereco.bairro}, ${endereco.complemento}`}</Text>
        </View>
        <TouchableOpacity 
          style={styles.botao_trocar} 
          onPress={() => navigation.navigate('Enderecos')}
        >
          <Text style={styles.texto_botao_trocar}>Trocar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo_secao}>Forma de Pagamento</Text>
      <View style={styles.item_checkout}>
        <View style={styles.icon_item}>
          <FontAwesome name="credit-card" size={24} color="#3ad3f3" />
        </View>
        <View style={styles.detalhes_item}>
          <Text style={styles.texto_item}>{cartao.nome}</Text>
          <Text style={styles.texto_subitem}>{`${cartao.bandeira}, **** ${cartao.ultimos_digitos}`}</Text>
        </View>
        <TouchableOpacity 
          style={styles.botao_trocar}
          onPress={() => navigation.navigate('VerFormasPagamento')}
        >
          <Text style={styles.texto_botao_trocar}>Trocar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo_secao}>CPF na Nota</Text>
      <View style={styles.item_checkout}>
        <View style={styles.icon_item}>
          <FontAwesome name="id-card" size={24} color="#3ad3f3" />
        </View>
        <View style={styles.detalhes_item}>
          <Text style={styles.texto_item}>{cpf}</Text>
        </View>
        <TouchableOpacity style={styles.botao_trocar}>
          <Text style={styles.texto_botao_trocar}>Trocar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo_secao}>Resumo da Compra</Text>
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
          <Text style={styles.texto_resumo}>Itens em Promoção</Text>
          <Text style={styles.texto_resumo}>- R$ {itens_promocao.toFixed(2)}</Text>
        </View>
        <View style={[styles.linha_resumo, styles.linha_total]}>
          <Text style={[styles.texto_resumo, styles.texto_total]}>Total</Text>
          <Text style={[styles.texto_resumo, styles.texto_total]}>R$ {total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.botao_revisar}
        onPress={revisarPedido}
      >
        <Text style={styles.texto_botao_revisar}>Finalizar Pedido • R$ {total.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo_secao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item_checkout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  icon_item: {
    marginRight: 10,
  },
  detalhes_item: {
    flex: 1,
  },
  texto_item: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  texto_subitem: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  botao_trocar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3ad3f3',
    borderRadius: 5,
  },
  texto_botao_trocar: {
    color: '#fff',
    fontSize: 14,
  },
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
  linha_total: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
    marginTop: 10,
  },
  texto_total: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  botao_revisar: {
    backgroundColor: '#3ad3f3',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  texto_botao_revisar: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});