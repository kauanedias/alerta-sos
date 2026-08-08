import { RowDataPacket } from 'mysql2';

import { connection } from '../database/connection';

type UsuarioVerificacao = RowDataPacket & {
  id: number;
  email: string;
  email_verificado: boolean;
  codigo_verificacao: string | null;
  codigo_expira_em: Date | null;
};

export async function buscarUsuarioPorEmail(email: string) {
  const [usuarios] = await connection.query<UsuarioVerificacao[]>(
    `
    SELECT
      id,
      email,
      email_verificado,
      codigo_verificacao,
      codigo_expira_em
    FROM usuarios
    WHERE email = ?
    LIMIT 1
    `,
    [email.trim().toLowerCase()],
  );

  return usuarios[0] ?? null;
}

export async function salvarCodigoVerificacao(
  usuarioId: number,
  codigoHash: string,
  expiraEm: Date,
) {
  await connection.execute(
    `
    UPDATE usuarios
    SET
      codigo_verificacao = ?,
      codigo_expira_em = ?
    WHERE id = ?
    `,
    [
      codigoHash,
      expiraEm,
      usuarioId,
    ],
  );
}

export async function confirmarEmailVerificado(
  usuarioId: number,
) {
  await connection.execute(
    `
    UPDATE usuarios
    SET
      email_verificado = TRUE,
      codigo_verificacao = NULL,
      codigo_expira_em = NULL
    WHERE id = ?
    `,
    [usuarioId],
  );
}