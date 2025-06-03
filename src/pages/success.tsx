import Link from "next/link";
import {
  ImageContainer,
  SuccessContainer,
  TShirtQuantity,
} from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SuccessProps {
  customerName: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    imageUrl: string;
    quantity: number;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <div>
          {products.map((item) => (
            <div key={item.id}>
              <ImageContainer>
                <Image src={item.imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
              <TShirtQuantity>{item.quantity} item(s)</TShirtQuantity>
            </div>
          ))}
        </div>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, suas camisetas já estão a
          caminho da sua casa! :)
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;

  const products = session.line_items?.data.map((item) => {
    const product = item?.price?.product as Stripe.Product;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      quantity: item.quantity,
    };
  });

  return {
    props: {
      customerName,
      products,
    },
  };
};
