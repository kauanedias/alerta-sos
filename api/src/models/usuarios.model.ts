import { ResultSetHeader, RowDataPacket } from 'mysql2';

import { connection } from '../database/connection';

export type CriarUsuarioDados = {
  email: string;
  senha: string;
};

type UsuarioEmail = RowDataPacket & {
  id: number;
  email: string;
};

export async function buscarUsuarioPorEmail(
  email: string,
) {
  const [usuarios] = await connection.query<UsuarioEmail[]>(
    'SELECT id, email FROM usuarios WHERE email = ? LIMIT 1',
    [email],
  );

  return usuarios[0] ?? null;
}

export async function criarUsuario(
  dados: CriarUsuarioDados,
) {
  const [resultado] =
    await connection.execute<ResultSetHeader>(
      `
      INSERT INTO usuarios (
        email,
        senha
      )
      VALUES (?, ?)
      `,
      [
        dados.email,
        dados.senha,
      ],
    );

  return resultado.insertId;
}