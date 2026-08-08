import { Request, Response } from 'express';

import { salvarPerfilSaude } from '../models/perfil-saude.model';

export async function cadastrarPerfilSaude(
    request: Request,
    response: Response,
) {
    try {
        await salvarPerfilSaude(request.body);

        return response.status(201).json({
            mensagem: 'Perfil de saúde salvo com sucesso.'
        });

    } catch (error) {

        return response.status(500).json({
            mensagem: 'Erro ao salvar perfil de saúde.'
        });

    }
}