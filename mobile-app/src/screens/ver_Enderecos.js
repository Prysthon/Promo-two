import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EnderecoForm from './EnderecoForm'; // O componente de formulário que criamos
import { 
  getEnderecosCliente, 
  deleteEnderecoCliente, 
  subscribeToEnderecoAtualizado 
} from '../services/servico_enderecos';

const user_id = 1; // Exemplo de ID de usuário

export default function VerEnderecos() {
  const [enderecos, setEnderecos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [enderecoAtual, setEnderecoAtual] = useState(null);

  // Função para carregar os endereços do cliente
  const carregarEnderecos = async () => {
    try {
      const response = await getEnderecosCliente(user_id);
      if (response && Array.isArray(response.enderecos)) {
        setEnderecos(response.enderecos);
      } else {
        console.error('Erro: Dados inválidos recebidos', response);
      }
    } catch (error) {
      console.error('Erro ao carregar endereços:', error);
    }
  };

  useEffect(() => {
    carregarEnderecos();
    const unsubscribe = subscribeToEnderecoAtualizado(() => {
      carregarEnderecos(); // Recarrega endereços quando houver uma atualização
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleDelete = (nome_endereco) => {
    Alert.alert(
      'Deletar Endereço',
      'Você tem certeza que deseja deletar este endereço?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEnderecoCliente(user_id, nome_endereco);
              carregarEnderecos();
            } catch (error) {
              console.error('Erro ao deletar endereço:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const openModal = (endereco = null) => {
    setEnderecoAtual(endereco); // Se for nulo, é para adicionar um novo endereço
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEnderecoAtual(null);
    carregarEnderecos(); // Recarregar a lista de endereços após salvar/atualizar
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.label}>{item.nome}</Text>
        <Text style={styles.addressLine}>{`${item.rua}, ${item.numero}`}</Text>
        <Text style={styles.addressLine}>{item.complemento}</Text>
        <Text style={styles.cityStateZip}>{`${item.cidade}, ${item.CEP}`}</Text>
        {item.padrão && <Text style={styles.defaultText}>Padrão</Text>}
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => openModal(item)}>
        <Icon name="pencil" size={20} color="#3ad3f3" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.nome)}>
        <Icon name="trash" size={20} color="#f34d3a" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Endereços</Text>
      <FlatList
        data={enderecos}
        renderItem={renderItem}
        keyExtractor={item => item.nome}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Text style={styles.addButtonText}>Adicionar Novo Endereço</Text>
      </TouchableOpacity>

      {/* Modal para adicionar/editar endereços */}
      <Modal visible={modalVisible} animationType="slide">
        <EnderecoForm 
          enderecoInicial={enderecoAtual}
          userId={user_id}
          onSave={closeModal} // Fecha o modal após salvar
        />
      </Modal>
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
