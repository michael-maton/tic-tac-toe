import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightestBlue,
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 30
  },
  buttonText: {
    fontSize: 18,
    color: colors.blue,
    textAlign: 'center'
  }
});

export default styles;
