import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Edit = (props) => {
    const {posts,editTitle,editBody,setEditTitle,setEditBody,handleEdit}= props;
    const {id} =useParams();
    const post  = posts.find((post)=>(post.id).toString()===id);
    useEffect(()=>{
        if(post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post,setEditTitle,setEditBody]);
  return (
    <main className='NewPost'>
        {editTitle && 
        <>
            <h2>Edit Post</h2>
            <form className='newPostForm' onSubmit={(e)=>{e.preventDefault()}}>
              <label htmlFor='editTitle'>Title:</label>
              <input 
              id='editTitle'
              type='text'
              required
              value={editTitle}
              onChange={(e)=>setEditTitle(e.target.value)}
              />
              <label htmlFor='postBody'>Post:</label>
              <textarea
                id='editBody'
                required
                value={editBody}
                onChange={(e)=>setEditBody(e.target.value)}
              />
              <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>


            </form>
            </>}
    </main>
  )
}

export default Edit