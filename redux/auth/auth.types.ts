import { User } from "firebase/auth"

export interface AuthError {
  message: string
}

export interface AuthState {
  isAuth: boolean
  currentUser?: User | null
  isLoading: boolean
  error: AuthError | null
}

