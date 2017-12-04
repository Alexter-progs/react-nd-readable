import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { Route } from 'react-router-dom'

import Header from './Header'
import PostsList from './PostsList'
import PostDetails from './PostDetails'

class App extends Component {
  render() {
    return (
      <Grid>
        <Header/>
        <Route path='/' exact component={PostsList}/>
        <Route path='/:category' exact component={PostsList}/>
        <Route path='/:category/:id' exact component={PostDetails}/>
      </Grid>
    )
  }
}

export default App;
