
import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player';

const Video = ({ videoData }) => {
  const [played, setPlayed] = useState(0.5);


  return (
   <div className="Video">
      <ReactPlayer
        url={videoData.video?.startsWith("https://res.cloudinary.com") ? `${videoData.video}` : `https://youtube-clone-rx4q.onrender.com/public/${videoData.video}`}
        width='100%'
        height='100%'
        controls={true}
        playing={true}
        muted={false}
      />
   </div>
  )
}

export default Video