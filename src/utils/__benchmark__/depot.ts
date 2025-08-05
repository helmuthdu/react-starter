import { LocalStorageQuery } from '../depot.util';

// Generate a large dataset for testing
const generateTestData = (size: number) => {
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
const testPerformance = () => {
  const testData = generateTestData(100000); // Adjust size as needed
  const query = new LocalStorageQuery(testData);

  benchmark('Filter by age > 50', () => {
    query
      .reset()
      .filter((item) => item.age > 50)
      .toArray();
  });

  benchmark('Sort by age ascending', () => {
    query.reset().orderBy('age', 'asc').toArray();
  });

  benchmark('Sort by age descending', () => {
    query.reset().orderBy('age', 'desc').toArray();
  });

  benchmark('Filter by active status', () => {
    query
      .reset()
      .filter((item) => item.active)
      .toArray();
  });

  benchmark('Chained operations (filter + sort)', () => {
    query
      .reset()
      .filter((item) => item.age > 50)
      .orderBy('age', 'asc')
      .toArray();
  });

  benchmark('Count items', () => {
    query
      .reset()
      .filter((item) => item.age > 50)
      .count();
  });

  benchmark('Get first item', () => {
    query
      .reset()
      .filter((item) => item.age > 50)
      .first();
  });

  benchmark('Get last item', () => {
    query
      .reset()
      .filter((item) => item.age > 50)
      .last();
  });
};

// Run the performance tests
testPerformance();
