import { IChannel } from "../../types/channel"
import { IMessage } from "../../types/message"

export interface IPayload {
  channel: IChannel,
  user: any
}

export interface ISendMessagePayload {
  channel: IChannel
  message: IMessage
}

export interface IChannelState {
  channels: IChannel[],
  currentChannel: string | null,
  errorMessage: string | null
  isLoading: boolean
}