import { Depot, LocalStorageAdapter } from '../deposit.util';

type TestData = {
  active: boolean;
  age: number;
  id: number;
  name: string;
};
// Generate a large dataset for testing
const generateTestData = (size: number): TestData[] => {
  const data = [];
  for (let i = 0; i < size; i++) {
    data.push({
      active: i % 2 === 0,
      age: Math.floor(Math.random() * 100),
      id: i,
      name: `Name${i}`,
    });
  }
  return data;
};

// Benchmark function
const benchmark = (label: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${label}: ${(end - start).toFixed(2)}ms`);
};

// Test the LocalStorageQuery class
const testPerformance = async () => {
  const testData = generateTestData(100000); // Adjust size as needed
  const store = new Depot(
    new LocalStorageAdapter('benchmark', 1, {
      test: {
        key: 'id',
        record: {} as TestData,
      },
    }),
  );
  await store.bulkPut('test', testData);

  benchmark('Filter by age > 50', async () => {
    await store
      .query('test')
      .filter((item) => item.age > 50)
      .toArray();
  });

  benchmark('Sort by age ascending', async () => {
    await store.query('test').orderBy('age', 'asc').toArray();
  });

  benchmark('Sort by age descending', async () => {
    await store.query('test').orderBy('age', 'desc').toArray();
  });

  benchmark('Filter by active status', async () => {
    await store
      .query('test')
      .filter((item) => item.active)
      .toArray();
  });

  benchmark('Chained operations (filter + sort)', async () => {
    await store
      .query('test')
      .filter((item) => item.age > 50)
      .orderBy('age', 'asc')
      .toArray();
  });

  benchmark('Count items', async () => {
    await store
      .query('test')
      .filter((item) => item.age > 50)
      .count();
  });

  benchmark('Get first item', async () => {
    await store
      .query('test')
      .filter((item) => item.age > 50)
      .first();
  });

  benchmark('Get last item', async () => {
    await store
      .query('test')
      .filter((item) => item.age > 50)
      .last();
  });
};

// Run the performance tests
await testPerformance();
