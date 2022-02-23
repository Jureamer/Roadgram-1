/* Store import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { persistor } from '../index'
/* State Type 설정 */

export interface Article {
  id?: number,
  thumbnail?: string,
  nickname?: string,
  totalLike?: number,
  totalComment?: number
  tags?: string[]
}

export interface Info {
  id?: number,
  nickname?: string,
  email?: string,
  statusMessage?: string,
  profileImage?: string,
  totalFollower?: number,
  totalFollowing?: number,
}

export interface UserInfo {
  userInfo: Info,
  articles: Article[]
}


/* State 초기값 설정 */
const initialState: UserInfo = {
  userInfo: {},
  articles: []
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    /* Action 설정 */
    update: (state: UserInfo,  action: PayloadAction<UserInfo>) => {
      const {userInfo, articles} = action.payload;
      state.userInfo = userInfo;
      state.articles = articles;
    }
  },
})

export const { update } = userInfoSlice.actions
export default userInfoSlice.reducer