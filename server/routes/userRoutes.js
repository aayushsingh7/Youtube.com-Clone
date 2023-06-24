const express = require('express')
const user_routes = express()
const cookieParser = require('cookie-parser')
user_routes.use(cookieParser())
const userController = require('../controllers/userController')
const userAuthentication = require('../middleware/userAuthentication')
const handleImageUpload = require('../middleware/uploadImages')

user_routes.post('/login',userController.login)
user_routes.post('/register',userController.register)
user_routes.put('/save/video',userAuthentication,userController.saveVideo)
user_routes.put('/remove/video',userAuthentication,userController.removeVideo)
user_routes.put('/add-to-history',userAuthentication,userController.addToHistory)
user_routes.get('/subscribed',userAuthentication,userController.getUserSubscribedVideos)
user_routes.get('/check-user',userAuthentication,userController.checkUserLoggedIn)
user_routes.get('/userData/:userId',userController.creatorData)
user_routes.put('/remove-from-history',userAuthentication,userController.removeFromHistory)
user_routes.put('/change/profile',userAuthentication,userController.editProfile)
user_routes.delete('/logout',userAuthentication,userController.logout)


module.exports = user_routes;