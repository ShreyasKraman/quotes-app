import {QUOTES_AVAILABLE,ADD_QUOTE,UPDATE_QUOTE,DELETE_QUOTE} from './actionTypes';

import AsyncStorage from '@react-native-community/async-storage';

export function addQuote(quote){
    return(dispatch) => {
        AsyncStorage.getItem('data', (err,quotes)=>{
            if(quotes !== null){
                quotes = JSON.parse(quotes);
                quotes.unshift(quote);
                AsyncStorage.setItem('data',JSON.stringify(quotes), () => {
                    dispatch({type:ADD_QUOTE,quote:quote});
                });
            }
        });
    }
}

export function getQuote(){
    return dispatch => {
        AsyncStorage.getItem('data',(err,quotes)=>{
            if(quotes !== null){
                dispatch({type:QUOTES_AVAILABLE,quote:JSON.parse(quotes)});
            }
        })
    }
}

export function updateQuote(quote){
    return dispatch => {
        AsyncStorage.getItem('deta',(err,quotes) => {
            if(quotes !== null){
                quotes = JSON.parse(quotes);
                var index = getIndex(quotes,quote.id);;
                if(index !== -1){
                    quotes[index].author = quote.author;
                    quotes[index].quote = quote.quote;
                }

                AsyncStorage.setItem('data',JSON.stringify(quotes), () => {
                    dispatch({type:UPDATE_QUOTE,quote:quote});
                })

            }
        });
    }
}

export function deleteQuote(id){
    return dispatch => {
        AsyncStorage.getItem('data',(err,quotes)=>{
            if(quotes !== null){
                quotes = JSON.parse(quotes);
                var index = getItem(quotes,id);
                if(index !== -1)
                    quotes.splice(index,1);//delete doesn't work on arrays. Only splice or slice
                
                AsyncStorage.setItem('data',JSON.stringify(quotes),()=>{
                    dispatch({type:DELETE_QUOTE,id:id});
                })
            }
        });
    }
}

function getIndex(quote,id){
    let clone = [...quote];
    return clone.findIndex(obj => parseInt(obj.id) === parseInt(id));
}