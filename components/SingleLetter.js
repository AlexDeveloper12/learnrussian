import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import styles from '../styles/App';
import singleLetterStyles from '../styles/SingleLetter';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import Sound from 'react-native-sound';
import * as Progress from 'react-native-progress';

class SingleLetter extends React.Component {
  constructor(props) {
    super(props);
    const { capitalLetter, smallLetter, pronunciation, soundFileURL } = this.props.route.params;

    this.state = {
      capitalLetter,
      smallLetter,
      pronunciation,
      soundFileURL,
      soundDuration: 0
    };
  }

  PlaySoundFile = () => {
    const { soundFileURL } = this.state;

    Sound.setCategory('Playback');

    var phraseSound = new Sound(`${soundFileURL}`, null,
      (error) => {
        if (error) {
          console.log(error);
        }
        phraseSound.play((success) => {
          if (success) {
            
            this.setState({
              soundDuration: phraseSound.getDuration()
            });

            phraseSound.release();

          } else {
            
          }
        });
      });

    phraseSound.setVolume(1);


  }


  render() {
    const { capitalLetter, smallLetter, pronunciation, soundFileURL } = this.state;

    return (
      <View>
        <View style={{ backgroundColor: 'white', height: heightPercentageToDP('100%') }}>
          <Text style={[styles.letterFont, styles.center, singleLetterStyles.custSize]}>{capitalLetter}</Text>
          <Text style={[styles.letterFont, styles.center, singleLetterStyles.custSize]}>{smallLetter}</Text>
          <Text style={[styles.letterFont, styles.center, singleLetterStyles.custSize]}>{pronunciation}</Text>

          {soundFileURL.length > 0 ?
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>

              <TouchableOpacity onPress={() => this.PlaySoundFile()}>
                <FontAwesomeIcon icon={faVolumeUp} size={30} />
              </TouchableOpacity>

            </View> : null

          }
          {/* 


          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
            <Progress.Bar progress={0.1} width={200} />
          </View> */}


        </View>
      </View>
    );
  }
}

export default SingleLetter;
