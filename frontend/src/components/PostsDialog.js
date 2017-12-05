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

class PostsDialog extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: ''
    }

    componentWillReceiveProps(props) {
        this.setState(() => ({
            open: props.open
        }))
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
        const { title, body, author, category } = this.state
        //TODO add redux action for saving
        this.props.onDialogClose()
    }

    render() {
        const { categories } = this.props
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
                        onChange={this.handleChange('title')}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="owner"
                        label="Your name"
                        type="text"
                        onChange={this.handleChange('author')}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="body"
                        label="Body"
                        type="text"
                        onChange={this.handleChange('body')}
                        fullWidth
                    />
                    <TextField
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
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRequestClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleRequestSave} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default connect()(PostsDialog)