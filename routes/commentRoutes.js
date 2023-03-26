const express= require('express')
const comment_routes = express()
const userAuthentication = require('../middleware/userAuthentication')
const commentController = require('../controllers/commentController')

comment_routes.put('/like_comment',userAuthentication,commentController.likeComment)
comment_routes.put('/unlike_comment',userAuthentication,commentController.UnlikeComment)
comment_routes.put('/dislike_comment',userAuthentication,commentController.dislikeComment)
comment_routes.put('/undislike_comment',userAuthentication,commentController.UnDislikeComment)
comment_routes.delete('/delete_comment',userAuthentication,commentController.deleteComment)
module.exports = comment_routes;