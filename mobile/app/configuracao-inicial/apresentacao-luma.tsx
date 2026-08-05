import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  router,
  useLocalSearchParams,
} from 'expo-router';
import { useEffect, useRef } from 'react';

import {
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Tipografia,
} from '../../src/tema';

type RecursoLumaProps = {
  titulo: string;
  icone:
    | 'person-outline'
    | 'medical-outline'
    | 'people-outline';
  animacao: Animated.Value;
};

export default function ApresentacaoLumaScreen() {
  const parametros = useLocalSearchParams<{
    nome?: string;
  }>();

  const nomePreferido =
    typeof parametros.nome === 'string' &&
    parametros.nome.trim()
      ? parametros.nome.trim()
      : 'você';

  const entradaOrbita = useRef(
    new Animated.Value(0),
  ).current;

  const entradaLetra = useRef(
    new Animated.Value(0),
  ).current;

  const entradaStatus = useRef(
    new Animated.Value(0),
  ).current;

  const entradaSaudacao = useRef(
    new Animated.Value(0),
  ).current;

  const entradaTitulo = useRef(
    new Animated.Value(0),
  ).current;

  const entradaMensagem = useRef(
    new Animated.Value(0),
  ).current;

  const entradaPerfil = useRef(
    new Animated.Value(0),
  ).current;

  const entradaSaude = useRef(
    new Animated.Value(0),
  ).current;

  const entradaRede = useRef(
    new Animated.Value(0),
  ).current;

  const entradaFinal = useRef(
    new Animated.Value(0),
  ).current;

  const movimentoOrbita = useRef(
    new Animated.Value(0),
  ).current;

  const brilhoLuma = useRef(
    new Animated.Value(0.2),
  ).current;

  const movimentoBolhaUm = useRef(
    new Animated.Value(0),
  ).current;

  const movimentoBolhaDois = useRef(
    new Animated.Value(0),
  ).current;

  const movimentoBolhaTres = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    const animacaoOrbita = Animated.loop(
      Animated.timing(movimentoOrbita, {
        toValue: 1,
        duration: 13000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    const animacaoBrilho = Animated.loop(
      Animated.sequence([
        Animated.timing(brilhoLuma, {
          toValue: 0.42,
          duration: 1700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(brilhoLuma, {
          toValue: 0.2,
          duration: 1700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const animacaoBolhaUm = criarAnimacaoBolha(
      movimentoBolhaUm,
      6600,
    );

    const animacaoBolhaDois = criarAnimacaoBolha(
      movimentoBolhaDois,
      8200,
    );

    const animacaoBolhaTres = criarAnimacaoBolha(
      movimentoBolhaTres,
      7300,
    );

    animacaoOrbita.start();
    animacaoBrilho.start();
    animacaoBolhaUm.start();
    animacaoBolhaDois.start();
    animacaoBolhaTres.start();

    Animated.sequence([
      Animated.spring(entradaOrbita, {
        toValue: 1,
        friction: 7,
        tension: 54,
        useNativeDriver: true,
      }),

      Animated.delay(140),

      Animated.spring(entradaLetra, {
        toValue: 1,
        friction: 5,
        tension: 72,
        useNativeDriver: true,
      }),

      Animated.delay(160),

      criarAnimacaoEntrada(
        entradaStatus,
        350,
      ),

      criarAnimacaoEntrada(
        entradaSaudacao,
        400,
      ),

      criarAnimacaoEntrada(
        entradaTitulo,
        430,
      ),

      criarAnimacaoEntrada(
        entradaMensagem,
        470,
      ),

      Animated.stagger(140, [
        criarAnimacaoEntrada(
          entradaPerfil,
          360,
        ),

        criarAnimacaoEntrada(
          entradaSaude,
          360,
        ),

        criarAnimacaoEntrada(
          entradaRede,
          360,
        ),
      ]),

      criarAnimacaoEntrada(
        entradaFinal,
        480,
      ),
    ]).start();

    return () => {
      animacaoOrbita.stop();
      animacaoBrilho.stop();
      animacaoBolhaUm.stop();
      animacaoBolhaDois.stop();
      animacaoBolhaTres.stop();
    };
  }, [
    brilhoLuma,
    entradaFinal,
    entradaLetra,
    entradaMensagem,
    entradaOrbita,
    entradaPerfil,
    entradaRede,
    entradaSaudacao,
    entradaSaude,
    entradaStatus,
    entradaTitulo,
    movimentoBolhaDois,
    movimentoBolhaTres,
    movimentoBolhaUm,
    movimentoOrbita,
  ]);

  const rotacaoOrbita =
    movimentoOrbita.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

  const deslocamentoBolhaUm =
    movimentoBolhaUm.interpolate({
      inputRange: [0, 1],
      outputRange: [70, -150],
    });

  const deslocamentoBolhaDois =
    movimentoBolhaDois.interpolate({
      inputRange: [0, 1],
      outputRange: [100, -180],
    });

  const deslocamentoBolhaTres =
    movimentoBolhaTres.interpolate({
      inputRange: [0, 1],
      outputRange: [55, -125],
    });

  function continuar() {
    router.push({
      pathname:
        '/configuracao-inicial/perfil-saude',

      params: {
        nome: nomePreferido,
      },
    });
  }

  return (
    <View style={styles.tela}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={[
          '#75C6F3',
          '#4B9FE1',
          '#2676C4',
        ]}
        start={{ x: 0.12, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.container}
      >
        <View
          pointerEvents="none"
          style={styles.fundoDecorativo}
        >
          <View style={styles.formaSuperior} />

          <View style={styles.formaInferior} />

          <Animated.View
            style={[
              styles.bolha,
              styles.bolhaUm,
              {
                transform: [
                  {
                    translateY:
                      deslocamentoBolhaUm,
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
                    translateY:
                      deslocamentoBolhaDois,
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
                    translateY:
                      deslocamentoBolhaTres,
                  },
                ],
              },
            ]}
          />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.botaoVoltar,
              pressed && styles.pressionado,
            ]}
          >
            <Ionicons
              name="arrow-back"
              size={19}
              color={Cores.fundo}
            />

            <Text style={styles.textoVoltar}>
              Voltar
            </Text>
          </Pressable>

          <View style={styles.areaApresentacao}>
            <Animated.View
              style={[
                styles.areaLuma,
                {
                  opacity: entradaOrbita,

                  transform: [
                    {
                      scale:
                        entradaOrbita,
                    },
                  ],
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.brilloExterno,
                  {
                    opacity: brilhoLuma,
                  },
                ]}
              />

              <View style={styles.orbitaExterna}>
                <Animated.View
                  style={[
                    styles.orbitaAnimada,
                    {
                      transform: [
                        {
                          rotate:
                            rotacaoOrbita,
                        },
                      ],
                    },
                  ]}
                >
                  <View
                    style={styles.pontoOrbita}
                  />

                  <View
                    style={
                      styles.pontoOrbitaSecundario
                    }
                  />
                </Animated.View>

                <View style={styles.orbitaMedia}>
                  <LinearGradient
                    colors={[
                      'rgba(255,255,255,0.34)',
                      'rgba(255,255,255,0.12)',
                    ]}
                    style={styles.avatarLuma}
                  >
                    <Animated.Text
                      style={[
                        styles.letraLuma,
                        {
                          opacity:
                            entradaLetra,

                          transform: [
                            {
                              scale:
                                entradaLetra,
                            },
                          ],
                        },
                      ]}
                    >
                      L
                    </Animated.Text>
                  </LinearGradient>
                </View>
              </View>
            </Animated.View>

            <Animated.View
              style={obterEstiloEntrada(
                entradaStatus,
              )}
            >
              <View style={styles.statusLuma}>
                <View style={styles.pontoStatus} />

                <Text style={styles.textoStatus}>
                  IA do AlertaSOS
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              style={obterEstiloEntrada(
                entradaSaudacao,
              )}
            >
              <Text style={styles.saudacao}>
                Olá, {nomePreferido}!
              </Text>
            </Animated.View>

            <Animated.View
              style={obterEstiloEntrada(
                entradaTitulo,
              )}
            >
              <Text style={styles.titulo}>
                Eu sou a Luma
              </Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.balaoMensagem,
                obterEstiloEntrada(
                  entradaMensagem,
                ),
              ]}
            >
              <Text style={styles.textoMensagem}>
                Vou conhecer você para ajudar o
                AlertaSOS a agir melhor quando
                precisar.
              </Text>
            </Animated.View>

            <View style={styles.areaRecursos}>
              <RecursoLuma
                titulo="Seu perfil"
                icone="person-outline"
                animacao={entradaPerfil}
              />

              <RecursoLuma
                titulo="Sua saúde"
                icone="medical-outline"
                animacao={entradaSaude}
              />

              <RecursoLuma
                titulo="Rede de apoio"
                icone="people-outline"
                animacao={entradaRede}
              />
            </View>

            <Animated.View
              style={[
                styles.areaFinal,
                obterEstiloEntrada(
                  entradaFinal,
                ),
              ]}
            >
              <View style={styles.areaSeguranca}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={17}
                  color="rgba(255,255,255,0.92)"
                />

                <Text style={styles.textoSeguranca}>
                  Seus dados permanecem protegidos.
                </Text>
              </View>

              <Pressable
                onPress={continuar}
                style={({ pressed }) => [
                  styles.botaoComecar,
                  pressed &&
                    styles.botaoComecarPressionado,
                ]}
              >
                <View>
                  <Text
                    style={
                      styles.textoBotaoComecar
                    }
                  >
                    Vamos começar
                  </Text>

                  <Text
                    style={
                      styles.subtextoBotaoComecar
                    }
                  >
                    Configurar meu perfil
                  </Text>
                </View>

                <View
                  style={styles.areaSetaBotao}
                >
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={Cores.fundo}
                  />
                </View>
              </Pressable>
            </Animated.View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

function RecursoLuma({
  titulo,
  icone,
  animacao,
}: RecursoLumaProps) {
  return (
    <Animated.View
      style={[
        styles.recurso,
        {
          opacity: animacao,

          transform: [
            {
              translateY:
                animacao.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 0],
                }),
            },
          ],
        },
      ]}
    >
      <View style={styles.iconeRecurso}>
        <Ionicons
          name={icone}
          size={19}
          color={Cores.fundo}
        />
      </View>

      <Text style={styles.textoRecurso}>
        {titulo}
      </Text>
    </Animated.View>
  );
}

function criarAnimacaoEntrada(
  valor: Animated.Value,
  duracao: number,
) {
  return Animated.timing(valor, {
    toValue: 1,
    duration: duracao,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });
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

function obterEstiloEntrada(
  valor: Animated.Value,
) {
  return {
    opacity: valor,

    transform: [
      {
        translateY: valor.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },

  container: {
    flex: 1,
    overflow: 'hidden',
  },

  scroll: {
    flex: 1,
  },

  conteudo: {
    flexGrow: 1,

    width: '100%',
    maxWidth: 520,

    alignSelf: 'center',

    paddingHorizontal:
      Espacamentos.margemHorizontal,

    paddingTop:
      Platform.OS === 'android' ? 53 : 42,

    paddingBottom: 65,
  },

  fundoDecorativo: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },

  formaSuperior: {
    position: 'absolute',

    width: 340,
    height: 340,

    top: -190,
    right: -120,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.08)',
  },

  formaInferior: {
    position: 'absolute',

    width: 390,
    height: 390,

    bottom: -270,
    left: -210,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.07)',
  },

  bolha: {
    position: 'absolute',

    borderRadius: Bordas.circular,
    borderWidth: 1,

    borderColor:
      'rgba(255,255,255,0.20)',

    backgroundColor:
      'rgba(255,255,255,0.07)',
  },

  bolhaUm: {
    width: 24,
    height: 24,

    top: '25%',
    left: '12%',
  },

  bolhaDois: {
    width: 47,
    height: 47,

    top: '73%',
    right: '9%',
  },

  bolhaTres: {
    width: 14,
    height: 14,

    top: '50%',
    right: '18%',
  },

  botaoVoltar: {
    alignSelf: 'flex-start',

    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 8,
    paddingRight: 12,
  },

  textoVoltar: {
    marginLeft: 6,

    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoExtraBold,

    color: Cores.fundo,
  },

  areaApresentacao: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: 10,
  },

  areaLuma: {
    width: 180,
    height: 180,

    alignItems: 'center',
    justifyContent: 'center',
  },

  brilloExterno: {
    position: 'absolute',

    width: 176,
    height: 176,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.22)',
  },

  orbitaExterna: {
    width: 144,
    height: 144,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.36)',

    backgroundColor:
      'rgba(255,255,255,0.08)',
  },

  orbitaAnimada: {
    position: 'absolute',

    width: 130,
    height: 130,

    borderRadius: Bordas.circular,
  },

  pontoOrbita: {
    position: 'absolute',

    width: 8,
    height: 8,

    top: 3,
    left: 61,

    borderRadius: Bordas.circular,

    backgroundColor: Cores.fundo,
  },

  pontoOrbitaSecundario: {
    position: 'absolute',

    width: 5,
    height: 5,

    bottom: 12,
    right: 14,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.70)',
  },

  orbitaMedia: {
    width: 111,
    height: 111,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.30)',
  },

  avatarLuma: {
    width: 90,
    height: 90,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,
  },

  letraLuma: {
    fontSize: 45,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  statusLuma: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: -4,
    marginBottom: 10,

    paddingHorizontal: 11,
    paddingVertical: 6,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(10,74,139,0.20)',
  },

  pontoStatus: {
    width: 7,
    height: 7,

    marginRight: 6,

    borderRadius: Bordas.circular,

    backgroundColor: '#77F1B7',
  },

  textoStatus: {
    fontSize: 11.5,
    fontWeight: Tipografia.pesoExtraBold,

    color: Cores.fundo,
  },

  saudacao: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoExtraBold,

    textAlign: 'center',

    color:
      'rgba(255,255,255,0.90)',
  },

  titulo: {
    marginTop: 5,

    fontSize: 36,
    lineHeight: 42,

    fontWeight: Tipografia.pesoBlack,

    textAlign: 'center',

    color: Cores.fundo,

    letterSpacing: -1,
  },

  balaoMensagem: {
    maxWidth: 410,

    marginTop: 15,

    paddingHorizontal:
      Espacamentos.paddingMedio,

    paddingVertical:
      Espacamentos.paddingPequeno,

    borderRadius: Bordas.extraGrande,
    borderWidth: 1,

    borderColor:
      'rgba(255,255,255,0.28)',

    backgroundColor:
      'rgba(13,70,128,0.16)',
  },

  textoMensagem: {
    fontSize: Tipografia.textoPequeno,
    lineHeight: 21,

    textAlign: 'center',

    color:
      'rgba(255,255,255,0.92)',
  },

  areaRecursos: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',

    gap: 10,

    marginTop: 25,
  },

  recurso: {
    flexDirection: 'row',
    alignItems: 'center',

    minHeight: 44,

    paddingLeft: 7,
    paddingRight: 13,
    paddingVertical: 7,

    borderRadius: Bordas.circular,
    borderWidth: 1,

    borderColor:
      'rgba(255,255,255,0.25)',

    backgroundColor:
      'rgba(255,255,255,0.12)',
  },

  iconeRecurso: {
    width: 30,
    height: 30,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 7,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.15)',
  },

  textoRecurso: {
    fontSize: 12,
    fontWeight: Tipografia.pesoExtraBold,

    color: Cores.fundo,
  },

  areaFinal: {
    width: '100%',

    marginTop: 27,
  },

  areaSeguranca: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 15,
  },

  textoSeguranca: {
    marginLeft: 7,

    fontSize: 11.5,

    color:
      'rgba(255,255,255,0.84)',
  },

  botaoComecar: {
    width: '100%',
    minHeight: 68,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingLeft: 22,
    paddingRight: 11,

    borderRadius: Bordas.extraGrande,

    backgroundColor: Cores.fundo,
  },

  botaoComecarPressionado: {
    opacity: 0.84,
    transform: [{ scale: 0.985 }],
  },

  textoBotaoComecar: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.primariaEscura,
  },

  subtextoBotaoComecar: {
    marginTop: 2,

    fontSize: 11.5,

    color: Cores.textoSuave,
  },

  areaSetaBotao: {
    width: 46,
    height: 46,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor: Cores.primaria,
  },

  pressionado: {
    opacity: 0.65,
  },
});