import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Main } from './components/Main';
import { Login } from './components/Login';

import './custom.css'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

export default class App extends Component {
  static displayName = App.name;


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
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/main' render={(props) => (<Main {...props} isAuth={this.isAuth()} />)} />
        <>
          {this.isAuth() ? 
            <Redirect to='/main'></Redirect>
            : <Redirect to='/'></Redirect>
          }
        </>

      </Layout>
    );
  }
}
