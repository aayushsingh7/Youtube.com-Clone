import React, { useContext } from 'react'
import VideosContainer from '../layout/VideosContainer'
import { AppContext } from '../context/AppContext'
import { NavLink } from 'react-router-dom'

const History = () => {
  const {history,user} = useContext(AppContext)
  document.title = "History"

  return (
    <div className="History">
   <div className="Contents">
  {history?.length > 0 ? 
    <VideosContainer videos={history}/> : <div className='nothing-temp'> 
  <p  className='ee-ee-eyas'>{!user._id ? "Login to see your history" : "Nothing in history"}</p> 
 <NavLink to={'/'} style={{textDecoration:"none",marginTop:"10px"}}> 
 <span className='back-home'>back to home page</span></NavLink>
   </div>}
   </div>
  </div>
  )
}

export default History