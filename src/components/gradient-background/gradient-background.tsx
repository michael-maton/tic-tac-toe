import React, { ReactElement, ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { colors as utils_colors } from '@utils';

type GradientBackgroundProps = {
  children: ReactNode;
  colors?: string[];
} & ViewProps;

export default function GradientBackground({ children, style, colors }: GradientBackgroundProps): ReactElement {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style='light' />
      <LinearGradient
        style={[
          style,
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        ]}
        colors={colors ? colors.reverse() : [utils_colors.lightBlue, utils_colors.darkBlue].reverse()}
      />
      {children}
    </View>
  );
}
