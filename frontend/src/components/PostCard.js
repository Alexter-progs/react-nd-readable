import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Card, { CardHeader, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline'
import AddCircleOutline from 'material-ui-icons/AddCircleOutline'
import Comment from 'material-ui-icons/Comment'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { formatDate } from '../utils'
import Avatar from 'material-ui/Avatar'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchComments } from '../actions/comments';
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'
import {  upvotePost, downvotePost, removePost } from '../actions/posts'

class PostCard extends Component {
    componentDidMount() {
        this.props.fetchComments(this.props.post.id);
    }

    render() {
        const post = this.props.post
        const comments = this.props.comments
        let numberOfComments = 0;

        if(comments) {
            numberOfComments = Object.keys(comments).length
        }
        
        return (
            <Grid container>
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
                  <IconButton aria-label="Add to favorites" color="accent" onClick={() => {this.props.downvotePost(post.id)}}>
                    <RemoveCircleOutline />
                  </IconButton>
                    <Typography>{ post.voteScore }</Typography>
                  <IconButton aria-label="Add to favorites" color="primary" onClick={() => {this.props.upvotePost(post.id)}}>
                    <AddCircleOutline />
                  </IconButton>
                  <Link to={`/${post.category}/${post.id}`}>
                    <Button dense color="primary">
                      Learn More
                    </Button>
                  </Link>
                  <IconButton><Comment/></IconButton>
                  <Typography>{ numberOfComments }</Typography>
                    <ModeEditIcon />
                    <DeleteIcon onClick={() => {this.props.removePost(post.id)}}/>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={3} lg={3} md={3}/>
          </Grid>
        )
    }
}

const mapStateToProps = ((state, props) => {
    return {
        comments: Object.keys(state.comments).filter(key => {
                    return state.comments[key].parentId === props.post.id && state.comments[key].deleted !== true
                  }).map((key) => {
                    return state.comments[key]
                  })
    }
  })
  
  const mapDispatchToProps = (dispatch => ({
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    upvotePost: (postId) => dispatch(upvotePost(postId)),
    downvotePost: (postId) => dispatch(downvotePost(postId)),
    removePost: (postId) => dispatch(removePost(postId))
  }))

export default connect(mapStateToProps, mapDispatchToProps)(PostCard)