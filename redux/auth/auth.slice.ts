import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  User
} from 'firebase/auth'
import { AuthError, AuthState } from './auth.types'

export const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setAuthSuccess: (state, { payload }: PayloadAction<User | null>) => {
      state.currentUser = payload
      state.isAuth = true
    },
    setLogOut: (state) => {
      state.isAuth = false
      state.currentUser = undefined
    },
    setAuthFailed: (state, { payload }: PayloadAction<AuthError>) => {
      state.error = payload
      state.isAuth = false
    },
  },
})

export const { setAuthSuccess, setLogOut, setLoading, setAuthFailed } = authSlice.actions

export default authSlice.reducer