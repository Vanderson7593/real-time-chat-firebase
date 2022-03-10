import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "../styles/global.styles";
import LoginView from "../views/login";

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Login | Real time chat app</title>
      </Head>

      <main>
        <LoginView />
      </main>
    </Container>
  );
};

export default Home;
