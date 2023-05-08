import { colors } from '@utils';
import { StyleSheet } from 'react-native';
import { sharedStyles } from '@utils';

const styles = StyleSheet.create({
  container: {
    ...sharedStyles.container
  },
  registerLink: {
    color: colors.lightBlue,
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline'
  },
  forgotPasswordLink: {
    color: colors.lightBlue,
    textAlign: 'right',
    marginBottom: 20,
    textDecorationLine: 'underline'
  }
});

export default styles;
