import React, { ReactElement, useRef, useState } from 'react';
import { ScrollView, TextInput as NativeTextInput, Alert } from 'react-native';
import { GradientBackground, TextInput, Button } from '@components';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParams } from '@config/navigator';
import styles from './login.styles';
import { Auth } from 'aws-amplify';

type LoginProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'Home'>;
};

export default function Login({ navigation }: LoginProps): ReactElement {
  const passwordRef = useRef<NativeTextInput | null>(null);
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const onUpdateForm = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const login = async () => {
    setLoading(true);
    const { username, password } = form;
    try {
      await Auth.signIn(username, password);
      navigation.navigate('Home');
    } catch (e) {
      Alert.alert(e.message ?? 'An error has occurred during login.');
    }
    setLoading(false);
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          value={form.username}
          onChangeText={value => {
            onUpdateForm('username', value);
          }}
          style={{ marginBottom: 20 }}
          placeholder='Username'
          returnKeyType='next'
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />
        <TextInput
          value={form.password}
          onChangeText={value => {
            onUpdateForm('password', value);
          }}
          style={{ marginBottom: 20 }}
          ref={passwordRef}
          secureTextEntry
          placeholder='Password'
          returnKeyType='done'
        />
        <Button loading={loading} title='Login' onPress={login} />
      </ScrollView>
    </GradientBackground>
  );
}
