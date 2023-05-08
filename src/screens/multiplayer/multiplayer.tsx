import React, { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import { GradientBackground, Text } from '@components';
import styles from './multiplayer.styles';
import { useAuth } from '@contexts/auth-context';
import { colors } from '@utils';

export default function Multiplayer(): ReactElement {
  const { user } = useAuth();
  return (
    <GradientBackground>
      {user ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={{ color: colors.lightestBlue }}>{user.username}</Text>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text style={{ color: colors.lightestBlue, textAlign: 'center' }}>
            Oops, you must be logged in to do that.
          </Text>
        </View>
      )}
    </GradientBackground>
  );
}
