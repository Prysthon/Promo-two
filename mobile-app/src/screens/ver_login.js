// ver_login.js

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loginUser } from "../services/servico_login";
import { LojaWebSocketService } from "../services/loja";
// import { UsuarioWebSocketService } from "../services/usuario";

export default function VerLogin({ navigation }) {
  const [nome_usuario, setNomeUsuario] = useState('');
  const [senha_usuario, setSenhaUsuario] = useState('');
  const [wsMessage, setWsMessage] = useState('');

  // Inicializa a conexão com WebSocket da rota "loja"
  useEffect(() => {
    const lojaWs = new LojaWebSocketService();
    lojaWs.onOrderResponse((message) => {
      setWsMessage(message); // Atualiza a mensagem recebida
    });

    // Limpa o WebSocket ao desmontar o componente
    return () => {
      lojaWs.closeConnection();
    };
  }, []);

  // // Função para fazer login
  // const handleConnect = async () => {
  //   const resultado = await loginUser(nome_usuario, senha_usuario);
  //   if (resultado.success) {
  //     try {
  //       await AsyncStorage.setItem('userLoggedIn', 'true');
  //       const usuarioWs = new UsuarioWebSocketService();
  //       usuarioWs.sendLoginAction(nome_usuario, senha_usuario); // Enviar ação de login via WebSocket

  //       usuarioWs.onLoginResponse((response) => {
  //         console.log('Resposta de login WebSocket:', response);
  //       });

  //       navigation.replace('HomeTabs');
  //     } catch (error) {
  //       console.log('Erro ao salvar login:', error);
  //     }
  //   } else {
  //     Alert.alert('Erro', resultado.message);
  //   }
  // };

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Text style={estilos.headerText}>PROMO</Text>
      </View>
      <View style={estilos.content}>
        <View style={estilos.firstRow}>
          <Text style={estilos.titlePrimary}>Olá, seja bem vindo!</Text>
          <Text style={estilos.descriptionPrimary}>Insira seus dados pessoais e comece a jornada conosco.</Text>
        </View>
        <View style={estilos.secondRow}>
          <Text style={estilos.titleSecond}>Entrar no PROMO</Text>
          <View style={estilos.form}>
            <View style={estilos.labelInput}>
              <TextInput 
                style={estilos.input} 
                placeholder="Usuário"
                placeholderTextColor="#7f8c8d"
                value={nome_usuario}
                onChangeText={setNomeUsuario}
              />
            </View>
            <View style={estilos.labelInput}>
              <TextInput 
                style={estilos.input} 
                placeholder="Senha"
                placeholderTextColor="#7f8c8d"
                secureTextEntry
                value={senha_usuario}
                onChangeText={setSenhaUsuario}
              />
            </View>
            <TouchableOpacity 
              style={estilos.btnSecond} 
              // onPress={handleConnect}
            >
              <Text style={estilos.btnText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={estilos.btnPrimary} 
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={estilos.btnText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={estilos.password}>Esqueceu sua senha?</Text>
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
    alignItems: 'center',
    height: '75%',
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
  password: {
    color: '#34495e',
    fontSize: 14,
    textAlign: 'center',
  },
});
