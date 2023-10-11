import React from 'react'

const Header = (props) => {
  const {title} = props
  return (
    <header className='Header'>    
        <h1>{title}</h1>
    </header>
  )
}


export default Header