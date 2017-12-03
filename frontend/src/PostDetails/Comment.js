import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { formatDate } from '../utils'
import IconButton from 'material-ui/IconButton'
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline'
import AddCircleOutline from 'material-ui-icons/AddCircleOutline'

export default class Comment extends Component {

    render() {
        const { author, body, voteScore, timestamp} = this.props
        
        return (
            <Card>
                <CardContent>
                    <Typography style={{fontWeight: 'bold'}}>
                        {author} <Typography noWrap> at {formatDate(timestamp)}</Typography>
                    </Typography>
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