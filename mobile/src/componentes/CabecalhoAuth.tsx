import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useEffect, useRef } from 'react';

import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../tema';

type CabecalhoAuthProps = {
  titulo: string;
  descricao: string;
  icone?: ReactNode;
};

export function CabecalhoAuth({
  titulo,
  descricao,
  icone,
}: CabecalhoAuthProps) {
  const entrada = useRef(new Animated.Value(0)).current;
  const pulso = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(entrada, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    const animacaoPulso = Animated.loop(
      Animated.sequence([
        Animated.timing(pulso, {
          toValue: 1.05,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),

        Animated.timing(pulso, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    animacaoPulso.start();

    return () => {
      animacaoPulso.stop();
    };
  }, [entrada, pulso]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: entrada,
          transform: [
            {
              translateY: entrada.interpolate({
                inputRange: [0, 1],
                outputRange: [-30, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.areaMarca}>
        <Animated.View
          style={[
            styles.logoSombra,
            {
              transform: [{ scale: pulso }],
            },
          ]}
        >
          <LinearGradient
            colors={[Cores.fundo, Cores.fundoAzuladoClaro]}
            style={styles.logo}
          >
            {icone ?? (
              <Ionicons
                name="pulse"
                size={39}
                color={Cores.primaria}
              />
            )}
          </LinearGradient>
        </Animated.View>

        <View style={styles.areaNome}>
          <Text style={styles.nomeAplicativo}>
            Alerta<Text style={styles.nomeSos}>SOS</Text>
          </Text>

          <View style={styles.status}>
            <View style={styles.pontoStatus} />

            <Text style={styles.textoStatus}>
              Sua segurança conectada
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.linhaPulso}>
        <View style={styles.tracoPulsoEsquerdo} />

        <View style={styles.pulsoContainer}>
          <View style={styles.pulsoDescida} />
          <View style={styles.pulsoSubida} />
          <View style={styles.pulsoDescidaFinal} />
        </View>

        <View style={styles.tracoPulsoDireito} />
      </View>

      <Text style={styles.titulo}>{titulo}</Text>

      <Text style={styles.descricao}>{descricao}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 27,
  },

  areaMarca: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoSombra: {
    borderRadius: Bordas.logo,
    ...Sombras.media,
  },

  logo: {
    width: 74,
    height: 74,
    borderRadius: Bordas.logo,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Cores.bordaCard,
  },

  areaNome: {
    marginLeft: Espacamentos.medio,
  },

  nomeAplicativo: {
    fontSize: Tipografia.cabecalho,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
    letterSpacing: -0.7,
  },

  nomeSos: {
    color: Cores.primaria,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  pontoStatus: {
    width: 7,
    height: 7,
    marginRight: 6,
    borderRadius: Bordas.circular,
    backgroundColor: Cores.sucesso,
  },

  textoStatus: {
    fontSize: 11.5,
    fontWeight: Tipografia.pesoSemiBold,
    color: Cores.textoSuave,
  },

  linhaPulso: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 155,
    height: 34,
    marginTop: 21,
  },

  tracoPulsoEsquerdo: {
    width: 52,
    height: 2,
    backgroundColor: Cores.linhaPulso,
  },

  pulsoContainer: {
    position: 'relative',
    width: 52,
    height: 34,
  },

  pulsoDescida: {
    position: 'absolute',
    left: 0,
    top: 15,
    width: 18,
    height: 2,
    backgroundColor: Cores.linhaPulsoMedia,
    transform: [{ rotate: '42deg' }],
  },

  pulsoSubida: {
    position: 'absolute',
    left: 13,
    top: 10,
    width: 28,
    height: 2,
    backgroundColor: Cores.linhaPulsoDestaque,
    transform: [{ rotate: '-62deg' }],
  },

  pulsoDescidaFinal: {
    position: 'absolute',
    right: 0,
    top: 15,
    width: 20,
    height: 2,
    backgroundColor: Cores.linhaPulsoMedia,
    transform: [{ rotate: '42deg' }],
  },

  tracoPulsoDireito: {
    flex: 1,
    height: 2,
    backgroundColor: Cores.linhaPulso,
  },

  titulo: {
    marginTop: 13,
    fontSize: Tipografia.titulo,
    lineHeight: 40,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.texto,
    letterSpacing: -1.2,
  },

  descricao: {
    maxWidth: 390,
    marginTop: 9,
    fontSize: Tipografia.textoMedio,
    lineHeight: 23,
    color: Cores.textoSecundario,
  },
});