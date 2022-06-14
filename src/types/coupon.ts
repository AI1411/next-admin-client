export type Coupon = {
  id: string;
  title: string;
  remarks: string;
  discount_amount: number;
  discount_rate: number;
  max_discount_amount: number;
  use_start_at: Date;
  use_end_at: Date;
  public_start_at: Date;
  public_end_at: Date;
  is_public: string | number;
  is_premium: string | number;
}
