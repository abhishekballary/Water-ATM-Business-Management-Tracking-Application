export type Customer = {
  _id: string;
  customerId: string;
  customerName: string;
  mobileNumber: string;
  cardNumber: string;
  cardCost: number;
  status: 'active' | 'inactive';
};

export type Recharge = {
  _id: string;
  rechargeId: string;
  customerId: string;
  cardNumber: string;
  rechargeAmount: number;
  paymentMode: 'cash' | 'qr' | 'upi';
  date: string;
};
