// pages/api/user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const getUser = (req: NextApiRequest, res: NextApiResponse) => {
  // Logique pour récupérer les informations utilisateur
  res.status(200).json({ username: 'john_doe', email: 'john@example.com' });
};

const updateUser = (req: NextApiRequest, res: NextApiResponse) => {
  // Logique pour mettre à jour les informations utilisateur
  res.status(200).json({ message: 'User updated successfully' });
};

export default async function GET(req : NextApiRequest, res: NextApiResponse) {
  
  
  getUser(req, res);
  }

