import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Main } from './components/Main';
import { Login } from './components/Login';
import {SolutionSpace} from './components/SolutionSpace/SolutionSpace'
import LanguageContext from './languages/LanguageContext';
import { EN, MT } from "./languages/language";

import './custom.css'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

export default class App extends Component {
  static displayName = App.name;

  constructor() {
    super()

    this.state = {language: EN};

    this.onLanguageChange = this.onLanguageChange.bind(this)
    this.isEnglish = this.isEnglish.bind(this)
  }

  componentDidMount(){
    const defaultLanguage = window.localStorage.getItem('rcml-lang') || "en";

    if(defaultLanguage == "en"){
      this.setState({language:EN})
    }
    else{
      this.setState({language:MT})
    }
  }

  onLanguageChange(language){

    let newLanguage = {};

    if(language == "mt"){
      newLanguage = MT
      window.localStorage.setItem('rcml-lang',"mt")
    }
    else{
      newLanguage = EN
      window.localStorage.setItem('rcml-lang',"en")
    }

    this.setState({language:newLanguage})
  }

  isEnglish(){
    if(this.state.language == EN){
      return true
    }
    return false
  }


  isAuth(){
    const cookies = new Cookies();
    if(cookies.get('username') !== undefined){
      return true
    }
    else{
      return false
    }
  }

  render () {
    this.isAuth()
    return (
      <>
      <LanguageContext.Provider value={this.state.language}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/main' render={(props) => (<Main {...props} isAuth={this.isAuth()} isEnglish={this.isEnglish} onLanguageChange={this.onLanguageChange} />)} />
          <>
            {this.isAuth() ? 
              <Redirect to='/main'></Redirect>
              : <Redirect to='/'></Redirect>
            }
          </>
        </Layout>
      </LanguageContext.Provider>
      </>
    );
  }
}
