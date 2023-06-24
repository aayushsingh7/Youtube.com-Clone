import React from 'react'
import CommentSection from '../components/CommentSection'
import LoadingVideoPlayer from '../components/LoadingVideoPlayer'
import Video from '../components/Video'
import VideoInformation from '../components/VideoInformation'

const VideoPlayerLayout = ({ videoData ,loading}) => {
  return (
    <div className="VideoPlayer-Layout">
     {
      loading ?   <LoadingVideoPlayer/> : 
   <>
      <Video videoData={videoData}/>
   <div className="video-info-and-comments-here">
   <VideoInformation videoData={videoData} c={"pc-view"}/>
      <CommentSection videoData={videoData} />
   </div>
   </>
     }
    </div>
  )
}

export default VideoPlayerLayout