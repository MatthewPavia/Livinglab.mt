import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Main } from './components/Main';
import { Login } from './components/Login';
import {SolutionSpace} from './components/SolutionSpace/SolutionSpace'
import LanguageContext from './languages/LanguageContext';
import { EN, MT } from "./languages/language";
import { TermsOfUse } from './components/Info/TermsOfUse';
import { PrivacyPolicy } from './components/Info/PrivacyPolicy';
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
  
  RequireAuth(children) {
    let auth = this.isAuth();
  
    if (!auth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Redirect to="/" />;
    }
  
    return children;
  }

  render () {
    return (
      <>
      <LanguageContext.Provider value={this.state.language}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/terms' component={TermsOfUse} />
          <Route path='/privacypolicy' component={PrivacyPolicy} />
          <Route path='/main' render={(props) => ( <Main {...props} isAuth={this.isAuth()} isEnglish={this.isEnglish} onLanguageChange={this.onLanguageChange} />)} />
        </Layout>
      </LanguageContext.Provider>
      </>
    );
  }
}
