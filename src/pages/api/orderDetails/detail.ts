import type {NextApiRequest, NextApiResponse} from 'next'
import {BASE_URL} from "../../../../lib/utils/const";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.order_detail_id;
  const response = await fetch(`${BASE_URL}/orderDetails/${id}`, {
    headers: {
      Authorization: `Bearer ${req.cookies.jwt}`
    }
  }).then(res => res.json());
  res.status(200).json(response);
}
