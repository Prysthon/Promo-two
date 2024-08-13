import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const purchases = [
  {
    id: '1',
    productName: 'Produto 1',
    purchaseDate: '2024-08-10',
    price: 'R$ 50,00',
    status: 'Entregue',
  },
  {
    id: '2',
    productName: 'Produto 2',
    purchaseDate: '2024-07-15',
    price: 'R$ 30,00',
    status: 'Entregue',
  },
  {
    id: '3',
    productName: 'Produto 3',
    purchaseDate: '2024-06-20',
    price: 'R$ 20,00',
    status: 'Em trânsito',
  },
  {
    id: '4',
    productName: 'Produto 4',
    purchaseDate: '2024-05-05',
    price: 'R$ 100,00',
    status: 'Cancelado',
  },
  // Adicione mais compras conforme necessário
];

export default function PurchaseHistory() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.purchaseDate}>Data: {item.purchaseDate}</Text>
        <Text style={styles.price}>Preço: {item.price}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Histórico de Compras</Text>
      <FlatList
        data={purchases}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
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
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemDetails: {
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  purchaseDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: '#3ad3f3',
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
});
