import { RootState } from "../store"

export const channelsSelector = (state: RootState) => state.channels.channels

export const channelLoadingSelector = (state: RootState) => state.channels.isLoading

export const channelRootSelector = (state: RootState) => state.channels

export const currentChannelSelector = (state: RootState) => state.channels.currentChannel

export const messagesSelector = (c: string) => (state: RootState) => {
  const _channel = state.channels.channels.filter(channel => channel.name == c)[0]
  return _channel?.messages || []
}