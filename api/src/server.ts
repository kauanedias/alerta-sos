import 'dotenv/config';

import { app } from './app';

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
  console.log(
    `Servidor do AlertaSOS funcionando na porta ${PORTA}`,
  );
});