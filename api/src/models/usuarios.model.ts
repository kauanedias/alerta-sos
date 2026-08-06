import { ResultSetHeader, RowDataPacket } from 'mysql2';

import { connection } from '../database/connection';

export type CriarUsuarioDados = {
    nome: string;
    nomePreferido?: string;
    email: string;
    senha: string;
    foto?: string;
    dataNascimento: string;
    sexo?: string;
    altura?: number;
    peso?: number;
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
                    nome,
                    nome_preferido,
                    email,
                    senha,
                    foto,
                    data_nascimento,
                    sexo,
                    altura,
                    peso
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                dados.nome,
                dados.nomePreferido ?? null,
                dados.email,
                dados.senha,
                dados.foto ?? null,
                dados.dataNascimento,
                dados.sexo ?? null,
                dados.altura ?? null,
                dados.peso ?? null,
            ],
        );

    return resultado.insertId;
}