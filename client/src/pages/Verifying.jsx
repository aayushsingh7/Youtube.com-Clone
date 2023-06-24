import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';


const Verifying = () => {
const navigate = useNavigate()
const {setUser,reFetch,setHistory, setHandleWatchList } = useContext(AppContext)
document.title = "Verifying..."

  useEffect(()=> {
    setTimeout(()=> {
      checkUserLogin()
    },3000)
  },[])

  useEffect(()=> {
     checkUserLogin()
  },[reFetch])

   const checkUserLogin = async()=> {
    try {
      let checkUser = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/check-user',{method:"GET",credentials:"include"})
      let response = await checkUser.json()
      if(checkUser.status === 200){
        setUser(response)
        setHistory(response.history)
        setHandleWatchList(response.saved)
        navigate('/')
       }else{
        navigate('/')
        setUser({})
      }
    } catch (err) {}
   }

  return (
    <div className="Verifying-user">
    <img src="/logo.png" alt="" className='entering-logo-yt' />
    </div>
  )
}

export default Verifying