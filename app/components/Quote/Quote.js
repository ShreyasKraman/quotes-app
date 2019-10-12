import React, {Component} from 'react';

import {View, TextInput, Text, TouchableOpacity} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import {connect} from 'react-redux';

import {addQuote, updateQuote} from '../../store/actions/actions';
import { Actions } from 'react-native-router-flux';

import {styles} from './QuoteStyle';

class NewQuote extends Component{

    state = {
        author:(this.props.edit)?this.props.quote.author : '',
        text:(this.props.edit)?this.props.quote.text : '',
    }

    generateID = () => {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });
        
        return id;
    }

    addQuote = () => {
       if(this.state.edit){
           let quote = this.props.quote;
           quote['author'] = this.state.author;
           quote['text'] = this.state.text;
           this.props.updateQuote(quote);
       }else{
           let id = this.generateID();
           let quote = {
               "id":id,
               "author":this.state.author,
               "text":this.state.text,
           }

           this.props.addQuote(quote);
       }

       Actions.pop();
    }

    render(){

        return(
            <View>
                <View>
                    <TextInput
                        onChangeText={(text)=>this.setState({author:text})}
                        placeholder={"Author"}
                        autoFocus={true}
                        style={[styles.title]}
                        value={this.state.author}
                    />
                    <TextInput
                        multiline={true}
                        onChangeText={(text) => this.setState({text: text})}
                        placeholder={"Quote"}
                        style={[styles.quote]}
                        value={this.state.quote}
                    />
                </View>
                <TouchableOpacity 
                    style={[styles.saveBtn]}
                    disabled={(this.state.author.length>0 && this.state.text.length>0)?true:false}
                    onPress={this.addQuote}>
                        
                        <Text 
                            style={[
                                    styles.buttonText,
                                    {
                                        color: (this.state.author.length > 0 && this.state.quote.length > 0) ? "#FFF" : "rgba(255,255,255,.5)"
                                    }]}> 
                                    Save 
                        </Text>

                </TouchableOpacity>
                <KeyboardSpacer />
            </View> 
        );

    }

}

export default connect(null,(addQuote,updateQuote))(NewQuote);