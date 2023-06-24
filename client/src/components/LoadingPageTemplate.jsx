import React from 'react'
import Header from '../layout/Header'
import LoadingVideosContainer from '../layout/LoadingVideosContainer'
import VideosContainer from '../layout/VideosContainer'
import SideNavbar from './SideNavbar'

const LoadingPageTemplate = () => {
  return (
   <div className="Home">
   <Header/>
   <div className="Contents">
     <SideNavbar/>
  <LoadingVideosContainer/>
   </div>
  </div>
  )
}

export default LoadingPageTemplate