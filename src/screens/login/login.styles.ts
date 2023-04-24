import { colors } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40
  },
  registerLink: {
    color: colors.lightBlue,
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline'
  }
});

export default styles;