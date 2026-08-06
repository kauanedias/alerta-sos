import { Router } from 'express';

import { entrar } from '../controllers/autenticacao.controller';

const router = Router();

router.post('/login', entrar);

export default router;