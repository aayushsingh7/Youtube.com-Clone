import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import VideosContainer from '../layout/VideosContainer'
import { NavLink } from 'react-router-dom'

const Subscription = () => {
const {subscribedTo ,user} = useContext(AppContext)
document.title = "Subscriptions"

  return (
    <div className="History">
    <div className="Contents">
   {
    subscribedTo?.length > 0 ? 
     <VideosContainer videos={subscribedTo}/>
      : 
    <div className='nothing-temp'> 
  <p className="ee-ee-eyas">{!user._id ? "Login to see your subscriptions" : "Nothing in subscriptions"}</p> 
   <NavLink to={'/'} style={{textDecoration:"none",marginTop:"10px"}}> 
   <span className='back-home'>back to home page</span>
   </NavLink>
     </div>
   }
    </div>
   </div>
  )
}

export default Subscription