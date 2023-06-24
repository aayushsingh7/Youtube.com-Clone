import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import History from './pages/History'
import WatchLater from './pages/WatchLater'
import Subscription from './pages/Subscription'
import Profile from './pages/Profile'
import Search from './pages/Search'
import VideoPlayer from './pages/VideoPlayer'
import Library from './pages/Library'
import UploadVideo from './components/UploadVideo'
import Login from './pages/Login'
import Register from './pages/Register'
import Verifying from './pages/Verifying'
import SearchComponentMob from './components/SearchComponentMob'
import Notification from './components/Notification'
import BottomNavbar from './components/BottomNavbar'
import SideNavbar from './components/SideNavbar'
import Header from './layout/Header'
import LoadingVideosContainer from './layout/LoadingVideosContainer'
import ShareBox from './components/ShareBox'
import Logout from './pages/Logout'
import { AppContext } from './context/AppContext'

const App = () => {
  const navigate = useNavigate()
  const {windowWidth,setWindowWidth,setOpenSideNav} = useContext(AppContext)



  useEffect(() => {
    navigate('/verifying')
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (windowWidth > 1400) {
      setOpenSideNav(true)
    } else {
      setOpenSideNav(false)
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);
  


  return (
    <div className="App-Container">
      <UploadVideo />
      <Notification/>
      <ShareBox/>
      <SearchComponentMob/>
      <div className="App">
        <Header/>
      <div className="Contents">
      <SideNavbar/>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/library' element={<Library />} />
          <Route path='/history' element={<History />} exact />
          <Route path='/watchlater' element={<WatchLater />} exact />
          <Route path='/subscriptions' element={<Subscription />} exact />
          <Route path='/profile/:id' element={<Profile />} exact />
          <Route path='/watch/:id' element={<VideoPlayer />} exact />
          <Route path='/search/:query' element={<Search />} exact />
          <Route path='/login' element={<Login />}  exact />
          <Route path='/register' element={<Register />} exact  />
          <Route path='/verifying' element={<Verifying />}  exact />
          <Route path="loading" element={<LoadingVideosContainer/>} exact />
          <Route path="/logout" element={<Logout/>} exact />
        </Routes>
      </div>
      </div>
        <BottomNavbar/>
    </div>
  )
}

export default App