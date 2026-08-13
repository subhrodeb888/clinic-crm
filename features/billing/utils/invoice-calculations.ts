type CalculatableInvoiceItem = {
  quantity: number;
  price: number;
};

export function calculateSubtotal(items: CalculatableInvoiceItem[]) {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

export function calculateDiscountAmount(subtotal: number, discount: number) {
  return discount;
}

export function calculateTaxAmount(
  subtotal: number,
  discount: number,
  taxRate: number,
) {
  const taxableAmount = subtotal - discount;

  return taxableAmount * (taxRate / 100);
}

export function calculateGrandTotal(
  subtotal: number,
  discount: number,
  taxRate: number,
) {
  const taxableAmount = subtotal - discount;

  const tax = calculateTaxAmount(subtotal, discount, taxRate);

  return taxableAmount + tax;
}
