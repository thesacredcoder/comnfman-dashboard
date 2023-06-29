import "@/styles/globals.css";
import withAuthLayout from "@/components/withAuthLayout";
import { UserProvider } from "@/hooks/useUser";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const AuthLayoutComponent = withAuthLayout(Component);
  return (
    <>
      <Head>
        <title>Confman.AI</title>
      </Head>
      <UserProvider>
        <AuthLayoutComponent {...pageProps} />
      </UserProvider>
    </>
  );
}
