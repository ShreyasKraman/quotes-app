import React,{Component} from 'react';

import {StyleSheet,FlatList,View,Text,ActivityIndicator, TouchableHighlight, ActionSheetIOS} from 'react-native'

import {bindActionCreators} from 'redux'

import {connect} from 'react-redux';

import * as ReduxActions from '../../store/actions/actions';

import {Actions} from 'react-native-router-flux';

import {styles} from './HomeStyle';

const Buttons = [
    "Edit",
    "Delete",
    "Cancel"
]

const CANCEL_INDEX = 2;

class Home extends Component{

    componentDidMount(){
        this.props.getQuotes();
    }

    showOptions = (quote) => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: Buttons,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: 1,
            },
                buttonIndex => {
                    if(buttonInde == 0) Actions.new_quote({quote:quote,edit:true,title="Edit Quite"})
                    else if(buttonIndex == 1) this.props.deleteQuote(quote.id)
            }    
        )
    }

    renderItem = ({item,index}) => {
        return (
            <TouchableHighlight onPress={() => this.showOptions(item)} underlayColor='rgba(0,0,0,.2)'>
                <View style={styles.row}>
                    <Text style={styles.quote}>
                        {item.quote}
                    </Text>
                    <Text style={styles.author}>
                        {item.author}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }


    render(){

        if(this.props.loading){
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        }else{
            return (
                <View style={styles.container}>
                        <FlatList
                            ref='listRef'
                            data={this.props.quotes}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index}/>


                        <TouchableHighlight style={styles.addButton}
                                            underlayColor='#ff7043' onPress={() => Actions.new_quote()}>
                            <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                        </TouchableHighlight>
                    </View>
                );
        }
        
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        quotes: state.dataReducer.quotes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);