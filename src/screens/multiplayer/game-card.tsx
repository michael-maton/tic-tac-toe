import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { useAuth } from '@contexts/auth-context';
import { Text } from '@components';
import { onUpdateGameById } from '@utils';
import { MultiplayerGameType } from './multiplayer.graphql';
import styles from './multiplayer.styles';
import { colors } from '@utils';
import { API, graphqlOperation } from 'aws-amplify';
import Observable from 'zen-observable';

type GameCardProps = {
  multiplayerGame: MultiplayerGameType;
  onPress: () => void;
};

export default function GameCard({
  multiplayerGame: multiplayerGameProp,
  onPress
}: GameCardProps): ReactElement | null {
  const { user } = useAuth();
  const [multiplayerGame, setMultiplayerGame] = useState(multiplayerGameProp);
  if (!user || !multiplayerGame) return null;

  const animationRef = useRef<Animated.Value>(new Animated.Value(0));

  const fetchOpp = (item: MultiplayerGameType) => {
    if (!user) return null;
    const opponent = item?.game?.players?.items?.find(p => p?.user.username !== user.username);
    return opponent;
  };

  const fetchResult = (multiplayerGame: MultiplayerGameType): 'win' | 'loss' | 'draw' | false => {
    if (!multiplayerGame || !user) return false;

    const game = multiplayerGame.game;

    if (game.status !== 'FINISHED') return false;
    const opponent = fetchOpp(multiplayerGame);

    if (game.winner === user.username) return 'win';
    if (game.winner === opponent?.user.username) return 'loss';
    if (game.winner === null) return 'draw';
    return false;
  };

  const opponent = fetchOpp(multiplayerGame);
  const result = fetchResult(multiplayerGame);

  useEffect(() => {
    const game = multiplayerGame?.game;
    if (game && (game.status === 'REQUESTED' || game.status === 'ACTIVE')) {
      const gameUpdates = API.graphql(
        graphqlOperation(onUpdateGameById, {
          id: game.id
        })
      ) as unknown as Observable<{ [key: string]: any }>;

      const subscription = gameUpdates.subscribe({
        next: ({ value }) => {
          const updatedGame = value.data.onUpdateGameById;
          if (updatedGame) {
            setMultiplayerGame({
              ...multiplayerGame,
              ['game']: { ...multiplayerGame?.game, ...updatedGame }
            });

            if (updatedGame.status === 'FINISHED') {
              subscription.unsubscribe();
            }

            Animated.sequence([
              Animated.timing(animationRef.current, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
              }),
              Animated.delay(1000),
              Animated.timing(animationRef.current, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
              })
            ]).start();
          }
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={styles.card}
    >
      <Animated.View
        style={[
          styles.cardAnimation,
          {
            backgroundColor: animationRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [colors.blue, colors.darkBlue]
            })
          }
        ]}
      />
      <Text style={styles.cardTitle}>
        {opponent?.user.name} ({opponent?.user.username})
      </Text>
      {(multiplayerGame?.game?.status === 'REQUESTED' || multiplayerGame?.game?.status === 'ACTIVE') && (
        <Text style={{ textAlign: 'center', color: colors.lightBlue }}>
          {multiplayerGame?.game?.turn === user.username ? 'Your turn' : `Waiting for ${opponent?.user.username}`}
        </Text>
      )}
      {result && (
        <Text style={{ color: colors[result], textAlign: 'center' }}>
          {result === 'win' && 'You Won!'}
          {result === 'loss' && 'You Lost!'}
          {result === 'draw' && "It's a draw!"}
        </Text>
      )}
    </TouchableOpacity>
  );
}
