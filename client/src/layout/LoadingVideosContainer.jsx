import React, { useContext } from 'react'
import LoadingBox from '../components/LoadingBox'
import LoadingCategoryNav from '../components/LoadingCategoryNav'
import { AppContext } from '../context/AppContext'

const LoadingVideosContainer = () => {
    const {openSideNav} = useContext(AppContext)
    return (
        <div className='VideoContainer'>
            <div className="Videos-Handler-Container-yt hide-scroll">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",width:"100%" }}>
                    <div className={openSideNav ? "grid-video-container" :  "grid-video-container hide-scroll four"}>
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoadingVideosContainer