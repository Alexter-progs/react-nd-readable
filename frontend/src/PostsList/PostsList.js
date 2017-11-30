import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Card, { CardHeader, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import FavoriteIcon from 'material-ui-icons/Favorite'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'

export default class PostsList extends Component {
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

    formatDate(timestamp) {
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
    
        return `${year}/${month}/${day} ${hours}:${minutes}`
    }

    render() {
        return (
            <Grid>
            {this.state.posts.map(post => (
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
                        subheader={this.formatDate(post.timestamp)}
                      />
    
                      <CardActions disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <Link to={`/${post.category}/${post.id}`}>
                          <Button dense color="primary">
                            Learn More
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item xs={3} lg={3} md={3}/>
                </Grid>
              ))
            }</Grid>
        )
    }
}