import {
  BagContainer,
  BagRemoveButton,
  CartContainer,
  CloseCartButton,
  OrderTotal,
  ProductImage,
  ProductInfo,
  ProductItem,
  SubmitButton,
} from "@/styles/components/bag";

import Image from "next/image";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import { BagContext } from "@/context/BagContext";
import axios from "axios";

export default function Bag() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const { closeBag, isOpenBag, productsInBag, totalPrice, removeProductBag } =
    useContext(BagContext);

  function handleCloseBag() {
    closeBag();
  }

  async function handleRemoveProductBag(id: string) {
    removeProductBag(id);
  }

  async function handleBuyProduct() {
    const priceIdList = productsInBag.map((product) => product.defaultPriceId);

    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        priceId: priceIdList,
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  return (
    <>
      <CartContainer open={isOpenBag}>
        <CloseCartButton type="button" onClick={handleCloseBag}>
          <X />
        </CloseCartButton>

        <BagContainer>
          <h3>Sacola de compras</h3>

          {productsInBag.length > 0 ? (
            <>
              {productsInBag.map((product) => {
                return (
                  <ProductItem key={product.id}>
                    <ProductImage>
                      <Image
                        src={product.imageUrl}
                        width={95}
                        height={95}
                        alt=""
                      />
                    </ProductImage>
                    <ProductInfo>
                      <div>
                        <p>{product.name}</p>
                        <strong>{product.price}</strong>
                      </div>
                      <BagRemoveButton
                        type="button"
                        onClick={() => handleRemoveProductBag(product.id)}
                      >
                        Remover
                      </BagRemoveButton>
                    </ProductInfo>
                  </ProductItem>
                );
              })}
            </>
          ) : (
            <p>Nenhum item na sacola.</p>
          )}
        </BagContainer>

        {productsInBag.length > 0 && (
          <OrderTotal>
            <header>
              <span>Quantidade</span>
              <span>{productsInBag.length} itens</span>
            </header>

            <div>
              <span>Valor total</span>
              <strong>{totalPrice}</strong>
            </div>
            <SubmitButton
              type="submit"
              onClick={handleBuyProduct}
              disabled={isCreatingCheckoutSession}
            >
              Finalizar compra
            </SubmitButton>
          </OrderTotal>
        )}
      </CartContainer>
    </>
  );
}
