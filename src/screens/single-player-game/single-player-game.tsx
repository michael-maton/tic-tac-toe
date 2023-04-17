import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView, Dimensions } from 'react-native';
import { GradientBackground } from '@components';
import styles from './single-player-game.styles';
import { Board } from '@components';
import { BoardState, isEmpty, isTerminal, getBestMove, Cell, useSounds } from '@utils';

const SCREEN_WIDTH = Dimensions.get('screen').width;
// const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default function Game(): ReactElement {
  // prettier-ignore
  const [state, setState] = useState<BoardState>([
    null, null, null, 
    null, null, null, 
    null, null, null
  ]);

  const [turn, setTurn] = useState<'HUMAN' | 'BOT'>(Math.random() < 0.5 ? 'HUMAN' : 'BOT');
  const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
  const playSound = useSounds();

  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: 'x' | 'o'): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = symbol;
    setState(stateCopy);

    try {
      symbol === 'x' ? playSound('pop1') : playSound('pop2');
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnCellPressed = (cell: number): void => {
    if (turn !== 'HUMAN') return;
    insertCell(cell, isHumanMaximizing ? 'x' : 'o');
    setTurn('BOT');
  };

  const getWinner = (winnerSymbol: Cell): 'HUMAN' | 'BOT' | 'DRAW' => {
    if (winnerSymbol === 'x') {
      return isHumanMaximizing ? 'HUMAN' : 'BOT';
    }
    if (winnerSymbol === 'o') {
      return isHumanMaximizing ? 'BOT' : 'HUMAN';
    }
    return 'DRAW';
  };

  useEffect(() => {
    if (gameResult) {
      const winner = getWinner(gameResult.winner);
      if (winner === 'HUMAN') {
        try {
          playSound('win');
        } catch (e) {
          console.log(e);
        }
        alert('You Won!');
      }
      if (winner === 'BOT') {
        try {
          playSound('loss');
        } catch (e) {
          console.log(e);
        }
        alert('You Lost!');
      }
      if (winner === 'DRAW') {
        try {
          playSound('draw');
        } catch (e) {
          console.log(e);
        }
        alert("It's a Draw!");
      }
    } else {
      if (turn === 'BOT') {
        if (isEmpty(state)) {
          const centerAndCorners = [0, 2, 6, 8, 4];
          const firstMove = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
          insertCell(firstMove, 'x');
          setIsHumanMaximizing(false);
          setTurn('HUMAN');
        } else {
          const best = getBestMove(state, !isHumanMaximizing, 0, -1);
          insertCell(best, isHumanMaximizing ? 'o' : 'x');
          // setIsHumanMaximizing(false);
          setTurn('HUMAN');
        }
      }
    }
  }, [state, turn]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== 'HUMAN'}
          onCellPressed={cell => {
            handleOnCellPressed(cell);
          }}
          state={state}
          gameResult={gameResult}
          size={SCREEN_WIDTH - 60}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}