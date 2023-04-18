import React, { ReactElement, useRef } from 'react';
import { ScrollView, TextInput as NativeTextInput } from 'react-native';
import { GradientBackground, TextInput } from '@components';
import styles from './login.styles';

export default function Login(): ReactElement {
  const passwordRef = useRef<NativeTextInput | null>(null);
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={{ marginBottom: 20 }}
          placeholder='Username'
          returnKeyType='next'
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />
        <TextInput ref={passwordRef} secureTextEntry placeholder='Password' returnKeyType='done' />
      </ScrollView>
    </GradientBackground>
  );
}
