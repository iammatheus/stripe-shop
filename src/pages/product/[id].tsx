import { BagContext, ProductItemBag } from "@/context/BagContext";
import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { ArrowLeft } from "lucide-react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Stripe from "stripe";

interface Props {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  priceInCents: number;
  description: string | null;
  defaultPriceId: string;
}

interface ProductProps {
  product: Props;
}

export default function Product({ product }: ProductProps) {
  const { addProductBag } = useContext(BagContext);

  function handleAddProductBag(
    {
      id,
      name,
      imageUrl,
      price,
      priceInCents,
      defaultPriceId,
      quantity,
    }: ProductItemBag,
    e: React.MouseEvent
  ) {
    addProductBag(
      { id, name, imageUrl, price, priceInCents, defaultPriceId, quantity },
      e
    );
  }

  if (!product) {
    return <p>Produto não encontrado!</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product?.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <Link href={"/"}>
            <ArrowLeft />
            Voltar
          </Link>
          <h1>{product.name}</h1>

          <span>{product.price}</span>
          <p>{product.description}</p>
          <button
            onClick={(e) =>
              handleAddProductBag(
                {
                  id: product.id,
                  name: product.name,
                  imageUrl: product.imageUrl,
                  price: product.price,
                  priceInCents: product.priceInCents,
                  defaultPriceId: product.defaultPriceId,
                  quantity: 1,
                },
                e
              )
            }
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "prod_SOCi5jYaUT1AQW" },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  ProductProps,
  { id: string }
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount ? price.unit_amount / 100 : 0),
        priceInCents: price.unit_amount ? price.unit_amount : 0,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, //1 hour
  };
};
