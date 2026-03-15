import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

interface ComponentItem {
  id: string;
  name: string;
  link: string;
  price: number;
  image: string;
  shortName: string;
  type?: string;
  power?: number;
  wattage?: number;
  socket?: string;
  ramType?: string;
}

interface DataFile {
  [key: string]: ComponentItem[];
}

async function main() {
  try {
    console.log('🌱 Начинаю загрузку данных в БД...');

    // Очищаем все компоненты перед загрузкой
    const deleted = await prisma.component.deleteMany({});
    console.log(`🗑️  Удалено ${deleted.count} старых компонентов`);

    // Читаем данные из prisma/data.json
    const dataPath = path.join(__dirname, 'data.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data: DataFile = JSON.parse(rawData);

    // Маппинг ключей JSON на типы компонентов
    const categoryTypeMap: Record<string, string> = {
      gpu: 'GPU',
      cpu: 'CPU',
      mobo: 'Motherboard',
      ram: 'RAM',
      psu: 'PSU',
      storage: 'Storage',
      fan: 'CoolerFan',
      thermo: 'ThermalPaste',
      case: 'Case',
    };

    const allComponents: any[] = [];

    // Проходим по каждой категории в JSON
    for (const [categoryKey, items] of Object.entries(data)) {
      const componentType = categoryTypeMap[categoryKey];

      if (!componentType) {
        console.warn(`Неизвестная категория: ${categoryKey}`);
        continue;
      }

      console.log(`Обрабатываю ${componentType}... (${items.length} элементов)`);

      items.forEach((item) => {
        allComponents.push({
          externalId: String(item.id),
          name: item.name,
          shortName: item.shortName,
          link: item.link,
          price: Number(item.price),
          image: item.image,
          type: item.type || null,
          componentType: componentType,
          power: item.power ? Number(item.power) : null,
          wattage: item.wattage ? Number(item.wattage) : null,
          socket: item.socket || null,
          ramType: item.ramType || null,
        });
      });
    }

    console.log(`\nВсего компонентов для загрузки: ${allComponents.length}`);

    if (allComponents.length > 0) {
      // Для SQLite удаляем skipDuplicates, так как он не поддерживается драйвером
      const result = await prisma.component.createMany({
        data: allComponents,
      });

      console.log(`Успешно загружено ${result.count} компонентов в БД`);
    } else {
      console.log('Нет данных для загрузки');
    }

    console.log('Seed завершен успешно');
  } catch (error) {
    console.error('Ошибка при выполнении seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();