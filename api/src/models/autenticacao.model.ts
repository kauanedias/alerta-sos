import { RowDataPacket } from 'mysql2';

import { connection } from '../database/connection';

type Usuario = RowDataPacket & {
    id: number;
    nome: string;
    email: string;
    foto: string | null;
    senha: string;
};

export async function buscarUsuarioPorEmail(email: string) {
    const [usuarios] = await connection.query<Usuario[]>(
        `
        SELECT id, nome, email, foto, senha
        FROM usuarios
        WHERE email = ?
        LIMIT 1
        `,
        [email]
    );

    return usuarios[0] ?? null;
}