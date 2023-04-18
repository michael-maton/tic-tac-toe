import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 120,
    marginTop: 40
  },
  logo: {
    height: 250,
    maxWidth: '50%',
    resizeMode: 'contain'
  },
  buttons: {
    marginTop: 20
  },
  button: {
    marginBottom: 15
  },
  loggedInText: {
    color: colors.lightestBlue,
    textAlign: 'center',
    fontSize: 14
  }
});

export default styles;
