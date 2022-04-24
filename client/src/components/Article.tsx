import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faCommentDots, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '..'
import { detailInfo } from '../store/ArticleDetailSlice'
import { resetCreatePost } from '../store/createPostSlice'
import { resetKaKao } from '../store/LocationListSlice'
import { resetRouteList } from '../store/RouteListSlice'
import { update } from '../store/UserInfoSlice'
import LoadingSpinner from '../components/LoadingSpinner'

function Article() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mainArticles } = useSelector((state: RootState) => state.articles)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // main이 불러와지면 post 작성정보를 초기화시켜준다.
    resetPostInfo()
    setIsLoading(false)
  }, [])

  const resetPostInfo = () => {
    dispatch(resetCreatePost())
    dispatch(resetKaKao())
    dispatch(resetRouteList())
  }

  const updateTargetId = async (id: number) => {
    dispatch(detailInfo({ targetId: id, userInfo: {}, articleInfo: {} }))
    navigate(`/postdetails?id=${id}`)
  }

  const moveToUserInfo = (id: number) => {
    dispatch(update({ targetId: id, userInfo: {}, articles: [] }))
    navigate(`/userinfo?id=${id}`)
  }

  const moveToSearch = (tag: string) => {
    navigate(`/search?tag=${tag}`)
  }

  return (
    <div id="mainContainer">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div id="mainContainer">
          {mainArticles.map(article => {
          return (
              <div className="postBox" key={article.id}>
                <img
                  src={article.thumbnail}
                  alt="mainImage"
                  className="mainImage"
                  onClick={() => updateTargetId(article.id)}
                  onKeyDown={() => updateTargetId(article.id)}
                />
                <div className="tagBox">
                  {article.tags
                    .map((el: any) => {
                      return { id: article.tags.indexOf(el), tag: el }
                    })
                    .map((ele: any) => {
                      return (
                        <div
                          className="tag"
                          key={ele.id}
                          role="contentinfo"
                          onClick={() => moveToSearch(ele.tag)}
                          onKeyDown={() => null}
                        >
                          #{ele.tag}
                        </div>
                      )
                    })}
                </div>
                <div className="communityBox">
                  <label htmlFor={`moveToUserInfo${article.id}`}>
                    <img className="profileImage" alt="profileImage" src={`${article.profileImage}`} />
                    <div className="nickname">{article.nickname}</div>
                  </label>
                  <button
                    id={`moveToUserInfo${article.id}`}
                    type="button"
                    className="hidden"
                    onClick={() => {
                      console.log(article)
                      moveToUserInfo(article.userId)
                    }}
                  >
                    21231
                  </button>
                  <div className="iconBox">
                    <FontAwesomeIcon className="mainIcon_eye" icon={faEye} />
                    <div className="like">{article.hits || 0}</div>
                    <FontAwesomeIcon className="mainIcon_heart" icon={faHeart} />
                    <div className="like">{article.totalLike || 0}</div>
                    <FontAwesomeIcon className="mainIcon_comment" icon={faCommentDots} />
                    <div className="reply">{article.totalComment || 0}</div>
                  </div>
                </div>
                <div />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Article
