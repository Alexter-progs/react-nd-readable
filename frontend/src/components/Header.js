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
import { connect } from 'react-redux'

import { fetchCategories } from '../actions/categories'
import { capitalize } from '../utils'

class Header extends Component {
    state = {
        open: false,
    }
    
    handleClickOpen = () => {
    this.setState({ open: true });
    };

    handleRequestClose = () => {
    this.setState({ open: false });
    };

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        let categories = this.props.categories
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
                            {categories.map(category => (
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

const mapStateToProps = ((state, props) => {
    return {
        categories: Object.keys(state.categories)
                        .map((key) => ({ 
                            name: state.categories[key].name, 
                            path: state.categories[key].path
                        }))
    }
})

const mapDispatchToProps = (dispatch => ({
    fetchCategories: () => dispatch(fetchCategories())
}))

export default connect(mapStateToProps, mapDispatchToProps)(Header)

