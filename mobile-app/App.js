import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login.js'; 
import Register from './screens/Register';
import Profile from './screens/Profile.js';

import { Button } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Perfil" 
        component={Profile} 
        options={{
          headerRight: () => (
            <Button
              onPress={() => navigation.replace('Login')}
              title="Logout"
              color="#000"
            />
          ),
        }}
      />
      {/* Você pode adicionar outras abas aqui, como Meu Perfil, Avaliações, Configurações */}
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
          options={{ headerShown: false }} // Remove o header da tela de login
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
