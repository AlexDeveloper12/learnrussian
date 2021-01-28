import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({

  customFont: {
    fontFamily: 'OpenSans-Light'
  },
  customWidth: {
    textAlign: 'center'
  },
  custImgWeight: {
    width: wp('65%')
  },
  custImgHeight: {
    height: hp('35%')
  },
  centerImage: {
    alignItems: 'center'
  },
  customFontSize: {
    fontSize: wp('4%')
  },
  customButton: {
    backgroundColor: '#54a0ff',
    color: 'white',
    padding: 10
  },
  imgResizeMode:{
    resizeMode:'cover'
  },
  custWhite:{
    backgroundColor:'white'
  },
  fullHeight:{
    height:'100%'
  }
});

export default styles;
