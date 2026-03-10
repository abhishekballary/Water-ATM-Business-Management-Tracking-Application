export type Customer = {
  _id: string;
  customerId: string;
  customerName: string;
  mobileNumber: string;
  cardNumber: string;
  cardCost: number;
  paymentMode: 'cash' | 'qr';
  createdAt: string;
  status: 'active' | 'inactive';
};

export type Recharge = {
  _id: string;
  rechargeId: string;
  customerId: string | { _id: string; customerName: string; cardNumber: string };
  cardNumber: string;
  rechargeAmount: number;
  paymentMode: 'cash' | 'qr' | 'card';
  date: string;
  machineId: string;
};

export type DailyReport = {
  _id: string;
  reportDate: string;
  totalWaterValue: number;
  totalRechargeAmount: number;
  totalCoinAmount: number;
  totalQrAmount: number;
  totalCardUsers: number;
  total20LJarUsage: number;
  newCardCount: number;
};
