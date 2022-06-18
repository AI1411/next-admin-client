export type Coupon = {
  id: string;
  title: string;
  remarks: string;
  discount_amount: number;
  discount_rate: number;
  max_discount_amount: number;
  use_start_at: string;
  use_end_at: string;
  public_start_at: string;
  public_end_at: string;
  is_public: string | number;
  is_premium: string | number;
}
