import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const BasicPhrasesStyles = StyleSheet.create({

  flatlistPadding: {
    paddingBottom: 20
  },
  horizontalRow: {
    flexDirection: 'row'

  },
  marginLeftMiddle: {
    marginLeft: '30%'
  },
  customWidth: {
    width: '45%'
  },
  customFullWidth: {
    width: '100%',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 40
  },
  customFontSize: {
    fontSize: wp('4%')
  },
  headerFontSize: {
    fontSize: 40
  },
  customAlignment: {
    textAlignVertical: 'center',
    width: '100%'

  },
  customBackgroundColor: {

  },
  customWhiteColour: {
    color: 'black'
  },
  flatlist: {
    width: '90%', height: 500, marginLeft: 10, marginTop: '8%'
  },
  container: {
    height: '100%',
    backgroundColor: 'white'
  }

});

export default BasicPhrasesStyles;
