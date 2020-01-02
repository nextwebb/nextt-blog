
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Posts from './components/Posts'
import Post from './components/Post'

// react app entry point
const postData = window._POST_

class App extends Component {

  render(){

    let userInterface = null
    if(postData == null){
      userInterface =  <Posts />
    } else {
      userInterface =  <Post post={postData} />
    }

    return (
    <div>{ userInterface}</div>
    )
  }
}

ReactDOM.hydrate(<App />, document.getElementById('root'))