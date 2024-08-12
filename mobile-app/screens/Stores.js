import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';

export default function Stores() {
  const recentPurchases = [
    { id: '1', name: 'Restaurante A', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Restaurante B', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Restaurante C', image: 'https://via.placeholder.com/100' },
    // Adicione mais restaurantes conforme necessário
  ];

  const famousOnIFood = [
    { id: '1', name: 'Restaurante X', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Restaurante Y', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Restaurante Z', image: 'https://via.placeholder.com/100' },
    // Adicione mais restaurantes conforme necessário
  ];

  const shops = [
    { id: '1', name: 'Loja A', stars: 4.5, type: 'Pizza', distance: '2km', waitTime: '30 min' },
    { id: '2', name: 'Loja B', stars: 4.2, type: 'Sushi', distance: '3km', waitTime: '25 min' },
    { id: '3', name: 'Loja C', stars: 4.8, type: 'Hambúrguer', distance: '1.5km', waitTime: '20 min' },
    // Adicione mais lojas conforme necessário
  ];

  const renderHorizontalItem = ({ item }) => (
    <View style={styles.horizontalItem}>
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <Text style={styles.restaurantName}>{item.name}</Text>
    </View>
  );

  const renderVerticalItem = ({ item }) => (
    <View style={styles.verticalItem}>
      <Text style={styles.shopName}>{item.name}</Text>
      <Text style={styles.shopDetails}>{`${item.stars} ⭐ | ${item.type} | ${item.distance}`}</Text>
      <Text style={styles.shopWaitTime}>{item.waitTime}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Últimas compras</Text>
      <FlatList
        data={recentPurchases}
        renderItem={renderHorizontalItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />

      <Text style={styles.sectionTitle}>Famosos no iFood</Text>
      <FlatList
        data={famousOnIFood}
        renderItem={renderHorizontalItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />

      <Text style={styles.sectionTitle}>Lojas</Text>
      {shops.map((store) => (
        <View key={store.id}>
          {renderVerticalItem({ item: store })}
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  horizontalList: {
    marginBottom: 20,
  },
  horizontalItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  verticalList: {
    marginBottom: 20,
  },
  verticalItem: {
    backgroundColor: '#3ad3f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  shopDetails: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  shopWaitTime: {
    fontSize: 14,
    color: '#000000',
  },
});
