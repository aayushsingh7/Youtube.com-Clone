const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const user_routes = require('./routes/userRoutes')
const video_routes = require('./routes/videoRoutes')
const comment_routes = require('./routes/commentRoutes')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const path = require('path')


mongoose.connect(process.env.DB_URL).then(()=> console.log("Connected To DB")).catch((err)=> console.log(err))

app.use(express.json())
app.set('view engine','ejs')
app.use(cors({origin:true,credentials:true}))
app.use('/api/v1',user_routes)
app.use('/api/v1',video_routes)
app.use('/api/v1',comment_routes)
app.use('/public',express.static('public'))
app.use(fileUpload({useTempFiles:true,limits:{fileSize:50* 2024 *1024}}))
app.use((err, req, res, next) => {
 res.status(500).send('Something went wrong!');
});
app.use(express.static(path.join(__dirname,'./client/dist')))
app.get('*',function(req , res){
    res.sendFile(path.join(__dirname , './client/dist/index.html'))
})

  

app.listen(process.env.PORT,()=> {
console.log(`Server Started at PORT ${process.env.PORT}`)
})