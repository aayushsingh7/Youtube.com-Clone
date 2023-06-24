import React, { useContext, useEffect, useState } from 'react'
import ColumnVideoLayout from '../layout/ColumnVideoLayout'
import VideoPlayerLayout from '../layout/VideoPlayerLayout'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import ColumnBoxLoading from '../components/ColumnBoxLoading'

const VideoPlayer = () => {
  const params = useParams()
  const [videoData , setVideoData] = useState([])
  const [loading , setLoading] = useState(false)
  const {setCreatorSubscribers, setHandleUserLike, setHandleUserDislike,setCommentSection,selectedVideoId,user, setReFetch,reFetch,setHistory,sethandleCommentLike,sethandleCommentDislike,setSelectedVideo,history,setOpenSideNav} = useContext(AppContext)

   


useEffect(()=> {
  getVideoData()
  increaseViews()
  setOpenSideNav(false)
},[])

 useEffect(()=> {
  getVideoData()
  addToHistory()
 },[params.id])

const increaseViews = async()=> {
  try {
    let addView = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/increase-views',{
      method:"PUT",
      credentials:"include",
      body:JSON.stringify({videoId:params.id}),
      headers:{"Content-Type":"application/json"}
    })
    let response = await addView.json()
  } catch (err) {}
}

const getVideoData = async()=> {
  try {
    setLoading(true)
    let fetchVideo = await fetch(`https://youtube-clone-rx4q.onrender.com/api/v1/video/${params.id}`,{method:"GET",credentials:"include"})
    let response = await fetchVideo.json()
    if(fetchVideo.status === 200){
      setLoading(false)
      setVideoData(response)
      setSelectedVideo(response)
      setCreatorSubscribers(response.uploadedBy?.subscribers)
      setHandleUserLike(response.likes)
      setHandleUserDislike(response.dislikes)
      setCommentSection(response)
      sethandleCommentLike(response.comments?.likes)
      sethandleCommentDislike(response.comments?.dislike)
    }else{
      setVideoData([])
      setLoading(false)
    }
  } catch (err) {}
}

const addToHistory = async()=> {
   if(history?.map((videos)=> videos._id).includes(selectedVideoId)){
    return;
   }else{
    try{
      let video = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/history',{
        method:"PUT",
        credentials:"include",
        body:JSON.stringify({videoId:selectedVideoId}),
        headers:{"Content-Type":"application/json"}
      })
      let response = await video.json() 
      if(video.status === 200){
       setHistory(response.history)
         setReFetch(!reFetch)
      }
      }catch(err){}
   }
}

  return (
   <div className="VideoPlayer-Container" style={loading ? {overflow:"hidden"} : null}>
      <div className="Video-Container">
        <VideoPlayerLayout videoData={videoData} loading={loading}/>
        {loading ? <ColumnBoxLoading/> :  <ColumnVideoLayout videoData={videoData}/> }
              </div>

   </div>
  )
}

export default VideoPlayer