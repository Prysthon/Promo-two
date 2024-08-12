import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login.js'; 
import Register from './screens/Register';
import Profile from './screens/Profile.js';
import Restaurants from './screens/Restaurants.js';

import { Button } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Início" 
        component={Restaurants} 
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
