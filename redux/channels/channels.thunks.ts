import { addDoc, collection, doc, getDocs, onSnapshot, query, setDoc, Timestamp, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import { IChannel } from '../../types/channel'
import { formatParam } from '../../utils/channel'
import { AppThunk } from '../store'
import { createChannel, setErrorMessage, setIsLoading } from './channels.slice'

export const startSendMessage = (text: string, channel: IChannel, status = false): AppThunk => async (dispatch, getState) => {
  const user = getState().auth;

  if (user) {
    const { currentUser } = user;

    return await addDoc(collection(db, 'channels', channel.name, 'messages'), {
      sender: {
        uid: currentUser?.uid,
        displayName: currentUser?.displayName,
      },
      text,
      createdAt: Timestamp.fromDate(new Date()),
      status
    })
  }
};

export const startCreatechannel = (channelName: string, showCreateError?: (arg: string) => string): AppThunk => async (dispatch, getState) => {

  dispatch(setIsLoading(true))

  const { currentUser } = getState().auth

  const channel: IChannel = {
    name: formatParam(channelName)
  } as IChannel

  const channels = [] as any;

  try {
    const docs = await getDocs(collection(db, 'channels'))
    docs.forEach(doc => channels.push({
      id: doc.id,
      ...doc.data()
    }))

    if (!channels.find((c: IChannel) => c.name === channel.name)) {

      await setDoc(doc(db, 'channels', channel.name), {
        name: channel.name
      })

      dispatch(createChannel(channel));

      const perName = currentUser?.displayName

      dispatch(startSendMessage(`${perName} created this channel`, channel, true))
    } else {
      dispatch(setErrorMessage('Channel name not available'))
    }
  } catch (error) {
    dispatch(setErrorMessage('We could not create this channel'))
  } finally {
    dispatch(setIsLoading(false))
  }
};

export const loadInitialData = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setIsLoading(true))
    const channelsRef = collection(db, 'channels')
    onSnapshot(channelsRef, (snapShot) => {
      if (!snapShot.empty) {
        snapShot.forEach(c => {
          const { name } = c.data()
          const messagesRef = query(collection(channelsRef, c.data().name, 'messages'), orderBy('createdAt'))
          onSnapshot(messagesRef, (snap) => {
            const msgs = [] as any
            snap.forEach(m => {
              msgs.push(m.data())
            })
            dispatch(createChannel({
              messages: msgs,
              name,
            }))
          })
        })
      }
    })
  } catch (error) {
    dispatch(setErrorMessage('We could not load messages and channels, please reload the page'))
  } finally {
    dispatch(setIsLoading(false))
  }
}