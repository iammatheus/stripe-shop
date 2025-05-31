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
import SelectQuantity from "./select-quantity";

export default function Bag() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const {
    closeBag,
    isOpenBag,
    productsInBag,
    totalPrice,
    removeProductBag,
    changeQuantityProduct,
  } = useContext(BagContext);

  function handleCloseBag() {
    closeBag();
  }

  async function handleRemoveProductBag(id: string) {
    removeProductBag(id);
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products: productsInBag,
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  function onSelectChange(quantity: number, productId: string) {
    changeQuantityProduct(productId, quantity);
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
                        <div className="flex items-center flex-wrap gap-5">
                          <strong>{product.price}</strong>
                          <SelectQuantity
                            onSelectChange={(
                              event: React.ChangeEvent<HTMLSelectElement>
                            ) =>
                              onSelectChange(
                                Number(event.target.value),
                                product.id
                              )
                            }
                          />
                        </div>
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
              <span>Item(s) na sacola</span>
              <span>{productsInBag.length} itens</span>
            </header>
            <header>
              <span>Qtd. total de camisetas</span>
              <span>
                {/* TODO: Fazer a lógica para obter o total de camisetas. */}
              </span>
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
