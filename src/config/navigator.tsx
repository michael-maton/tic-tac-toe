import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Home, SinglePlayerGame, Settings, Login, SignUp } from '@screens';
import { colors } from '@utils';

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
  Settings: undefined;
  Login: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

const navigatorOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.darkBlue,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 0
    }
  },
  headerTintColor: colors.lightestBlue,
  headerTitleStyle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 20
  },
  headerBackTitleStyle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14
  }
};

export default function Navigator(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigatorOptions}>
        <Stack.Screen name='Home' options={{ headerShown: false }} component={Home} />
        <Stack.Screen name='SinglePlayerGame' options={{ headerShown: false }} component={SinglePlayerGame} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='SignUp' component={SignUp} options={{ title: 'Create an Account' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
