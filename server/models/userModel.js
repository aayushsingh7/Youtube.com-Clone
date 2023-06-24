const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: { type: String,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'video' }],
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'video' }],
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    interestedIn:[String],
    subscribed:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    verified:{type:Boolean,default:false},
    banner:{type:String,default:"https://as1.ftcdn.net/v2/jpg/05/20/18/40/1000_F_520184081_4wjmSjf36uBSBgshnTuSrp0xHMk9wNao.jpg"}
}, { timestamps: true })

const User = mongoose.model('user', userSchema)
module.exports = User