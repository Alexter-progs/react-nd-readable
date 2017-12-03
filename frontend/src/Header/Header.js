import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'

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
                let categories = data.categories.map(category => {
                    return capitalize(category.name)
                })
                this.setState({categories})
            });
    }

    render() {
        return(
            <Grid container className="App">
                <Grid item xs={12}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography type="title" color="inherit">
                                <Link to='/'>Readable</Link>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        )
    }
}