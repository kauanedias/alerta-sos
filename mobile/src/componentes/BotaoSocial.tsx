import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import {
  Bordas,
  Cores,
  Tipografia,
} from '../tema';

type BotaoSocialProps = {
  titulo: string;
  icone: ReactNode;
  onPress: () => void;
};

export function BotaoSocial({
  titulo,
  icone,
  onPress,
}: BotaoSocialProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.botao,
        pressed && styles.pressionado,
      ]}
    >
      {icone}
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    flex: 1,
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaSuave,
    backgroundColor: Cores.fundo,
  },

  texto: {
    marginLeft: 9,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.textoEscuro,
  },

  pressionado: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },
});
