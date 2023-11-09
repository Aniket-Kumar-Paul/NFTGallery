import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../Context/NFTs";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="ce91664312e00fca655074a96e1ea6fc"
    >
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
  );
}
