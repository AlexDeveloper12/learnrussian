import React, { useState, useEffect } from 'react';

import {
  Text, View, Image, TouchableOpacity, FlatList
} from 'react-native';
import axios from 'axios';
import calls from '../API/calls';
import Global from '../styles/Global';
import styles from '../styles/FamousRussianAuthors';
import LoadingIcon from './LoadingIcon';


function FamousRussianAuthorsList() {

  const [loading, setLoading] = useState(true);

  const [russianAuthorsList, setRussianAuthorsList] = useState([]);

  useEffect(() => {
    axios.get(calls.russianauthors)
      .then((response) => {
        setLoading(false);
        
        setRussianAuthorsList(response.data.message);
      })
      .catch((error) => {
        
      });

  }, []);

  RenderCustomItem = ({ item }) => {
    const famousAuthorInfo = {
      authorName: item.Name, authorDescription: item.Description, authorImage: item.Image, authorDateOfBirth: item.DateOfBirth
    };
    return (
      <View>
        <View style={[Global.centerImage, styles.customMargin]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleFamousAuthor', famousAuthorInfo)}
          >
            <Image source={{ uri: item.Image }} style={[Global.custImgWeight, Global.custImgHeight]} />
          </TouchableOpacity>

        </View>

        <Text style={[Global.customFont, Global.customWidth, styles.customFontSize]}>{item.Name}</Text>
      </View>
    );
  }


  return (
    <View>

      {loading === true ? <LoadingIcon animating={loading} /> : (
        <FlatList
          data={russianAuthorsList}
          keyExtractor={(item) => item.RussianAuthorID.toString()}
          renderItem={this.RenderCustomItem}
          style={{ width: '100%' }}
        />
      )}
    </View>
  )
}


export default FamousRussianAuthorsList;
