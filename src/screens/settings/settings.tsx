import React, { ReactElement } from 'react';
import { View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { GradientBackground, Text } from '@components';
import styles from './settings.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@utils';
import { difficulty, useSettings } from '@contexts/settings-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParams } from '@config/navigator';
import { useAuth } from '@contexts/auth-context';

type SettingsProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'Settings'>;
};

export default function Settings({ navigation }: SettingsProps): ReactElement | null {
  const { settings, saveSetting } = useSettings();
  const { user } = useAuth();
  if (!settings) return null;

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView>
          <View style={styles.field}>
            <Text style={styles.label}>Bot Difficulty</Text>
            <View style={styles.choices}>
              {Object.keys(difficulty).map(level => {
                return (
                  <TouchableOpacity
                    onPress={() => saveSetting('difficulty', level as keyof typeof difficulty)}
                    style={[
                      styles.choice,
                      {
                        backgroundColor: settings.difficulty === level ? colors.darkBlue : colors.lightestBlue
                      }
                    ]}
                    key={level}
                  >
                    <Text
                      style={[
                        styles.choiceText,
                        {
                          color: settings.difficulty === level ? colors.lightestBlue : colors.darkBlue
                        }
                      ]}
                    >
                      {difficulty[level as keyof typeof difficulty]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={[styles.field, styles.switch]}>
            <Text style={styles.label}>Sounds</Text>
            <Switch
              trackColor={{
                false: colors.lightestBlue,
                true: colors.darkBlue
              }}
              thumbColor={colors.blue}
              ios_backgroundColor={colors.lightestBlue}
              value={settings.sounds}
              onValueChange={() => saveSetting('sounds', !settings.sounds)}
            />
          </View>
          <View style={[styles.field, styles.switch]}>
            <Text style={styles.label}>Vibrations</Text>
            <Switch
              trackColor={{
                false: colors.lightestBlue,
                true: colors.darkBlue
              }}
              thumbColor={colors.blue}
              ios_backgroundColor={colors.lightestBlue}
              value={settings.haptics}
              onValueChange={() => saveSetting('haptics', !settings.haptics)}
            />
          </View>
          {user && (
            <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
              <Text style={styles.changePasswordLink}>Change password</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </ScrollView>
    </GradientBackground>
  );
}
