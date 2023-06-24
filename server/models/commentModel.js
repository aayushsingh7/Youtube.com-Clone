const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
     userData:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
     content:{type:String,require:true},
     likes:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
     dislike:[{type:mongoose.Schema.Types.ObjectId, ref:'user',default:[]}],
     newComments:[{type:mongoose.Schema.Types.ObjectId,ref:'comment',default:[]}]
},{timestamps:true})

const Comment = mongoose.model('comment',commentSchema)
module.exports = Comment;