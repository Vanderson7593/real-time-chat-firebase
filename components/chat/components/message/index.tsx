import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { MessageProps } from "./message.types";

const Message: FC<MessageProps> = ({ text, sender, createdAt }) => {
  return (
    <Box>
      <Box display="flex" gap="10px" alignItems="center">
        <Typography fontWeight="bold">{sender.displayName} </Typography>
        <Typography fontSize="12px">
          {new Date(createdAt.toDate()).toUTCString()}
        </Typography>
      </Box>
      <Typography fontSize="">{text}</Typography>
    </Box>
  );
};
export default Message;
