import React, { ReactElement, useRef, useState } from 'react';
import { ScrollView, TextInput as NativeTextInput, Alert, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GradientBackground, TextInput, Button } from '@components';
import { StackNavigationProp } from '@react-navigation/stack';
import { useHeaderHeight } from '@react-navigation/elements';
import { StackNavigatorParams } from '@config/navigator';
import styles from './signup.styles';
import { Auth } from 'aws-amplify';

type SignUpProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'SignUp'>;
};

export default function SignUp({ navigation }: SignUpProps): ReactElement {
  const headerHeight = useHeaderHeight();
  const passwordRef = useRef<NativeTextInput | null>(null);
  const emailRef = useRef<NativeTextInput | null>(null);
  const usernameRef = useRef<NativeTextInput | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: 'test',
    email: 'rayssa11@nresponsea.com',
    name: 'Test Name',
    password: 'test12345'
  });

  const onUpdateForm = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const signUp = async () => {
    setLoading(true);
    const { name, username, email, password } = form;
    try {
      const res = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name
        }
      });
      // navigation.navigate('Home');
      console.log(res);
    } catch (e) {
      Alert.alert(e.message ?? 'An error has occurred during sign up.');
    }
    setLoading(false);
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <TextInput
            value={form.name}
            onChangeText={value => {
              onUpdateForm('name', value);
            }}
            style={{ marginBottom: 20 }}
            placeholder='Name'
            returnKeyType='next'
            onSubmitEditing={() => {
              usernameRef.current?.focus();
            }}
          />
          <TextInput
            ref={usernameRef}
            value={form.username}
            onChangeText={value => {
              onUpdateForm('username', value);
            }}
            style={{ marginBottom: 20 }}
            placeholder='Username'
            returnKeyType='next'
            onSubmitEditing={() => {
              emailRef.current?.focus();
            }}
          />
          <TextInput
            keyboardType='email-address'
            value={form.email}
            ref={emailRef}
            onChangeText={value => {
              onUpdateForm('email', value);
            }}
            style={{ marginBottom: 20 }}
            placeholder='Email'
            returnKeyType='next'
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
          />
          <TextInput
            value={form.password}
            ref={passwordRef}
            onChangeText={value => {
              onUpdateForm('password', value);
            }}
            style={{ marginBottom: 20 }}
            secureTextEntry
            placeholder='Password'
            returnKeyType='done'
          />
          <Button loading={loading} title='Create Account' onPress={signUp} />
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
