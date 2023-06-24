import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const CategoryNavbar = ({ func }) => {

  const {categorySelected,setCategorySelected,videos,setVideos,loading,setLoading} = useContext(AppContext)

  const searchByCategory = async(query)=> {
    try {
      if(query === "All"){
        await  func()
      }else{
        setLoading(true)
        let getVideos = await fetch(`https://youtube-clone-rx4q.onrender.com/api/v1/search/${query}`,{
          method:"GET",
          credentials:"include",
          headers:{"Content-Type":"application/json"}
        })
        const response = await getVideos.json()
        if(getVideos.status === 200){
          setLoading(false)
          setVideos(response?.map((data)=> data.item))
       }
      }
    } catch (err) {}
  }

  const categorys = [
    {type:"All",id:"12qw"},
   { type:"Gaming",id:"jk12"},
    {type:"Sports",id:"kjr3"},
   { type:"Motivation",id:"jlv3"},
   { type:"Anime",id:"joj1"},
    {type:"Coding",id:"lk90"},
  ]

  return (
    <div className='CategoryNavbar'>
        {
          categorys.map((cat)=> {
            return (
              categorySelected === cat.type? 
              <p key={cat.id} className="active-category-box" onClick={()=> {setCategorySelected(cat.type); searchByCategory(cat.type)}}>{cat.type}</p>  : 
              <p key={cat.id} className="nav-category-box" onClick={()=>{ setCategorySelected(cat.type); searchByCategory(cat.type)}}>{cat.type}</p>
            )
          })
        }
    </div>
  )
}

export default CategoryNavbar