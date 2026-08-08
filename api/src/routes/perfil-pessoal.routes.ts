import { Router } from 'express';

import { cadastrarPerfilPessoal } from '../controllers/perfil-pessoal.controller';

const router = Router();

router.post(
  '/perfil-pessoal',
  cadastrarPerfilPessoal,
);

export default router;