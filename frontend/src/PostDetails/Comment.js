import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { formatDate } from '../utils'
import IconButton from 'material-ui/IconButton'
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline'
import AddCircleOutline from 'material-ui-icons/AddCircleOutline'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'

export default class Comment extends Component {

    render() {
        const { author, body, voteScore, timestamp} = this.props
        
        return (
            <Card>
                <CardContent>
                    <Grid container alignItems='flex-end'>
                        <Grid item xs={3} lg={3} md={3}>
                            <Typography style={{fontWeight: 'bold'}}>
                            {author}<Typography noWrap> at {formatDate(timestamp)}</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={7} lg={7} md={7}/>
                        <Grid item xs={1} lg={1} md={1}>
                            <Button fab color="primary" aria-label="add">
                                <ModeEditIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={1} lg={1} md={1}>
                            <Button fab color="primary" aria-label="delete">
                                <DeleteIcon />
                            </Button>
                        </Grid>
                    </Grid>
                    
                    <Divider/>
                    <Typography>{body}</Typography>
                </CardContent>
                <CardActions>
                    <IconButton  color="accent">
                        <RemoveCircleOutline />
                    </IconButton>
                    <Typography>
                        {voteScore}
                    </Typography>
                    <IconButton  color="primary">
                          <AddCircleOutline />
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}