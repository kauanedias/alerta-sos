import { Router } from 'express';

import statusRoutes from './status.routes';
import usuariosRoutes from './usuarios.routes';
import autenticacaoRoutes from './autenticacao.routes';

const router = Router();

router.use(statusRoutes);
router.use(usuariosRoutes);
router.use(autenticacaoRoutes);

export default router;