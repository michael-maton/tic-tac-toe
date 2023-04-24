import { colors } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40
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
