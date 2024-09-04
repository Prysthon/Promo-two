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
import EditProfile from './src/screens/EditProfile.js';
import Settings from './src/screens/Settings.js';
import PurchaseHistory from './src/screens/PurchaseHistory.js';
import PaymentMethods from './src/screens/PaymentMethods.js';
import Addresses from './src/screens/Addresses.js';
import VerProdutosLoja from './src/screens/ver_produtos_loja.js';
import VerDetalhesProduto from './src/screens/ver_detalhes_produto.js';
import { registerForPushNotificationsAsync } from './src/notificacoes.js';
import VerCarrinho from './src/screens/ver_carrinho.js';
import VerCheckout from './src/screens/ver_checkout.js';
import VerCategoria from './src/screens/ver_categorias.js';
import VerProdutosCategoria from './src/screens/ver_produtos_categoria.js';

// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/auth';
// import '@react-native-firebase/firestore';

// const RNfirebaseConfig = {
//   apiKey: "........",
//   authDomain: "note-app-rn.firebaseapp.com",
//   projectId: "note-app-rn",
//   storageBucket: "note-app-rn.appspot.com",
//   messagingSenderId: ".....",
//   appId: "......"
// };

// let app;
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(RNfirebaseConfig )
// } else {
//     app = firebase.app()
// }

// const db = firebase.firestore();
// const auth = firebase.auth();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
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
        name="Inicio" 
        component={VerLojas} 
      />
      <Tab.Screen 
        name="Buscar" 
        component={VerCategoria} 
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
      const response = await axios.post('http://10.0.2.2:80/register-token/', {
        token: token,
      });
      console.log('Token enviado com sucesso:', response.data);
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status fora do alcance de 2xx
        console.error('Resposta do servidor:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        console.error('Sem resposta do servidor:', error.request);
      } else {
        // Algo aconteceu ao configurar a requisição
        console.error('Erro:', error.message);
      }
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
        <Stack.Screen 
          name="Carrinho" 
          component={VerCarrinho} 
          options={{
            title: 'Carrinho', 
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen 
          name="Checkout" 
          component={VerCheckout} 
          options={{
            title: 'Checkout', 
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen 
          name="VerProdutosCategoria" 
          component={VerProdutosCategoria} 
          options={{
            title: 'Produtos', 
            headerBackTitle: 'Voltar',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
