import React, { ReactElement, useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { BoardResult, colors } from '@utils';

const style = StyleSheet.create({
  line: {
    position: 'absolute',
    backgroundColor: colors.gold
  },
  vertLine: {
    width: 2
  },
  horizLine: {
    height: 2
  },
  diagLine: {
    width: 2,
    top: 0,
    left: '50%'
  }
});

type BoardLineProps = {
  size: number;
  gameResult?: BoardResult | false;
};

export default function BoardLine({ size, gameResult }: BoardLineProps): ReactElement {
  const diagonalHeight = Math.sqrt(2 * size ** 2);
  const lineAnimationRef = useRef<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(lineAnimationRef.current, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false
    }).start();
  }, []);

  return (
    <>
      {gameResult && gameResult.column && gameResult.direction === 'V' && (
        <Animated.View
          style={[
            style.line,
            style.vertLine,
            {
              //prettier-ignore
              left: `${((gameResult.column / 3) - (1 / 6)) * 100}%`,
              height: lineAnimationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
            }
          ]}
        ></Animated.View>
      )}
      {gameResult && gameResult.row && gameResult.direction === 'H' && (
        <Animated.View
          style={[
            style.line,
            style.horizLine,
            {
              //prettier-ignore
              top: `${((gameResult.row / 3) - (1 / 6)) * 100}%`,
              width: lineAnimationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
            }
          ]}
        ></Animated.View>
      )}
      {gameResult && gameResult.diagonal && gameResult.direction === 'D' && (
        <Animated.View
          style={[
            style.line,
            style.diagLine,
            {
              height: lineAnimationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, diagonalHeight]
              }),
              transform: [
                {
                  translateY: lineAnimationRef.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [size / 2, -(diagonalHeight - size) / 2]
                  })
                },
                {
                  rotateZ: gameResult.diagonal === 'MAIN' ? '-45deg' : '45deg'
                }
              ]
            }
          ]}
        ></Animated.View>
      )}
    </>
  );
}
