import { createContext, ReactNode, useEffect, useState } from "react";

export interface ProductItemBag {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  priceInCents: number;
  defaultPriceId: string;
}

interface BagContextType {
  isOpenBag: boolean;
  productsInBag: ProductItemBag[];
  totalPrice: string;
  openBag: () => void;
  closeBag: () => void;
  addProductBag: (
    { id, name, imageUrl, price, priceInCents }: ProductItemBag,
    e: React.MouseEvent
  ) => void;
  removeProductBag: (id: string) => void;
}

interface BagProviderProps {
  children: ReactNode;
}

export const BagContext = createContext({} as BagContextType);

export default function BagProvider({ children }: BagProviderProps) {
  const [isOpenBag, setCloseBag] = useState(false);
  const [productsInBag, setProductsInBag] = useState<ProductItemBag[]>([]);
  const [totalPrice, setTotalPrice] = useState("");

  function openBag() {
    setCloseBag(true);
  }

  function closeBag() {
    setCloseBag(false);
  }

  function addProductBag(
    { id, name, imageUrl, price, priceInCents, defaultPriceId }: ProductItemBag,
    e: React.MouseEvent
  ) {
    e.preventDefault();
    e.stopPropagation();

    setProductsInBag((state) => {
      const exists = state.some((product) => product.id === id);
      if (exists) {
        return state;
      }
      return [
        ...state,
        { id, name, imageUrl, price, priceInCents, defaultPriceId },
      ];
    });
  }

  function removeProductBag(id: string) {
    const newListProductsInBag = productsInBag.filter(
      (product) => product.id !== id
    );
    setProductsInBag(newListProductsInBag);
  }

  useEffect(() => {
    let totalPriceInCents = 0;

    productsInBag.forEach((product) => {
      totalPriceInCents += product.priceInCents;
    });

    const totalPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalPriceInCents / 100);

    setTotalPrice(totalPrice);
  }, [productsInBag]);

  return (
    <BagContext.Provider
      value={{
        isOpenBag,
        productsInBag,
        totalPrice,
        openBag,
        closeBag,
        addProductBag,
        removeProductBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}
