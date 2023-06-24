import React, { useContext } from 'react'
import { MdVerified } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import formatCreatedAtDate from '../utils/formatCreatedAtDate'

const VerticalVideoBox = ({ data }) => {
    const {setSelectedVideoId} = useContext(AppContext)
    return (
        <NavLink to={`/watch/${data._id}`} style={{textDecoration:"none"}} onClick={()=> {setSelectedVideoId(data._id);scrollTo(0,0)}}>
        <div className="VideoBox" style={{marginTop:"10px",display:"flex"}}>
            <div className="thumbnail-img more-box">
                <img src={`https://youtube-clone-rx4q.onrender.com/public/${data.thumbnail}`} alt="" />
                {/* <span className="video-duration">12:30</span> */}
            </div>
            <div className="video-information" style={{padding:"0px",alignItems:"flex-start"}}>
                <div className="text-information" style={{width:"100%"}}>
                    <p className='big-title title'>{data.title}</p>
                    <span className="channel-name big-name">{data.uploadedBy.name} {data.uploadedBy.verified ?  <MdVerified style={{ position: "relative", top: "1px", marginLeft: "5px" }} /> : null}</span>
                    <div className="view-and-uploaded-at">
                        <span className="views" style={{ marginRight: "5px"}}>{data.views} views</span>
                        <span>•</span>
                        <span className="uploaded-at" style={{ marginLeft: "5px"}}>{formatCreatedAtDate(data.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
        </NavLink>
    )
}

export default VerticalVideoBox