import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView, Dimensions, View, Text } from 'react-native';
import { GradientBackground, Button } from '@components';
import styles from './single-player-game.styles';
import { Board } from '@components';
import { BoardState, isEmpty, isTerminal, getBestMove, Cell, useSounds } from '@utils';
import { useSettings, difficulty } from '@contexts/settings-context';

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
  const [gamesCount, setGamesCount] = useState({
    wins: 0,
    losses: 0,
    draws: 0
  });

  const playSound = useSounds();
  const { settings } = useSettings();

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

  const newGame = () => {
    setState([null, null, null, null, null, null, null, null, null]);
    setTurn(Math.random() < 0.5 ? 'HUMAN' : 'BOT');
  };

  useEffect(() => {
    if (gameResult) {
      const winner = getWinner(gameResult.winner);
      if (winner === 'HUMAN') {
        try {
          playSound('win');
          setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
        } catch (e) {
          console.log(e);
        }
      }
      if (winner === 'BOT') {
        try {
          playSound('loss');
          setGamesCount({ ...gamesCount, losses: gamesCount.losses + 1 });
        } catch (e) {
          console.log(e);
        }
      }
      if (winner === 'DRAW') {
        try {
          playSound('draw');
          setGamesCount({ ...gamesCount, draws: gamesCount.draws + 1 });
        } catch (e) {
          console.log(e);
        }
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
          const best = getBestMove(state, !isHumanMaximizing, 0, parseInt(settings ? settings.difficulty : '4'));
          insertCell(best, isHumanMaximizing ? 'o' : 'x');
          setTurn('HUMAN');
        }
      }
    }
  }, [state, turn]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.difficulty}>Difficulty: {settings ? difficulty[settings.difficulty] : 'Hard'}</Text>
          <View style={styles.results}>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Wins</Text>
              <Text style={styles.resultsCount}>{gamesCount.wins}</Text>
            </View>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Draws</Text>
              <Text style={styles.resultsCount}>{gamesCount.draws}</Text>
            </View>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Losses</Text>
              <Text style={styles.resultsCount}>{gamesCount.losses}</Text>
            </View>
          </View>
        </View>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== 'HUMAN'}
          onCellPressed={cell => {
            handleOnCellPressed(cell);
          }}
          state={state}
          gameResult={gameResult}
          size={SCREEN_WIDTH - 60}
        />
        {gameResult && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {getWinner(gameResult.winner) === 'HUMAN' && 'You Won!'}
              {getWinner(gameResult.winner) === 'BOT' && 'You Lost!'}
              {getWinner(gameResult.winner) === 'DRAW' && 'Draw'}
            </Text>
            <Button onPress={() => newGame()} title='Play Again' />
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}
