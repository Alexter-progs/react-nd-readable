import React, { Component } from 'react'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
  } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { addComment } from '../actions/comments'

class CommentsDialog extends Component {
    state = {
        author: '',
        body: ''
    }

    handleRequestClose = () => {
        this.props.onDialogClose()
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    handleRequestSave = () => {
        if(this.props.editMode) {
        } else {
            this.props.addComment({
                ...this.state, 
                parentId: this.props.parentId
            })
        }

        this.props.onDialogClose()
    }

    render() {
        return(
            <Dialog open={this.props.open} onRequestClose={this.handleRequestClose}>
                <DialogTitle>Add new comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="author"
                        label="Your name"
                        type="text"
                        fullWidth
                        onChange={this.handleChange('author')}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="body"
                        label="Enter your comment"
                        type="text"
                        fullWidth
                        onChange={this.handleChange('body')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRequestClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleRequestSave} color="primary">
                        {this.props.editMode ? 'Save' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapDispatchToProps = (dispatch => ({
    addComment: (comment) => dispatch(addComment(comment))
}))

export default connect(null, mapDispatchToProps)(CommentsDialog)