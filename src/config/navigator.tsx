import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import {
  Home,
  SinglePlayerGame,
  Settings,
  Login,
  SignUp,
  ChangePassword,
  ForgotPassword,
  Multiplayer,
  MultiplayerGame
} from '@screens';
import { colors } from '@utils';

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
  Settings: undefined;
  Login: { redirect: keyof StackNavigatorParams } | undefined;
  SignUp: { username: string } | undefined;
  ChangePassword: undefined;
  ForgotPassword: undefined;
  Multiplayer: undefined;
  MultiplayerGame: { gameID: string; invitee?: undefined } | { invitee: string; gameID?: undefined };
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
        <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ title: 'Change Password' }} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ title: 'Reset Password' }} />
        <Stack.Screen name='Multiplayer' component={Multiplayer} />
        <Stack.Screen name='MultiplayerGame' options={{ headerShown: false }} component={MultiplayerGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
