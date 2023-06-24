import React, { useContext, useEffect, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import CreatorProfileVideosContainer from '../layout/CreatorProfileVideosContainer'
import LoadingProfilePage from '../components/LoadingProfilePage'
import EditProfile from '../components/EditProfile'

const Profile = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState({})
  const { user } = useContext(AppContext)
  const [loading , setLoading] = useState(false)
  const { setCreatorSubscribers, creatorSubscribers, notification,openEditProfile , setOpenEditProfile,setSubscribedTo, subscribedTo, subscribedCreatorList, setSubscribedCreatorList } = useContext(AppContext)
 document.title = `${userData.user?.name}`

  useEffect(() => {
    getCreatorData()
  }, [])

  useEffect(() => {
    getCreatorData()
  }, [params.id])


  const getCreatorData = async () => {
    try {
      setLoading(true)
      let getData = await fetch(`https://youtube-clone-rx4q.onrender.com/api/v1/userData/${params.id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      })
      let response = await getData.json()
      if(getData.ok){
        setUserData(response)
        setLoading(false)
        setCreatorSubscribers(response.user?.subscribers)
      }else{
        setLoading(false)
      }
    } catch (err) {}
  }

  const subscribe = async () => {
    try {
      if(!user._id) navigate('/login')
      setCreatorSubscribers([...creatorSubscribers, user._id])
      setSubscribedCreatorList([...subscribedCreatorList, userData.user])
      setSubscribedTo([...subscribedTo, ...userData.videos])
      let subscribe = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/subscribe', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creatorId: userData.user?._id })
      })
      let response = await subscribe.json()
      if (subscribe.status === 200) {
        notification("Subscription added")
      } else { notification(response.error) }
    } catch (err) {}
  }

  const unSubscribe = async () => {
    try {
      setCreatorSubscribers(creatorSubscribers.filter((userId) => userId !== user._id))
      setSubscribedCreatorList(subscribedCreatorList.filter((creator) => creator._id !== userData.user?._id))
      setSubscribedTo(subscribedTo.filter((creator) => creator.uploadedBy?._id !== userData.user?._id))
      let unSub = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/unsubscribe', {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ creatorId: userData.user?._id }),
        headers: { "Content-Type": "application/json" }
      })
      let response = await unSub.json()
      if (unSub.status === 200) {
        notification(`Unsubscribed from ${userData.user?.name}`)
      } else { notification(err.message) }
    } catch (err) {}
  }

  return (
  <>
  {loading ? <LoadingProfilePage/> :   
  <div className="Profile">
    <EditProfile reFetch={getCreatorData}/>
      <div className="Contents" style={{ width: "100%" }}>
        <div className="Creator-profile-info-yt">
          <div style={{ width: "100%" }} className="banner-container">
            <img src={userData.user?.banner?.startsWith('https://') ?  userData.user?.banner : userData.user?.banner?.startsWith("https://res.cloudinary.com")? userData.user?.banner :  `https://youtube-clone-rx4q.onrender.com/public/${userData.user?.banner}` } alt="" />
          </div>
          <div className="User-info-yt-with-creator-info">
            <div className="profile-page-header">
              <div className="creator-info-logo-name">
                <img src={userData.user?.picture?.startsWith('https://') ?  userData.user?.picture?.startsWith("https://res.cloudinary.com")? userData.user?.picture :   userData.user?.picture : `https://youtube-clone-rx4q.onrender.com/public/${userData.user?.picture}`} alt="" style={{ height: "75px", width: "75px", borderRadius: "50%" }} />
                <div className="creator-name-subscriber-yt">
                  <p>{userData.user?.name} {userData.user?.verified ? <MdVerified style={{ position: "relative", top: "2px", marginLeft: "5px" }} /> : null}</p>
                  <span>{creatorSubscribers.length} {userData.user?.subscribers.length > 1 ? "subscribers" : "subscriber"}</span>
                </div>
              </div>
              {userData.user?._id === user._id ? 
               <button className='edit-profile' onClick={()=> setOpenEditProfile(true)}>Edit profile</button>  : creatorSubscribers?.map((creator) => creator).includes(user._id) ?
                <button className='subscribed' onClick={unSubscribe}>Subscribed</button> : <button className='subscribe' onClick={subscribe}>Subscribe</button>}
            </div>
            <div className="Creatr-Videos-here" style={{ width: "100%" }}>
              {
                userData.videos?.length > 0 ? <CreatorProfileVideosContainer data={userData.videos} /> :
                  <p style={{ fontSize: "2rem", color: "#f1f1f1", width: "100%", textAlign: "center", marginTop: "80px" }}>No Video Uploaded Yet</p>
              }
            </div>
          </div>
        </div>
      </div>
 </div>}
  </>
  )
}

export default Profile