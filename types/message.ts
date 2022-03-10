import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { EMessage } from "../constants/message";

export interface IMessage {
  [EMessage.Text]: string
  [EMessage.CreatedAt]: Timestamp
  [EMessage.Sender]: User
}