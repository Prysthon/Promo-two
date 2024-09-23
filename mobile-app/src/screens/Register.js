import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { registerUser } from "../services/servico_login";

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      // Chamar a função de registro via WebSocket
      const result = await registerUser(username, email, password, confirmPassword);

      if (result.success) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        navigation.navigate('Login'); // Navegar de volta para a tela de login
      } else {
        Alert.alert('Erro', result.message); // Exibir mensagem de erro retornada do servidor
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao registrar. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PROMO</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.firstRow}>
          <Text style={styles.titlePrimary}>Crie sua conta</Text>
          <Text style={styles.descriptionPrimary}>Preencha as informações abaixo para se cadastrar.</Text>
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.titleSecond}>Cadastre-se no PROMO</Text>
          <View style={styles.form}>
            <View style={styles.labelInput}>
              <TextInput 
                style={styles.input} 
                placeholder="Usuário"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#7f8c8d"
              />
            </View>
            <View style={styles.labelInput}>
              <TextInput 
                style={styles.input} 
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#7f8c8d"
              />
            </View>
            <View style={styles.labelInput}>
              <TextInput 
                style={styles.input} 
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#7f8c8d"
              />
            </View>
            <View style={styles.labelInput}>
              <TextInput 
                style={styles.input} 
                placeholder="Confirme a Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor="#7f8c8d"
              />
            </View>
            <TouchableOpacity style={styles.btnSecond} onPress={handleRegister}>
              <Text style={styles.btnText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.btnPrimary} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.btnText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
