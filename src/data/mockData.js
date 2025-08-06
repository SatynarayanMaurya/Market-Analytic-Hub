// lib/mockData.ts
import { faker } from "@faker-js/faker";

export const generateCampaignData = (count = 20) => {
  return Array.from({ length: count }, () => ({
    name: faker.company.name(),
    budget: faker.finance.amount(5000, 15000, 0, "$"),
    revenue: faker.finance.amount(2000, 20000, 0, "$"),
    status: faker.helpers.arrayElement(["Active", "Completed", "Paused"]),
    date: faker.date.recent({ days: 90 }).toISOString().split("T")[0],
  }));
};

export const mockMetrics = {
  revenue: faker.finance.amount(20000, 50000, 0, "$"),
  users: faker.number.int({ min: 1000, max: 5000 }),
  conversions: faker.number.int({ min: 500, max: 1000 }),
  growth: faker.number.float({ min: 5, max: 15, precision: 0.1 }),
};

export const trafficSources = {
  Direct: 56,
  Referral: 30,
  Organic: 15,
};
