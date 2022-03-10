import type { NextPage } from "next";
import Head from "next/head";
import Chat from "../components/chat";
import Drawer from "../components/drawer";
import { Container } from "../styles/global.styles";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { authSelector } from "../redux/auth/auth.selectors";
import { CircularProgress } from "@mui/material";
import ChatInput from "../components/chat/components/chat-input";
import { currentChannelSelector } from "../redux/channels/channels.selectors";

const Home: NextPage = () => {
  const currentChannel = useAppSelector(currentChannelSelector);
  const { isLoading } = useAppSelector(authSelector);

  return (
    <Container>
      <Head>
        <title>Real time chat app</title>
      </Head>

      <main>
        {isLoading ? (
          <Container>
            <CircularProgress />
          </Container>
        ) : (
          <Drawer>
            <Chat />
            {currentChannel && <ChatInput />}
          </Drawer>
        )}
      </main>
    </Container>
  );
};

export default Home;
