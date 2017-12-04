import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import AddIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'

import { capitalize } from '../utils'

export default class Header extends Component {
    state = {
        categories: [],
        open: false,
    }
    
    handleClickOpen = () => {
    this.setState({ open: true });
    };

    handleRequestClose = () => {
    this.setState({ open: false });
    };

    componentDidMount() {
        const url = `${process.env.REACT_APP_BACKEND}/categories`;
        fetch(url)
            .then((res) => { return(res.json()) })
            .then((data) => {
                this.setState({categories: data.categories})
            });
    }

    render() {
        return(
            <Grid container className="App">
                <Grid item xs={12}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Grid container>
                            <Grid item>
                                <Typography type="title" color="inherit">
                                    Readable
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography type="title" color="inherit">
                                    <Link to='/'>All Posts</Link>
                                </Typography>
                            </Grid>
                            {this.state.categories.map(category => (
                                    <Grid item key={category.name}>
                                        <Typography type="title" color="inherit">
                                            <Link to={`/${category.path}`}>{capitalize(category.name)}</Link>
                                        </Typography>
                                    </Grid>
                            ))}
                            </Grid>
                            <Grid item>
                                <Button fab color="accent" aria-label="add post" onClick={this.handleClickOpen}>
                                    <AddIcon />
                                </Button>
                            </Grid>
                        </Toolbar>
                    </AppBar>
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
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="owner"
                        label="Your name"
                        type="text"
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