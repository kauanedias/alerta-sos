import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../tema';

type CheckboxProps = {
  marcado: boolean;
  texto: string;
  onPress: () => void;
};

export function Checkbox({
  marcado,
  texto,
  onPress,
}: CheckboxProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressionado,
      ]}
    >
      <View style={[styles.caixa, marcado && styles.caixaMarcada]}>
        {marcado ? (
          <Ionicons name="checkmark" size={15} color={Cores.fundo} />
        ) : null}
      </View>

      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  caixa: {
    width: 22,
    height: 22,
    borderRadius: Bordas.pequena,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Cores.bordaCampo,
    backgroundColor: Cores.fundo,
  },

  caixaMarcada: {
    borderColor: Cores.primaria,
    backgroundColor: Cores.primaria,
    ...Sombras.leve,
  },

  texto: {
    marginLeft: Espacamentos.pequeno,
    fontSize: 12.5,
    fontWeight: Tipografia.pesoSemiBold,
    color: Cores.textoSecundario,
  },

  pressionado: {
    opacity: 0.55,
  },
});
