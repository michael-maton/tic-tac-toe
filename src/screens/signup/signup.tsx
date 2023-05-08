import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  TextInput as NativeTextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { GradientBackground, TextInput, Button, Text } from '@components';
import { StackNavigationProp } from '@react-navigation/stack';
import { useHeaderHeight } from '@react-navigation/elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigatorParams } from '@config/navigator';
import { Auth } from 'aws-amplify';
import OTPInput from '@twotalltotems/react-native-otp-input';
import styles from './signup.styles';
import { colors } from '@utils';

type SignUpProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'SignUp'>;
  route: RouteProp<StackNavigatorParams, 'SignUp'>;
};

export default function SignUp({ navigation, route }: SignUpProps): ReactElement {
  const unconfirmedUsername = route.params?.username;
  const headerHeight = useHeaderHeight();
  const passwordRef = useRef<NativeTextInput | null>(null);
  const emailRef = useRef<NativeTextInput | null>(null);
  const usernameRef = useRef<NativeTextInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'signUp' | 'otpVerification'>(unconfirmedUsername ? 'otpVerification' : 'signUp');
  const [confirming, setConfirming] = useState(false);
  const [resending, setResending] = useState(false);

  const [form, setForm] = useState({
    username: 'abcd',
    email: 'matonmichaelj@gmail.com',
    name: '1',
    password: '12345678'
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
      console.log(e);
      console.log(e.message);
      Alert.alert(e.message || 'An error has occurred during sign up.');
    }
    setLoading(false);
  };

  const confirmCode = async (code: string) => {
    setConfirming(true);
    try {
      await Auth.confirmSignUp(form.username || unconfirmedUsername || '', code);
      navigation.navigate('Login');
      Alert.alert('Your account has been verified.');
    } catch (e) {
      console.log(e);
      console.log(e.message);
      Alert.alert(e.message || 'An error has occurred during verification.');
    }
    setConfirming(false);
  };

  const resendCode = async (username: string) => {
    setResending(true);

    try {
      await Auth.resendSignUp(username);
    } catch (e) {
      console.log(e);
      console.log(e.message);
      Alert.alert(e.message || 'An error has occurred.');
    }

    setResending(false);
  };

  useEffect(() => {
    if (unconfirmedUsername) resendCode(unconfirmedUsername);
  }, []);

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
                <>
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
                  {resending ? (
                    <ActivityIndicator color={colors.lightBlue} />
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        if (form.username) resendCode(form.username);
                        if (unconfirmedUsername) resendCode(unconfirmedUsername);
                      }}
                    >
                      <Text style={styles.resendText}>Resend Code</Text>
                    </TouchableOpacity>
                  )}
                </>
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
