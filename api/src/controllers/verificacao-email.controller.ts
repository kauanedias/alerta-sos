import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { enviarCodigoVerificacao } from '../servicos/email';
import {
  buscarUsuarioPorEmail,
  salvarCodigoVerificacao,
  confirmarEmailVerificado,
} from '../models/verificacao-email.model';

export async function enviarCodigo(
  request: Request,
  response: Response,
) {
  try {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({
        mensagem: 'E-mail é obrigatório.',
      });
    }

    const usuario = await buscarUsuarioPorEmail(email);

    if (!usuario) {
      return response.status(404).json({
        mensagem: 'Usuário não encontrado.',
      });
    }

    const codigo = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const codigoHash = await bcrypt.hash(codigo, 10);

    const expiraEm = new Date(
      Date.now() + 10 * 60 * 1000,
    );

    await salvarCodigoVerificacao(
      usuario.id,
      codigoHash,
      expiraEm,
    );

    await enviarCodigoVerificacao(email, codigo);

    return response.status(200).json({
      mensagem: 'Código enviado com sucesso.',
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      mensagem: 'Não foi possível enviar o código.',
    });
  }
}

export async function confirmarCodigo(
  request: Request,
  response: Response,
) {
  try {
    const { email, codigo } = request.body;

    if (!email || !codigo) {
      return response.status(400).json({
        mensagem: 'E-mail e código são obrigatórios.',
      });
    }

    const usuario = await buscarUsuarioPorEmail(email);

    if (
      !usuario ||
      !usuario.codigo_verificacao ||
      !usuario.codigo_expira_em
    ) {
      return response.status(400).json({
        mensagem: 'Código inválido ou não solicitado.',
      });
    }

    const agora = new Date();
    const expiraEm = new Date(usuario.codigo_expira_em);

    if (agora > expiraEm) {
      return response.status(400).json({
        mensagem: 'Código expirado.',
      });
    }

    const codigoValido = await bcrypt.compare(
      codigo,
      usuario.codigo_verificacao,
    );

    if (!codigoValido) {
      return response.status(400).json({
        mensagem: 'Código inválido.',
      });
    }

    await confirmarEmailVerificado(usuario.id);

    return response.status(200).json({
      mensagem: 'E-mail verificado com sucesso.',
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      mensagem: 'Não foi possível verificar o e-mail.',
    });
  }
}