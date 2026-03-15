import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const components = await prisma.component.findMany({
      orderBy: [{ componentType: 'asc' }, { price: 'asc' }],
    });

    const grouped = components.reduce((acc, item) => {
      const type = item.componentType || 'Unknown';
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
      return acc;
    }, {});

    return res.status(200).json(grouped);
  } catch (error) {
    console.error('Error fetching components from DB:', error);
    return res.status(500).json({ error: 'DB read error' });
  } finally {
    await prisma.$disconnect();
  }
}
