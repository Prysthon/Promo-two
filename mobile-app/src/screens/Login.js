import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { loginUser } from "../services/servico_login";

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleConnect = async () => {
    const result = await loginUser(username, password);

    if (result.success) {
      navigation.replace('HomeTabs');
    } else {
      Alert.alert('Erro', result.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PROMO</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.firstRow}>
          <Text style={styles.titlePrimary}>Olá, seja bem vindo!</Text>
          <Text style={styles.descriptionPrimary}>Insira seus dados pessoais e comece a jornada conosco.</Text>
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.titleSecond}>Entrar no PROMO</Text>
          <View style={styles.form}>
            <View style={styles.labelInput}>
              <TextInput 
                style={styles.input} 
                placeholder="Usuário"
                placeholderTextColor="#7f8c8d"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.labelInput}>
              <TextInput 
                style={styles.input} 
                placeholder="Password"
                placeholderTextColor="#7f8c8d"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity 
              style={styles.btnSecond} 
              onPress={handleConnect}
            >
              <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.btnPrimary} 
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.btnText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.password}>Esqueceu sua senha?</Text>
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
    width: '60%',
    alignItems: 'center',
    width: '100%',
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
