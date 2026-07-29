import { StyleSheet, Text, View } from 'react-native';

import { Cores, Tipografia } from '../src/tema';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Cores.fundo,
  },

  titulo: {
    color: Cores.texto,
    fontSize: Tipografia.titulo,
    fontWeight: Tipografia.pesoBold,
  },
});