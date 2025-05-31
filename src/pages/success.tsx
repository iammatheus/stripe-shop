import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SuccessProps {
  customerName: string;
  quantity: number;
  products: {
    name: string;
    imageUrl: string;
    quantity: number;
  }[];
}

export default function Success({
  customerName,
  products,
  quantity,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <div>
          {products.map((item) => (
            <>
              <ImageContainer key={item.name}>
                <Image src={item.imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
            </>
          ))}
        </div>

        <h1>Compra efetuada!</h1>

        {/* TODO: Fazer layout para apresentar as camisetas compradas e a quantidade de cada uma delas. */}
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {quantity}
          &nbsp;camisetas já está a caminho da sua casa.
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
      name: product.name,
      imageUrl: product.images[0],
      quantity: item.quantity,
    };
  });

  const quantity = products?.length;

  return {
    props: {
      customerName,
      products,
      quantity,
    },
  };
};
