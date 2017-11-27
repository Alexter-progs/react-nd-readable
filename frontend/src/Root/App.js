import React, { Component } from 'react';
import Header from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';

import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/posts`;
    fetch(url)
      .then((res) => { return(res.json()) })
      .then((data) => {
        console.log(data);
        this.setState({posts: data});
      });
  }

  render() {
    return (
      <div>
      <Grid container className="App">
        <Grid item xs={12}>
          <Header position="static" color="primary">
            <Toolbar>
              <Typography type="title" color="inherit">
                Readable
              </Typography>
            </Toolbar>
          </Header>
        </Grid>
      </Grid>
      {
        this.state.posts.map(post => (
          <Grid container key={post.id}>
            <Grid item xs={3} lg={3} md={3}/>
            <Grid item xs={6} lg={6} md={6}>                
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Author">
                      {post.author[0].toUpperCase()}
                    </Avatar>
                  }
                  title={post.title}
                  subheader={post.timestamp}
                />

                <CardActions disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={3} lg={3} md={3}/>
          </Grid>
        ))
      }
      </div>
    );
  }
}

export default App;
