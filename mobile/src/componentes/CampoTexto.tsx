import { TextInput, StyleSheet, TextInputProps } from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Tipografia,
} from '../tema';

type CampoTextoProps = TextInputProps;

export function CampoTexto(props: CampoTextoProps) {
  return (
    <TextInput
      placeholderTextColor={Cores.textoClaro}
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 52,

    backgroundColor: Cores.fundo,
    color: Cores.texto,

    borderWidth: 1,
    borderColor: Cores.bordaCard,
    borderRadius: Bordas.media,

    paddingHorizontal: Espacamentos.paddingMedio,

    fontSize: Tipografia.texto,
  },
});