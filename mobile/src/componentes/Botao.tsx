import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../tema';

type VarianteBotao = 'primario' | 'sos' | 'secundario';

type BotaoProps = {
  titulo: string;
  onPress: () => void;
  variante?: VarianteBotao;
  carregando?: boolean;
  textoCarregando?: string;
  desabilitado?: boolean;
  iconeDireita?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const gradientes: Record<VarianteBotao, [string, string]> = {
  primario: [Cores.botaoPrimario, Cores.botaoPrimarioFinal],
  sos: [Cores.sos, Cores.sosFinal],
  secundario: [Cores.fundo, Cores.fundoAzulado],
};

export function Botao({
  titulo,
  onPress,
  variante = 'primario',
  carregando = false,
  textoCarregando = 'Carregando...',
  desabilitado = false,
  iconeDireita,
  style,
}: BotaoProps) {
  const bloqueado = carregando || desabilitado;
  const textoEscuro = variante === 'secundario';

  const cores: [string, string] = bloqueado
  ? [
      Cores.botaoPrimarioDesabilitado,
      Cores.botaoPrimarioDesabilitadoFinal,
    ]
  : gradientes[variante];

  return (
    <Pressable
      onPress={onPress}
      disabled={bloqueado}
      style={({ pressed }) => [
        styles.area,
        variante !== 'secundario' && styles.sombra,
        pressed && !bloqueado && styles.pressionado,
        bloqueado && styles.desabilitado,
        style,
      ]}
    >
      <LinearGradient
        colors={cores}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.botao,
          variante === 'secundario' && styles.botaoSecundario,
        ]}
      >
        {carregando ? (
          <View style={styles.conteudo}>
            <ActivityIndicator size="small" color={Cores.fundo} />
            <Text style={styles.texto}>{textoCarregando}</Text>
          </View>
        ) : (
          <>
            <Text
              style={[
                styles.texto,
                textoEscuro && styles.textoSecundario,
              ]}
            >
              {titulo}
            </Text>

            {iconeDireita ? (
              <View style={styles.areaIconeDireita}>
                {iconeDireita}
              </View>
            ) : null}
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  area: {
    width: '100%',
    borderRadius: Bordas.campo,
  },

  sombra: {
    ...Sombras.media,
  },

  botao: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Espacamentos.medio,
    borderRadius: Bordas.campo,
  },

  botaoSecundario: {
    borderWidth: 1,
    borderColor: Cores.bordaSuave,
  },

  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamentos.pequeno,
  },

  texto: {
    fontSize: Tipografia.texto,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  textoSecundario: {
    color: Cores.textoEscuro,
  },

  areaIconeDireita: {
    position: 'absolute',
    right: 14,
    width: 35,
    height: 35,
    borderRadius: Bordas.circular,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.19)',
  },

  pressionado: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },

  desabilitado: {
    opacity: 0.7,
  },
});
