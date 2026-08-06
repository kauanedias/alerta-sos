import { connection } from '../database/connection';

export async function checkDatabase() {
    const [rows] = await connection.query('SELECT NOW() AS dataHora');

    return rows;
}