import React, {Component} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import {Router, Scene} from 'react-native-router-flux';

import { Data } from '../../assets/docs/data.json';

import Home from '../../components/Home/Home';
import Quote from '../../components/Quote/Quote';

class Main extends Component{

    componentDidMount(){
        AsyncStorage.getItem('data',(err,data)=>{
            if(data == null){
                AsyncStorage.setItem('data',JSON.stringify(Data.quotes));
            }
        })
    }


    render(){
        return(
            <Router>
                <Scene key="root">
                    <Scene key="Home" component={Home} title="Home" initial/>
                    <Scene key="new_quote" component={Quote} title="New Quote"/>
                </Scene>
            </Router>
        );
    }

}

export default Main;