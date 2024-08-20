import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.optionText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.optionText}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('PurchaseHistory')}
        >
          <Text style={styles.optionText}>Histórico de Compras</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('PaymentMethods')}
        >
          <Text style={styles.optionText}>Pagamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('Addresses')}
        >
          <Text style={styles.optionText}>Endereços</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#261f1f',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  optionsContainer: {
    width: '80%',
  },
  option: {
    backgroundColor: '#3ad3f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
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
