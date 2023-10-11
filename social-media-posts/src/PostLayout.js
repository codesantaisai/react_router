import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const PostLayout = () => {
    return (
        <>
            <Link to="/postpage/1">Post One</Link>
            <br />
            <Link to="/postpage/2">Post Two</Link>
            <br />
            <Link to="/postpage/3">Post Three</Link>
            <br />
            <Link to="/postpage/newpost">New page</Link>
            <Outlet/>
        </>
    )
}

export default PostLayout