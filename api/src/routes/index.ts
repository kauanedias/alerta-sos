import { Router } from 'express';

import statusRoutes from './status.routes';
import usuariosRoutes from './usuarios.routes';
import autenticacaoRoutes from './autenticacao.routes';
import perfilSaudeRoutes from './perfil-saude.routes';
import verificacaoEmailRoutes from './verificacao-email.routes';
import perfilPessoalRoutes from './perfil-pessoal.routes';

const router = Router();

router.use(statusRoutes);
router.use(usuariosRoutes);
router.use(autenticacaoRoutes);
router.use(perfilSaudeRoutes);
router.use(verificacaoEmailRoutes);
router.use(perfilPessoalRoutes);

export default router;