import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon('postgresql://expensetracker_owner:dODyBMN6ks1u@ep-sweet-rain-a5mz6l2t.us-east-2.aws.neon.tech/expensetracker?sslmode=require');

export  const deta= drizzle(sql, { schema });


