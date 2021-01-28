import Modal from 'react-native-modal';
import React from 'react';
import {
  View, Text
} from 'react-native';
import styles from '../styles/LetterModal';

class LetterModal extends React.Component {

  HideModal = () => {
    const { hideModal } = this.props;
    hideModal();
  }


  render() {
    const {
      isModalVisible, currentCyrilicLetter, currentEnglishLetter, currentEnglishExample, currentCyrilicExample
    } = this.props;
    return (
      <View style={styles.container}>
        <Modal isVisible={isModalVisible} style={{ height: 500 }} onBackdropPress={() => this.HideModal()}>
          <View style={styles.container}>
            <Text style={styles.center}>Letter modal</Text>
            <Text style={[styles.center,styles.custFontSize]}>{currentCyrilicLetter}</Text>
            <Text style={[styles.center,styles.custFontSize]}>{currentEnglishLetter}</Text>
            <Text style={[styles.center,styles.custFontSize]}>{currentEnglishExample}</Text>
            <Text style={[styles.center,styles.custFontSize]}>{currentCyrilicExample}</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

export default LetterModal;
