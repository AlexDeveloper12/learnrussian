import React from 'react';
import { Text, View, Image } from 'react-native';
import moment from 'moment';
import styles from '../styles/Global';

class SingleFamousAuthor extends React.Component {
  constructor(props) {
    super(props);

    const { authorDescription, authorImage, authorDateOfBirth } = this.props.route.params;

    this.state = {
      description: authorDescription,
      image: authorImage,
      dateOfBirth: authorDateOfBirth
    };
  }

  render() {
    const { description, image, dateOfBirth } = this.state;

    return (
      <View style={styles.centerImage}>

        <Image source={{ uri: image }} style={[styles.custImgWeight, styles.custImgHeight]} />
        <Text style={[styles.customFont, styles.customFontSize]}>
          {' '}
          Born:
          {moment(dateOfBirth).format('DD-MM-YYYY')}
        </Text>
        <Text style={[styles.customFont, styles.customFontSize]}>{description}</Text>

      </View>
    );
  }
}

export default SingleFamousAuthor;
