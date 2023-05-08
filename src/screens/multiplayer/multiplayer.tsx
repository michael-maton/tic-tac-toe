import React, { ReactElement } from 'react';
import { ScrollView } from 'react-native';
import { GradientBackground, Text } from '@components';
import styles from './multiplayer.styles';

export default function Multiplayer(): ReactElement {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Multiplayer Screen</Text>
      </ScrollView>
    </GradientBackground>
  );
}
