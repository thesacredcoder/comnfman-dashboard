import "@/styles/globals.css";
import withAuthLayout from "@/components/withAuthLayout";
import { UserProvider } from "@/hooks/useUser";

export default function App({ Component, pageProps }) {
  const AuthLayoutComponent = withAuthLayout(Component);
  return (
    <>
      <UserProvider>
        <AuthLayoutComponent {...pageProps} />
      </UserProvider>
    </>
  );
}
