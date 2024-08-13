import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './screens/Login.js'; 
import Register from './screens/Register';
import Profile from './screens/Profile.js';
import Stores from './screens/Stores.js';
import LastOrders from './screens/LastOrders.js';
import StoresSearch from './screens/StoresSearch.js';
import EditProfile from './screens/EditProfile.js';
import Settings from './screens/Settings.js';
import PurchaseHistory from './screens/PurchaseHistory.js';
import PaymentMethods from './screens/PaymentMethods.js';

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
        component={Stores} 
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
