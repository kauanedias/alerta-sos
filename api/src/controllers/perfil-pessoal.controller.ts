import { Request, Response } from 'express';

import { salvarPerfilPessoal } from '../models/perfil-pessoal.model';

export async function cadastrarPerfilPessoal(
  request: Request,
  response: Response,
) {
  try {
    const {
      usuarioId,
      nome,
      nomePreferido,
      foto,
      dataNascimento,
      sexo,
      altura,
      peso,
    } = request.body;

    if (!usuarioId || !nome || !dataNascimento) {
      return response.status(400).json({
        mensagem:
          'Usuário, nome e data de nascimento são obrigatórios.',
      });
    }

    const perfilId = await salvarPerfilPessoal({
      usuarioId: Number(usuarioId),
      nome: String(nome).trim(),
      nomePreferido: nomePreferido
        ? String(nomePreferido).trim()
        : undefined,
      foto,
      dataNascimento,
      sexo,
      altura:
        altura !== undefined
          ? Number(altura)
          : undefined,
      peso:
        peso !== undefined
          ? Number(peso)
          : undefined,
    });

    return response.status(201).json({
      mensagem: 'Perfil pessoal salvo com sucesso.',
      perfil: {
        id: perfilId,
        usuarioId: Number(usuarioId),
      },
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      mensagem: 'Não foi possível salvar o perfil pessoal.',
    });
  }
}