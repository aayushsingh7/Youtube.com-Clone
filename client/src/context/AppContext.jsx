import React, { useEffect } from 'react'
import { useContext, createContext, useState } from 'react'

export const AppContext = createContext()

const AppFunction = ({ children }) => {

  const [showUpload, setShowUpload] = useState(false)
  const [creatorSubscribers, setCreatorSubscribers] = useState([])
  const [handleUserLike, setHandleUserLike] = useState([])
  const [handleUserDislike, setHandleUserDislike] = useState([])
  const [commentSection, setCommentSection] = useState([])
  const [subscribedTo, setSubscribedTo] = useState([])
  const [user, setUser] = useState({})
  const [selectedVideoId, setSelectedVideoId] = useState()
  const [reFetch, setReFetch] = useState(false)
  const [history, setHistory] = useState([])
  const [categorySelected, setCategorySelected] = useState("All")
  const [handleWatchlist, setHandleWatchList] = useState([])
  const [handleCommentDislike, sethandleCommentDislike] = useState([])
  const [handleCommentLike, sethandleCommentLike] = useState([])
  const [openSideNav, setOpenSideNav] = useState(false)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const [openDiscripton, setOpenDiscription] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [txt, setTxt] = useState("")
  const [searching, setSearching] = useState("")
  const [share, setShare] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState()
  const [openEditProfile, setOpenEditProfile] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
const [subscribedCreatorList , setSubscribedCreatorList] = useState([])

  const notification = (txt) => {
    setTxt(txt)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 4000)
  }

  return (<AppContext.Provider value={{
    showUpload, setShowUpload, setUser, user, creatorSubscribers, setCreatorSubscribers, handleUserLike, setHandleUserLike, handleUserDislike, setHandleUserDislike, commentSection, setCommentSection, subscribedTo, setSubscribedTo,
    selectedVideoId, setSelectedVideoId, reFetch, setReFetch, history, setHistory, categorySelected, setCategorySelected,
    handleWatchlist, setHandleWatchList, handleCommentDislike, sethandleCommentDislike, sethandleCommentLike, handleCommentLike,
    openSideNav, setOpenSideNav, videos, setVideos, loading, setLoading, openComments, setOpenComments, setOpenDiscription, openDiscripton, openSearch, setOpenSearch, showNotification, setShowNotification,
    txt, notification, searching, setSearching, share, setShare, selectedVideo, setSelectedVideo,
    openEditProfile, setOpenEditProfile,windowWidth,setWindowWidth,subscribedCreatorList , setSubscribedCreatorList
  }}>{children}</AppContext.Provider>)
}
// AIzaSyDZiMJj18AKg4Okoy7TD0rA2lj6fml21pY
export default AppFunction;