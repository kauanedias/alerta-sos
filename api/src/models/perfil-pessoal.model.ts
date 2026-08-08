import { ResultSetHeader } from 'mysql2';

import { connection } from '../database/connection';

export type PerfilPessoalDados = {
  usuarioId: number;
  nome: string;
  nomePreferido?: string;
  foto?: string;
  dataNascimento: string;
  sexo?: string;
  altura?: number;
  peso?: number;
};

export async function salvarPerfilPessoal(
  dados: PerfilPessoalDados,
) {
  const [resultado] =
    await connection.execute<ResultSetHeader>(
      `
      INSERT INTO perfil_pessoal (
        usuario_id,
        nome,
        nome_preferido,
        foto,
        data_nascimento,
        sexo,
        altura,
        peso
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        dados.usuarioId,
        dados.nome,
        dados.nomePreferido ?? null,
        dados.foto ?? null,
        dados.dataNascimento,
        dados.sexo ?? null,
        dados.altura ?? null,
        dados.peso ?? null,
      ],
    );

  return resultado.insertId;
}