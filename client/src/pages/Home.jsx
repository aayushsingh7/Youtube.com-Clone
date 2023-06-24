import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import VideosContainer from '../layout/VideosContainer'

const Home = () => {
  const { setSubscribedTo,videos,setVideos ,categorySelected,setLoading,setSubscribedCreatorList,notification} = useContext(AppContext)
document.title = "Youtube"

    useEffect(()=> {
      getVideos()
      getSubscriptionsVideo()
    },[])

    useEffect(()=> {
      if(categorySelected === "All"){
        getVideos()
      }
    },[categorySelected])

const getVideos = async()=> {
      try {
        setLoading(true)
        let getVid = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/videos',{method:"GET",credentials:"include"})
        let response = await getVid.json()
        if(response.length > 0){
        setVideos(response)
        setLoading(false)
        }else{
         notification("Something went wrong while fetching the videos")
          setLoading(false)
        }
      } catch (err) {}
    }


const getSubscriptionsVideo = async()=> {
    try{
       let videos = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/subscribed',{method:"GET",credentials:"include"})
       let response = await videos.json()
           setSubscribedTo(response)
           setSubscribedCreatorList(response.map((data)=> data.uploadedBy))
         }catch(err){}
}


  return (
  <div className="Home">
  <div className="Contents">
  <VideosContainer required={true} videos={videos} func={getVideos}/>
  </div>
 </div>
  )
}

export default Home