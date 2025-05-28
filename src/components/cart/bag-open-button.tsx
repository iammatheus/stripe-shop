import { ShoppingBag } from "lucide-react";
import { BagOpenButtonContainer } from "@/styles/components/bag-open-button";

export default function BagOpenButton() {
  return (
    <BagOpenButtonContainer type="button">
      <ShoppingBag />
    </BagOpenButtonContainer>
  );
}
