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

import camiseta1 from "../../assets/camisetas/1.png";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

export default function Bag() {
  const [isOpenBag, setCloseBag] = useState(false);

  function closeBag() {
    setCloseBag(!isOpenBag);
  }

  return (
    <>
      <CartContainer open={isOpenBag}>
        <CloseCartButton type="button" onClick={closeBag}>
          <X />
        </CloseCartButton>

        <BagContainer>
          <h3>Sacola de compras</h3>

          {Array.from({ length: 3 }).map((_, i) => {
            return (
              <ProductItem key={i}>
                <ProductImage>
                  <Image src={camiseta1} width={95} height={95} alt="" />
                </ProductImage>
                <ProductInfo>
                  <div>
                    <p>Camiseta Beyond the Limits</p>
                    <strong>R$ 79.90</strong>
                  </div>
                  <BagRemoveButton type="button">Remover</BagRemoveButton>
                </ProductInfo>
              </ProductItem>
            );
          })}
        </BagContainer>

        <OrderTotal>
          <header>
            <span>Quantidade</span>
            <span>3 itens</span>
          </header>

          <div>
            <span>Valor total</span>
            <strong>RS 270,00</strong>
          </div>
          <SubmitButton type="submit">Finalizar compra</SubmitButton>
        </OrderTotal>
      </CartContainer>
    </>
  );
}
