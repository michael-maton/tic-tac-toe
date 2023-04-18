import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const style = StyleSheet.create({
  line: {
    position: 'absolute',
    backgroundColor: colors.gold
  },
  vertLine: {
    width: 2
  },
  horizLine: {
    height: 2
  },
  diagLine: {
    width: 2,
    top: 0,
    left: '50%'
  }
});

export default style;
