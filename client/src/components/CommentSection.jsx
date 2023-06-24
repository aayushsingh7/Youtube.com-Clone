import React, { useContext, useEffect, useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import UserCommentBox from './UserCommentBox'

const CommentSection = ({ videoData }) => {
  const [comment , setComment ] = useState("")
  const navigate = useNavigate()
  const {commentSection , setCommentSection, user,openComments,setOpenComments,notification} = useContext(AppContext)

  const addComment = async()=> {
    try{
      if(!user._id) navigate('/login')
      let body = {
        videoId:videoData._id,
         content:comment
      }
      setComment("")
    let add = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/add-comment',{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(body),
      credentials:"include"
    })
    let response = await add.json()
    if(add.status === 200){
      setCommentSection(response)
      notification("Comment added")
    }
    }catch(err){}
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if(!user._id) navigate('/login')
      addComment();
    }
  };


  useEffect(()=> {
    if(openComments === true){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = "scroll"
    }
      },[openComments])
  
  return (
    <>
     <div className={openComments ?"rgba-container show-container" : "rgba-container hide-container"}  onClick={()=> setOpenComments(false)}></div>
   <div className={openComments ? "CommentSection open-comments" : "CommentSection hide-comments" }>
    <p style={{fontSize:"1.1rem",color:"#f1f1f1"}}>{commentSection?.comments?.length} Comments</p>
    <div className="add-comment">
     {!user._id ?  <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt="" style={{height:"45px",width:"45px"}} /> :  <img src={user.picture?.startsWith('https://') ?  user.picture : `https://youtube-clone-rx4q.onrender.com/public/${user.picture}`}alt="" style={{height:"45px",width:"45px"}} />}
       <div className="add-comment-input">
            <input type="text" placeholder='Add a comment' onChange={(e)=> setComment(e.target.value)} value={comment} onKeyUp={handleKeyPress}/>
        </div>
       
    </div>
       {
        comment === "" ? null :  
        <div className="comments-btn-container">
        <button className='cancle' onClick={()=> setComment("")}>Cancle</button>
        <button className='comment-btn' onClick={addComment}>Comment</button>
    </div>
       }

      <div className="comments-here">
       {
        commentSection?.comments?.map((userComments)=> {
          return  <UserCommentBox data={userComments} admin={videoData} key={userComments._id}/>
        })
       }
      </div>

   </div>
   </>
  )
}

export default CommentSection