import { IconButton, TextField } from "@mui/material";
import { FC, useRef } from "react";
import { Send as SendIcon } from "@mui/icons-material";
import { Container } from "./chat-input.styles";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { currentChannelSelector } from "../../../../redux/channels/channels.selectors";
import { IChannel } from "../../../../types/channel";
import { startSendMessage } from "../../../../redux/channels/channels.thunks";

const ChatInput: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentChannel = useAppSelector(currentChannelSelector);

  const dispatch = useAppDispatch();
  const handleSendMessage = () => {
    dispatch(
      startSendMessage(
        inputRef?.current?.value as string,
        { name: currentChannel } as IChannel,
        true
      )
    );
  };

  return (
    <Container>
      <TextField
        inputRef={inputRef}
        id="chat-text-input"
        label="Message"
        multiline
        placeholder="Write something"
        variant="filled"
        size="small"
        fullWidth
      />
      <IconButton onClick={handleSendMessage} color="primary">
        <SendIcon />
      </IconButton>
    </Container>
  );
};

export default ChatInput;
