import firebase from './config';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const db = getFirestore(firebase);
const auth = getAuth()
const provider = new GoogleAuthProvider()

export {
  getAuth,
  firebase,
  signInWithRedirect,
  signInWithPopup,
  provider,
  GoogleAuthProvider,
  db,
  auth
};