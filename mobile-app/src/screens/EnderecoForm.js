import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addEnderecoCliente, updEnderecoCliente } from '../services/servico_enderecos';

const EnderecoForm = ({ enderecoInicial, userId, onSave }) => {
  const [nome, setNome] = useState(enderecoInicial?.nome || '');
  const [rua, setRua] = useState(enderecoInicial?.rua || '');
  const [numero, setNumero] = useState(enderecoInicial?.numero || '');
  const [complemento, setComplemento] = useState(enderecoInicial?.complemento || '');
  const [bairro, setBairro] = useState(enderecoInicial?.bairro || '');
  const [cidade, setCidade] = useState(enderecoInicial?.cidade || '');
  const [cep, setCep] = useState(enderecoInicial?.CEP || '');
  const [padrao, setPadrao] = useState(enderecoInicial?.padrão || false);

  // Função para salvar o endereço
  const handleSave = async () => {
    const novoEndereco = {
      nome,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      CEP: cep,
      padrão: padrao,
    };

    try {
      if (enderecoInicial) {
        // Atualizar endereço existente
        await updEnderecoCliente(userId, novoEndereco);
        Alert.alert('Sucesso', 'Endereço atualizado com sucesso');
      } else {
        // Adicionar novo endereço
        await addEnderecoCliente(userId, novoEndereco);
        Alert.alert('Sucesso', 'Endereço adicionado com sucesso');
      }
      onSave(); // Chama a função para atualizar a lista de endereços
    } catch (error) {
      console.error('Erro ao salvar endereço:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o endereço');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{enderecoInicial ? 'Editar Endereço' : 'Adicionar Novo Endereço'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome (ex: Casa, Trabalho)"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Rua"
        value={rua}
        onChangeText={setRua}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        keyboardType="numeric"
        onChangeText={setNumero}
      />
      <TextInput
        style={styles.input}
        placeholder="Complemento"
        value={complemento}
        onChangeText={setComplemento}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        keyboardType="numeric"
        onChangeText={setCep}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{enderecoInicial ? 'Atualizar' : 'Salvar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  input: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#3ad3f3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnderecoForm;
