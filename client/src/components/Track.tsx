import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '..'

function Track() {
  const { roads } = useSelector((state: RootState) => state.articleDetails.articleInfo)

  return (
    <div className="track_container">
      <div className="track_title">장소 정보</div>
      <div className="track_marker_div">
        {roads ? (
          roads.map(road => {
            return (
              <div key={road.imageSrc} className="track_marker_each_div">
                <div className="track_marker_icon_div">
                  <FontAwesomeIcon className="track_marker_icon" icon={['far', 'location-dot']} />
                  <FontAwesomeIcon className="ellipsis_icon" icon={['far', 'ellipsis-vertical']} />
                </div>
                <div className="track_maker_name_div">
                  <span className="track_marker_placename">{road.placeName}</span>
                  <span className="track_marker_addressname">{road.addressName}</span>
                </div>
              </div>
            )
          })
        ) : (
          <div>1</div>
        )}
      </div>
    </div>
  )
}

export default Track
