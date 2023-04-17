import React, { ReactElement, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { GradientBackground, Text } from '@components';
import styles from './settings.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@utils';

export default function Settings(): ReactElement {
  const [state, setState] = useState(false);
  const difficulty = {
    '1': 'Beginner',
    '3': 'Intermediate',
    '4': 'Hard',
    '-1': 'Impossible'
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView>
          <View style={styles.field}>
            <Text style={styles.label}>Bot Difficulty</Text>
            <View style={styles.choices}>
              {Object.keys(difficulty).map(level => {
                return (
                  <TouchableOpacity style={styles.choice} key={level}>
                    <Text style={styles.choiceText}>
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
              value={state}
              onValueChange={() => setState(!state)}
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
              value={state}
              onValueChange={() => setState(!state)}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </GradientBackground>
  );
}
