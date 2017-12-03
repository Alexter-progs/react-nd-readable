import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import Comment from './Comment'
import { formatDate } from '../utils/index';

export default class PostDetails extends Component {
    state = {
        post: { title: '' },
        comments: []
    }

    componentDidMount() {
        const { id } = this.props.match.params
        const postsUrl = `${process.env.REACT_APP_BACKEND}/posts/${id}`;
        const commentsUrl = `${process.env.REACT_APP_BACKEND}/posts/${id}/comments`;

        fetch(postsUrl)
            .then(result => (result.json()))
            .then(post => {
                this.setState(state => ({ post }))
                console.log(this.state);
            })
            
        fetch(commentsUrl)
        .then(result => (result.json()))
        .then(comments => {
            console.log(comments)
            this.setState(state => ({ comments }))
            console.log(this.state);
        })
    }

    render() {
        const { comments, post } = this.state
        return(
            <Grid>
                <Grid container>
                    <Grid item xs={3} lg={3} md={3}/>
                    <Grid item xs={6} lg={6} md={6}>
                        <Typography type='headline' align='center'>
                            {post.title}
                        </Typography>
                        <Typography align='center'>
                            by {post.author} at {formatDate(post.timestamp)}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} lg={3} md={3}/>
                </Grid>
                <Grid container>
                    <Grid item xs={3} lg={3} md={3}/>
                    <Grid item xs={6} lg={6} md={6}>
                        <Typography paragraph={true}>
                            {post.body}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} lg={3} md={3}/>
                </Grid>
                <Grid container alignContent='space-around'>
                    <Grid item xs={3} lg={3} md={3}/>
                    <Grid item xs={6} lg={6} md={6}>
                        <Typography type='subheading'>
                            Comments:
                        </Typography>
                    </Grid>
                    <Grid item xs={3} lg={3} md={3}/>
                </Grid>
                {comments.map(comment => (
                    <Grid key={comment.id} container alignContent='center'>
                        <Grid item xs={3} lg={3} md={3}/>
                        <Grid item xs={6} lg={6} md={6}>
                            <Comment body={comment.body} author={comment.author} voteScore={comment.voteScore} timestamp={comment.timestamp}/>
                        </Grid>
                        <Grid item xs={3} lg={3} md={3}/>
                    </Grid>
                ))}
                <Grid container>
                    <Grid item xs={3} lg={3} md={3}/>
                    <Grid item xs={6} lg={6} md={6}>
                        Add Comment
                    </Grid>
                    <Grid item xs={3} lg={3} md={3}/>
                </Grid>
            </Grid>
        )
    }
}