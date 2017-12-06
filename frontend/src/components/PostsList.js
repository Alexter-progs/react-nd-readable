import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/posts'
import PostCard from './PostCard'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ArrowUpward from 'material-ui-icons/ArrowUpward'
import ArrowDownward from 'material-ui-icons/ArrowDownward'
import Remove from 'material-ui-icons/Remove'


class PostsList extends Component {
    state = {
      sortByDateDirection: null
    }

    sortByDate = (posts) => {
      if(this.state.sortByDateDirection) {
        return posts.sort((post, nextPost) => {
          if(post.timestamp === nextPost.timestamp) {
            return 0
          }
    
          if(post.timestamp > nextPost.timestamp) {
            return this.state.sortByDateDirection === 'asc' ? 1 : -1
          } else {
            return this.state.sortByDateDirection === 'asc' ? -1 : 1
          }
        })
      }

      return posts
    }

    componentDidMount() {
      this.props.fetchPosts()
    }

    changeSortDirection = (direction) => {
      this.setState(() => ({ sortByDateDirection: direction }))
    }

    render() {
        const category = this.props.match.params.category
        let posts = this.sortByDate(this.props.posts)
        if(category) {
          posts = posts.filter(post => post.category === category)
        }

        return (
            <Grid>
              <Grid container alignContent='center' alignItems='center'>
                <Grid item xs={3} md={3} lg={3}/>
                <Grid item>
                  <Typography>Sort by date: </Typography>
                </Grid>
                {this.state.sortByDateDirection === 'asc' ? 
                  (<Grid item xs={6} md={6} lg={6}>
                      <IconButton onClick={() => {this.changeSortDirection('desc')}}><ArrowUpward/></IconButton>
                    </Grid>) 
                    : this.state.sortByDateDirection === 'desc' ?
                  (<Grid item xs={6} md={6} lg={6}>
                      <IconButton onClick={() => {this.changeSortDirection('asc')}}><ArrowDownward/></IconButton>
                    </Grid>)
                    : 
                    (<Grid item xs={6} md={6} lg={6}>
                      <IconButton onClick={() => {this.changeSortDirection('asc')}}><Remove/></IconButton>
                    </Grid>)
                }
                <Grid item xs={3} md={3} lg={3}/>
              </Grid>
              <Grid>
                {posts.map(post => (
                  <PostCard key={post.id} post = { post }/>
                ))}
              </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ((state, props) => {
  return {
      posts: Object.keys(state.posts)
                .filter(key => state.posts[key].deleted !== true)
                .map((key) => ({ 
                  ...state.posts[key]
                }))
  }
})

const mapDispatchToProps = (dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
}))

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)