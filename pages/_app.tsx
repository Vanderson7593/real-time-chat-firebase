import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache, Global } from "@emotion/react";
import theme from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { globalStyles } from "../styles/global.styles";
import { Provider } from "react-redux";
import store from "../redux/store";
import Toast from "../components/toast";
import { ToastContainer } from "react-toastify";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Provider store={store}>
          <CssBaseline />
          <Toast />
          <Component {...pageProps} />
          <ToastContainer />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
