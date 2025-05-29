import { ShoppingBag } from "lucide-react";
import {
  BagOpenButtonContainer,
  ItemsQuantity,
} from "@/styles/components/bag-open-button";
import { useContext } from "react";
import { BagContext } from "@/context/BagContext";

export default function BagOpenButton() {
  const { productsInBag, openBag } = useContext(BagContext);

  function handleOpenBag() {
    openBag();
  }

  return (
    <BagOpenButtonContainer
      type="button"
      onClick={handleOpenBag}
      isItemsInBag={!!productsInBag.length}
    >
      {productsInBag.length > 0 && (
        <ItemsQuantity>{productsInBag.length}</ItemsQuantity>
      )}
      <ShoppingBag />
    </BagOpenButtonContainer>
  );
}
