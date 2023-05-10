import { Platform, StyleSheet } from 'react-native';
import { colors, sharedStyles } from '@utils';

const styles = StyleSheet.create({
  container: {
    ...sharedStyles.container
  },
  card: {
    backgroundColor: colors.blue,
    padding: 15,
    borderTopWidth: 1,
    borderColor: colors.lightBlue,
    marginBottom: 20
  },
  cardTitle: {
    textAlign: 'center',
    color: colors.lightestBlue,
    fontSize: 17,
    marginBottom: 10
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  newGameButton: {
    backgroundColor: colors.blue,
    padding: 30,
    paddingBottom: Platform.OS === 'ios' ? 45 : 30
  },
  newGameText: {
    textAlign: 'center',
    color: colors.lightestBlue,
    fontSize: 20
  },
  cardAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default styles;
