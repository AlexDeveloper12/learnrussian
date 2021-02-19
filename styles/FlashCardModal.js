import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'white', height: '30%'
  },
  innerContainer: {
    height: '60%', backgroundColor: 'white'
  },
  bottomButton: {
    flexDirection: 'row', position: 'absolute', bottom: 0
  },
  buttonWidth: {
    width: '50%'
  }
});

export default styles;
