import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80
  },
  difficulty: {
    color: colors.lightestBlue,
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 20
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50
  },
  resultsBox: {
    backgroundColor: colors.lightestBlue,
    borderWidth: 1,
    borderColor: colors.lightBlue,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5
  },
  resultsTitle: {
    color: colors.blue,
    fontSize: 14
  },
  resultsCount: {
    color: colors.blue,
    fontSize: 20
  },
  modal: {
    position: 'absolute',
    backgroundColor: colors.lightBlue,
    bottom: 30,
    left: 30,
    right: 30,
    padding: 30,
    borderWidth: 3,
    borderColor: colors.lightestBlue
  },
  modalText: {
    color: colors.blue,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30
  }
});

export default styles;
