import { SafeAreaView } from 'react-native';
import React, { ReactElement } from 'react';
import { GradientBackground } from '@components';
import styles from './single-player-game.styles';
import { Board } from '@components';
import {
  printFormattedBoard,
  BoardState,
  isEmpty,
  isFull,
  getAvailableMoves,
  isTerminal
} from '@utils';

export default function Game(): ReactElement {
  // prettier-ignore
  const b: BoardState = [
    'x', 'o', 'x', 
    'o', 'o', 'x', 
    'x', 'x', 'o'
  ];

  printFormattedBoard(b);
  console.log(isTerminal(b));
  // console.log(isEmpty(b));
  // console.log(isFull(b));
  // console.log(getAvailableMoves(b));
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          onCellPressed={idx => {
            alert(idx);
          }}
          size={300}
          state={b}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
