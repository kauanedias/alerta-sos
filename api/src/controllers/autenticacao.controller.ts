import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { buscarUsuarioPorEmail } from '../models/autenticacao.model';

export async function entrar(request: Request, response: Response) {

    const { email, senha } = request.body;

    const usuario = await buscarUsuarioPorEmail(email);

    if (!usuario) {
        return response.status(401).json({
            mensagem: 'E-mail ou senha inválidos.'
        });
    }

    const senhaCorreta = await bcrypt.compare(
        senha,
        usuario.senha
    );

    if (!senhaCorreta) {
        return response.status(401).json({
            mensagem: 'E-mail ou senha inválidos.'
        });
    }

    const token = jwt.sign(
        {
            id: usuario.id
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '7d'
        }
    );

    return response.json({
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            foto: usuario.foto
        }
    });

}