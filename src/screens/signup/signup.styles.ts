import { StyleSheet } from 'react-native';
import { colors, sharedStyles } from '@utils';

const styles = StyleSheet.create({
  container: {
    ...sharedStyles.container
  },
  otpBox: {
    color: colors.lightestBlue,
    fontFamily: 'Inter_400Regular',
    fontSize: 20,
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightestBlue,
    backgroundColor: colors.blue
  },
  otpActiveBox: {
    borderWidth: 1,
    borderColor: colors.lightBlue
  },
  otpInstruction: {
    color: colors.lightestBlue
  },
  resendText: {
    color: colors.lightBlue,
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline'
  }
});

export default styles;
