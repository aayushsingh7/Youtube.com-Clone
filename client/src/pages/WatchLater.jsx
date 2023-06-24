import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import VideosContainer from '../layout/VideosContainer'

const WatchLater = () => {
  const { user,handleWatchlist } = useContext(AppContext)
  document.title = "Watchlater"

  return (
    <div className="Watchlater">
      <div className="Contents">
        {user.saved?.length > 0 ? <VideosContainer videos={handleWatchlist} /> : 
        <div className='nothing-temp'>
          <p className='ee-ee-eyas'>{!user._id ? "Login to see your watchlist" : "Nothing in watchlist"}</p>
          <NavLink to={'/'} style={{ textDecoration: "none", marginTop: "10px" }}>
             <span className='back-home'>back to home page</span></NavLink>
        </div>}
      </div>
    </div>
  )
}

export default WatchLater