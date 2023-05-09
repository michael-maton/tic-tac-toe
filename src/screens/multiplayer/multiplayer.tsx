import React, { ReactElement, useEffect, useState } from 'react';
import { Alert, ActivityIndicator, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Button, GradientBackground, Text } from '@components';
import styles from './multiplayer.styles';
import { useAuth } from '@contexts/auth-context';
import { colors } from '@utils';
import { getUser } from './multiplayer.graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { GameStatus } from '@api';

// type MultiplayerGamesType = Exclude<GetUserQuery['getUser'], null>;
// type GameArrType = Exclude<MultiplayerGamesType['games'], null>;

// type MultiplayerGamesType = Exclude<GetUserQuery['getUser'], null>['games'] extends (infer GamesType) | null ? GamesType : never;
// type GameArrType = Exclude<GamesType, null>['items'];

// type MultiplayerGamesType = Exclude<Exclude<GetUserQuery['getUser'], null>['games'], null>['items'];
// type GameType = Exclude<MultiplayerGamesType, null>[0];
// type GameInfoType = GameType['game'];

type GetUserQuery = {
  getUser?: {
    __typename: 'User';
    id: string;
    games?: ModelMultiplayerGameConnection;
  };
};

type ModelMultiplayerGameConnection = {
  __typename: 'ModelMultiplayerGameConnection';
  items: MultiplayerGame[];
  nextToken?: string | null;
} | null;

type MultiplayerGame = {
  __typename: 'MultiplayerGame';
  game: Game;
} | null;

type Game = {
  __typename: 'Game';
  id: string;
  owner: string;
  users: Array<string>;
  status: GameStatus;
  turn: string;
  winner?: string | null;
  players?: {
    __typename: 'ModelMultiplayerGameConnection';
    items: Array<{
      __typename: 'MultiplayerGame';
      user: {
        __typename: 'User';
        name: string;
        username: string;
      };
      game: Game;
    } | null>;
  } | null;
};

export default function Multiplayer(): ReactElement {
  const { user } = useAuth();
  const [multiplayerGames, setMultiplayerGames] = useState<MultiplayerGame[] | null>(null);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUser = async (nextToken: string | null, init = false) => {
    if (user) {
      setLoading(true);
      if (nextToken === null && !init) {
        setRefreshing(true);
      }
      try {
        const player = (await API.graphql(
          graphqlOperation(getUser, {
            username: user.username,
            limit: 2,
            sortDirection: 'DESC',
            nextToken: nextToken
          })
        )) as GraphQLResult<GetUserQuery>;

        if (player.data?.getUser?.games) {
          const newMultiplayerGames = player.data?.getUser?.games.items || [];
          setMultiplayerGames(
            !multiplayerGames || nextToken === null
              ? newMultiplayerGames
              : [...multiplayerGames, ...newMultiplayerGames]
          );
          setNextToken(player.data?.getUser?.games.nextToken || null);
        }
      } catch (e) {
        console.log(e);
        Alert.alert('An error has occured.');
      }
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchOpp = (item: MultiplayerGame) => {
    if (!user) return null;
    const opponent = item?.game?.players?.items?.find(p => p?.user.username !== user.username);
    return opponent;
  };

  const renderGame = ({ item }: { item: MultiplayerGame }) => {
    if (!user) return null;
    // const game = item?.game;
    const opponent = fetchOpp(item);
    const result = fetchResult(item);

    return (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>
          {opponent?.user.name} ({opponent?.user.username})
        </Text>
        {(item?.game?.status === 'REQUESTED' || item?.game?.status === 'ACTIVE') && (
          <Text style={{ textAlign: 'center', color: colors.lightBlue }}>
            {item?.game?.turn === user.username ? 'Your turn' : `Waiting for ${opponent?.user.username}`}
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
  };

  const fetchResult = (multiplayerGame: MultiplayerGame): 'win' | 'loss' | 'draw' | false => {
    if (!multiplayerGame || !user) return false;

    const game = multiplayerGame.game;

    if (game.status !== 'FINISHED') return false;
    const opponent = fetchOpp(multiplayerGame);

    console.log('OPP:', opponent);

    if (game.winner === user.username) return 'win';
    if (game.winner === opponent?.user.username) return 'loss';
    if (game.winner === null) return 'draw';
    return false;
  };

  useEffect(() => {
    fetchUser(null, true);
  }, []);

  return (
    <GradientBackground>
      {user ? (
        <>
          <FlatList
            contentContainerStyle={styles.container}
            data={multiplayerGames}
            renderItem={renderGame}
            keyExtractor={multiplayerGame => (multiplayerGame ? multiplayerGame?.game.id : `${new Date().getTime()}`)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  fetchUser(null);
                }}
                tintColor={colors.lightBlue}
              />
            }
            ListFooterComponent={() => {
              if (!nextToken) return null;
              return (
                <Button
                  style={{ marginTop: 20 }}
                  loading={loading && !refreshing}
                  title='Load More'
                  onPress={() => {
                    fetchUser(nextToken);
                  }}
                />
              );
            }}
            ListEmptyComponent={() => {
              if (loading) {
                return (
                  <View style={styles.loading}>
                    <ActivityIndicator color={colors.blue} />
                  </View>
                );
              }
              return (
                <View>
                  <Text style={{ color: colors.lightestBlue, textAlign: 'center' }}>You have no games.</Text>
                </View>
              );
            }}
          />
          <TouchableOpacity style={styles.newGameButton}>
            <Text style={styles.newGameText}>New Game</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.container}>
          <Text style={{ color: colors.lightestBlue, textAlign: 'center' }}>
            Oops, you must be logged in to do that.
          </Text>
        </View>
      )}
    </GradientBackground>
  );
}
