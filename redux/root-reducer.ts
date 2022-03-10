import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import channelsReducer from './channels/channels.slice'

const rootReducer = combineReducers({
  auth: authReducer,
  channels: channelsReducer
})

export default rootReducer