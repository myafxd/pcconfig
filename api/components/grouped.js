import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const categoryTypeMap = {
  gpu: 'GPU',
  cpu: 'CPU',
  mobo: 'Motherboard',
  ram: 'RAM',
  psu: 'PSU',
  storage: 'Storage',
  fan: 'CoolerFan',
  thermo: 'ThermalPaste',
  case: 'Case'
};

const normalizeGrouped = source => {
  const grouped = {}

  Object.entries(source).forEach(([key, items]) => {
    const normalizedKey = categoryTypeMap[key.toLowerCase()] || key
    if (!grouped[normalizedKey]) grouped[normalizedKey] = []
    if (Array.isArray(items)) grouped[normalizedKey].push(...items)
  })

  return grouped
}

const readStaticData = () => {
  const filePath = path.join(process.cwd(), 'src', 'scripts', 'products.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const parsed = JSON.parse(raw)
  return normalizeGrouped(parsed)
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const components = await prisma.component.findMany({
      orderBy: [{ componentType: 'asc' }, { price: 'asc' }]
    })

    if (components.length) {
      const grouped = components.reduce((acc, item) => {
        const type = item.componentType || 'Unknown'
        if (!acc[type]) acc[type] = []
        acc[type].push(item)
        return acc
      }, {})

      await prisma.$disconnect()
      return res.status(200).json(grouped)
    }
  } catch (error) {
    console.error('Error fetching components from DB, falling back to static JSON:', error)
  } finally {
    await prisma.$disconnect()
  }

  try {
    const grouped = readStaticData()
    return res.status(200).json(grouped)
  } catch (error) {
    console.error('Error reading fallback static components:', error)
    return res.status(500).json({ error: 'Fallback data read error' })
  }
}
