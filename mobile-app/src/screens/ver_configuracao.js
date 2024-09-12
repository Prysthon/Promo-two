import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function VerConfiguracao() {
  const [notificacoes_ativadas, setNotificacoesAtivadas] = useState(true);
  const [tema_escuro, setTemaEscuro] = useState(false);

  const updNotificacoes = () => setNotificacoesAtivadas((estado_anterior) => !estado_anterior);
  const updTema = () => setTemaEscuro((estado_anterior) => !estado_anterior);

  return (
    <View style={styles.container}>
      {/* Configuração de Notificações */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Notificações</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#3ad3f3" }}
          thumbColor={notificacoes_ativadas ? "#ffffff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={updNotificacoes}
          value={notificacoes_ativadas}
        />
      </View>

      {/* Configuração de Tema */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Tema Escuro</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#3ad3f3" }}
          thumbColor={tema_escuro ? "#ffffff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={updTema}
          value={tema_escuro}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
    color: '#333333',
  },
  picker: {
    height: 50,
    width: 150,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#227f91',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
