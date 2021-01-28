import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Global from '../styles/Global';
import calls from '../API/calls';
import styles from '../styles/Quiz';
import Loading from '../components/LoadingIcon';

class Quiz extends React.Component {

    state = {
        quizQuestionDataList: [],
        quizNumber: 1,
        questionNumber: 1,
        questionText: '',
        isPressed: false,
        selectColour: '',
        backgroundColourQuestionOne: '#19b5fe',
        backgroundColourQuestionTwo: '#19b5fe',
        backgroundColourQuestionThree: '#19b5fe',
        questionCount: 0,
        loading: true,
        showHideNextButton: 0
    }

    componentDidMount() {
        this.GetQuizQuestion();
    }

    ChangeColour = (index) => {
        const { isPressed } = this.state;

        //if index is 0 then it is the first question being clicked
        let backgroundQuestionOne = '';
        let backgroundQuestionTwo = '';
        let backgroundQuestionThree = '';

        if (index === 0) {
            //we set background colour of question 1 to green, reset others
            backgroundQuestionOne = '#f8c291';
            backgroundQuestionTwo = '#19b5fe';
            backgroundQuestionThree = '#19b5fe';
        }
        else if (index === 1) {
            backgroundQuestionOne = '#19b5fe';
            backgroundQuestionTwo = '#f8c291';
            backgroundQuestionThree = '#19b5fe';

        }
        else if (index === 2) {
            backgroundQuestionOne = '#19b5fe';
            backgroundQuestionTwo = '#19b5fe';
            backgroundQuestionThree = '#f8c291';
        }

        this.setState({
            isPressed: true,
            backgroundColourQuestionOne: backgroundQuestionOne,
            backgroundColourQuestionTwo: backgroundQuestionTwo,
            backgroundColourQuestionThree: backgroundQuestionThree,
            showHideNextButton:1 
        });

    }

    NextQuestion = () =>{
        this.setState({
            questionNumber:questionNumber++
        });
        this.GetQuizQuestion();
    }


    GetQuizQuestion = () => {

        const { quizNumber, questionNumber } = this.state;

        axios.get(`${calls.quizquestion}/${quizNumber}/${questionNumber}`)
            .then(response => {
                this.setState({
                    quizQuestionDataList: response.data.message[0],
                    questionText: response.data.message[0][0].QuestionText,
                    loading: false
                });

            })
            .catch(error => {
                console.log('Error GetQuizQuestion: ' + error);
            });
    }

    NextQuestion = () => {
        //here i will need to update the state of question number on the click event
        //of the next button 
    }


    RenderQuestionData = () => {
        const { quizQuestionDataList, showHideNextButton } = this.state;

        console.log(quizQuestionDataList);

        return quizQuestionDataList.map((value, index) => {
            return (
                <View>
                    <TouchableOpacity key={value.QuizQuestionAnswerID} style={{ backgroundColor: index === 0 ? this.state.backgroundColourQuestionOne : index === 1 ? this.state.backgroundColourQuestionTwo : index === 2 ? this.state.backgroundColourQuestionThree : null}} onPress={() => this.ChangeColour(index)}>
                        <Text style={[Global.customFont, styles.custMenuItem, styles.custItemColour]}>{value.AnswerText}</Text>
                    </TouchableOpacity>

                    {showHideNextButton === 1 && value.SortOrder === 3 ? <TouchableOpacity onPress={()=>this.NextQuestion()} key={index} style={{ justifyContent: 'center', alignItems: 'center',marginTop:'1%' }}>
                        <Text style={[Global.customFont,Global.customWidth,Global.customFontSize]}>Next</Text>
                    </TouchableOpacity> : null}

                </View>
            )
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <View style={[Global.fullHeight, Global.custWhite]}>
                <Loading animating={loading} />


                <Text style={[Global.customWidth, Global.customFont, Global.customFontSize, styles.quizQuestion]}>
                    {this.state.questionText}
                </Text>
                {this.RenderQuestionData()}
            </View>

        )
    }
}

export default Quiz;