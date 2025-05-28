import { globalStyles } from "@/styles/global";
import { AppProps } from "next/app";

import logoImg from "../assets/logo.svg";
import Image from "next/image";
import { Container, Header } from "@/styles/pages/app";
import Bag from "@/components/cart/bag";
import BagOpenButton from "@/components/cart/bag-open-button";

globalStyles();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
        <BagOpenButton />
      </Header>

      <Component {...pageProps} />
      <Bag />
    </Container>
  );
}
