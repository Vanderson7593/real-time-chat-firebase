import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChannel } from '../../types/channel'
import { IChannelState, ISendMessagePayload } from './channels.types'

export const initialState: IChannelState = {
  channels: [],
  currentChannel: null,
  errorMessage: null,
  isLoading: false
}

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    createChannel: (state, { payload }: PayloadAction<IChannel>) => {
      if (!state.channels.find((c) => c.name === payload.name)) {
        state.channels = [...state.channels, payload]
      } else {
        const index = state.channels.findIndex(c => c.name === payload.name)
        state.channels[index] = payload
      }
    },
    onSelectChannel: (state, { payload }: PayloadAction<string>) => {
      state.currentChannel = payload
    },
    sendMessage: (state, { payload }: PayloadAction<ISendMessagePayload>) => {
      state.channels.map((channel) => {
        if (channel.name === payload.channel.name) {
          return {
            ...channel,
            messages: [...channel.messages, payload.message.text]
          }
        }
        else {
          return channel;
        }
      })
    },
    setErrorMessage: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    }
  }
})

export const { setIsLoading, createChannel, sendMessage, onSelectChannel, setErrorMessage } = channelsSlice.actions

export default channelsSlice.reducer