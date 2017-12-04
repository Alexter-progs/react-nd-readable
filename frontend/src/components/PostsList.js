import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Card, { CardHeader, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline'
import AddCircleOutline from 'material-ui-icons/AddCircleOutline'
import Comment from 'material-ui-icons/Comment'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import { formatDate } from '../utils'
import { fetchPosts } from '../actions/posts'

class PostsList extends Component {
    componentDidMount() {
      this.props.fetchPosts()
    }

    render() {
        const category = this.props.match.params.category
        let posts = this.props.posts
        if(category) {
          posts = posts.filter(post => post.category === category)
        }
        return (
            <Grid>
            {posts.map(post => (
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
                        subheader={`Posted by ${post.author} on ${formatDate(post.timestamp)}`}
                      />
    
                      <CardActions disableActionSpacing>
                        <IconButton aria-label="Add to favorites" color="accent">
                          <RemoveCircleOutline />
                        </IconButton>
                        <Grid>
                            <Typography>{ post.voteScore }</Typography>
                        </Grid>
                        <IconButton aria-label="Add to favorites" color="primary">
                          <AddCircleOutline />
                        </IconButton>
                        <IconButton><Comment/></IconButton>
                        <Grid>
                            <Typography>{ post.numberOfComments }</Typography>
                        </Grid>
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

const mapStateToProps = ((state, props) => {
  return {
      posts: Object.keys(state.posts)
                      .map((key) => ({ 
                          ...state.posts[key]
                      }))
  }
})

const mapDispatchToProps = (dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
}))

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)