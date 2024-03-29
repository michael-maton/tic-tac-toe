import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30
  },
  field: {
    marginBottom: 30
  },
  label: {
    fontSize: 22,
    marginBottom: 10,
    color: colors.lightestBlue
  },
  choices: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  choice: {
    backgroundColor: colors.lightestBlue,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 5
  },
  choiceText: {
    color: colors.darkBlue,
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  changePasswordLink: {
    color: colors.lightestBlue,
    textAlign: 'left',
    marginBottom: 20,
    textDecorationLine: 'underline',
    fontSize: 22
  }
});

export default styles;
