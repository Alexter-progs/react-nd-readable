import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import CommentIcon from 'material-ui-icons/Comment'
import Button from 'material-ui/Button'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'
import IconButton from 'material-ui/IconButton'
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline'
import AddCircleOutline from 'material-ui-icons/AddCircleOutline'
import { connect } from 'react-redux'
import { fetchPosts, upvotePost, downvotePost, removePost } from '../actions/posts'
import { fetchComments } from '../actions/comments'

import Comment from './Comment'
import { formatDate } from '../utils/index'
import CommentsDialog from './CommentsDialog'

class PostDetails extends Component {
    state = {
        open: false
    }

    componentWillMount() {
        if(!this.props.post) {
            this.props.fetchPosts()
            this.props.fetchComments(this.props.match.params.id);
        }
    }
    onDialogClose = () => {
        this.setState({
            open: false
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { comments, post } = this.props
        if(!post) {
            return(<div>Loading</div>)
        }

        if(post.deleted) {
            return(
                <Grid container>
                    <Grid item xs lg md>
                        <Typography align='center' type='title'>This post is deleted</Typography>
                    </Grid>
                </Grid>
            )
        }
        return(
            <Grid>
                <Grid container>
                    <Grid item xs={3} lg={3} md={3}/>
                    <Grid item xs={6} lg={6} md={6}>
                        <Typography type='headline' align='center'>
                            {post.title}
                        </Typography>
                        <Typography align='center'>
                            by {post.author} at {formatDate(post.timestamp)}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} lg={3} md={3}>
                            <ModeEditIcon />
                            <DeleteIcon onClick={() => {
                                    this.props.removePost(post.id)
                                    this.props.history.push('/')
                                }}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={3} lg={3} md={3}/>
                    <Grid item xs={6} lg={6} md={6}>
                        <Typography paragraph={true}>
                            {post.body}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} lg={3} md={3}/>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={3} lg={3} md={3}/>
                    <Grid item>
                        <Typography>Vote: </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton  color="accent" onClick={() => {this.props.downvotePost(post.id)}}>
                            <RemoveCircleOutline />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {post.voteScore}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton  color="primary" onClick={() => {this.props.upvotePost(post.id)}}>
                            <AddCircleOutline />
                        </IconButton>
                    </Grid>
                </Grid>
                {comments.length > 0 ? <Grid container alignContent='space-around'>
                    <Grid item xs={3} lg={3} md={3}/>
                    <Grid item xs={6} lg={6} md={6}>
                        <Typography type='subheading'>
                            Comments:
                        </Typography>
                    </Grid>
                    <Grid item xs={3} lg={3} md={3}/>
                </Grid> : null}
                {comments.map(comment => (
                    <Grid key={comment.id} container alignContent='center'>
                        <Grid item xs={3} lg={3} md={3}/>
                        <Grid item xs={6} lg={6} md={6}>
                            <Comment id={comment.id} body={comment.body} author={comment.author} voteScore={comment.voteScore} timestamp={comment.timestamp}/>
                        </Grid>
                        <Grid item xs={3} lg={3} md={3}/>
                    </Grid>
                ))}
                <Grid container>
                    <Grid item xs={3} lg={3} md={3}/>
                    <Grid item xs={6} lg={6} md={6}>
                        <Button fab color="primary" aria-label="add" onClick={this.handleClickOpen}>
                            <CommentIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={3} lg={3} md={3}/>
                </Grid>

                <CommentsDialog parentId={post.id} open={this.state.open} onDialogClose={this.onDialogClose} editMode={false}/>
            </Grid>
        )
    }
}

const mapStateToProps = ((state, props) => {
    const postId = props.match.params.id
    return {
        post: state.posts[postId],
        comments: Object.keys(state.comments).filter(key => {
                        return postId === state.comments[key].parentId
                    }).map(key => {
                        return state.comments[key]
                    })
    }
})

const mapDispatchToProps = (dispatch => ({
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    fetchPosts: () => dispatch(fetchPosts()),
    upvotePost: (postId) => dispatch(upvotePost(postId)),
    downvotePost: (postId) => dispatch(downvotePost(postId)),
    removePost: (postId) => dispatch(removePost(postId))
  }))

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)