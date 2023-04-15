import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { GradientBackground } from '@components';
import styles from './single-player-game.styles';
import { Board } from '@components';
import { BoardState, isEmpty, isTerminal, getBestMove, Cell } from '@utils';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export default function Game(): ReactElement {
  // prettier-ignore
  const [state, setState] = useState<BoardState>([
    null, null, null, 
    null, null, null, 
    null, null, null
  ]);

  const [turn, setTurn] = useState<'HUMAN' | 'BOT'>(Math.random() < 0.5 ? 'HUMAN' : 'BOT');
  const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
  const popSoundRef = useRef<Audio.Sound | null>(null);
  const pop2SoundRef = useRef<Audio.Sound | null>(null);
  const winSoundRef = useRef<Audio.Sound | null>(null);
  const lossSoundRef = useRef<Audio.Sound | null>(null);
  const drawSoundRef = useRef<Audio.Sound | null>(null);
  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: 'x' | 'o'): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = symbol;
    setState(stateCopy);

    try {
      symbol === 'x' ? popSoundRef.current?.replayAsync() : pop2SoundRef.current?.replayAsync();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
          winSoundRef.current?.replayAsync();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (e) {
          console.log(e);
        }
        alert('You Won!');
      }
      if (winner === 'BOT') {
        try {
          lossSoundRef.current?.replayAsync();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } catch (e) {
          console.log(e);
        }
        alert('You Lost!');
      }
      if (winner === 'DRAW') {
        try {
          drawSoundRef.current?.replayAsync();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
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
          const best = getBestMove(state, !isHumanMaximizing, 0, 1);
          insertCell(best, isHumanMaximizing ? 'o' : 'x');
          // setIsHumanMaximizing(false);
          setTurn('HUMAN');
        }
      }
    }
  }, [state, turn]);

  useEffect(() => {
    // load sounds only once when screen renders
    const popSoundObject = new Audio.Sound();
    const pop2SoundObject = new Audio.Sound();
    const winSoundObject = new Audio.Sound();
    const lossSoundObject = new Audio.Sound();
    const drawSoundObject = new Audio.Sound();

    const loadSounds = async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      await popSoundObject.loadAsync(require('@assets/pop_1.wav'));
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      await pop2SoundObject.loadAsync(require('@assets/pop_2.wav'));
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      await winSoundObject.loadAsync(require('@assets/win.mp3'));
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      await lossSoundObject.loadAsync(require('@assets/loss.mp3'));
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      await drawSoundObject.loadAsync(require('@assets/draw.mp3'));
      popSoundRef.current = popSoundObject;
      pop2SoundRef.current = pop2SoundObject;
      winSoundRef.current = winSoundObject;
      lossSoundRef.current = lossSoundObject;
      drawSoundRef.current = drawSoundObject;
    };
    loadSounds();

    return () => {
      // unload sounds
      popSoundObject && popSoundObject.unloadAsync();
      pop2SoundObject && pop2SoundObject.unloadAsync();
      winSoundObject && winSoundObject.unloadAsync();
      lossSoundObject && lossSoundObject.unloadAsync();
      drawSoundObject && drawSoundObject.unloadAsync();
    };
  }, []);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== 'HUMAN'}
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
