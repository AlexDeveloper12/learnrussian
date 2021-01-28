import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Global from '../styles/Global';
import styles from '../styles/FlashCard';
import FlipCardStyles from '../styles/FlipCardModal';

const FlipCardModal = ({
  Front, Back, CardID,deleteFlashCard
}) => (
    <View key={CardID}>
      <FlipCard
        friction={6}
        perspective={1200}
        flipHorizontal
        flipVertical={false}
        useNativeDriver
      >
        <View style={[styles.cardBackground, styles.cardPadding, styles.flipCard]}>
          <Text style={[Global.customWidth, Global.customFont, styles.cardText]}>{Front}</Text>
        </View>
        <View style={[styles.cardBackground, styles.cardPadding, styles.flipCardBack]}>
          <Text style={[Global.customWidth, Global.customFont, styles.cardText]}>{Back}</Text>
        </View>


      </FlipCard>
      <TouchableOpacity onPress={() => deleteFlashCard(CardID)} style={FlipCardStyles.deleteIcon}>
        <FontAwesomeIcon icon={faTimesCircle} size={20} />
      </TouchableOpacity>
    </View>
  );

export default FlipCardModal;
