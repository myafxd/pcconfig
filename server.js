import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// API роут для получения всех компонентов
app.get('/api/components', async (req, res) => {
  try {
    const componentType = req.query.type;

    let components;
    if (componentType) {
      components = await prisma.component.findMany({
        where: { componentType },
        orderBy: { price: 'asc' },
      });
    } else {
      components = await prisma.component.findMany({
        orderBy: [{ componentType: 'asc' }, { price: 'asc' }],
      });
    }

    res.json(components);
  } catch (error) {
    console.error('Ошибка при получении компонентов:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API роут для получения компонентов по типу (сгруппированные)
app.get('/api/components/grouped', async (req, res) => {
  try {
    const components = await prisma.component.findMany({
      orderBy: [{ componentType: 'asc' }, { price: 'asc' }],
    });

    // Группируем по типу компонента
    const grouped = components.reduce((acc, component) => {
      const type = component.componentType;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(component);
      return acc;
    }, {});

    res.json(grouped);
  } catch (error) {
    console.error('Ошибка при получении сгруппированных компонентов:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Единственный компонент по ID
app.get('/api/components/:id', async (req, res) => {
  try {
    const component = await prisma.component.findUnique({
      where: { id: req.params.id },
    });

    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }

    res.json(component);
  } catch (error) {
    console.error('Ошибка при получении компонента:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API сервер запущен на http://localhost:${PORT}`);
});
