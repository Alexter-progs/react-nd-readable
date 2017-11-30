import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

export default class Header extends Component {
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