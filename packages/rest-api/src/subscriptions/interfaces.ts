export interface ISubscriptionPlansResponse {
  id: string;
  name: string;
  description: string;
}

export interface ISubscriptionResponse {
  id: string;
  startDate: Date;
  endDate: Date;
  items: ISubscriptionItemResponse[];
}

export interface ISubscriptionItemResponse {
  id: string;
  productId: string;
  quantity: number;
}
