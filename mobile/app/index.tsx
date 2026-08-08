import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  obterEmailVerificacao,
  obterEtapaCadastro,
} from '../src/services/sessao';

export default function Index() {
  const [carregando, setCarregando] = useState(true);
  const [destino, setDestino] = useState('/splash');

  useEffect(() => {
    async function verificarFluxo() {
      const etapa = await obterEtapaCadastro();
      const email = await obterEmailVerificacao();

      if (etapa === 'verificar-email' && email) {
        setDestino('/verificar-email');
      } else if (etapa === 'configuracao-inicial') {
        setDestino('/configuracao-inicial/boas-vindas');
      } else {
        setDestino('/splash');
      }

      setCarregando(false);
    }

    verificarFluxo();
  }, []);

  if (carregando) {
    return null;
  }

  return <Redirect href={destino as never} />;
}