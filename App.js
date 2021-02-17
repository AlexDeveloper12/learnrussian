/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

import axios from 'axios';
import {useTheme, NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import Styles from './styles/App';

import calls from './API/calls';

import LoadingIcon from './components/LoadingIcon';

import SingleLetter from './components/SingleLetter';
import BasicPhrases from './components/BasicPhrases';

import FamousRussianAuthors from './components/FamousRussianAuthors';

import SingleFamousAuthor from './components/SingleFamousAuthor';

import QuizMenu from './components/QuizMenu';
import FlashCard from './components/FlashCard';
import Quiz from './components/Quiz';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const screenTitles = {
  phrases: 'Phrases',
  authors: 'Authors',
  cards: 'Cards',
  home: '',
  letters: 'Letter'
};

function CustomTabNavigator() {
  return (

    <Tab.Navigator tabBarOptions={{ labelStyle: Styles.tabNavigator }}>
      <Tab.Screen name="Letters" component={HomeScreen} />
      <Tab.Screen name="Phrases" component={BasicPhrases} options={{ title: 'Phrases' }} />
      {/* <Tab.Screen name="Authors" component={FamousRussianAuthors} options={{ title: 'Authors' }} /> */}
      {/* <Tab.Screen name="QuizMenu" component={QuizMenu} options={{title:'Quiz'}}/> */}
      <Tab.Screen name="FlashCard" component={FlashCard} options={{ title: 'Cards' }} />
    </Tab.Navigator>

  );
}

export default function App() {
  const scheme = useColorScheme();
  return (
    <AppearanceProvider>


      <NavigationContainer theme={scheme==='dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={CustomTabNavigator} options={{ title: screenTitles.home }} />
          <Stack.Screen name="SingleLetter" component={SingleLetter} options={{ title: 'Letter' }} />
          <Stack.Screen name="QuizMenu" component={QuizMenu}/>
          {/* <Stack.Screen name="SingleFamousAuthor" component={SingleFamousAuthor} options={({ route }) => ({ title: route.params.authorName })} /> */}
          <Stack.Screen name="FlashCard" component={FlashCard} options={{ title: screenTitles.cards }} />
          {/* <Stack.Screen name="Quiz" component={Quiz}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      russianAlphabetList: [],
      loadingStatus: false
    }

  }

  renderCustomItem = ({ item }) => {
    const singleLetterInfo = { capitalLetter: item.Capital, smallLetter: item.Small, pronunciation: item.Pronunication,soundFileURL:item.SoundFileURL }
    
    

    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleLetter', singleLetterInfo)}>
          <View style={Styles.letterBorder}>
            <Text style={[Styles.letterFont, Styles.letterPadding, Styles.custSize, Styles.center, Styles.letterVertical]}>
              {item.Capital}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    this.GetRussianAlphabet();
  }

  GetRussianAlphabet = () => {
    this.setState({
      loadingStatus: true
    });

    axios.get(calls.letters).then((responseJson) => {
      this.setState({
        russianAlphabetList: responseJson.data.message,
        loadingStatus: false
      });
    });
  }


  render() {
    const { loadingStatus } = this.state;

    return (
      <View style={Styles.container}>
        <View style={[Styles.container, Styles.custBordWidth]}>

          {this.state.loadingStatus === true ? <LoadingIcon animating={this.state.loadingStatus} />
            : (
              <FlatList
                data={this.state.russianAlphabetList}
                renderItem={this.renderCustomItem}
                keyExtractor={(item) => item.RussianAlphabetID}
                style={Styles.flatList}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={6}
                horizontal={false}
              />
            )}

        </View>

        <LoadingIcon animating={loadingStatus} />

      </View>
    );
  }
}

// export default App;
