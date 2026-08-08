import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import {
  buscarUsuarioPorEmail,
  criarUsuario,
} from '../models/usuarios.model';

export async function cadastrarUsuario(
  request: Request,
  response: Response,
) {
  try {
    const {
      email,
      senha,
    } = request.body;

    if (!email || !senha) {
      return response.status(400).json({
        mensagem: 'E-mail e senha são obrigatórios.',
      });
    }

    const emailNormalizado = String(email)
      .trim()
      .toLowerCase();

    const usuarioExistente =
      await buscarUsuarioPorEmail(emailNormalizado);

    if (usuarioExistente) {
      return response.status(409).json({
        mensagem: 'Este e-mail já está cadastrado.',
      });
    }

    const senhaCriptografada = await bcrypt.hash(
      String(senha),
      12,
    );

    const usuarioId = await criarUsuario({
      email: emailNormalizado,
      senha: senhaCriptografada,
    });

    const token = jwt.sign(
      {
        id: usuarioId,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '7d',
      },
    );

    return response.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso.',
      token,
      usuario: {
        id: usuarioId,
        email: emailNormalizado,
        email_verificado: false,
      },
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      mensagem: 'Não foi possível cadastrar o usuário.',
    });
  }
}