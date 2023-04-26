import React from 'react'
import Header from '../components/header/Header'
import Posts from '../components/posts/Posts'
import Share from '../components/share/Share'
import Profile from '../components/profile/Profile'
import Feed from '../components/Feed/Feed'
import './Home.css'

const Home = () => {
  return (
    <div className="homeContainer">  
      <Header /> 
      
      <section className="left child">
      <Profile />
      </section>
      <section className="right child">
        <Feed/>
      </section>
    </div>
  )
}

export default Home