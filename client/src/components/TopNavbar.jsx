import React, { useContext, useState } from 'react'
import { AiOutlineMenu, AiOutlineSearch, AiOutlineVideoCameraAdd } from 'react-icons/ai'
import { BsArrowLeft, BsPersonCircle, BsSearch } from 'react-icons/bs'
import { MdOutlineVideoCall } from 'react-icons/md'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopNavbar = () => {
  const navigate = useNavigate()
  const { setShowUpload, user, setOpenSideNav, openSideNav, setOpenSearch, searching, setSearching } = useContext(AppContext)
  const [suggestions, setSuggestions] = useState([])
  const [query, setQuery] = useState("")

  const searchByCategory = async (e) => {
    setQuery(e.target.value)
    try {
      let getVideos = await fetch(`https://youtube-clone-rx4q.onrender.com/api/v1/search/${query}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      })
      const response = await getVideos.json()
      if (getVideos.status === 200) {
        setSuggestions(response?.map((data) => data.item?.title))
      } else {
        setSuggestions([])
      }
    } catch (err) {}
  }

  const searchQuery = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${query}`)
      setQuery("")
    }
  }

  return (
    <div className="Navbar">
      <div className="menu-and-logo">
        {searching && location.pathname.startsWith('/search/') ? null : <AiOutlineMenu className='menu-icon' onClick={() => setOpenSideNav(!openSideNav)} />}
        {searching && location.pathname.startsWith('/search/') ? null : 
<NavLink to={'/'} style={{textDecoration:"none",background:"#0f0f0f",position:"relative",top:"3px"}}> <img src="https://www.edigitalagency.com.au/wp-content/uploads/Youtube-logo-white-png.png" className="main-logo" /></NavLink>}
      </div>

      <div className="search-container">
        <div className="search-input">
          <div className="input-fad-part-3">
            <input type="text" placeholder='Search' onChange={searchByCategory}
              style={query !== "" && suggestions.length > 0 ? { borderBottomLeftRadius: "0px", borderBottom: "none" } : { borderBottomLeftRadius: "20px" }} onKeyDown={searchQuery} />
            <div className="relative-suggestions-search-yt">
              {
                query !== "" && suggestions.length > 0 ?
                  <div className="suggestions-container">
                    {suggestions.length > 0 ?
                      suggestions.map((data) => {
                        return (
                          <NavLink to={`/search/${data}`} style={{ textDecoration: "none" }}
                       onClick={() => setOpenSearch(false)}>
                            <div className='search-suggestions'>
                              <BsSearch style={{
                                fontSize: "18px", color: "#f1f1f1", marginRight: "6px", height: "100%", position:
                                  "relative"
                              }} />
                              <p onClick={() => setQuery("")}>{data}</p>
                            </div>
                          </NavLink>
                        )
                      }) : null}
                  </div> : null
              }
            </div>
          </div>
          <button onClick={() => setOpenSearch(true)}><AiOutlineSearch style={{ fontSize: "24px", color: "#f1f1f1" }} /></button>
        </div>
      </div>

      <div className="icons" style={searching !== "" ? { width: "100%" } : null}>
        {
          searching && location.pathname.startsWith('/search/') ?
            <>
              <BsArrowLeft onClick={() => { setOpenSearch(false); navigate(-1); setSearching("") }} className="exit-arrow" />
              <input type="text" placeholder='Search' onChange={searchByCategory} className="search-highlights" value={searching}
                onClick={() => setOpenSearch(true)} />
            </> :
            <> <BsSearch className="mobile-search" style={{ fontSize: "20px", color: "#f1f1f1", cursor: "pointer", marginRight: "30px" }} onClick={() => setOpenSearch(true)} />
              {!user._id ? <NavLink to="/login"><AiOutlineVideoCameraAdd style={{ fontSize: "26px", color: "#f1f1f1", cursor: "pointer", marginRight: "30px" }} /></NavLink> :
                <AiOutlineVideoCameraAdd style={{ fontSize: "26px", color: "#f1f1f1", cursor: "pointer", marginRight: "30px" }} onClick={() => setShowUpload(true)} />}
            </>
        }
        {
          !user._id ? <NavLink to={'/login'}> <button className='sign-in-user'>Login</button> </NavLink> :
            <NavLink to={`/profile/${user._id}`} style={{ background: "#0f0f0f" }} onClick={()=> setSearching("")}>
    <img src={user.picture?.startsWith('https://') ?  user.picture : `https://youtube-clone-rx4q.onrender.com/public/${user.picture}`} alt="pfp" />
            </NavLink>
        }
      </div>
    </div>
  )
}

export default TopNavbar