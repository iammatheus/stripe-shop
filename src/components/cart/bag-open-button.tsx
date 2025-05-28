import { ShoppingBag } from "lucide-react";
import {
  BagOpenButtonContainer,
  ItemsQuantity,
} from "@/styles/components/bag-open-button";
import { useContext } from "react";
import { BagContext } from "@/context/BagContext";

export default function BagOpenButton() {
  const { quantity, openBag } = useContext(BagContext);

  function handleOpenBag() {
    openBag();
  }

  return (
    <BagOpenButtonContainer
      type="button"
      onClick={handleOpenBag}
      isItemsInBag={!!quantity}
    >
      {quantity > 0 && <ItemsQuantity>{quantity}</ItemsQuantity>}
      <ShoppingBag />
    </BagOpenButtonContainer>
  );
}
