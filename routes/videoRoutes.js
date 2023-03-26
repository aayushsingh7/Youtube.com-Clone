const express = require('express');
const video_routes = express()
const userAuthentication = require('../middleware/userAuthentication');
const videoController = require('../controllers/videoController');
const fileUploadMiddleware = require('../middleware/fileUploads')


video_routes.post('/upload',userAuthentication,fileUploadMiddleware,videoController.uploadVideo)
video_routes.get('/video/:videoId',videoController.getVideo)
video_routes.put('/like',userAuthentication,videoController.likeVideo)
video_routes.put('/dislike',userAuthentication,videoController.dislikeVideo)
video_routes.put('/remove-like',userAuthentication,videoController.removeLikeFromVideo)
video_routes.put('/remove-dislike',userAuthentication,videoController.removeDislikeFromVideo)
video_routes.put('/add-comment',userAuthentication,videoController.addComment)
video_routes.put('/subscribe',userAuthentication,videoController.subscribe)
video_routes.put('/unsubscribe',userAuthentication,videoController.unSubscribe)
video_routes.put('/increase-views',videoController.updateViews)
video_routes.put('/edit/title',userAuthentication,videoController.editTitle)
video_routes.put('/edit/discription',userAuthentication,videoController.editDiscription)
video_routes.get('/search/:query',videoController.searchVideos)
video_routes.get('/videos',videoController.getAllVideos)
video_routes.put('/history',userAuthentication,videoController.addVideoToHistory)
video_routes.delete('/delete',userAuthentication,videoController.deleteVideo)

// video_routes.put('/add-comment',userAuthentication,videoController.addUserComments)


module.exports = video_routes;