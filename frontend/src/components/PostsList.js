import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/posts'
import PostCard from './PostCard'

class PostsList extends Component {
    componentDidMount() {
      this.props.fetchPosts()
    }

    render() {
        const category = this.props.match.params.category
        let posts = this.props.posts
        if(category) {
          posts = posts.filter(post => post.category === category)
        }
        return (
            <Grid>
            {posts.map(post => (
                <PostCard key={post.id} post = { post }/>
              ))
            }</Grid>
        )
    }
}

const mapStateToProps = ((state, props) => {
  return {
      posts: Object.keys(state.posts)
                      .map((key) => ({ 
                          ...state.posts[key]
                      }))
  }
})

const mapDispatchToProps = (dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
}))

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)