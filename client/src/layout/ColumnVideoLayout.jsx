import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoryNavbar from '../components/CategoryNavbar'
import VerticalVideoBox from '../components/VerticalVideoBox'
import VideoInformation from '../components/VideoInformation'
import { AppContext } from '../context/AppContext'

const ColumnVideoLayout = ({ videoData, required }) => {
  const [results , setResults] = useState([])
  const {notification} = useContext(AppContext)
  const params = useParams()

  useEffect(()=> {
    getVideos()
  },[])

  useEffect(()=> {
   getVideos()
  },[params.id])

  const getVideos = async()=> {
    try {
      let getVid = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/videos',{method:"GET",credentials:"include"})
      let response = await getVid.json()
      if(response.length > 0){
      setResults(response)
      }else{
      notification("Something went wrong while fetching the videos")
      }
    } catch (err) {}
  }

  return (
   <div className="ColumnVideoLayout">
    <VideoInformation videoData={videoData} c={"mob-view"}/>
   {required ?  <CategoryNavbar/> : null}
    <div className="SuggestedVideo">
      {
        results?.filter((data)=> data._id !== videoData?._id).map((data)=> {
          return   <VerticalVideoBox data={data} key={data._id}/>
        })
      }
    </div>
   </div>
  )
}

export default ColumnVideoLayout