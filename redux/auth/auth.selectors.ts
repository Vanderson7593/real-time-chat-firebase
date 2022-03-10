import { RootState } from "../store"

export const authSelector = (state: RootState) => state.auth

export const authErrorSelector = (state: RootState) => state.auth.error