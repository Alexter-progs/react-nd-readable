import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import CommentIcon from 'material-ui-icons/Comment'
import Button from 'material-ui/Button'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import { connect } from 'react-redux'

import Comment from './Comment'
import { formatDate } from '../utils/index'

class PostDetails extends Component {
    state = {
        open: false
    }

    componentDidMount() {
        const { id } = this.props.match.params
        const postsUrl = `${process.env.REACT_APP_BACKEND}/posts/${id}`;
        const commentsUrl = `${process.env.REACT_APP_BACKEND}/posts/${id}/comments`;

        fetch(postsUrl)
            .then(result => (result.json()))
            .then(post => {
                this.setState(state => ({ post }))
            })
            
        fetch(commentsUrl)
        .then(result => (result.json()))
        .then(comments => {
            this.setState(state => ({ comments }))
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
        };
    
    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { comments, post } = this.props

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
                            <DeleteIcon />
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
                            <Comment body={comment.body} author={comment.author} voteScore={comment.voteScore} timestamp={comment.timestamp}/>
                        </Grid>
                        <Grid item xs={3} lg={3} md={3}/>
                    </Grid>
                ))}
                <Grid container>
                    <Grid item xs={3} lg={3} md={3}/>
                    <Grid item xs={6} lg={6} md={6}>
                        <Button fab color="primary" aria-label="add">
                            <CommentIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={3} lg={3} md={3}/>
                </Grid>

                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>Add new post</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        value={post.title}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="body"
                        label="Body"
                        type="text"
                        fullWidth
                        value={post.body}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="Choose category"
                        type="text"
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleRequestClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleRequestClose} color="primary">
                        Create
                    </Button>
                    </DialogActions>
                </Dialog>
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

export default connect(mapStateToProps)(PostDetails)