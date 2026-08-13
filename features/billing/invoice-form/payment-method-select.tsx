import { Select } from "@/components/ui/select";
import { PaymentMethod } from "@/types/invoice";

type PaymentMethodSelectProps = {
  value?: PaymentMethod;

  onChange: (value: PaymentMethod) => void;
};

export function PaymentMethodSelect({
  value,
  onChange,
}: PaymentMethodSelectProps) {
  return (
    <div>
      <p className="mb-2 label-text">Payment Method</p>

      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as PaymentMethod)}
      >
        <option value="">Select Method</option>

        <option value="cash">Cash</option>

        <option value="upi">UPI</option>

        <option value="card">Card</option>

        <option value="bank_transfer">Bank Transfer</option>
      </Select>
    </div>
  );
}
