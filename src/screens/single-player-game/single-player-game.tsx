import React, { ReactElement, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { GradientBackground } from '@components';
import styles from './single-player-game.styles';
import { Board } from '@components';
import {
  printFormattedBoard,
  BoardState,
  isEmpty,
  isFull,
  getAvailableMoves,
  isTerminal,
  getBestMove
} from '@utils';

export default function Game(): ReactElement {
  // prettier-ignore
  const [state, setState] = useState<BoardState>([
    null, null, null, 
    'o', null, 'x', 
    'o', 'o', 'x'
  ]);

  console.log('getBestMove', getBestMove(state, true));
  // printFormattedBoard(state);
  // console.log(isTerminal(b));
  // console.log(isEmpty(b));
  // console.log(isFull(b));
  // console.log(getAvailableMoves(b));

  const handleOnCellPressed = (cell: number): void => {
    const stateCopy: BoardState = [...state];
    // if (stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = 'x';
    setState(stateCopy);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state))}
          onCellPressed={cell => {
            handleOnCellPressed(cell);
          }}
          state={state}
          size={300}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
