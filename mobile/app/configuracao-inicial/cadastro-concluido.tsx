import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  router,
  useLocalSearchParams,
} from 'expo-router';
import { useEffect, useRef, useState } from 'react';

import {
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../../src/tema';

type ItemConcluidoProps = {
  titulo: string;
  icone:
    | 'person-outline'
    | 'medical-outline'
    | 'people-outline'
    | 'shield-checkmark-outline';
  animacao: Animated.Value;
};

export default function CadastroConcluidoScreen() {
  const parametros = useLocalSearchParams<{
    nome?: string;
  }>();

  const nomePreferido =
    typeof parametros.nome === 'string' &&
    parametros.nome.trim()
      ? parametros.nome.trim()
      : 'você';

  const [entrando, setEntrando] = useState(false);

  const escalaCirculo = useRef(
    new Animated.Value(0),
  ).current;

  const deslocamentoCirculo = useRef(
    new Animated.Value(0),
  ).current;

  const opacidadeCheck = useRef(
    new Animated.Value(0),
  ).current;

  const escalaCheck = useRef(
    new Animated.Value(0.4),
  ).current;

  const entradaTitulo = useRef(
    new Animated.Value(0),
  ).current;

  const entradaDescricao = useRef(
    new Animated.Value(0),
  ).current;

  const entradaLuma = useRef(
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

  const entradaPermissoes = useRef(
    new Animated.Value(0),
  ).current;

  const entradaSeguranca = useRef(
    new Animated.Value(0),
  ).current;

  const entradaBotao = useRef(
    new Animated.Value(0),
  ).current;

  const brilhoBotao = useRef(
    new Animated.Value(0.16),
  ).current;

  const entradaDespedida = useRef(
    new Animated.Value(0),
  ).current;

  const opacidadeTela = useRef(
    new Animated.Value(1),
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
    const animacaoBolhaUm = criarAnimacaoBolha(
      movimentoBolhaUm,
      6400,
    );

    const animacaoBolhaDois = criarAnimacaoBolha(
      movimentoBolhaDois,
      7800,
    );

    const animacaoBolhaTres = criarAnimacaoBolha(
      movimentoBolhaTres,
      7000,
    );

    const animacaoBrilhoBotao = Animated.loop(
      Animated.sequence([
        Animated.timing(brilhoBotao, {
          toValue: 0.34,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(brilhoBotao, {
          toValue: 0.16,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animacaoBolhaUm.start();
    animacaoBolhaDois.start();
    animacaoBolhaTres.start();

    Animated.sequence([
      Animated.spring(escalaCirculo, {
        toValue: 1,
        friction: 6,
        tension: 55,
        useNativeDriver: true,
      }),

      Animated.delay(170),

      Animated.parallel([
        Animated.timing(opacidadeCheck, {
          toValue: 1,
          duration: 280,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.spring(escalaCheck, {
          toValue: 1,
          friction: 5,
          tension: 72,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(280),

      Animated.parallel([
        Animated.timing(escalaCirculo, {
          toValue: 0.72,
          duration: 480,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),

        Animated.timing(deslocamentoCirculo, {
          toValue: -18,
          duration: 480,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      criarAnimacaoEntrada(
        entradaTitulo,
        420,
      ),

      criarAnimacaoEntrada(
        entradaDescricao,
        420,
      ),

      criarAnimacaoEntrada(
        entradaLuma,
        480,
      ),

      Animated.stagger(150, [
        criarAnimacaoEntradaLateral(
          entradaPerfil,
          390,
        ),

        criarAnimacaoEntradaLateral(
          entradaSaude,
          390,
        ),

        criarAnimacaoEntradaLateral(
          entradaRede,
          390,
        ),

        criarAnimacaoEntradaLateral(
          entradaPermissoes,
          390,
        ),
      ]),

      criarAnimacaoEntrada(
        entradaSeguranca,
        430,
      ),

      criarAnimacaoEntrada(
        entradaBotao,
        480,
      ),
    ]).start(() => {
      animacaoBrilhoBotao.start();
    });

    const tempoVibracao = setTimeout(() => {
      if (Platform.OS !== 'web') {
        Vibration.vibrate(40);
      }
    }, 850);

    return () => {
      clearTimeout(tempoVibracao);

      animacaoBolhaUm.stop();
      animacaoBolhaDois.stop();
      animacaoBolhaTres.stop();
      animacaoBrilhoBotao.stop();
    };
  }, [
    brilhoBotao,
    deslocamentoCirculo,
    entradaBotao,
    entradaDescricao,
    entradaLuma,
    entradaPerfil,
    entradaPermissoes,
    entradaRede,
    entradaSaude,
    entradaSeguranca,
    entradaTitulo,
    escalaCheck,
    escalaCirculo,
    movimentoBolhaDois,
    movimentoBolhaTres,
    movimentoBolhaUm,
    opacidadeCheck,
  ]);

  const deslocamentoBolhaUm =
    movimentoBolhaUm.interpolate({
      inputRange: [0, 1],
      outputRange: [70, -150],
    });

  const deslocamentoBolhaDois =
    movimentoBolhaDois.interpolate({
      inputRange: [0, 1],
      outputRange: [110, -185],
    });

  const deslocamentoBolhaTres =
    movimentoBolhaTres.interpolate({
      inputRange: [0, 1],
      outputRange: [55, -125],
    });

  function entrarNoAplicativo() {
    if (entrando) {
      return;
    }

    setEntrando(true);

    if (Platform.OS !== 'web') {
      Vibration.vibrate(35);
    }

    Animated.sequence([
      Animated.timing(entradaDespedida, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.delay(900),

      Animated.timing(opacidadeTela, {
        toValue: 0,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace({
        pathname: '/home',

        params: {
          nome: nomePreferido,
        },
      });
    });
  }

  return (
    <Animated.View
      style={[
        styles.tela,
        {
          opacity: opacidadeTela,
        },
      ]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={[
          '#79C8F4',
          '#4B9FE1',
          '#2677C5',
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
          <View style={styles.areaConfirmacao}>
            <Animated.View
              style={[
                styles.brilhoCirculo,
                {
                  transform: [
                    {
                      scale: escalaCirculo,
                    },
                    {
                      translateY:
                        deslocamentoCirculo,
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.circuloExterno,
                {
                  transform: [
                    {
                      scale: escalaCirculo,
                    },
                    {
                      translateY:
                        deslocamentoCirculo,
                    },
                  ],
                },
              ]}
            >
              <View style={styles.circuloInterno}>
                <Animated.View
                  style={{
                    opacity: opacidadeCheck,

                    transform: [
                      {
                        scale: escalaCheck,
                      },
                    ],
                  }}
                >
                  <Ionicons
                    name="checkmark"
                    size={55}
                    color={Cores.fundo}
                  />
                </Animated.View>
              </View>
            </Animated.View>
          </View>

          <Animated.View
            style={obterEstiloEntrada(
              entradaTitulo,
            )}
          >
            <Text style={styles.saudacao}>
              Tudo certo, {nomePreferido}!
            </Text>

            <Text style={styles.titulo}>
              Cadastro concluído
            </Text>
          </Animated.View>

          <Animated.View
            style={obterEstiloEntrada(
              entradaDescricao,
            )}
          >
            <Text style={styles.descricao}>
              Seu AlertaSOS está pronto.
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.areaLuma,
              obterEstiloEntrada(entradaLuma),
            ]}
          >
            <View style={styles.avatarLuma}>
              <Text style={styles.letraLuma}>
                L
              </Text>
            </View>

            <Text style={styles.nomeLuma}>
              Luma
            </Text>

            <Text style={styles.falaLuma}>
              Perfeito, {nomePreferido}.
            </Text>

            <Text style={styles.textoLuma}>
              Agora seu perfil está preparado.
              Sempre que precisar, estarei ao seu lado.
            </Text>
          </Animated.View>

          <View style={styles.divisor}>
            <View style={styles.linhaDivisor} />

            <Text style={styles.textoDivisor}>
              CONFIGURAÇÃO FINALIZADA
            </Text>

            <View style={styles.linhaDivisor} />
          </View>

          <View style={styles.areaEtapas}>
            <ItemConcluido
              titulo="Perfil configurado"
              icone="person-outline"
              animacao={entradaPerfil}
            />

            <View style={styles.linhaEtapas} />

            <ItemConcluido
              titulo="Saúde cadastrada"
              icone="medical-outline"
              animacao={entradaSaude}
            />

            <View style={styles.linhaEtapas} />

            <ItemConcluido
              titulo="Rede de apoio pronta"
              icone="people-outline"
              animacao={entradaRede}
            />

            <View style={styles.linhaEtapas} />

            <ItemConcluido
              titulo="Permissões preparadas"
              icone="shield-checkmark-outline"
              animacao={entradaPermissoes}
            />
          </View>

          <Animated.View
            style={[
              styles.areaSeguranca,
              obterEstiloEntrada(
                entradaSeguranca,
              ),
            ]}
          >
            <View style={styles.iconeSeguranca}>
              <Ionicons
                name="shield-checkmark"
                size={22}
                color={Cores.fundo}
              />
            </View>

            <View style={styles.conteudoSeguranca}>
              <Text style={styles.tituloSeguranca}>
                Seus dados estão protegidos
              </Text>

              <Text style={styles.textoSeguranca}>
                Você poderá alterar suas informações
                quando quiser.
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.areaBotao,
              obterEstiloEntrada(entradaBotao),
            ]}
          >
            <Animated.View
              pointerEvents="none"
              style={[
                styles.brilhoBotao,
                {
                  opacity: brilhoBotao,
                },
              ]}
            />

            <Pressable
              onPress={entrarNoAplicativo}
              disabled={entrando}
              style={({ pressed }) => [
                styles.botaoEntrar,
                pressed &&
                  styles.botaoEntrarPressionado,
                entrando &&
                  styles.botaoEntrarDesativado,
              ]}
            >
              <View>
                <Text style={styles.textoBotao}>
                  Entrar no AlertaSOS
                </Text>

                <Text style={styles.subtextoBotao}>
                  Acessar minha proteção
                </Text>
              </View>

              <View style={styles.areaSeta}>
                <Ionicons
                  name="arrow-forward"
                  size={21}
                  color={Cores.fundo}
                />
              </View>
            </Pressable>

            <Text style={styles.rodape}>
              O AlertaSOS está pronto para cuidar de
              você.
            </Text>
          </Animated.View>
        </ScrollView>

        {entrando ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.mensagemDespedida,
              {
                opacity: entradaDespedida,

                transform: [
                  {
                    translateY:
                      entradaDespedida.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.avatarDespedida}>
              <Text style={styles.letraDespedida}>
                L
              </Text>
            </View>

            <View>
              <Text style={styles.nomeDespedida}>
                Luma
              </Text>

              <Text style={styles.textoDespedida}>
                Nos vemos lá dentro.
              </Text>
            </View>
          </Animated.View>
        ) : null}
      </LinearGradient>
    </Animated.View>
  );
}

function ItemConcluido({
  titulo,
  icone,
  animacao,
}: ItemConcluidoProps) {
  return (
    <Animated.View
      style={[
        styles.itemEtapa,
        obterEstiloEntradaLateral(animacao),
      ]}
    >
      <View style={styles.iconeEtapa}>
        <Ionicons
          name={icone}
          size={20}
          color={Cores.fundo}
        />
      </View>

      <Text style={styles.tituloEtapa}>
        {titulo}
      </Text>

      <Animated.View
        style={[
          styles.checkEtapa,
          {
            transform: [
              {
                scale: animacao,
              },
            ],
          },
        ]}
      >
        <Ionicons
          name="checkmark"
          size={15}
          color={Cores.primariaEscura}
        />
      </Animated.View>
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

function criarAnimacaoEntradaLateral(
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
          outputRange: [22, 0],
        }),
      },
    ],
  };
}

function obterEstiloEntradaLateral(
  valor: Animated.Value,
) {
  return {
    opacity: valor,

    transform: [
      {
        translateX: valor.interpolate({
          inputRange: [0, 1],
          outputRange: [-35, 0],
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
      Platform.OS === 'android' ? 64 : 52,

    paddingBottom: 90,
  },

  fundoDecorativo: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },

  formaSuperior: {
    position: 'absolute',

    width: 330,
    height: 330,

    top: -185,
    right: -120,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.08)',
  },

  formaInferior: {
    position: 'absolute',

    width: 380,
    height: 380,

    bottom: -265,
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
    width: 22,
    height: 22,

    top: '25%',
    left: '12%',
  },

  bolhaDois: {
    width: 44,
    height: 44,

    top: '74%',
    right: '9%',
  },

  bolhaTres: {
    width: 14,
    height: 14,

    top: '52%',
    right: '18%',
  },

  areaConfirmacao: {
    height: 165,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: -3,
  },

  brilhoCirculo: {
    position: 'absolute',

    width: 165,
    height: 165,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.16)',
  },

  circuloExterno: {
    width: 138,
    height: 138,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    borderWidth: 1.5,
    borderColor:
      'rgba(255,255,255,0.42)',

    backgroundColor:
      'rgba(255,255,255,0.13)',
  },

  circuloInterno: {
    width: 104,
    height: 104,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.18)',
  },

  saudacao: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoExtraBold,

    textAlign: 'center',

    color:
      'rgba(255,255,255,0.90)',
  },

  titulo: {
    marginTop: 6,

    fontSize: 35,
    lineHeight: 41,

    fontWeight: Tipografia.pesoBlack,

    textAlign: 'center',

    color: Cores.fundo,

    letterSpacing: -1,
  },

  descricao: {
    marginTop: 9,

    fontSize: Tipografia.textoPequeno,
    lineHeight: 21,

    textAlign: 'center',

    color:
      'rgba(255,255,255,0.86)',
  },

  areaLuma: {
    alignItems: 'center',

    marginTop: 32,
    paddingHorizontal: 16,
  },

  avatarLuma: {
    width: 54,
    height: 54,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.32)',

    backgroundColor:
      'rgba(255,255,255,0.16)',
  },

  letraLuma: {
    fontSize: 24,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  nomeLuma: {
    marginTop: 8,

    fontSize: 12,
    fontWeight: Tipografia.pesoBlack,

    color:
      'rgba(255,255,255,0.82)',

    letterSpacing: 0.5,
  },

  falaLuma: {
    marginTop: 13,

    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,

    textAlign: 'center',

    color: Cores.fundo,
  },

  textoLuma: {
    maxWidth: 370,

    marginTop: 7,

    fontSize: Tipografia.textoPequeno,
    lineHeight: 22,

    textAlign: 'center',

    color:
      'rgba(255,255,255,0.88)',
  },

  divisor: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 32,
    marginBottom: 20,
  },

  linhaDivisor: {
    flex: 1,
    height: 1,

    backgroundColor:
      'rgba(255,255,255,0.20)',
  },

  textoDivisor: {
    marginHorizontal: 11,

    fontSize: 9.5,
    fontWeight: Tipografia.pesoBlack,

    color:
      'rgba(255,255,255,0.66)',

    letterSpacing: 0.8,
  },

  areaEtapas: {
    width: '100%',

    paddingHorizontal: 5,
  },

  itemEtapa: {
    minHeight: 55,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 7,
  },

  iconeEtapa: {
    width: 38,
    height: 38,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.14)',
  },

  tituloEtapa: {
    flex: 1,

    marginLeft: 13,

    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoExtraBold,

    color: Cores.fundo,
  },

  checkEtapa: {
    width: 25,
    height: 25,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.90)',
  },

  linhaEtapas: {
    width: 1,
    height: 13,

    marginLeft: 25,

    backgroundColor:
      'rgba(255,255,255,0.25)',
  },

  areaSeguranca: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 28,

    paddingHorizontal:
      Espacamentos.paddingMedio,

    paddingVertical:
      Espacamentos.paddingPequeno,

    borderRadius: Bordas.extraGrande,

    borderWidth: 1,

    borderColor:
      'rgba(255,255,255,0.22)',

    backgroundColor:
      'rgba(13,70,128,0.14)',
  },

  iconeSeguranca: {
    width: 43,
    height: 43,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.15)',
  },

  conteudoSeguranca: {
    flex: 1,
    marginLeft: 12,
  },

  tituloSeguranca: {
    fontSize: 13,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  textoSeguranca: {
    marginTop: 3,

    fontSize: Tipografia.legenda,
    lineHeight: 17,

    color:
      'rgba(255,255,255,0.76)',
  },

  areaBotao: {
    position: 'relative',

    width: '100%',

    marginTop: 29,
  },

  brilhoBotao: {
    position: 'absolute',

    left: 10,
    right: 10,
    top: 7,
    bottom: 22,

    borderRadius: Bordas.extraGrande,

    backgroundColor:
      'rgba(255,255,255,0.50)',
  },

  botaoEntrar: {
    minHeight: 70,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingLeft: 22,
    paddingRight: 11,

    borderRadius: Bordas.extraGrande,

    backgroundColor: Cores.fundo,

    ...Sombras.media,
  },

  botaoEntrarPressionado: {
    opacity: 0.87,
    transform: [{ scale: 0.985 }],
  },

  botaoEntrarDesativado: {
    opacity: 0.75,
  },

  textoBotao: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.primariaEscura,
  },

  subtextoBotao: {
    marginTop: 2,

    fontSize: 11.5,

    color: Cores.textoSuave,
  },

  areaSeta: {
    width: 47,
    height: 47,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor: Cores.primaria,
  },

  rodape: {
    marginTop: 17,

    fontSize: 11.5,

    textAlign: 'center',

    color:
      'rgba(255,255,255,0.80)',
  },

  mensagemDespedida: {
    position: 'absolute',

    left: 22,
    right: 22,
    bottom:
      Platform.OS === 'ios' ? 42 : 25,

    flexDirection: 'row',
    alignItems: 'center',

    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.extraGrande,

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.42)',

    backgroundColor:
      'rgba(15,72,132,0.92)',

    ...Sombras.media,
  },

  avatarDespedida: {
    width: 43,
    height: 43,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255,255,255,0.17)',
  },

  letraDespedida: {
    fontSize: 20,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  nomeDespedida: {
    marginLeft: 11,

    fontSize: 12,
    fontWeight: Tipografia.pesoBlack,

    color:
      'rgba(255,255,255,0.78)',
  },

  textoDespedida: {
    marginTop: 2,
    marginLeft: 11,

    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoExtraBold,

    color: Cores.fundo,
  },
});