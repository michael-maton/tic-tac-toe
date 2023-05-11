import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@utils';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.8,
    marginTop: SCREEN_HEIGHT * 0.4
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
    height: 60,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
    // borderWidth: 1,
    // marginHorizontal: '5%'
  },
  modalInput: {
    width: SCREEN_WIDTH / 1.49,
    height: '100%'
  },
  searchButton: {
    justifyContent: 'center',
    backgroundColor: colors.blue,
    width: 60,
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightestBlue
  },
  cardContainer: {
    backgroundColor: colors.blue,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.lightBlue,
    marginBottom: 20
  },
  cardName: {
    textAlign: 'center',
    color: colors.lightestBlue,
    fontSize: 20
    // marginBottom: 10
  },
  cardUsername: {
    textAlign: 'center',
    color: colors.lightestBlue,
    fontSize: 15
    // marginBottom: 10
  }
});

export default styles;
