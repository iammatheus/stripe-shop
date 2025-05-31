import { Bell } from "lucide-react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

export interface ProductItemBag {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  priceInCents: number;
  defaultPriceId: string;
  quantity: number;
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
  changeQuantityProduct: (id: string, quantity: number) => void;
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

  function changeQuantityProduct(id: string, quantity: number) {
    setProductsInBag((state) =>
      state.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  }

  function addProductBag(
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
    e.preventDefault();
    e.stopPropagation();

    const exists = productsInBag.some((product) => product.id === id);

    if (exists) {
      toast(`${name} já está na sacola.`, {
        action: {
          label: "OK",
          onClick: () => {},
        },
        icon: <Bell />,
        duration: 3000,
      });
      return;
    }

    setProductsInBag((state) => {
      return [
        ...state,
        { id, name, imageUrl, price, priceInCents, defaultPriceId, quantity },
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
      totalPriceInCents += product.priceInCents * product.quantity;
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
        changeQuantityProduct,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}
