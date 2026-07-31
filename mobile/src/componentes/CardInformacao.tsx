import { ReactNode } from 'react';

import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../tema';

type CardInformacaoProps = {
  titulo: string;
  descricao: string;
  icone?: ReactNode;
  onPress?: () => void;
  selecionado?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function CardInformacao({
  titulo,
  descricao,
  icone,
  onPress,
  selecionado = false,
  style,
}: CardInformacaoProps) {
  const conteudo = (
    <>
      {icone ? (
        <View
          style={[
            styles.areaIcone,
            selecionado && styles.areaIconeSelecionada,
          ]}
        >
          {icone}
        </View>
      ) : null}

      <View style={styles.areaTexto}>
        <Text
          style={[
            styles.titulo,
            selecionado && styles.tituloSelecionado,
          ]}
        >
          {titulo}
        </Text>

        <Text
          style={[
            styles.descricao,
            selecionado && styles.descricaoSelecionada,
          ]}
        >
          {descricao}
        </Text>
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          selecionado && styles.cardSelecionado,
          pressed && styles.cardPressionado,
          style,
        ]}
      >
        {conteudo}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.card,
        selecionado && styles.cardSelecionado,
        style,
      ]}
    >
      {conteudo}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 145,
    minHeight: 126,

    alignItems: 'flex-start',
    justifyContent: 'space-between',

    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.primariaClara,

    backgroundColor: Cores.fundoAzuladoClaro,

    ...Sombras.leve,
  },

  cardSelecionado: {
    borderColor: Cores.primaria,
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  cardPressionado: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },

  areaIcone: {
    width: 42,
    height: 42,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,

    backgroundColor: Cores.fundoAzuladoClaro,
  },

  areaIconeSelecionada: {
    borderColor: Cores.primaria,
    backgroundColor: Cores.primaria,
  },

  areaTexto: {
    width: '100%',
    marginTop: Espacamentos.paddingPequeno,
  },

  titulo: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  tituloSelecionado: {
    color: Cores.primaria,
  },

  descricao: {
    marginTop: 4,

    fontSize: Tipografia.legenda,
    lineHeight: 17,
    color: Cores.textoSuave,
  },

  descricaoSelecionada: {
    color: Cores.textoSecundario,
  },
});