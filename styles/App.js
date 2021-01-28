import { StyleSheet } from 'react-native';
import { widthPercentageToDP,heightPercentageToDP } from 'react-native-responsive-screen';

const styles = StyleSheet.create({

  center: {
    textAlign: 'center'
  },
  headerSpacing: {
    marginTop: '10%'
  },
  letterWidth: {
    width: widthPercentageToDP('20%')
  },

  horizontalView: {
    flexDirection: 'row'
  },
  letterSpacing: {
    margin: 7
  },
  letterPadding: {
    padding: widthPercentageToDP('5.3%')
  },
  flexOne: {
    flex: 1
  },
  custSize: {
    fontSize: widthPercentageToDP('7%')
  },
  letterHeight: {
    height: '25%'
  },
  letterVertical: {
    textAlignVertical: 'center'
  },
  letterBottom: {
    borderBottomWidth: 0.2,
    borderBottomColor: 'black'
  },
  letterFont: {
    fontFamily: 'OpenSans-Light'
  },
  container:{
    height: '100%', backgroundColor: 'white'
  },
  custBordWidth:{
    borderWidth:0.5
  },
  flatList:{
    width: widthPercentageToDP('100%'), height: heightPercentageToDP('100%'), borderBottomWidth: 0
  },
  tabNavigator:{
    fontSize: heightPercentageToDP('2.7%'), fontFamily: 'OpenSans-Light'
  }

});

export default styles;
