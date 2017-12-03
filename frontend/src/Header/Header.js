import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import AddIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button'

import { capitalize } from '../utils'

export default class Header extends Component {
    state = {
        categories: []
    }

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
                                <Button fab color="accent" aria-label="delete">
                                    <AddIcon />
                                </Button>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        )
    }
}