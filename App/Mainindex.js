import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './google/Main';
import MainButton from './MainButton';
import GoogleAds from './GoogleAds/GoogleAds';
import Logout from './google/Logout';
import LogoutF from './google/LogoutF';
import Login from './google/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MainButton">
      <Stack.Screen name="MainButton" component={MainButton} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="GoogleAds" component={GoogleAds} />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogoutF"
        component={LogoutF}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
