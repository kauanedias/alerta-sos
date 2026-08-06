import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

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
            nome,
            nome_preferido,
            email,
            senha,
            foto,
            data_nascimento,
            sexo,
            altura,
            peso,
        } = request.body;

        if (!nome || !email || !senha || !data_nascimento) {
            return response.status(400).json({
                mensagem:
                    'Nome, e-mail, senha e data de nascimento são obrigatórios.',
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
            nome: String(nome).trim(),
            nomePreferido: nome_preferido
                ? String(nome_preferido).trim()
                : undefined,
            email: emailNormalizado,
            senha: senhaCriptografada,
            foto,
            dataNascimento: data_nascimento,
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
            mensagem: 'Usuário cadastrado com sucesso.',
            usuario: {
                id: usuarioId,
                nome: String(nome).trim(),
                nome_preferido:
                    nome_preferido ?? null,
                email: emailNormalizado,
            },
        });
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            mensagem:
                'Não foi possível cadastrar o usuário.',
        });
    }
}