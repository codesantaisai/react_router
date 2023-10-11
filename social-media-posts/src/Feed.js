import React from 'react'
import Posts from './Posts'

const Feed = ({posts}) => {

  return (
    <>
    {posts.map((post)=>(
        <Posts key={post.id} post={post}/>
    ))}
    </>
  )
}

export default Feed