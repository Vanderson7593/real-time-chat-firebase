import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";
import { v4 } from "uuid";
import {
  channelRootSelector,
  messagesSelector,
} from "../../redux/channels/channels.selectors";
import { useAppSelector } from "../../redux/hooks";
import Message from "./components/message";

const Chat: FC = () => {
  const { isLoading, currentChannel } = useAppSelector(channelRootSelector);
  const messages = useAppSelector(messagesSelector(currentChannel as string));

  if (isLoading)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box height="calc(100% - 68px)" style={{ overflowY: "scroll" }}>
      {currentChannel ? (
        <Box display="flex" flexDirection="column" gap="8px">
          {messages.map((message: any) => (
            <Message key={v4()} {...message} />
          ))}
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          color="blue"
          gap="20px"
        >
          <Typography>HELLO!</Typography>
          <Typography>
            CREATE OR SELECT A CHANNEL TO START MESSAGIING
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default Chat;
