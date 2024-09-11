import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function VerPerfil({ navigation }) {
  const [nome_usuario, setNomeUsuario] = useState('John Doe');
  const [email_usuario, setEmailUsuario] = useState('john.doe@example.com');
  const [cpf_usuario, setCpfUsuario] = useState('123.456.789-00');
  const [senha_usuario, setSenhaUsuario] = useState('');
  const [imagem_perfil] = useState('https://via.placeholder.com/150');

  const saveUsuarioPerfil = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: imagem_perfil }} 
        style={styles.imagemPerfil} 
      />

      <Text style={styles.rotulo}>Nome</Text>
      <TextInput 
        style={styles.input}
        value={nome_usuario}
        onChangeText={setNomeUsuario}
      />

      <Text style={styles.rotulo}>Email</Text>
      <TextInput 
        style={styles.input}
        value={email_usuario}
        onChangeText={setEmailUsuario}
      />

      <Text style={styles.rotulo}>CPF</Text>
      <TextInput 
        style={styles.input}
        value={cpf_usuario}
        onChangeText={setCpfUsuario}
        keyboardType="numeric"
      />

      <Text style={styles.rotulo}>Senha</Text>
      <TextInput 
        style={styles.input}
        value={senha_usuario}
        onChangeText={setSenhaUsuario}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={saveUsuarioPerfil}>
        <Text style={styles.textoBotaoSalvar}>Salvar</Text>
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
  imagemPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  rotulo: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  botaoSalvar: {
    backgroundColor: '#3ad3f3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoSalvar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
