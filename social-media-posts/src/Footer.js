import React from 'react'

const Footer = () => {
  const year = new Date();
  return (
    <footer className='Footer'>
    <h1>Copy rights &copy;{year.getFullYear()}</h1>
    </footer>
  )
}

export default Footer