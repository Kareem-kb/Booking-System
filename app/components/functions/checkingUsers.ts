import { AppDataSource } from '@/app/lib/db';

export async function userExists(email: string): Promise<boolean> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const rows = await AppDataSource.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return rows.length > 0;
}
