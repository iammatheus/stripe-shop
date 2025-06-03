import { SelectQuantityContainer } from "@/styles/components/select-quantity";

interface SelectQuantityProps {
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectQuantity({
  onSelectChange,
}: SelectQuantityProps) {
  const limit = 5;

  return (
    <div className="bg-[#202024] rounded-sm w-[44px] h-[28px] flex items-center justify-center border-1">
      <SelectQuantityContainer onChange={onSelectChange}>
        {Array.from({ length: limit }).map((_, i) => {
          const quantity = String(i + 1);
          return (
            <option key={quantity} value={quantity}>
              {i + 1}
            </option>
          );
        })}
      </SelectQuantityContainer>
    </div>
  );
}
