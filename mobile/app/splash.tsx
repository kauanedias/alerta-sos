import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Cores, Tipografia } from '../src/tema';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function Splash() {
  const pulso = useRef(new Animated.Value(1)).current;
  const brilho = useRef(new Animated.Value(0.25)).current;
  const opacidadeConteudo = useRef(new Animated.Value(0)).current;
  const deslocamentoConteudo = useRef(
    new Animated.Value(14),
  ).current;

  const progressoEcg = useRef(new Animated.Value(0)).current;
  const opacidadeTela = useRef(new Animated.Value(1)).current;

  const movimentoBolhaUm = useRef(
    new Animated.Value(0),
  ).current;
  const movimentoBolhaDois = useRef(
    new Animated.Value(0),
  ).current;
  const movimentoBolhaTres = useRef(
    new Animated.Value(0),
  ).current;
  const movimentoBolhaQuatro = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    const animacaoPulso = Animated.loop(
      Animated.sequence([
        Animated.timing(pulso, {
          toValue: 1.06,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulso, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const animacaoBrilho = Animated.loop(
      Animated.sequence([
        Animated.timing(brilho, {
          toValue: 0.55,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(brilho, {
          toValue: 0.25,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const animacaoEcg = Animated.loop(
      Animated.sequence([
        Animated.timing(progressoEcg, {
          toValue: 1,
          duration: 2200,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(progressoEcg, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ]),
    );

    const animacaoBolhaUm = criarAnimacaoBolha(
      movimentoBolhaUm,
      5800,
    );

    const animacaoBolhaDois = criarAnimacaoBolha(
      movimentoBolhaDois,
      7200,
    );

    const animacaoBolhaTres = criarAnimacaoBolha(
      movimentoBolhaTres,
      6400,
    );

    const animacaoBolhaQuatro = criarAnimacaoBolha(
      movimentoBolhaQuatro,
      8000,
    );

    Animated.parallel([
      Animated.timing(opacidadeConteudo, {
        toValue: 1,
        duration: 1300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(deslocamentoConteudo, {
        toValue: 0,
        duration: 1300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    animacaoPulso.start();
    animacaoBrilho.start();
    animacaoEcg.start();
    animacaoBolhaUm.start();
    animacaoBolhaDois.start();
    animacaoBolhaTres.start();
    animacaoBolhaQuatro.start();

    const tempoSaida = setTimeout(() => {
      Animated.timing(opacidadeTela, {
        toValue: 0,
        duration: 700,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        router.replace('/onboarding');
      });
    }, 4300);

    return () => {
      clearTimeout(tempoSaida);

      animacaoPulso.stop();
      animacaoBrilho.stop();
      animacaoEcg.stop();
      animacaoBolhaUm.stop();
      animacaoBolhaDois.stop();
      animacaoBolhaTres.stop();
      animacaoBolhaQuatro.stop();
    };
  }, [
    brilho,
    deslocamentoConteudo,
    movimentoBolhaDois,
    movimentoBolhaQuatro,
    movimentoBolhaTres,
    movimentoBolhaUm,
    opacidadeConteudo,
    opacidadeTela,
    progressoEcg,
    pulso,
  ]);

  const tamanhoTraco = progressoEcg.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 520],
  });

  const deslocamentoUm = movimentoBolhaUm.interpolate({
    inputRange: [0, 1],
    outputRange: [80, -150],
  });

  const deslocamentoDois = movimentoBolhaDois.interpolate({
    inputRange: [0, 1],
    outputRange: [120, -190],
  });

  const deslocamentoTres =
    movimentoBolhaTres.interpolate({
      inputRange: [0, 1],
      outputRange: [60, -130],
    });

  const deslocamentoQuatro =
    movimentoBolhaQuatro.interpolate({
      inputRange: [0, 1],
      outputRange: [100, -170],
    });

  return (
    <Animated.View
      style={[
        styles.tela,
        {
          opacity: opacidadeTela,
        },
      ]}
    >
      <LinearGradient
        colors={['#78C6F4', '#4FA3E3', '#2E7FCB']}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.bolha,
            styles.bolhaUm,
            {
              transform: [
                {
                  translateY: deslocamentoUm,
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.bolha,
            styles.bolhaDois,
            {
              transform: [
                {
                  translateY: deslocamentoDois,
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.bolha,
            styles.bolhaTres,
            {
              transform: [
                {
                  translateY: deslocamentoTres,
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.bolha,
            styles.bolhaQuatro,
            {
              transform: [
                {
                  translateY: deslocamentoQuatro,
                },
              ],
            },
          ]}
        />

        <View style={styles.formaSuperior} />
        <View style={styles.formaInferior} />

        <Animated.View
          style={[
            styles.conteudo,
            {
              opacity: opacidadeConteudo,
              transform: [
                {
                  translateY: deslocamentoConteudo,
                },
              ],
            },
          ]}
        >
          <View style={styles.areaLogo}>
            <Animated.View
              style={[
                styles.brilho,
                {
                  opacity: brilho,
                  transform: [{ scale: pulso }],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.circuloExterno,
                {
                  transform: [{ scale: pulso }],
                },
              ]}
            >
              <View style={styles.circuloInterno}>
                <Escudo />
              </View>
            </Animated.View>
          </View>

          <View style={styles.areaEcg}>
            <Svg
              width="320"
              height="80"
              viewBox="0 0 520 100"
            >
              <Path
                d="M0 53
                   H70
                   L92 53
                   L108 35
                   L126 72
                   L148 12
                   L172 82
                   L195 53
                   H260
                   L282 53
                   L298 35
                   L316 72
                   L338 12
                   L362 82
                   L385 53
                   H520"
                fill="none"
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <AnimatedPath
                d="M0 53
                   H70
                   L92 53
                   L108 35
                   L126 72
                   L148 12
                   L172 82
                   L195 53
                   H260
                   L282 53
                   L298 35
                   L316 72
                   L338 12
                   L362 82
                   L385 53
                   H520"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="520"
                strokeDashoffset={Animated.subtract(
                  520,
                  tamanhoTraco,
                )}
              />
            </Svg>
          </View>

          <Text style={styles.nome}>AlertaSOS</Text>

          <Text style={styles.slogan}>
            proteção ao alcance de um toque
          </Text>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

function criarAnimacaoBolha(
  valor: Animated.Value,
  duracao: number,
) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(valor, {
        toValue: 1,
        duration: duracao,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(valor, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]),
  );
}

function Escudo() {
  return (
    <Svg
      width="78"
      height="88"
      viewBox="0 0 78 88"
    >
      <Path
        d="M39 4
           C48 10 58 13 69 15
           V39
           C69 59 57 75 39 84
           C21 75 9 59 9 39
           V15
           C20 13 30 10 39 4Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },

  container: {
    flex: 1,
    overflow: 'hidden',
  },

  conteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  areaLogo: {
    width: 190,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brilho: {
    position: 'absolute',
    width: 182,
    height: 182,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },

  circuloExterno: {
    width: 154,
    height: 154,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.42)',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
  },

  circuloInterno: {
    width: 116,
    height: 116,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },

  areaEcg: {
    width: 320,
    height: 82,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  nome: {
    marginTop: 4,
    color: Cores.fundo,
    fontSize: 38,
    fontWeight: Tipografia.pesoBold,
    letterSpacing: 0.3,
    textAlign: 'center',
  },

  slogan: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.86)',
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoRegular,
    letterSpacing: 0.4,
    textAlign: 'center',
  },

  bolha: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },

  bolhaUm: {
    width: 22,
    height: 22,
    top: '28%',
    left: '14%',
  },

  bolhaDois: {
    width: 44,
    height: 44,
    top: '72%',
    right: '12%',
  },

  bolhaTres: {
    width: 13,
    height: 13,
    top: '55%',
    right: '22%',
  },

  bolhaQuatro: {
    width: 30,
    height: 30,
    top: '84%',
    left: '22%',
  },

  formaSuperior: {
    position: 'absolute',
    width: 310,
    height: 310,
    top: -175,
    right: -115,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },

  formaInferior: {
    position: 'absolute',
    width: 360,
    height: 360,
    bottom: -230,
    left: -180,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
});