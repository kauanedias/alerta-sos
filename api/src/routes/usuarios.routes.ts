import { Router } from 'express';

import { cadastrarUsuario } from '../controllers/usuarios.controller';

const usuariosRoutes = Router();

usuariosRoutes.post('/usuarios', cadastrarUsuario);

export default usuariosRoutes;