import { Router } from 'express';

import {
  confirmarCodigo,
  enviarCodigo,
} from '../controllers/verificacao-email.controller';

const router = Router();

router.post(
  '/verificacao-email/enviar',
  enviarCodigo,
);

router.post(
  '/verificacao-email/confirmar',
  confirmarCodigo,
);

export default router;