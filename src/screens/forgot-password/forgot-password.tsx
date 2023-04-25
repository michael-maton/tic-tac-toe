import React, { useState, useRef, ReactElement } from 'react';
import { Alert, ScrollView, TextInput as NativeTextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { GradientBackground, TextInput, Button } from '@components';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParams } from '@config/navigator';
import { useHeaderHeight } from '@react-navigation/elements';
import { Auth } from 'aws-amplify';
import styles from './forgot-password.styles';

type ForgotPasswordProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'ForgotPassword'>;
};

export default function ForgotPassword({ navigation }: ForgotPasswordProps): ReactElement {
  const headerHeight = useHeaderHeight();
  const passwordRef = useRef<NativeTextInput | null>(null);
  const [step, setStep] = useState<'1' | '2'>('1');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    code: ''
  });

  const onUpdateForm = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const resetCodeRequest = async () => {
    const { username } = form;
    setLoading(true);
    try {
      await Auth.forgotPassword(username);
      Alert.alert('An email has been sent to reset your password.');
      setStep('2');
    } catch (e) {
      Alert.alert(e.message || 'An error has occurred during password reset.');
    }
    setLoading(false);
  };

  const resetPassword = async () => {
    setLoading(true);
    const { username, password, code } = form;
    try {
      await Auth.forgotPasswordSubmit(username, code, password);
      Alert.alert('Your password has been reset.');
      navigation.navigate('Login');
    } catch (e) {
      console.log(e);
      Alert.alert(e.message || 'An error has occurred during password reset.');
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
          {step === '1' && (
            <>
              <TextInput
                value={form.username}
                onChangeText={value => onUpdateForm('username', value)}
                style={{ marginBottom: 20 }}
                placeholder='Username'
                returnKeyType='done'
              />
              <Button loading={loading} title='Reset password' onPress={resetCodeRequest} />
            </>
          )}
          {step === '2' && (
            <>
              <TextInput
                value={form.code}
                onChangeText={value => {
                  onUpdateForm('code', value);
                }}
                style={{ marginBottom: 20 }}
                onSubmitEditing={() => passwordRef.current?.focus()}
                placeholder='Code'
                returnKeyType='next'
              />
              <TextInput
                value={form.password}
                onChangeText={value => onUpdateForm('password', value)}
                style={{ marginBottom: 20 }}
                ref={passwordRef}
                secureTextEntry
                placeholder='New password'
                returnKeyType='done'
              />
              <Button loading={loading} title='Reset password' onPress={resetPassword} />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
