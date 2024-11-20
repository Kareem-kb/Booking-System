import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs/promises';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { locale } = req.query;
  if (typeof locale !== 'string') {
    res.status(400).json({ error: 'Invalid locale' });
    return;
  }

  const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const messages = JSON.parse(data);
    res.status(200).json(messages);
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    res.status(500).json({ error: 'Failed to load messages' });
  }
}