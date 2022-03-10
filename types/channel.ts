import { EChannel } from "../constants/channel";
import { IMessage } from "./message";

export interface IChannel {
  [EChannel.Name]: string
  [EChannel.Messages]: IMessage[]
}