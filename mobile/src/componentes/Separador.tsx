import { StyleSheet, Text, View } from 'react-native';

import {
  Cores,
  Espacamentos,
  Tipografia,
} from '../tema';

type SeparadorProps = {
  texto?: string;
};

export function Separador({
  texto = 'OU CONTINUE COM',
}: SeparadorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.linha} />
      <Text style={styles.texto}>{texto}</Text>
      <View style={styles.linha} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Espacamentos.grande,
  },

  linha: {
    flex: 1,
    height: 1,
    backgroundColor: Cores.divisoria,
  },

  texto: {
    marginHorizontal: 11,
    fontSize: Tipografia.micro,
    fontWeight: Tipografia.pesoBlack,
    letterSpacing: 0.5,
    color: Cores.textoClaro,
  },
});
