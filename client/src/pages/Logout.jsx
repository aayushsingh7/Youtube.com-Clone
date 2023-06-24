import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Logout = () => {
    const {notification,setHistory} = useContext(AppContext)
    const navigate = useNavigate()
    document.title = "Logout"

    useEffect(()=> {
        const logout = async()=> {
           try {
            let logoutUser = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/logout',{
                method:"DELETE",credentials:"include",headers:{"Content-Type":"application/json"}
            })
            let response = await logoutUser.json()
            if(logoutUser.ok){
              setHistory([])
                notification("Logout successully")
                navigate('/verifying')
            }else{
              notification("Something went wrong")}
           } catch (err) {}
        }
        logout()
    },[])

  return (
    <div className="Loading">
     <span className='loadingSpan'></span>
    </div>
  )
}

export default Logout