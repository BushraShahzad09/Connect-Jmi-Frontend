import React from 'react'
import Header from '../components/header/Header'
import Posts from '../components/posts/Posts'
import Share from '../components/share/Share'

const Home = () => {
  return (
    <div>   
        <Header />
        <Share />
        <Posts />
    </div>
  )
}

export default Home