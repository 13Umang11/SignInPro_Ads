import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Logout from './Logout';
import Login from './Login';
import LogoutF from './LogoutF';

const Stack = createStackNavigator();

const Main = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
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
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
export default Main;
