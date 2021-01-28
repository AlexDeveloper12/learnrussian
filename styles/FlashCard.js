import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  cardBackground: {
    backgroundColor: 'lightgreen',
    justifyContent: 'center'
  },
  cardPadding: {
    padding: 15,
    marginTop: '4%'
  },
  cardText: {
    fontSize: 24,
    padding: 20

  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topContainer: {
    backgroundColor: 'white',
    height: '100%'
  },
  flipCard: {
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    backgroundColor: '#54a0ff'
  },
  plusIconContainer: {
    alignItems: 'center', height: '3%'
  },
  flasCardModalContainer:{
    flex:0.1
  },
  noCardMargin:{
    marginTop:'6%'
  }

});

export default styles;
