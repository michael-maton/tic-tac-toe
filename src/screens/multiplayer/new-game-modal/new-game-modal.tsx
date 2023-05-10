import React, { ReactElement, useEffect, useState, useRef } from 'react';
import {
  View,
  Alert,
  TextInput as NativeTextInput,
  Keyboard,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './new-game-modal.styles';
import { Text, Button, GradientBackground, TextInput } from '@components';
import { colors } from '@utils';
import { API, graphqlOperation } from 'aws-amplify';
import { searchUsers } from '../multiplayer.graphql';
import { GraphQLResult } from '@aws-amplify/api';
import { searchUsersQuery } from '@api';

type UsersType = Array<{
  __typename: 'User';
  name: string;
  username: string;
} | null>;

export default function NewGameModal(): ReactElement {
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [foundUsers, setFoundUsers] = useState<UsersType | null>(null);
  const searchRef = useRef<NativeTextInput | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    fetchUsers(search);
  };

  const fetchUsers = async (searchString: string) => {
    setLoading(true);
    setSubmittedSearch(searchString);
    try {
      const users = (await API.graphql(
        graphqlOperation(searchUsers, {
          limit: 10,
          searchString: searchString
        })
      )) as GraphQLResult<searchUsersQuery>;
      if (users.data?.searchUsers?.items) {
        setFoundUsers(users.data?.searchUsers?.items);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('No users found.');
    }
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      searchRef.current?.focus();
    }, 150);
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
      <GradientBackground
        colors={[colors.blue, colors.darkBlue]}
        style={{ borderTopLeftRadius: 7, borderTopRightRadius: 7 }}
      >
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 13,
            // height: 60,
            // borderWidth: 1,
            marginLeft: 34
          }}
        >
          <Text style={{ color: colors.lightBlue }}>Search for user:</Text>
        </View> */}
        <View style={styles.searchContainer}>
          <TextInput
            ref={searchRef}
            value={search}
            onChangeText={value => setSearch(value)}
            onSubmitEditing={onSubmit}
            style={styles.modalInput}
            placeholder='Search for user'
            returnKeyType='search'
          />
          <Button
            style={styles.searchButton}
            title={<Feather name='arrow-right' size={20} color='white' />}
            onPress={() => {
              Keyboard.dismiss();
              onSubmit();
            }}
            activeOpacity={0.8}
          />
        </View>
        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={{ flex: 1, paddingTop: 100, justifyContent: 'flex-start' }}>
              <ActivityIndicator color={colors.lightBlue} />
            </View>
          ) : (
            <FlatList
              data={foundUsers}
              contentContainerStyle={{ padding: 20 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.cardContainer} activeOpacity={0.6}>
                    <Text style={styles.cardName}>{item?.name}</Text>
                    <Text style={styles.cardUsername}>{item?.username}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={user => user?.username || `${new Date().getTime()}`}
              ListEmptyComponent={() => {
                return (
                  <View>
                    <Text style={{ color: colors.lightBlue, textAlign: 'center' }}>
                      {submittedSearch ? 'User not found.' : ''}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </View>
      </GradientBackground>
    </TouchableOpacity>
  );
}
