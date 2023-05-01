import React, { useState, useRef, ReactElement } from 'react';
import { Alert, ScrollView, TextInput as NativeTextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { GradientBackground, TextInput, Button, Text } from '@components';
import { useHeaderHeight } from '@react-navigation/elements';
import { Auth } from 'aws-amplify';
import styles from './change-password.styles';
import { useAuth } from '@contexts/auth-context';

export default function ChangePassword(): ReactElement {
  const headerHeight = useHeaderHeight();
  const { user } = useAuth();
  const newPasswordRef = useRef<NativeTextInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    previousPassword: '',
    newPassword: ''
  });

  const onUpdateForm = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const changePassword = async () => {
    const { previousPassword, newPassword } = form;
    setLoading(true);
    try {
      await Auth.changePassword(user, previousPassword, newPassword);
      setForm({
        previousPassword: '',
        newPassword: ''
      });
      Alert.alert('Your password has been changed successfully.');
    } catch (e) {
      console.log(e);
      console.log(e.message);
      if (e.code === 'NotAuthorizedException') {
        Alert.alert('Incorrect password.');
      } else {
        Alert.alert('An error has occurred.', e.message || 'Please try again.');
      }
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
          {user ? (
            <>
              <Text weight='400' style={styles.text}>
                Change password for user: <Text weight='700'>{user.username}</Text>
              </Text>
              <TextInput
                value={form.previousPassword}
                onChangeText={value => {
                  onUpdateForm('previousPassword', value);
                }}
                style={{ marginBottom: 20 }}
                onSubmitEditing={() => newPasswordRef.current?.focus()}
                secureTextEntry
                placeholder='Current password'
                returnKeyType='next'
              />
              <TextInput
                value={form.newPassword}
                onChangeText={value => onUpdateForm('newPassword', value)}
                style={{ marginBottom: 20 }}
                ref={newPasswordRef}
                secureTextEntry
                placeholder='New password'
                returnKeyType='done'
              />
              <Button loading={loading} title='Change password' onPress={changePassword} />
            </>
          ) : (
            <Text style={styles.text}>You are not logged in!</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
