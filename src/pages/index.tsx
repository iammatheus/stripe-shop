import { AddProductBag, HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { ShoppingBag } from "lucide-react";
import { BagContext, ProductItemBag } from "@/context/BagContext";
import { useContext } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceInCents: number;
    defaultPriceId: string;
    quantity: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 1.3,
          spacing: 36,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 1.1,
          spacing: 20,
        },
      },
    },
  });

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

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AddProductBag
                        type="button"
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
                        <ShoppingBag />
                      </AddProductBag>
                    </TooltipTrigger>
                    <TooltipContent className="w-34 h-8 flex items-center justify-center">
                      Adicionar à sacola
                    </TooltipContent>
                  </Tooltip>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
      priceInCents: price.unit_amount,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },

    revalidate: (60 * 60) / 2, // 2 hour
  };
};
