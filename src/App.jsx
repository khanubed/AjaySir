import React from 'react'
import Home from './sections/Home'
import Service from './sections/Service'
import Gallery from './sections/Gallery'
import About from './sections/About'
import Contact from './sections/Contact'
import Review from './sections/Review'
// import VenueDetailsPage from './sections/Venue'
import Location from './sections/Location'
import Footer from './components/Footer'
import CentreBanner from './sections/CentreBanner'
import VideoSection from './sections/VideoSection'
import ActionStrip from './sections/ActionStrip'

const App = () => {
  return (
    <div className='bg-[#a86121]'>
      <Home/>
      <ActionStrip/>
      <Service/>
      <VideoSection/>
      <Gallery/>
      <About/>
      <Contact/>
      <Review/>
      <Location/>
      <Footer/>
    </div>
    // <VenueDetailsPage/>
  )
}

export default App