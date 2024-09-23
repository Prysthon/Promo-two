import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { registerUser } from "../services/servico_login";

export default function VerCadastro({ navigation }) {
  const [nome_usuario, setNomeUsuario] = useState('');
  const [email_usuario, setEmailUsuario] = useState('');
  const [senha_usuario, setSenhaUsuario] = useState('');
  const [confirmar_senha_usuario, setConfirmarSenhaUsuario] = useState('');

  const handleRegistrar = async () => {
    // Verificar se as senhas coincidem
    if (senha_usuario !== confirmar_senha_usuario) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      // Chamar a função de registro via WebSocket
      const resultado = await registerUser(nome_usuario, email_usuario, senha_usuario, confirmar_senha_usuario);

      if (resultado.success) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        navigation.navigate('Login'); // Navegar de volta para a tela de login
      } else {
        Alert.alert('Erro', resultado.message); // Exibir mensagem de erro retornada do servidor
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao registrar. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Text style={estilos.headerText}>PROMO</Text>
      </View>
      <View style={estilos.content}>
        <View style={estilos.firstRow}>
          <Text style={estilos.titlePrimary}>Crie sua conta</Text>
          <Text style={estilos.descriptionPrimary}>Preencha as informações abaixo para se cadastrar.</Text>
        </View>
        <View style={estilos.secondRow}>
          <Text style={estilos.titleSecond}>Cadastre-se no PROMO</Text>
          <View style={estilos.form}>
            <View style={estilos.labelInput}>
              <TextInput 
                style={estilos.input} 
                placeholder="Usuário"
                value={nome_usuario}
                onChangeText={setNomeUsuario}
                placeholderTextColor="#7f8c8d"
              />
            </View>
            <View style={estilos.labelInput}>
              <TextInput 
                style={estilos.input} 
                placeholder="Email"
                value={email_usuario}
                onChangeText={setEmailUsuario}
                placeholderTextColor="#7f8c8d"
              />
            </View>
            <View style={estilos.labelInput}>
              <TextInput 
                style={estilos.input} 
                placeholder="Senha"
                value={senha_usuario}
                onChangeText={setSenhaUsuario}
                secureTextEntry
                placeholderTextColor="#7f8c8d"
              />
            </View>
            <View style={estilos.labelInput}>
              <TextInput 
                style={estilos.input} 
                placeholder="Confirme a Senha"
                value={confirmar_senha_usuario}
                onChangeText={setConfirmarSenhaUsuario}
                secureTextEntry
                placeholderTextColor="#7f8c8d"
              />
            </View>
            <TouchableOpacity style={estilos.btnSecond} onPress={handleRegistrar}>
              <Text style={estilos.btnText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={estilos.btnPrimary} 
              onPress={() => navigation.goBack()}
            >
              <Text style={estilos.btnText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3ad3f3',
    width: "100%",
    height: "100%",
  },
  header: {
    marginBottom: 20,
    width: "100%",
  },
  headerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: '90%',
    height: '65%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  firstRow: {
    width: '100%',
    alignItems: 'center',
    height: '25%',
  },
  secondRow: {
    width: '100%',
    height: '75%',
    alignItems: 'center',
  },
  titlePrimary: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  descriptionPrimary: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
    textAlign: 'center',
  },
  titleSecond: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3ad3f3',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  labelInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    height: 45,
  },
  input: {
    flex: 1,
    color: '#000',
    paddingLeft: 10,
  },
  btnSecond: {
    backgroundColor: '#3ad3f3',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 50,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnPrimary: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 50,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
  },
});
