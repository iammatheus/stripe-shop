import { createContext, ReactNode, useState } from "react";

interface BagContextType {
  quantity: number;
  isOpenBag: boolean;
  openBag: () => void;
  closeBag: () => void;
}

interface BagProviderProps {
  children: ReactNode;
}

export const BagContext = createContext({} as BagContextType);

export default function BagProvider({ children }: BagProviderProps) {
  const [isOpenBag, setCloseBag] = useState(false);
  const quantity = 3;

  function openBag() {
    setCloseBag(true);
  }

  function closeBag() {
    setCloseBag(false);
  }

  return (
    <BagContext.Provider value={{ quantity, isOpenBag, openBag, closeBag }}>
      {children}
    </BagContext.Provider>
  );
}
