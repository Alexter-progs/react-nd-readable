import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

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
                    return this.capitalize(category.name)
                })
                this.setState({categories})
            });
    }

    capitalize = (value) => {
        if(value && typeof value === 'string') {
            return value.charAt(0).toUpperCase() + value.slice(1)
        } else {
            return value
        }
    }

    render() {
        return(
            <Grid container className="App">
                <Grid item xs={12}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography type="title" color="inherit">
                                Readable
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        )
    }
}