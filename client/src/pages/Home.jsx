import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import About from '../components/About'
import TopTutor from '../components/TopTutor'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <About />
        <Card />
        <TopTutor />
        <Footer />
    </>
  )
}

export default Home