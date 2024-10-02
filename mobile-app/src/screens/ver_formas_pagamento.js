import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FormasPagamento = [
  {
    id: '1',
    cardNumber: '**** **** **** 1234',
    cardType: 'Visa',
    expiryDate: '08/24',
    isDefault: true,
  },
  {
    id: '2',
    cardNumber: '**** **** **** 5678',
    cardType: 'Mastercard',
    expiryDate: '11/23',
    isDefault: false,
  },
  // Adicione mais métodos de pagamento conforme necessário
];

export default function VerFormasPagamento() {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.cardType}>{item.cardType}</Text>
        <Text style={styles.cardNumber}>{item.cardNumber}</Text>
        <Text style={styles.expiryDate}>Validade: {item.expiryDate}</Text>
        {item.isDefault && <Text style={styles.defaultText}>Padrão</Text>}
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Icon name="pencil" size={20} color="#3ad3f3" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton}>
        <Icon name="trash" size={20} color="#f34d3a" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Métodos de Pagamento</Text>
      <FlatList
        data={FormasPagamento}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Novo Método</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cardType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardNumber: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  expiryDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  defaultText: {
    fontSize: 14,
    color: '#3ad3f3',
    marginTop: 5,
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {},
  addButton: {
    backgroundColor: '#3ad3f3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
