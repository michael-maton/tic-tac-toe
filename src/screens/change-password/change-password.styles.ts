import { StyleSheet } from 'react-native';
import { colors, sharedStyles } from '@utils';

const styles = StyleSheet.create({
  container: {
    ...sharedStyles.container
  },
  text: {
    color: colors.lightestBlue,
    marginBottom: 20,
    textAlign: 'center'
  }
});

export default styles;
