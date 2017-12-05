import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import AddIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/categories'
import { capitalize } from '../utils'
import PostsDialog from './PostsDialog'

class Header extends Component {
    state = {
        isDialogOpened: false
    }

    componentDidMount() {
        this.props.fetchCategories()
    }

    onDialogClose = () => {
        this.setState({
            isDialogOpened: false
        })
    }

    handleClickOpen = () => {
        this.setState({ isDialogOpened: true });
    };

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
                <PostsDialog categories={this.props.categories} open={this.state.isDialogOpened} onDialogClose={this.onDialogClose}/>
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

