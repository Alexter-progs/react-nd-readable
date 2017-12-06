import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { formatDate } from '../utils'
import IconButton from 'material-ui/IconButton'
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline'
import AddCircleOutline from 'material-ui-icons/AddCircleOutline'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'
import Grid from 'material-ui/Grid'

import { upvoteComment, downvoteComment, removeComment } from '../actions/comments'
import CommentsDialog from './CommentsDialog'
import { connect } from 'react-redux'

class Comment extends Component {
    state = {
        open: false
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
        const { author, body, voteScore, timestamp, id } = this.props
        
        return (
            <Grid>
                <Card>
                    <CardContent>
                        <Grid container alignItems='flex-end'>
                            <Grid item xs={3} lg={3} md={3}>
                                <Typography style={{fontWeight: 'bold'}}>
                                    {author}
                                </Typography>
                                <Typography> at {formatDate(timestamp)}</Typography>
                            </Grid>
                            <Grid item xs={7} lg={7} md={7}/>
                            <Grid item xs={2} lg={2} md={2}>
                                <ModeEditIcon onClick={this.handleClickOpen}/>
                                <DeleteIcon onClick={() => {this.props.removeComment(id)}}/>
                            </Grid>
                        </Grid>
                        
                        <Divider/>
                        <Typography>{body}</Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton  color="accent" onClick={() => {this.props.downvoteComment(id)}}>
                            <RemoveCircleOutline />
                        </IconButton>
                        <Typography>
                            {voteScore}
                        </Typography>
                        <IconButton  color="primary" onClick={() => {this.props.upvoteComment(id)}}>
                            <AddCircleOutline />
                        </IconButton>
                    </CardActions>
                </Card>

                <CommentsDialog comment={{id, body}} open={this.state.open} onDialogClose={this.onDialogClose} editMode={true}/>
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch => ({
    upvoteComment: (postId) => dispatch(upvoteComment(postId)),
    downvoteComment: (postId) => dispatch(downvoteComment(postId)),
    removeComment: (commentId) => dispatch(removeComment(commentId))
}))

export default connect(null, mapDispatchToProps)(Comment)