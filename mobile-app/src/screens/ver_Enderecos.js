import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Enderecos = [
  {
    id: '1',
    label: 'Casa',
    addressLine1: 'Rua das Flores, 123',
    addressLine2: 'Apto 45, Bairro Primavera',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Trabalho',
    addressLine1: 'Avenida Paulista, 900',
    addressLine2: '7º Andar, Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    isDefault: false,
  },
  // Adicione mais endereços conforme necessário
];

export default function VerEnderecos() {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.addressLine}>{item.addressLine1}</Text>
        <Text style={styles.addressLine}>{item.addressLine2}</Text>
        <Text style={styles.cityStateZip}>{`${item.city}, ${item.state} - ${item.zipCode}`}</Text>
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
      <Text style={styles.header}>Endereços</Text>
      <FlatList
        data={Enderecos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Novo Endereço</Text>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addressLine: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  cityStateZip: {
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
