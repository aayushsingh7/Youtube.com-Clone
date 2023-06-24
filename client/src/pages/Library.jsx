import React from 'react'
import HistoryVideoContainer from '../layout/HistoryVideoContainer'

const Library = () => {
  document.title = "Library"
  return (
    <div className="History">
    <div className="Contents">
    <HistoryVideoContainer txt={"Watchlater"} seemore={true}/>
    </div>
   </div>
  )
}

export default Library