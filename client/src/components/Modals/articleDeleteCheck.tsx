import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../..';
import { logout, newAccessToken } from '../../store/AuthSlice';
import { articleDeleteModal } from '../../store/ModalSlice';

function PostDeleteCheckModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isArticleDeleteModal } = useSelector((state: RootState) => state.modal);
  const { isLogin, userInfo, accessToken, refreshToken } = useSelector((state: RootState) => state.auth);
  const { targetId, writerInfo, articleInfo } = useSelector((state: RootState) => state.articleDetails);

  const accessTokenRequest = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/auth?id=${userInfo.id}&loginMethod=${userInfo.loginMethod}`,
      { headers: { authorization: `${refreshToken}` } });
    dispatch(newAccessToken(res.data.data));
  }

  const handleDeleteArticle = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/articles?id=${articleInfo.id}&user=${userInfo.id}&loginMethod=${userInfo.loginMethod}`,
        { headers: { authorization: `${accessToken}` } });
      closeModal();
      navigate(`/userinfo?id=${userInfo.id}`);
    } catch {
      try {
        await accessTokenRequest();
      } catch {
        closeModal();
        dispatch(logout());
        alert('다시 로그인해 주세요.');
        navigate('/logins');
      }
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/articles?id=${articleInfo.id}&user=${userInfo.id}&loginMethod=${userInfo.loginMethod}`,
          { headers: { authorization: `${accessToken}` } });
        closeModal();
        navigate(`/userinfo?id=${userInfo.id}`);
      } catch (err: any) {
        closeModal();
        console.log(err)
      }
    }
  };

  const closeModal = () => {
    dispatch(articleDeleteModal(!isArticleDeleteModal));
  };

  return (
    <div className="withdrawal-center-wrap">
      <label className="withdrawal-background" htmlFor='closeModal'>
        <div className="withdrawal-box">
          <div className="withdrawal-msg">정말 삭제하시겠습니까?</div>
          <div className='withdrawal-button-box'>
            <button className="yesorno" type="button" onClick={handleDeleteArticle}>네</button>
            <button className="yesorno" type="button" onClick={closeModal}>아니오</button>
          </div>
        </div>
      </label>
      <button id='closeModal' type='button' onClick={closeModal} className='hidden'>sdf</button>
    </div>
  )
}

export default PostDeleteCheckModal;
