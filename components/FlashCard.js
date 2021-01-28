import React from 'react';
import {
  Text, View, TouchableOpacity, FlatList
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FlashCardModal from './FlashCardModal';
import Global from '../styles/Global';
import styles from '../styles/FlashCard';
import FlipCardModal from './FlipCardModal';
import {
  db
} from './database/database';

class FlashCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardVisibilityStatus: false,
      arrayOfCards: [],
      toggleAwesomeAlert: false,
      itemID: 0
    };
  }

  async componentDidMount() {
    await this.configureDatabase();
  }

  toggleCardModalVisibility = () => {
    const { cardVisibilityStatus } = this.state;
    this.setState({
      cardVisibilityStatus: !cardVisibilityStatus
    });
  }

  configureDatabase = async () => {
    db.transaction((tx) => {
      const createTableQuery = 'SELECT CardID,CardFront,CardBack FROM Cards';
      tx.executeSql(createTableQuery, [], (transactionOutput, results) => {
        if (results.rows.length === 0) {
          transactionOutput.executeSql('DROP TABLE IF EXISTS Cards', []);
          const dropCreateTable = 'CREATE TABLE "Cards" ( "CardID" INTEGER NOT NULL, "CardFront" TEXT NOT NULL DEFAULT \'\', "CardBack" TEXT NOT NULL DEFAULT \'\', PRIMARY KEY("CardID" AUTOINCREMENT) )';
          transactionOutput.executeSql(dropCreateTable, []);
          this.setState({
            arrayOfCards: []
          });
        } else {
          const arrayOfCardObjects = [];
          const len = results.rows.length;
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            const objectFlashCard = {}; // empty object to contain front and back data to eventually loop over
            objectFlashCard.CardID = row.CardID;
            objectFlashCard.Front = row.CardFront;
            objectFlashCard.Back = row.CardBack;
            arrayOfCardObjects.push(objectFlashCard);
          }
          this.setState({
            arrayOfCards: arrayOfCardObjects
          });
        }
      });
    });
  }

  toggleAwesomeAlertVisibility = (cardID) => {
    const { toggleAwesomeAlert } = this.state;
    this.setState({
      toggleAwesomeAlert: !toggleAwesomeAlert,
      itemID: cardID
    });
  }

  DeleteFlashCard = (itemID) => {
    db.transaction((tx) => {
      const delSQL = 'DELETE FROM Cards WHERE CardID = ?';
      tx.executeSql(delSQL, [itemID], () => {
        // record deleted so need to close modal or popup and reload data
        this.configureDatabase();
      });
    });
  }

  renderCardData = ({ item }) => (
    <FlipCardModal
      Front={item.Front}
      Back={item.Back}
      CardID={item.CardID}
      toggleAwesomeAlertVisibility={this.toggleAwesomeAlertVisibility}
      deleteFlashCard={this.DeleteFlashCard}
    />
  )

  keyExtractor = (item) => item.CardID.toString();

  render() {
    const {
      arrayOfCards, cardVisibilityStatus
    } = this.state;

    return (
      <View style={styles.topContainer}>
        <View style={styles.plusIconContainer}>
          <TouchableOpacity onPress={() => this.toggleCardModalVisibility()}>
            <FontAwesomeIcon icon={faPlus} size={35} />
          </TouchableOpacity>
        </View>
        <View>
          {arrayOfCards.length === 0 ? <Text style={[Global.customWidth, Global.customFont, Global.customFontSize, styles.noCardMargin]}>No flashcards found</Text>
            : (
              <FlatList
                data={arrayOfCards}
                renderItem={this.renderCardData}
                keyExtractor={this.keyExtractor}
                style={styles.noCardMargin}
              />
            )}

        </View>
        <View style={styles.flasCardModalContainer}>
          <FlashCardModal
            isFlashCardModalVisible={cardVisibilityStatus}
            loadData={this.configureDatabase}
            toggleFlashCardModal={this.toggleCardModalVisibility}
          />
        </View>

      </View>
    );
  }
}

export default FlashCard;
