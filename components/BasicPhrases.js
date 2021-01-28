import React,{useState, useEffect} from 'react';
import {
  Text, View, TouchableOpacity, FlatList
} from 'react-native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import Sound from 'react-native-sound';
import LoadingIcon from './LoadingIcon';
import BasicPhrasesStyles from '../styles/BasicPhrases';
import calls from '../API/calls';
import Global from '../styles/Global';

function BasicPhrases(){

  const [basicPhrases,setBasicPhrases] = useState([]);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{
    axios.get(calls.basicphrases).then((response) => {
      if (response !== null && response !== undefined && response !== '') {
        setLoading(false);
        setBasicPhrases(response.data.message)
      }
    }).catch((error) => {
      //console.log(`Error getting basic phrases: ${error}`);
    });

  },[]);

  RenderCustomItem = ({ item }) => {
    const isHeaderStyles = item.isHeader.data[0] === 1 ? [Global.customFont, BasicPhrasesStyles.customAlignment] : [BasicPhrasesStyles.flatlistPadding, BasicPhrasesStyles.horizontalRow];
    // console.log(response.data.message[0].isHeader.data[0]);
    return (
      <View style={isHeaderStyles}>
        <Text style={[item.isHeader.data[0] === 0 ? BasicPhrasesStyles.customWidth : BasicPhrasesStyles.customFullWidth, Global.customFont, BasicPhrasesStyles.customFontSize]}>{item.BasicPhrasesDescription}</Text>
        <Text style={[BasicPhrasesStyles.customWidth, Global.customFont, BasicPhrasesStyles.customFontSize]}>{item.Pronunciation}</Text>
        {item.SoundFileName.length > 0 ? (
          <TouchableOpacity onPress={() => this.PlaySoundFile(item.SoundFileName)}>
            <FontAwesomeIcon icon={faVolumeUp} size={20} style={BasicPhrasesStyles.customWidth} />
          </TouchableOpacity>
        ) : null}

      </View>
    );
  }

  keyExtractor = (item,index) =>  item.BasicPhrasesID.toString();

  PlaySoundFile = (soundFileName) => {
    

    Sound.setCategory('Playback');

    var phraseSound = new Sound(`${soundFileName}`, null,
      (error) => {
        if (error) {
          console.log(error);
        }
        phraseSound.play((success) => {
          if (success) {
            phraseSound.release();
          } 
        });
      });

    phraseSound.setVolume(1);
  }

  return(
    <View style={BasicPhrasesStyles.container}>

        {loading ? <LoadingIcon animating={loading} />
          : (
            <FlatList
              data={basicPhrases}
              keyExtractor={this.keyExtractor}
              renderItem={this.RenderCustomItem}
              style={BasicPhrasesStyles.flatlist}
              showsVerticalScrollIndicator={false}
              refreshing={true}
            />
          )}

      </View>
  )



}

export default BasicPhrases;
