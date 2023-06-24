const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Video = require("../models/videoModel");
const Fuse = require("fuse.js");
const _ = require("lodash");
const util = require("util");
const cloudinary = require("cloudinary").v2;

const uploadVideo = async (req, res) => {
  try {
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    let tags = req.body.tags;
    const image = await cloudinary.uploader.upload(req.body.thumbnail, {
      folder: "youtube-(thumbnails)",
    });

    const video = await cloudinary.uploader.upload(req.body.video, {
      folder: "youtube-(videos)",
      resource_type:"video"
    });


    let newVideo = new Video({
      title: req.body.title,
      discription: req.body.discription,
      thumbnail: image.secure_url,
      video: video.secure_url,
      tags: JSON.parse(req.body.tags),
      uploadedBy: req.userData._id,
    });
    await newVideo.save();
    res.status(200).send({ video: newVideo, tags: tags });
  } catch (err) {
    console.log("Error is happening",err);
    res.status(500).send(err.message);
  }
};

const getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    let fetchVideo = await Video.findOne({ _id: videoId })
      .populate({
        path: "comments",
        populate: {
          path: "userData",
          select:
            "-password -saved -history -interestedIn  -updatedAt -__v -subscribed -subscribers",
        },
        options: { sort: { createdAt: -1 } },
      })
      // .populate("likes", "-password  -history -interestedIn  -updatedAt -__v -subscribers -subscribed")
      .populate("comments.likes")
      .populate(
        "uploadedBy",
        "-password -saved -history -interestedIn -createdAt -updatedAt -__v"
      );
    if (fetchVideo) {
      res.status(200).send(fetchVideo);
    } else {
      res.status(404).send({ success: false, error: "Video not found" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("uploadedBy");
    const shuffledVideos = _.shuffle(videos);
    res.status(200).send(shuffledVideos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const likeVideo = async (req, res) => {
  try {
    let userId = req.userData._id;
    const { videoId } = req.body;
    let getVideo = await Video.findOneAndUpdate(
      { _id: videoId },
      { $push: { likes: req.userData._id } },
      { new: true }
    );
    if (getVideo) {
      res.status(200).send(getVideo);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const removeLikeFromVideo = async (req, res) => {
  try {
    let userId = req.userData._id;
    const { videoId } = req.body;
    let getVideo = await Video.findOneAndUpdate(
      { _id: videoId },
      { $pull: { likes: req.userData._id } },
      { new: true }
    );
    if (getVideo) {
      res.status(200).send(getVideo);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const dislikeVideo = async (req, res) => {
  try {
    const { videoId } = req.body;
    let getVideo = await Video.findOneAndUpdate(
      { _id: videoId },
      { $push: { dislikes: req.userData._id } },
      { new: true }
    );
    if (getVideo) {
      res.status(200).send(getVideo);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const removeDislikeFromVideo = async (req, res) => {
  try {
    const { videoId } = req.body;
    let getVideo = await Video.findOneAndUpdate(
      { _id: videoId },
      { $pull: { dislikes: req.userData._id } },
      { new: true }
    );
    if (getVideo) {
      res.status(200).send(getVideo);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addComment = async (req, res) => {
  try {
    let userId = req.userData._id;
    const { videoId, content } = req.body;
    const comment = new Comment({
      userData: userId,
      content: content,
    });

    await comment.save();

    let getVideo = await Video.findOneAndUpdate(
      { _id: videoId },
      { $push: { comments: comment._id } },
      { new: true }
    )
      .populate({
        path: "comments",
        select: "-password -saved -history -interestedIn",
        populate: {
          path: "userData",
          select:
            "-password -saved -history -interestedIn -createdAt -updatedAt -__v -subscribers",
        },
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "uploadedBy",
        select:
          "-password -saved -history -interestedIn -createdAt -updatedAt -__v -subscribers",
      });

    if (getVideo) {
      res.status(200).send(getVideo);
    } else {
      res.status(404).send({ success: false, error: "Video not found" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const subscribe = async (req, res) => {
  try {
    let userId = req.userData._id;
    const { creatorId } = req.body;
    let checkAlreadySubscribed = await User.findOne({
      _id: userId,
      "subscribed._id": creatorId,
    });
    if (!checkAlreadySubscribed) {
      let subscribeToCreator = await User.findOneAndUpdate(
        { _id: creatorId },
        { $push: { subscribers: userId } },
        { new: true }
      );
      let increaseSubscribed = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { subscribed: creatorId } },
        { new: true }
      );
      let getCreatorVideos = await Video.find({
        uploadedBy: { $in: creatorId },
      })
        .select(
          "-likes -dislikes -comments -videoPublicID -imagePublicID -discription"
        )
        .populate(
          "uploadedBy",
          "-password -subscribed -createdAt -updatedAt -email -saved -history"
        ) // populate the `uploadedBy` field
        .sort({ createdAt: -1 }); // here

      if (subscribeToCreator) {
        res.status(200).send(getCreatorVideos);
      } else {
        res.status(404).send({ success: false, error: "User not found" });
      }
    } else {
      res.status(400).json("Already subscribed");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const unSubscribe = async (req, res) => {
  try {
    let userId = req.userData._id;
    const { creatorId } = req.body;
    let unSubscribeToCreator = await User.findOneAndUpdate(
      { _id: creatorId },
      { $pull: { subscribers: userId } },
      { new: true }
    ).populate(
      "subscribers",
      "-password -saved -history -interestedIn -createdAt -updatedAt -__v -subscribers"
    );
    let decreaseSubscribed = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { subscribed: creatorId } },
      { new: true }
    );

    if (unSubscribeToCreator) {
      res.status(200).send(unSubscribeToCreator);
    } else {
      res.status(404).send({ success: false, error: "User not found" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateViews = async (req, res) => {
  try {
    const { videoId } = req.body;
    let increaseViews = await Video.findOneAndUpdate(
      { _id: videoId },
      { $inc: { views: +1 } },
      { new: true }
    );
    if (increaseViews) {
      res.status(200).send(increaseViews);
    } else {
      res.status(400).send({ success: false, error: "Cannot update views" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.body;
    let deleteVideo = await Video.deleteOne({ _id: videoId });
    if (deleteVideo.deletedCount === 1) {
      res
        .status(200)
        .send({ success: true, msg: "Video deleted successfully" });
    } else {
      res.status(404).send({ success: false, error: "Video not found" });
    }
  } catch (err) {
    res.status(res.status(500).send(err.message));
  }
};

const editTitle = async (req, res) => {
  try {
    const { videoId, newTitle } = req.body;
    let updateTitle = await Video.updateOne(
      { _id: videoId },
      { $set: { title: newTitle } }
    );
    if (updateTitle.modifiedCount === 1) {
      res
        .status(200)
        .send({ success: true, msg: "Title changed successfully" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editDiscription = async (req, res) => {
  try {
    const { videoId, newDiscription } = req.body;
    let updateDiscription = await Video.updateOne(
      { _id: videoId },
      { $set: { discription: newDiscription } }
    );
    if (updateDiscription.modifiedCount === 1) {
      res
        .status(200)
        .send({ success: true, msg: "Discription changed successfully" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const searchVideos = async (req, res) => {
  try {
    const { query } = req.params;
    const videos = await Video.find().populate("uploadedBy");
    const users = await User.find();
    const combinedData = [...videos, ...users];
    const options = {
      keys: ["title", "tags"],
      threshold: 0.4,
      includeScore: true,
    };
    const fuse = new Fuse(videos, options);
    const results = fuse.search(query);
    if (results.length > 0) {
      res.status(200).send(results);
    } else {
      res.status(404).send({ success: false, error: "Not found" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addVideoToHistory = async (req, res) => {
  try {
    const { videoId } = req.body;
    let video = await User.findOneAndUpdate(
      { _id: req.userData._id },
      { $push: { history: videoId } },
      { new: true }
    )
      .populate("subscribed", "-password -subscribers -saved -history")
      .populate({
        path: "history",
        select:
          "-likes -dislikes -comments -videoPublicID -imagePublicID -discription",
        populate: {
          path: "uploadedBy",
          select: "name picture ",
        },
      })
      .populate(
        "saved",
        "-likes -dislikes -comments -videoPublicID -imagePublicID -discription"
      );
    res.status(200).send(video);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  uploadVideo,
  likeVideo,
  dislikeVideo,
  removeDislikeFromVideo,
  removeLikeFromVideo,
  addComment,
  subscribe,
  unSubscribe,
  updateViews,
  deleteVideo,
  editTitle,
  editDiscription,
  getVideo,
  searchVideos,
  getAllVideos,
  addVideoToHistory,
};
