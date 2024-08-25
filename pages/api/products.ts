import type { NextApiRequest, NextApiResponse } from 'next';
import getProducts, { IProductParams } from '@/actions/getProduct';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, searchTerm, page = 1, limit = 12 } = req.query as unknown as IProductParams;

  try {
    const productsData = await getProducts({ category, searchTerm, page: Number(page), limit: Number(limit) });
    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
}
