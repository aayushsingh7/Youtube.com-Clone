import React, { useContext, useEffect, useState } from 'react'
import SideNavbar from '../components/SideNavbar'
import VideosContainer from '../layout/VideosContainer'
import Header from '../layout/Header'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Search = () => {
  const params= useParams()
  const [videos , setVideos] = useState([])
  const {loading , setLoading}= useContext(AppContext)
  document.title = `${params.query}`

  useEffect(()=> {
    searchByCategory()
  },[params.query])

  useEffect(()=> {
 searchByCategory()
  },[])

  const searchByCategory = async(e)=> {
    try {
      setLoading(true)
      let getVideos = await fetch(`https://youtube-clone-rx4q.onrender.com/api/v1/search/${params.query}`,{
        method:"GET",
        credentials:"include",
        headers:{"Content-Type":"application/json"}
      })
      const response = await getVideos.json()
      if(getVideos.status === 200){
        setVideos(response?.map((data)=> data.item))
        setLoading(false)
     }else{
      setVideos([])
      setLoading(false)
     }
    } catch (err) {}
  }

  
  return (
    <div className="Search-Results">
  <div className="Contents">
    <VideosContainer required={false} videos={videos}/> 
  </div>
 </div>
  )
}

export default Search