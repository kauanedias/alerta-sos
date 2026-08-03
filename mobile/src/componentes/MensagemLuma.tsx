import { StyleSheet, Text, View } from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../tema';

type MensagemLumaProps = {
  texto: string;
  titulo?: string;
};

export function MensagemLuma({
  texto,
  titulo = 'Luma',
}: MensagemLumaProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.letraAvatar}>L</Text>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.titulo}>{titulo}</Text>

        <Text style={styles.texto}>{texto}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',

    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,

    backgroundColor: Cores.fundoAzuladoClaro,

    ...Sombras.leve,
  },

  avatar: {
    width: 44,
    height: 44,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor: Cores.primaria,
  },

  letraAvatar: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  conteudo: {
    flex: 1,
    marginLeft: Espacamentos.paddingPequeno,
  },

  titulo: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  texto: {
    marginTop: 5,

    fontSize: Tipografia.textoPequeno,
    lineHeight: 21,

    color: Cores.textoSecundario,
  },
});