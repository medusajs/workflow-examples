export type SubscriptionHook = {
  id: string;
  order_id: string;
  email: string;
  shipping_address: string;
  data: PaymentData;
};

export type PaymentData = {
  payment_transaction_id: string;
};

export type Order = {
  id: string;
  order_number: string;
  items: Item[];
  date: Date | number;
  status: string;
};

export type Item = {
  id: number;
  name: string;
  quantity: number;
};

export type Allocation = Omit<Order, "id"> & {
  allocation_id: string;
};
