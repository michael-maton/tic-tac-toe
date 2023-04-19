import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.lightestBlue,
    backgroundColor: colors.blue,
    padding: 10,
    color: colors.lightestBlue,
    fontSize: 16,
    fontFamily: 'Inter_400Regular'
  }
});

export default styles;
