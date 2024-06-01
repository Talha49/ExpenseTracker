/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://expensetracker_owner:dODyBMN6ks1u@ep-sweet-rain-a5mz6l2t.us-east-2.aws.neon.tech/expensetracker?sslmode=require'
  }
};
