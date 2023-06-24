import React, { useContext } from 'react'
import CategoryNavbar from '../components/CategoryNavbar'
import VideoBox from '../components/VideoBox'
import { AppContext } from '../context/AppContext'
import LoadingVideosContainer from './LoadingVideosContainer'

const VideosContainer = ({ required, txt, videos, func }) => {
  const { openSideNav, loading, searching } = useContext(AppContext)
  return (
    <div className='VideoContainer'>
      {required ? <CategoryNavbar func={func} /> : null}
      <div className="Videos-Handler-Container-yt">
        {
          loading ? <LoadingVideosContainer /> : <div style={{
            display: "flex", alignItems: "center",
            justifyContent: `${videos.length > 0 ? "flex-start" : "center"}`, flexDirection: "column", width: "100%", minHeight: "75%"
          }}>
            {
              !txt ? null : <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "90%" }}><p style={{ color: "#f1f1f1", fontSize: "1.6rem", marginBottom: "20px" }}>{"History"}</p> <button className='see-more'>See more</button></div>
            }
            {
              videos.length > 0 ?
                <div className={openSideNav ? "grid-video-container" : "grid-video-container four "}>
                  {
                    videos.map((data) => {
                      return <VideoBox data={data} key={data._id} />
                    })
                  }
                </div>
                : <div className="noResultsFound">
                  <img src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-4344461-3613889.png" alt="" />
                  <p className='hdf-sffjlasf-j'>No Result Found</p>
                  <p className='lfjldfsfklasjdf-dsfklasd'>This is a clone project, which means we don't have a huge amount of resources. If you are here to check the functionality, try searching for some keywords like: <span>anime</span>, <span>coding</span>, <span>motivation</span>, <span>gaming</span></p></div>
            }

          </div>
        }
      </div>
    </div>
  )
}

export default VideosContainer