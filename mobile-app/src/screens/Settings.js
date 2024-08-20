import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Settings() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleTheme = () => setIsDarkTheme(previousState => !previousState);

  return (
    <View style={styles.container}>
      {/* Configuração de Notificações */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Notificações</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#3ad3f3" }}
          thumbColor={isNotificationsEnabled ? "#ffffff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      {/* Configuração de Tema */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Tema Escuro</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#3ad3f3" }}
          thumbColor={isDarkTheme ? "#ffffff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkTheme}
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
