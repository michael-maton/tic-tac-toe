import React, { ReactElement, useEffect, useState } from 'react';
import { Alert, View, ActivityIndicator, SafeAreaView, Dimensions } from 'react-native';
import { GradientBackground, Text, Board, Button } from '@components';
import styles from './multiplayer-game.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParams } from '@config/navigator';
import { RouteProp } from '@react-navigation/native';
import { makeMove, getGame, startGame } from './multiplayer-game.graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { getGameQuery, makeMoveMutation, startGameMutation } from '@api';
import { BoardState, Moves, colors, errorMessage, isTerminal, onUpdateGameById, useSounds } from '@utils';
import { useAuth } from '@contexts/auth-context';
import Observable from 'zen-observable';

type MultiplayerGameProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'MultiplayerGame'>;
  route: RouteProp<StackNavigatorParams, 'MultiplayerGame'>;
};

type GameType = getGameQuery['getGame'];

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default function MultiplayerGame({ navigation, route }: MultiplayerGameProps): ReactElement {
  const { user } = useAuth();
  const { gameID: existingGameID, invitee } = route.params;
  const [gameIDState, setGameIDState] = useState<string | null>(null);
  const [game, setGame] = useState<GameType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [playing, setPlaying] = useState<Moves | false>(false);
  const terminalResult = game ? isTerminal(game?.state as BoardState) : false;
  const [initFinished, setInitFinished] = useState<boolean>(false);
  const opponent = game && user && game.users.find(p => p !== user.username);
  const player1 = game?.players?.items && game?.players?.items.find(p => p?.user.username === user?.username);
  const player2 = game?.players?.items && game?.players?.items.find(p => p?.user.username === opponent);

  const playSound = useSounds();

  const initGame = async () => {
    setLoading(true);
    let gameID = existingGameID;
    try {
      if (!gameID) {
        const startGameRes = (await API.graphql(
          graphqlOperation(startGame, {
            invitee
          })
        )) as GraphQLResult<startGameMutation>;
        if (startGameRes.data?.startGame) {
          gameID = startGameRes.data.startGame.id;
        }
      }

      if (gameID) {
        const getGameRes = (await API.graphql(
          graphqlOperation(getGame, {
            id: gameID
          })
        )) as GraphQLResult<getGameQuery>;

        if (getGameRes.data?.getGame) {
          if (getGameRes.data.getGame.status === 'FINISHED') {
            setInitFinished(true);
          }
          setGame(getGameRes.data?.getGame);
          setGameIDState(gameID);
        }
      }
    } catch (e) {
      console.log(e);
      Alert.alert(errorMessage(e));
    }
    setLoading(false);
  };

  const playMove = async (idx: Moves) => {
    setPlaying(idx);
    try {
      const playMoveRes = (await API.graphql(
        graphqlOperation(makeMove, {
          index: idx,
          game: gameIDState
        })
      )) as GraphQLResult<makeMoveMutation>;

      if (game && playMoveRes.data?.makeMove) {
        const { status, state, turn, winner } = playMoveRes.data.makeMove;
        setGame({ ...game, status, state, turn, winner });
      }
    } catch (e) {
      if (e.errors && e.errors.length > 0) {
        Alert.alert(errorMessage(e));
      } else {
        Alert.alert(errorMessage(e));
      }
    }
    setPlaying(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (game && (game.status === 'REQUESTED' || game.status === 'ACTIVE')) {
      const gameUpdates = API.graphql(
        graphqlOperation(onUpdateGameById, {
          id: gameIDState
        })
      ) as unknown as Observable<{ [key: string]: any }>;

      const subscription = gameUpdates.subscribe({
        next: ({ value }) => {
          const newGame = value.data.onUpdateGameById;
          if (newGame && game) {
            const { status, state, turn, winner } = newGame;
            setGame({ ...game, status, state, turn, winner });

            if (user && user.username === turn) {
              playSound('pop1');
            } else if (user) {
              playSound('pop2');
            }
          }
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [gameIDState]);

  useEffect(() => {
    if (game && game.status === 'FINISHED' && !initFinished) {
      if (game.winner === null) {
        playSound('draw');
      } else if (user && game.winner === user.username) {
        playSound('win');
      } else {
        playSound('loss');
      }
    }
  }, [game]);

  const isActive = () => {
    return game && (game.status === 'ACTIVE' || game.status === 'REQUESTED');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {loading && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color={colors.lightBlue} />
          </View>
        )}
        {game && user && (
          <>
            <View style={{ width: SCREEN_WIDTH - 60 }}>
              <Text style={styles.turn} numberOfLines={1}>
                {game.turn === user.username && isActive() && 'Your Turn'}
                {game.turn === opponent && isActive() && `Waiting for ${opponent}`}
                {!isActive() && 'Game Over'}
              </Text>
              <View style={styles.gameInfo}>
                <View
                  style={[
                    styles.player,
                    game.turn === player1?.user.username && isActive() && styles.playerTurn,
                    { alignItems: 'flex-end' }
                  ]}
                >
                  <Text style={styles.playerName} numberOfLines={1}>
                    {player1?.user.name}
                  </Text>
                  <Text style={styles.playerUsername} numberOfLines={1}>
                    {player1?.user.username}
                  </Text>
                </View>
                <View style={styles.vs}>
                  <Text style={styles.vsText}>vs</Text>
                </View>
                <View style={[styles.player, game.turn === player2?.user.username && isActive() && styles.playerTurn]}>
                  <Text style={styles.playerName}>{player2?.user.name}</Text>
                  <Text style={styles.playerUsername} numberOfLines={1}>
                    {player2?.user.username}
                  </Text>
                </View>
              </View>
            </View>
            <Board
              size={SCREEN_WIDTH - 60}
              state={game.state as BoardState}
              gameResult={terminalResult}
              disabled={
                game.turn !== user.username ||
                playing !== false ||
                (game.status !== 'ACTIVE' && game.status !== 'REQUESTED')
              }
              loading={playing}
              onCellPressed={idx => {
                playMove(idx as Moves);
              }}
            />
          </>
        )}
        {user && game && game.status === 'FINISHED' && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {game.winner === user.username && 'You Won!'}
              {game.winner === opponent && 'You Lost!'}
              {game.winner === null && 'Draw'}
            </Text>
            <Button
              onPress={() => {
                if (opponent) {
                  navigation.replace('MultiplayerGame', { invitee: opponent });
                }
              }}
              title='Play Again'
            />
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}
