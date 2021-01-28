import React from 'react';
import {
  TextInput, Text, View, TouchableOpacity, Platform
} from 'react-native';
import Modal from 'react-native-modal';
import Global from '../styles/Global';
import { db, dbTwo } from './database/database';
import styles from '../styles/FlashCardModal';
import calls from '../API/calls';
import axios from 'axios';

class FlashCardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontText: '',
      backText: ''
    };
  }

  InsertNewFlashCard = () => {
    const { frontText, backText } = this.state;
    console.log('Adding new flash card!')
    const insertCard = 'INSERT INTO Cards(CardFront,CardBack)VALUES (?,?)';
    let platformDatabase = Platform.OS === 'ios' ? dbTwo : db;

    platformDatabase.transaction((tx) => {
      tx.executeSql(insertCard, [frontText, backText], () => {
        this.InsertFlashcardAudit();
        this.toggleFlashCardModal();
        this.LoadFlashCardData();
      });
    });
  }

  InsertFlashcardAudit = () => {
    const { frontText, backText } = this.state;

    let myData = JSON.stringify({
      frontText: frontText,
      backText: backText
    });


    axios({
      method: 'POST',
      data: myData,
      url:calls.flashcardaudit,
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response => {
      
    })
      .catch(error => {
        
      })

  }

  toggleFlashCardModal = () => {
    const { toggleFlashCardModal } = this.props;
    toggleFlashCardModal();
    this.setState({
      frontText: '',
      backText: ''
    });
  }

  setValue = (stateKey, stateValue) => {
    this.setState({
      [stateKey]: stateValue
    });
  };

  AddFlashCard = () => {
    let flashCardErrorString = '';
    const { frontText, backText } = this.state;

    if (frontText.length === 0) {
      flashCardErrorString += 'You must enter a value for the front of the card\n';
    }

    if (backText.length === 0) {
      flashCardErrorString += 'You must enter a value for the back of the card\n';
    }

    if (flashCardErrorString === '') {
      this.InsertNewFlashCard();
    } else {
      alert(flashCardErrorString);
    }
  }

  LoadFlashCardData = () => {
    const { loadData } = this.props;
    loadData();
  }

  render() {
    const { isFlashCardModalVisible } = this.props;
    const { frontText, backText } = this.state;
    return (
      <View style={styles.outerContainer}>
        <Modal isVisible={isFlashCardModalVisible} onBackdropPress={() => this.toggleFlashCardModal()} onBackButtonPress={() => this.toggleFlashCardModal()}>
          <View style={styles.innerContainer}>
            <View>
              <TextInput
                autoFocus
                placeholder="Front"
                value={frontText}
                onChangeText={(event) => this.setValue('frontText', event)}
                maxLength={70}
                style={{ marginBottom: 15, height: 100, fontSize: 20 }}
              />
            </View>
            <View>
              <TextInput
                placeholder="Back"
                value={backText}
                onChangeText={(event) => this.setValue('backText', event)}
                maxLength={70}
                style={{ marginBottom: 15, height: 100, fontSize: 20 }}
              />
            </View>
            <View style={styles.bottomButton}>
              <View style={styles.buttonWidth}>
                <TouchableOpacity onPress={() => this.AddFlashCard()}><Text style={[Global.customFont, Global.customFontSize, Global.customWidth, Global.customButton]}>Add</Text></TouchableOpacity>
              </View>
              <View style={styles.buttonWidth}>
                <TouchableOpacity onPress={() => this.toggleFlashCardModal()}><Text style={[Global.customFont, Global.customFontSize, Global.customWidth, Global.customButton]}>Close</Text></TouchableOpacity>
              </View>
            </View>
          </View>

        </Modal>
      </View>
    );
  }
}

export default FlashCardModal;
