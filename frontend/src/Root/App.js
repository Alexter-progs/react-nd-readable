import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import PostDetails from '../PostDetails/PostDetails'
import { Route } from 'react-router-dom'

import './App.css'
import Header from '../Header/Header'
import PostsList from '../PostsList/PostsList'

class App extends Component {
  render() {
    return (
      <Grid>
        <Header/>
        <Route path='/' exact component={PostsList}/>
        <Route path='/:category/:id' exact component={PostDetails}/>
      </Grid>
    )
  }
}

export default App;
