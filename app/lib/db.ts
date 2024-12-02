import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD || '', // Use an empty string if no password is set
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async function executeQuery<T>({
  query,
  values,
}: {
  query: string;
  values: any[];
}): Promise<T> {
  try {
    console.log('Attempting database connection...');
    console.log('Query:', query);
    console.log('Values:', values);

    const [results] = await db.query(query, values);
    console.log('Query results:', results);

    return results as T;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error(error as string);
  }
}
