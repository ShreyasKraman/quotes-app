import React, {Component} from 'react';

import {StyleSheet, View, Dimensions, TextInput, Text, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';

import {addQuote, updateQuote} from '../../store/actions/actions';

class NewQuote extends Component{

    state = {
        quote:{},
        edit:false,
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
           let quote = this.state.quote;

           quote[]
       }
    }

    render(props){

        if(props.edit){
            this.setState({
                            quote:props.quote,
                            edit:props.edit,
                        });
        }


        return(

        );

    }

}