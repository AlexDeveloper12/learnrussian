import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Global from '../styles/Global';
import styles from '../styles/QuizMenu';

class QuizMenu extends React.Component {

    NavigatePage = (quizNumber) =>{
        this.props.navigation.navigate('Quiz',{quizNumber:quizNumber})
    }

    render() {
        return (
            <View style={[Global.custWhite, Global.fullHeight]}>
                
                <TouchableOpacity onPress={()=>this.NavigatePage('1')} style={[styles.custColour, styles.custMargin]}>
                    <Text style={[Global.customFont, styles.custMenuItem, styles.custItemColour]}>Easy</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.NavigatePage('2')} style={[styles.custColour, styles.custMargin]}>
                    <Text style={[Global.customFont, styles.custMenuItem, styles.custItemColour]}>Medium</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.NavigatePage('3')} style={[styles.custColour, styles.custMargin]}>
                    <Text style={[Global.customFont, styles.custMenuItem, styles.custItemColour]}>Hard</Text>
                </TouchableOpacity>

            </View>
        )
    }

}


export default QuizMenu;