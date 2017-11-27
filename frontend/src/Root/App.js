import React, { Component } from 'react';
import logo from '../images/logo.svg';
import Header from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header position="static" color="primary">
          <Toolbar>
            <Typography type="title" color="inherit">
              Readable
            </Typography>
          </Toolbar>
        </Header>
      </div>
    );
  }
}

export default App;
