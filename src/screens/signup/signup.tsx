import React, { ReactElement, useRef, useState } from 'react';
import {
  ScrollView,
  TextInput as NativeTextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { GradientBackground, TextInput, Button, Text } from '@components';
import { StackNavigationProp } from '@react-navigation/stack';
import { useHeaderHeight } from '@react-navigation/elements';
import { StackNavigatorParams } from '@config/navigator';
import { Auth } from 'aws-amplify';
import OTPInput from '@twotalltotems/react-native-otp-input';
import styles from './signup.styles';
import { colors } from '@utils';

type SignUpProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'SignUp'>;
};

export default function SignUp({ navigation }: SignUpProps): ReactElement {
  const headerHeight = useHeaderHeight();
  const passwordRef = useRef<NativeTextInput | null>(null);
  const emailRef = useRef<NativeTextInput | null>(null);
  const usernameRef = useRef<NativeTextInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'signUp' | 'otpVerification'>('signUp');
  const [confirming, setConfirming] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email: '',
    name: '',
    password: ''
  });

  const onUpdateForm = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const signUp = async () => {
    setLoading(true);
    const { name, username, email, password } = form;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name
        }
      });
      setStep('otpVerification');
      Alert.alert('A verification code has been sent to your email.');
    } catch (e) {
      Alert.alert('An error has occurred during sign up.');
    }
    setLoading(false);
  };

  const confirmCode = async (code: string) => {
    setConfirming(true);
    try {
      await Auth.confirmSignUp(form.username, code);
      navigation.navigate('Login');
      Alert.alert('Your account has been verified.');
    } catch (e) {
      Alert.alert('An error has occurred during verification.');
    }
    setConfirming(false);
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {step === 'otpVerification' && (
            <>
              <Text style={styles.otpInstruction}>Enter verification code:</Text>
              {confirming ? (
                <ActivityIndicator color={colors.lightBlue} />
              ) : (
                <OTPInput
                  // placeholderCharacter='0'
                  placeholderTextColor={colors.lightBlue}
                  pinCount={6}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.otpBox}
                  codeInputHighlightStyle={styles.otpActiveBox}
                  onCodeFilled={code => {
                    confirmCode(code);
                  }}
                />
              )}
            </>
          )}
          {step === 'signUp' && (
            <>
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
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
