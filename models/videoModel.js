const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    views: { type: Number, default: 0 },
    likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    dislikes:[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    tags: [String],
    discription: { type: String },
    thumbnail: { type: String},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    video: { type: String},
    videoPublicID:{type:String},
    imagePublicID:{type:String},
    uploadedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    duration:{type:Number,default:0},
    addToHistoryDate:{type:Date,default:Date.now()}
}, { timestamps: true })

const Video = mongoose.model('video', videoSchema)
module.exports = Video;