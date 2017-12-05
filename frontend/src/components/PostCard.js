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
                  <IconButton aria-label="Add to favorites" color="accent">
                    <RemoveCircleOutline />
                  </IconButton>
                  <Grid>
                      <Typography>{ post.voteScore }</Typography>
                  </Grid>
                  <IconButton aria-label="Add to favorites" color="primary">
                    <AddCircleOutline />
                  </IconButton>
                  <Link to={`/${post.category}/${post.id}`}>
                    <Button dense color="primary">
                      Learn More
                    </Button>
                  </Link>
                  <IconButton><Comment/></IconButton>
                  <Grid>
                      <Typography>{ numberOfComments }</Typography>
                  </Grid>
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
        comments: state.comments[props.post.id]
    }
  })
  
  const mapDispatchToProps = (dispatch => ({
    fetchComments: (postId) => dispatch(fetchComments(postId))
  }))

export default connect(mapStateToProps, mapDispatchToProps)(PostCard)