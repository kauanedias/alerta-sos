import { Router } from 'express';

import { cadastrarPerfilSaude } from '../controllers/perfil-saude.controller';

const router = Router();

router.post('/perfil-saude', cadastrarPerfilSaude);

export default router;