import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import { connect } from 'react-redux'

import { capitalize } from '../utils'
import { addPost, editPost } from '../actions/posts'

class PostsDialog extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: ''
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
            this.props.editPost(this.props.postId, this.state.body, this.state.title)
        } else {
            this.props.addPost({
                ...this.state
            })
        }

        this.props.onDialogClose()
    }

    render() {
        let categories = []
        let body = null
        let title = null

        if(this.props.editMode) {
            body = this.props.body
            title = this.props.title
        } else {
            categories = this.props.categories
        }
        return (
            <Dialog open={this.props.open} onRequestClose={this.handleRequestClose}>
                <DialogTitle>Add new post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        defaultValue={title}
                        onChange={this.handleChange('title')}
                        fullWidth
                    />
                    {!this.props.editMode ? (<TextField
                        autoFocus
                        margin="dense"
                        id="owner"
                        label="Your name"
                        type="text"
                        onChange={this.handleChange('author')}
                        fullWidth
                    />) : null}
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="body"
                        label="Body"
                        type="text"
                        defaultValue={body}
                        onChange={this.handleChange('body')}
                        fullWidth
                    />
                    {!this.props.editMode ? (<TextField
                        autoFocus
                        select
                        margin="dense"
                        id="category"
                        label="Choose category"
                        type="text"
                        value={this.state.category}
                        onChange={this.handleChange('category')}
                        fullWidth>
                        {categories.map(category => (
                            <MenuItem key={category.name} value={category.name}>
                                {capitalize(category.name)}
                            </MenuItem>
                        ))}
                    </TextField>) : null}
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

const mapDispatchToProps = (dispatch) => ({
    addPost: (post) => dispatch(addPost(post)),
    editPost: (id, body, title) => dispatch(editPost(id, body, title))
})

export default connect(null, mapDispatchToProps)(PostsDialog)