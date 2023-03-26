const User = require('../models/userModel')
const Video = require('../models/videoModel')
const Comment = require('../models/commentModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const generateToken = async (id) => {
  try {
    let token = await jwt.sign({ _id: id }, process.env.SECRET_KEY)
    return token;
  } catch (err) {
    console.log(err)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let isUserExists = await User.findOne({ email: email })
    if (!isUserExists) { return res.status(404).send({ success: false, error: "User not exists" }) }
    let verifyPassword = await bcryptjs.compare(password, isUserExists.password)
    if (!verifyPassword) { return res.status(401).send({ success: false, error: "Invalid password" }) }
    let token = await generateToken(isUserExists._id)
    res.cookie('youtube', token, { expire: "10d", httpOnly: true, secure:true })
    res.status(200).send({ success: true, msg: "Login successfully" })
  } catch (err) { res.status(500).send(err.message) }
}

const register = async (req, res) => {
  try {
    const { name, email, password, picture } = req.body;
    const userExists = await User.findOne({ email: email })
    if (userExists) { return res.status(409).send({ success: false, error: "User already exists" }) }
    let hashPassword = await bcryptjs.hash(password, 12)
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      picture: picture,
    })
    await newUser.save()
    if (newUser) {
      let token = await generateToken(newUser._id)
      res.cookie('youtube', token, { expire: '10d', httpOnly: true, secure:true })
      res.status(200).send({ success: true, msg: "Registered successfully", newUser: newUser })
    } else {
      res.status(400).send({ success: true, error: "Failed to create user" })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const saveVideo = async (req, res) => {
  try {
    let user = req.userData;
    const { videoId } = req.body;
    let saveVideo = await User.findOneAndUpdate({ _id: user._id }, { $push: { saved: videoId } })
    if (saveVideo) { res.status(200).send({ success: true, msg: "Video saved" }) }
    else { res.status(404).send({ success: false, error: "Video not found" }) }
  } catch (err) { res.status(500).send(err.message) }
}

const removeVideo = async (req, res) => {
  try {
    let user = req.userData;
    const { videoId } = req.body;
    let saveVideo = await User.findOneAndUpdate({ _id: user._id }, { $pull: { saved: videoId } })
    if (saveVideo) { res.status(200).send({ success: true, msg: "Video removed" }) }
    else { res.status(404).send({ success: false, error: "Video not found" }) }
  } catch (err) { res.status(500).send(err.message) }
}

const addToHistory = async (req, res) => {
  try {
    const user = req.userData;
    const { videoId } = req.body;
    const isVideoAlreadyExist = await User.findOne({ _id: user._id, history : { $in: [videoId] } });

    if (!isVideoAlreadyExist) {
      const updateHistory = await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { history: videoId }, $set: { addToHistoryDate: Date.now() } },
        { new: true }
      );

      if (updateHistory) {
        res.status(200).json("Added to history");
      } else {
        res.status(404).json("Video not found");
      }
    } else {
      res.status(400).json("Video already in history");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};


const removeFromHistory = async (req, res) => {
  try {
    const user = req.userData;
    const { videoId } = req.body;
    let isVideoAlreadyExist = await Video.findOne({ _id: videoId })
    if (isVideoAlreadyExist) {
      let updateHistory = await User.findOneAndUpdate({ _id: user._id }, { $pull: { history: videoId } })
      if (updateHistory) { res.status(200).json("Added to history") }
      else { res.status(404).json("Video not found") }
    }
  } catch (err) { res.status(500).send(err.message) }
}

const checkUserLoggedIn = async (req, res) => {
  const user = req.userData;
  let populateUser = await User.findOne({ _id: user._id })
    .populate('subscribed', "-password -subscribers -saved -history")
    .populate({
      path: 'history', select: "-likes -dislikes -comments -videoPublicID -imagePublicID -discription",
      populate: {
        path: "uploadedBy",
        select: "-password -subscribed -createdAt -updatedAt -email -saved -history"
      }
    })
    .populate({
      path: 'saved', select: "-likes -dislikes -comments -videoPublicID -imagePublicID -discription",
      populate: {
        path: "uploadedBy",
        select: "-password -subscribed -createdAt -updatedAt -email -saved -history"
      }
    })
    .sort({ "history.addToHistoryDate": -1 })
  res.status(200).send(populateUser)
}

const getUserSubscribedVideos = async (req, res) => {
  try {
    const userId = req.userData;; // replace with the user's ID
    const user = await User.findById(userId);
    const subscribedIds = user.subscribed;
    const videos = await Video.find({ uploadedBy: { $in: subscribedIds } })
      .select("-likes -dislikes -comments -videoPublicID -imagePublicID -discription")
      .populate("uploadedBy", "-password -subscribed -createdAt -updatedAt -email -saved -history") // populate the `uploadedBy` field
      .sort({ createdAt: -1 }); // here
    res.status(200).send(videos)
  } catch (err) {res.status(500).send(err.message) }
}

const creatorData = async (req, res) => {
  try {
    const { userId } = req.params;
    let getUser = await User.findOne({ _id: userId })
      .select("name subscribers picture verified banner")

    const videos = await Video.find({ 'uploadedBy': userId })
      .populate('uploadedBy')
      .select("-likes -dislikes -comments -videoPublicID -imagePublicID -discription")
    res.status(200).send({ user: getUser, videos: videos })
  } catch (err) { res.status(500).send(err.message) }
}

const editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.files)
    let user = req.userData;
    let updateName = await User.updateOne({ _id: user._id }, { $set: { name: name } })
    let updatePicture = await User.updateOne({ _id: user._id }, { $set: { picture: req.files.picture[0].filename } })
    let updateBanner = await User.updateOne({ _id: user._id }, { $set: { banner: req.files.banner[0].filename } })
    res.status(200).json('changes saved successfully')
  } catch (err) { res.status(500).send(err.message) }
}

const logout = async(req,res)=> {
  try {
    res.clearCookie('youtube',{ path: '/' })
    res.status(200).json("Logout successfully")
  } catch (err) {res.status(500).send(err.message)}
}


module.exports = {
  login,
  register,
  removeVideo,
  saveVideo,
  addToHistory,
  checkUserLoggedIn,
  getUserSubscribedVideos,
  creatorData,
  removeFromHistory,
  editProfile,
  logout
}