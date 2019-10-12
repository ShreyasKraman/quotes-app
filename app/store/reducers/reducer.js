import * as actionTypes from '../actions/actionTypes';

let initialState = {
    quotes : [],
    loading : true,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_QUOTE:{
            let quotes = [...state.quotes];
            quotes.unshift(action.quote);
            return{
                ...state,
                quotes:quotes,
            }
        }

        case actionTypes.QUOTES_AVAILABLE:{
            return {
                ...state,
                quotes: action.quotes,
                loading: false,
            }
        }

        case actionTypes.UPDATE_QUOTE:{
            let quotes = [...state.quotes];
            let quote = action.quote;
            let index = getIndex(quotes,quote.id);
            if(index !== -1){
                quotes[index].author = quote.author;
                quotes[index].text = quote.text;
            }

            return{
                ...state,
                quotes:quotes,
            }
        }

        case actionTypes.DELETE_QUOTE: {
            let quotes = [...state.quotes];
            let id = action.id;
            let index = getIndex(quotes,id);
            if(index !== -1)
                quotes.slice(index,1);

            return{
                ...state,
                quotes:quotes,
            }
        }

        default: return state
            
    }
}

const getIndex = (quotes,id) => {
    let clone = [...quotes];
    return clone.findIndex(obj => parseInt(obj.id) === parseInt(id));
}

export default reducer;