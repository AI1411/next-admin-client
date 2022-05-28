import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch('http://localhost:8080/users').then(res => res.json());
  res.status(200).json(response.users);
}
