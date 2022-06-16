import type {NextApiRequest, NextApiResponse} from 'next'
import {BASE_URL} from "../../../../lib/utils/const";
import useSWR from "swr";
import {Project} from "../../../types/projects";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.project_id;
  const response = await fetch(`${BASE_URL}/projects/${id}`).then(res => res.json());
  res.status(200).json(response);
}
