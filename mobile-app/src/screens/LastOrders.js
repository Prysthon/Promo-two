import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function LastOrders() {
  const lastOrder = {
    id: '1',
    name: 'Restaurante A',
    image: 'https://via.placeholder.com/100',
    items: 'Pizza, Coca-Cola',
    total: 'R$ 45,00',
  };

  const orderHistory = [
    {
      id: '1',
      date: '01/08/2024',
      name: 'Restaurante B',
      image: 'https://via.placeholder.com/100',
      status: 'Entregue',
      orderNumber: '#12345',
      items: 'Sushi, Água',
      total: 'R$ 60,00',
    },
    {
      id: '2',
      date: '25/07/2024',
      name: 'Restaurante C',
      image: 'https://via.placeholder.com/100',
      status: 'Cancelado',
      orderNumber: '#12344',
      items: 'Hambúrguer, Batata Frita',
      total: 'R$ 30,00',
    },
    // Adicione mais pedidos conforme necessário
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>{item.date}</Text>
        <Image source={{ uri: item.image }} style={styles.orderImage} />
      </View>
      <Text style={styles.orderName}>{item.name}</Text>
      <Text style={styles.orderDetails}>{item.items}</Text>
      <Text style={styles.orderTotal}>{item.total}</Text>
      <View style={styles.orderFooter}>
        <Text style={styles.orderStatus}>{item.status}</Text>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.buttonText}>Ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateButton}>
          <Text style={styles.buttonText}>Avalie o pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Último Pedido */}
      <View style={styles.lastOrderContainer}>
        <Text style={styles.sectionTitle}>Loja do último pedido</Text>
        <Image source={{ uri: lastOrder.image }} style={styles.lastOrderImage} />
        <Text style={styles.orderName}>{lastOrder.name}</Text>
        <Text style={styles.orderDetails}>{lastOrder.items}</Text>
        <Text style={styles.orderTotal}>{lastOrder.total}</Text>
        <TouchableOpacity style={styles.addToBagButton}>
          <Text style={styles.buttonText}>Visitar loja</Text>
        </TouchableOpacity>
      </View>

      {/* Histórico de Pedidos */}
      <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
      <View style={styles.orderHistoryList}>
            {orderHistory.map((item) => (
            <View key={item.id}>
                {renderOrderItem({ item })}
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  lastOrderContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  lastOrderImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  orderDetails: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  addToBagButton: {
    backgroundColor: '#3ad3f3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderHistoryList: {
    marginBottom: 20,
  },
  orderItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 14,
    color: '#666666',
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  orderStatus: {
    fontSize: 14,
    color: '#3ad3f3',
  },
  orderNumber: {
    fontSize: 14,
    color: '#666666',
  },
  ratePrompt: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helpButton: {
    backgroundColor: '#ff6f61',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '49%'
  },
  rateButton: {
    backgroundColor: '#3ad3f3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '49%'
  },
});

