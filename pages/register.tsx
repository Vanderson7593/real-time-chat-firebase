import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "../styles/global.styles";
import RegisterView from "../views/register";

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Register | Real time chat app</title>
      </Head>

      <main>
        <RegisterView />
      </main>
    </Container>
  );
};

export default Home;
