import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking, ActivityIndicator, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import axios from 'axios';

import Login from './src/screens/Login.js'; 
import Register from './src/screens/Register.js';
import Profile from './src/screens/Profile.js';
import VerLojas from './src/screens/ver_lojas.js';
import LastOrders from './src/screens/LastOrders.js';
import StoresSearch from './src/screens/StoresSearch.js';
import EditProfile from './src/screens/EditProfile.js';
import Settings from './src/screens/Settings.js';
import PurchaseHistory from './src/screens/PurchaseHistory.js';
import PaymentMethods from './src/screens/PaymentMethods.js';
import Addresses from './src/screens/Addresses.js';
import VerProdutosLoja from './src/screens/ver_produtos_loja.js';
import VerDetalhesProduto from './src/screens/ver_detalhes_produto.js';
import { registerForPushNotificationsAsync } from './src/notificacoes.js';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Buscar') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Pedidos') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Você pode retornar qualquer componente aqui!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3ad3f3',
      })}
    >
      <Tab.Screen 
        name="Início" 
        component={VerLojas} 
      />
      <Tab.Screen 
        name="Buscar" 
        component={StoresSearch} 
      />
      <Tab.Screen 
        name="Pedidos" 
        component={LastOrders} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={Profile} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
      authStatus === messaging-AuthorizationStatus. PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const sendTokenToServer = async (token) => {
    try {
      const response = await axios.post('http://localhost/register-token/', {
        token: token,
      });
      console.log('Token enviado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar o token:', error);
    }
  };
  

  useEffect (() => {
    if(requestUserPermission()) {
      const getToken = async () => {
        await messaging().registerDeviceForRemoteMessages();
        await messaging().getToken().then(token => {
          sendTokenToServer(token)
          console.log(token);
        });
      }
      getToken()
    } else {
      console.log('failed token status', authStatus);
    }

    const getInicialNotificacao = async () => {
      await messaging().getInitialNotification().then(async (remoteMessage) => {
        if(remoteMessage) {
          console.log(
            'notification caused app to open from quit state:',
            remoteMessage.notification
          );
        }
      });
    }
    getInicialNotificacao();

    const getNotificacaoAppAberto = async () => {
      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log(
          'notification caused app to open from quit state:',
          remoteMessage.notification
        );
      });
    }
    getNotificacaoAppAberto();

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomeTabs" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfile} 
          options={{
            title: 'Editar Perfil', 
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings} 
          options={{
            title: 'Configurações', 
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen 
          name="PurchaseHistory" 
          component={PurchaseHistory} 
          options={{
            title: 'Histórico de Compras', 
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen 
          name="PaymentMethods" 
          component={PaymentMethods} 
          options={{
            title: 'Formas de Pagamento', 
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen 
          name="Addresses" 
          component={Addresses} 
          options={{
            title: 'Endereços', 
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen 
          name="Produtos" 
          component={VerProdutosLoja} 
          options={{
            title: 'Produtos', 
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen 
          name="DetalhesProduto" 
          component={VerDetalhesProduto} 
          options={{
            title: 'Produto', 
            headerBackTitle: 'Voltar',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
