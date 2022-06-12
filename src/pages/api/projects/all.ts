import type {NextApiRequest, NextApiResponse} from 'next'
import {BASE_URL} from "../../../../lib/utils/const";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(`${BASE_URL}/projects`).then(res => res.json());
  res.status(200).json(response.projects);
}
