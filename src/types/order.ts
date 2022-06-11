import {OrderDetail} from "./order_detail";

export type Order = {
  id: string;
  user_id: string;
  quantity: number;
  total_price: number;
  order_status: string;
  remarks: string;

  order_details: OrderDetail[];
}
