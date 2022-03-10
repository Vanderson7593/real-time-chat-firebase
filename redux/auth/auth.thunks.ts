import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { AppThunk } from "../store";
import { setAuthFailed, setAuthSuccess, setLoading, setLogOut } from "./auth.slice";

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await signInWithEmailAndPassword(auth, email, password);
    dispatch(setAuthSuccess(auth.currentUser))
  } catch (error: any) {
    dispatch(setAuthFailed({ message: error.code }))
  } finally {
    dispatch(setLoading(false))
  }
}

export const logOut = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await signOut(auth)
    dispatch(setLogOut())
  } catch (error: any) {
    dispatch(setAuthFailed({ message: error.code }))
  } finally {
    dispatch(setLoading(false))
  }
}

export const register = (email: string, password: string, displayName: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) await updateProfile(auth.currentUser, { displayName });
    login(email, password)
  } catch (error: any) {
    dispatch(setAuthFailed({ message: error.code }))
  } finally {
    dispatch(setLoading(false))
  }
}