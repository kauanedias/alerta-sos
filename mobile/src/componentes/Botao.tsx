import { Pressable, StyleSheet, Text } from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../tema';

type BotaoProps = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'sos';
  desabilitado?: boolean;
};

export function Botao({
  titulo,
  onPress,
  variante = 'primario',
  desabilitado = false,
}: BotaoProps) {
  const botaoSos = variante === 'sos';

  return (
    <Pressable
      onPress={onPress}
      disabled={desabilitado}
      style={({ pressed }) => [
        styles.botao,
        botaoSos ? styles.botaoSos : styles.botaoPrimario,
        pressed && styles.pressionado,
        desabilitado && styles.desabilitado,
      ]}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: '100%',
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Espacamentos.paddingMedio,
    borderRadius: Bordas.media,
    ...Sombras.leve,
  },

  botaoPrimario: {
    backgroundColor: Cores.botaoPrimario,
  },

  botaoSos: {
    backgroundColor: Cores.sos,
  },

  pressionado: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  desabilitado: {
    opacity: 0.5,
  },

  texto: {
    color: Cores.fundo,
    fontSize: Tipografia.texto,
    fontWeight: Tipografia.pesoSemiBold,
  },
});