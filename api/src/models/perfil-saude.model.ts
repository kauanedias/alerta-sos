import { ResultSetHeader } from 'mysql2';

import { connection } from '../database/connection';

type PerfilSaude = {
    usuarioId: number;
    tipoSanguineo?: string;
    alergias?: string;
    condicoesSaude?: string;
    medicamentos?: string;
    outrasInformacoes?: string;
    mobilidade?: string;
    comunicacao?: string;
};

export async function salvarPerfilSaude(dados: PerfilSaude) {
    await connection.execute<ResultSetHeader>(
        `
        INSERT INTO perfil_saude (
            usuario_id,
            tipo_sanguineo,
            alergias,
            condicoes_saude,
            medicamentos,
            outras_informacoes,
            mobilidade,
            comunicacao
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            dados.usuarioId,
            dados.tipoSanguineo ?? null,
            dados.alergias ?? null,
            dados.condicoesSaude ?? null,
            dados.medicamentos ?? null,
            dados.outrasInformacoes ?? null,
            dados.mobilidade ?? null,
            dados.comunicacao ?? null,
        ]
    );
}