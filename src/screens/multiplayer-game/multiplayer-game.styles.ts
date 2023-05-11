import { StyleSheet } from 'react-native';
import { colors, sharedStyles } from '@utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80
  },
  modal: {
    position: 'absolute',
    backgroundColor: colors.lightBlue,
    bottom: 30,
    left: 30,
    right: 30,
    padding: 30,
    borderWidth: 3,
    borderColor: colors.lightestBlue
  },
  modalText: {
    color: colors.blue,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30
  },
  turn: {
    color: colors.lightBlue,
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20
  },
  gameInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 80
  },
  playerName: {
    color: colors.lightBlue
  },
  playerUsername: {
    color: colors.lightBlue,
    fontSize: 14
  },
  player: {
    width: '40%',
    backgroundColor: colors.darkBlue,
    // borderWidth: 1,
    borderColor: colors.gold,
    padding: 10
  },
  playerTurn: {
    backgroundColor: colors.blue,
    borderWidth: 3
  },
  vs: {
    width: '10%'
  },
  vsText: {
    color: colors.lightBlue,
    textAlign: 'center'
  }
});

export default styles;
