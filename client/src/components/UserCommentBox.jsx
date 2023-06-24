import React, { useContext, useEffect, useState } from 'react'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike, AiOutlineMore } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import formatCreatedAtDate from '../utils/formatCreatedAtDate'

const UserCommentBox = ({ data, admin }) => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()
  const params = useParams()
  const { notification, setCommentSection, commentSection } = useContext(AppContext)
  const [open, setOpen] = useState(false)
 const [toggle , setToggle] = useState(0)

  useEffect(()=> {
  if( data.likes?.map((re) => re).includes(user._id)){
   setToggle(1)
  }else if( data.likes?.map((re) => re).includes(user._id)){
     setToggle(2)
  }else{
     setToggle(0)
  }
  },[])


  const likeComment = async () => {
    try {
      if(!user._id) navigate('/login')
      manageRealtimeLikes()
      let like = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/like_comment', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId: data._id })
      })
      let response = await like.json()
      if (like.status === 200) {
        await removeDislike()
         manageRealtimeUnDislike()
      }
    } catch (err) {}
  }
  const removelike = async () => {
    try {
      manageRealtimeUnlike()
      let like = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/unlike_comment', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId: data._id })
      })
      let response = await like.json()
    } catch (err) {}
  }
  const dislikeComment = async () => {
    try {
      if(!user._id) navigate('/login')
      manageRealtimeLDislike()
      let like = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/dislike_comment', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId: data._id })
      })
      let response = await like.json()
      if (like.status === 200) {
        await removelike()
       manageRealtimeUnlike()
      }
    } catch (err) {}
  }
  const removeDislike = async () => {
    try {
      manageRealtimeUnDislike()
      let like = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/undislike_comment', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId: data._id })
      })
      let response = await like.json()
    } catch (err) {}
  }
  const deleteComment = async (id) => {
    try {
      manageRealtimedeleteComment(id)
      let deleteCom = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/delete_comment', {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({ commentId: data._id, videoId: params.id }),
        headers: { "Content-Type": "application/json" }
      })
      let response = await deleteCom.json()
      notification("Comment deleted")
    } catch (err) { }
  }


  // Manage Realtime Likes and Dislike Showing
  const manageRealtimeLikes = () => {
    let findCom = commentSection.comments?.find((comment) => comment._id === data._id)
    if (findCom) {
      findCom.likes?.push(user._id)
    }
    const updatedCommentSection = { ...commentSection, comments: [...commentSection.comments] }
    setCommentSection(updatedCommentSection)
  }
  const manageRealtimeUnlike = () => {
    let findCom = commentSection.comments?.find((comment) => comment._id === data._id)
    if (findCom) {
      findCom.likes?.pop(user._id)
    }
    const updatedCommentSection = { ...commentSection, comments: [...commentSection.comments] }
    setCommentSection(updatedCommentSection)
  }
  const manageRealtimeLDislike = () => {
    let findCom = commentSection.comments?.find((comment) => comment._id === data._id)
    if (findCom) {
      findCom.dislike?.push(user._id)
    }
    const updatedCommentSection = { ...commentSection, comments: [...commentSection.comments] }
    setCommentSection(updatedCommentSection)
  }
  const manageRealtimeUnDislike = () => {
    let findCom = commentSection.comments?.find((comment) => comment._id === data._id)
    if (findCom) {
      findCom.dislike?.pop(user._id)
    }
    const updatedCommentSection = { ...commentSection, comments: [...commentSection.comments] }
    setCommentSection(updatedCommentSection)
  }

  const manageRealtimedeleteComment = (id) => {
    try {
      let filterCom = commentSection.comments?.filter((comment) => comment._id !== id)
      let newArr = JSON.parse(JSON.stringify(commentSection))
      newArr.comments = filterCom
      setCommentSection(newArr)
    } catch (err) {}
  }


  return (
    <div className="UserCommentBox">
      <div className='comment-flex-yt-container-user' onClick={() => setOpen(false)}>
        <img src={data.userData?.picture?.startsWith('https://') ?  data.userData?.picture : `https://youtube-clone-rx4q.onrender.com/public/${data.userData?.picture}`} alt="" style={{ height: "40px", width: "40px" }} />
        <div className="user-information-comments-box">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", position: "relative" }}>
            <p style={data.userData?._id === admin.uploadedBy?._id ? {
              fontSize: "1rem", color: "#f1f1f1",
              padding: "3px 10px 3px 10px", borderRadius: "40px", background: "#333", marginLeft: "-5px"
            } : { fontSize: "1rem", color: "#aaa" }}>{data.userData?.name}</p> <span style={{ color: "#aaa", margin: "0px 5px 0px 5px" }}>•</span> <span style={{ fontSize: "0.9rem", color: "#aaa" }}>{formatCreatedAtDate(data.createdAt)}</span></div>
          <p style={{ fontSize: "1.1rem", color: "#f1f1f1", marginTop: "5px", width: "95%" }}>{data.content}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%", marginTop: "10px", position: "relative", left: "-5px" }}>
            <div className='yt-like-btn-comments-yt'>
              {
               toggle === 2 ?  <button className='comment-like' onClick={likeComment}><AiOutlineLike /></button> :  
               data.likes?.map((re) => re).includes(user._id) ?
               <button className='comment-like' onClick={removelike}>
                 <AiFillLike />
               </button>
               :
               <button className='comment-like' onClick={likeComment}>
                 <AiOutlineLike />
               </button>
              }
              <span className='comments-counter'>{data.likes.length}</span>
            </div>

            <span className='line'></span>
            {
             toggle === 1 ? <button className="comment-dislike" onClick={dislikeComment}><AiOutlineDislike /></button>  : 
             data.dislike?.map((re) => re).includes(user._id) ?
             <button className="comment-dislike" onClick={removeDislike}><AiFillDislike /></button> :
             <button className="comment-dislike" onClick={dislikeComment}><AiOutlineDislike /></button>
            }
          </div>
        </div>
      </div>
      {
        data.userData?._id === user._id ? <AiOutlineMore className='more-options' onClick={() => setOpen(!open)} /> : null
      }
      {
        open ? <div className="options-comment-delete" onClick={() => { deleteComment(data._id), setOpen(!open) }}>Delete Comment</div> : null
      }
    </div>
  )
}

export default UserCommentBox