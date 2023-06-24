import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'

const Notification = () => {
    const {showNotification , setShowNotification , txt} = useContext(AppContext)
  return (
   <div className={showNotification? "notification noti-show" : "notification noti-hide"}>
    {txt}
   </div>
  )
}

export default Notification