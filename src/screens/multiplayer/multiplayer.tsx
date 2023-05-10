import React, { ReactElement, useEffect, useState } from 'react';
import { Alert, ActivityIndicator, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import Modal from 'react-native-modal';
import { Button, GradientBackground, Text } from '@components';
import styles from './multiplayer.styles';
import { useAuth } from '@contexts/auth-context';
import { colors } from '@utils';
import { getUser } from './multiplayer.graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { GetUserQuery, MultiplayerGameType } from './multiplayer.graphql';
import GameCard from './game-card';
import NewGameModal from './new-game-modal/new-game-modal';

export default function Multiplayer(): ReactElement {
  const { user } = useAuth();
  const [multiplayerGames, setMultiplayerGames] = useState<MultiplayerGameType[] | null>(null);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [newGameModalVisible, setNewGameModalVisible] = useState(false);

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
            renderItem={({ item }) => <GameCard multiplayerGame={item} />}
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
                    <ActivityIndicator color={colors.lightBlue} />
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
          <TouchableOpacity
            onPress={() => setNewGameModalVisible(true)}
            style={styles.newGameButton}
            activeOpacity={0.6}
          >
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
      <Modal
        style={{ margin: 0 }}
        isVisible={newGameModalVisible}
        onSwipeComplete={() => setNewGameModalVisible(false)}
        swipeDirection={['down']}
        scrollOffset={100}
        swipeThreshold={300}
        backdropOpacity={0.75}
        avoidKeyboard
        onBackdropPress={() => setNewGameModalVisible(false)}
        onBackButtonPress={() => setNewGameModalVisible(false)}
      >
        <NewGameModal />
      </Modal>
    </GradientBackground>
  );
}
