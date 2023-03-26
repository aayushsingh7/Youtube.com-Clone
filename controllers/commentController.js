const User = require('../models/userModel')
const Video = require('../models/videoModel')
const Comment = require('../models/commentModel')

const likeComment = async(req,res)=> {
    try {
      const {commentId} = req.body;
      let addLike = await Comment.updateOne({_id:commentId},{$push:{likes:req.userData._id}})
      res.status(200).send({success:true,msg:"Comment liked"})
    } catch (err) {res.status(500).send(err.message)}
  }
  
  const UnlikeComment = async(req,res)=> {
    try {
      const {commentId} = req.body;
      let addLike = await Comment.updateOne({_id:commentId},{$pull:{likes:req.userData._id}})
      res.status(200).send({success:true,msg:"Comment liked"})
    } catch (err) {res.status(500).send(err.message)}
  }
  
  const dislikeComment = async(req,res)=> {
    try {
      const {commentId} = req.body;
      let addLike = await Comment.updateOne({_id:commentId},{$push:{dislike:req.userData._id}})
      res.status(200).send({success:true,msg:"Comment liked"})
    } catch (err) {res.status(500).send(err.message)}
  }
  
  const UnDislikeComment = async(req,res)=> {
    try {
      const {commentId} = req.body;
      let addLike = await Comment.updateOne({_id:commentId},{$pull:{dislike:req.userData._id}})
      res.status(200).send({success:true,msg:"Comment liked"})
    } catch (err) {res.status(500).send(err.message)}
  }
  
  const deleteComment = async(req,res)=> {
    try {
      const {videoId , commentId} = req.body;
      let deleteFromVideo = await Video.updateOne({_id:videoId},{$pull:{comments:commentId}})
      let deleteFromCollection = await Comment.deleteOne({_id:commentId})
       res.status(200).send({success:true,msg:"Comment Deleted"})
    } catch (err) {
      res.status(500).send(err.message)
    }
  }

  module.exports=  {
    likeComment,
    UnlikeComment,
    dislikeComment,
    UnDislikeComment,
    deleteComment
  }