import type {NextApiRequest, NextApiResponse} from 'next'
import {BASE_URL} from "../../../../lib/utils/const";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(`${BASE_URL}/users?limit=${req.query.limit}`, {
    headers: {
      Authorization: `Bearer ${req.cookies.jwt}`
    }
  }).then(res => res.json());
  if (response.message === 'unauthorized!') {
    res.status(401).json(response.message);
  }
  res.status(200).json(response.users);
}
