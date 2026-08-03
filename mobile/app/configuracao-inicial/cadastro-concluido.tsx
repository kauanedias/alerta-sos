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
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';

import {
  Botao,
  MensagemLuma,
} from '../../src/componentes';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../../src/tema';

type ItemConcluidoProps = {
  titulo: string;
  descricao: string;
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

  // Círculo e confirmação
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

  // Textos principais
  const entradaSaudacao = useRef(
    new Animated.Value(0),
  ).current;

  const entradaTitulo = useRef(
    new Animated.Value(0),
  ).current;

  const entradaDescricao = useRef(
    new Animated.Value(0),
  ).current;

  // Luma
  const entradaLuma = useRef(
    new Animated.Value(0),
  ).current;

  // Cards
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

  // Parte final
  const entradaFinal = useRef(
    new Animated.Value(0),
  ).current;

  // Bolhas do fundo
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
    const animacaoBolhaUm = criarAnimacaoBolha(
      movimentoBolhaUm,
      6200,
    );

    const animacaoBolhaDois = criarAnimacaoBolha(
      movimentoBolhaDois,
      7600,
    );

    const animacaoBolhaTres = criarAnimacaoBolha(
      movimentoBolhaTres,
      6800,
    );

    const animacaoBolhaQuatro = criarAnimacaoBolha(
      movimentoBolhaQuatro,
      8200,
    );

    animacaoBolhaUm.start();
    animacaoBolhaDois.start();
    animacaoBolhaTres.start();
    animacaoBolhaQuatro.start();

    Animated.sequence([
      // 1. Círculo aparece e cresce
      Animated.spring(escalaCirculo, {
        toValue: 1,
        friction: 6,
        tension: 55,
        useNativeDriver: true,
      }),

      Animated.delay(180),

      // 2. Check aparece
      Animated.parallel([
        Animated.timing(opacidadeCheck, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.spring(escalaCheck, {
          toValue: 1,
          friction: 5,
          tension: 75,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(300),

      // 3. Círculo diminui e sobe
      Animated.parallel([
        Animated.timing(escalaCirculo, {
          toValue: 0.72,
          duration: 500,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),

        Animated.timing(deslocamentoCirculo, {
          toValue: -18,
          duration: 500,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // 4. Tudo certo
      criarAnimacaoEntrada(entradaSaudacao, 430),

      // 5. Cadastro concluído
      criarAnimacaoEntrada(entradaTitulo, 430),

      // 6. Descrição
      criarAnimacaoEntrada(entradaDescricao, 430),

      // 7. Luma
      criarAnimacaoEntrada(entradaLuma, 480),

      // 8. Cards, um por vez
      Animated.stagger(160, [
        criarAnimacaoEntrada(entradaPerfil, 430),
        criarAnimacaoEntrada(entradaSaude, 430),
        criarAnimacaoEntrada(entradaRede, 430),
        criarAnimacaoEntrada(
          entradaPermissoes,
          430,
        ),
      ]),

      // 9. Aviso e botão
      criarAnimacaoEntrada(entradaFinal, 500),
    ]).start();

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
      animacaoBolhaQuatro.stop();
    };
  }, [
    deslocamentoCirculo,
    entradaDescricao,
    entradaFinal,
    entradaLuma,
    entradaPerfil,
    entradaPermissoes,
    entradaRede,
    entradaSaudacao,
    entradaSaude,
    entradaTitulo,
    escalaCheck,
    escalaCirculo,
    movimentoBolhaDois,
    movimentoBolhaQuatro,
    movimentoBolhaTres,
    movimentoBolhaUm,
    opacidadeCheck,
  ]);

  const deslocamentoUm =
    movimentoBolhaUm.interpolate({
      inputRange: [0, 1],
      outputRange: [70, -150],
    });

  const deslocamentoDois =
    movimentoBolhaDois.interpolate({
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

  function entrarNoAplicativo() {
    console.log('Cadastro concluído');

    // Depois trocaremos pela rota da Home.
    router.replace('/');
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
          '#78C6F4',
          '#4FA3E3',
          '#2E7FCB',
        ]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.container}
      >
        <View
          pointerEvents="none"
          style={styles.fundoDecorativo}
        >
          <Animated.View
            style={[
              styles.bolha,
              styles.bolhaUm,
              {
                transform: [
                  {
                    translateY:
                      deslocamentoUm,
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
                      deslocamentoDois,
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
                      deslocamentoTres,
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
                    translateY:
                      deslocamentoQuatro,
                  },
                ],
              },
            ]}
          />

          <View style={styles.formaSuperior} />
          <View style={styles.formaInferior} />
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
                      scale:
                        escalaCirculo,
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
                      scale:
                        escalaCirculo,
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
                    opacity:
                      opacidadeCheck,

                    transform: [
                      {
                        scale:
                          escalaCheck,
                      },
                    ],
                  }}
                >
                  <Ionicons
                    name="checkmark"
                    size={58}
                    color={Cores.fundo}
                  />
                </Animated.View>
              </View>
            </Animated.View>
          </View>

          <Animated.View
            style={obterEstiloEntrada(
              entradaSaudacao,
            )}
          >
            <Text style={styles.saudacao}>
              Tudo certo, {nomePreferido}!
            </Text>
          </Animated.View>

          <Animated.View
            style={obterEstiloEntrada(
              entradaTitulo,
            )}
          >
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
              Seu perfil inicial foi configurado e o
              AlertaSOS está pronto para continuar.
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.cardConteudo,
              obterEstiloEntrada(entradaLuma),
            ]}
          >
            <MensagemLuma
              texto={`Muito prazer, ${nomePreferido}! Agora eu conheço seu perfil, sua saúde e sua rede de apoio. Sempre que precisar, estarei aqui para ajudar.`}
            />
          </Animated.View>

          <View style={styles.areaEtapas}>
            <ItemConcluido
              titulo="Perfil configurado"
              descricao="Suas informações pessoais foram adicionadas."
              icone="person-outline"
              animacao={entradaPerfil}
            />

            <ItemConcluido
              titulo="Saúde cadastrada"
              descricao="Suas informações importantes foram organizadas."
              icone="medical-outline"
              animacao={entradaSaude}
            />

            <ItemConcluido
              titulo="Rede de apoio criada"
              descricao="Seus contatos de confiança foram cadastrados."
              icone="people-outline"
              animacao={entradaRede}
            />

            <ItemConcluido
              titulo="Permissões preparadas"
              descricao="O aparelho solicitará os acessos necessários."
              icone="shield-checkmark-outline"
              animacao={entradaPermissoes}
            />
          </View>

          <Animated.View
            style={[
              styles.areaFinal,
              obterEstiloEntrada(entradaFinal),
            ]}
          >
            <View style={styles.aviso}>
              <Ionicons
                name="information-circle-outline"
                size={19}
                color={Cores.primaria}
              />

              <Text style={styles.textoAviso}>
                Você poderá alterar essas informações
                quando quiser nas configurações do
                aplicativo.
              </Text>
            </View>

            <Botao
              titulo="Entrar no AlertaSOS"
              onPress={entrarNoAplicativo}
              iconeDireita={
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={Cores.fundo}
                />
              }
            />

            <View style={styles.rodape}>
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color="rgba(255, 255, 255, 0.88)"
              />

              <Text style={styles.textoRodape}>
                Sua proteção começa com uma rede de
                apoio preparada.
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

function ItemConcluido({
  titulo,
  descricao,
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
          size={21}
          color={Cores.primaria}
        />
      </View>

      <View style={styles.conteudoEtapa}>
        <Text style={styles.tituloEtapa}>
          {titulo}
        </Text>

        <Text style={styles.descricaoEtapa}>
          {descricao}
        </Text>
      </View>

      <Ionicons
        name="checkmark-circle"
        size={24}
        color={Cores.sucesso}
      />
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
          outputRange: [24, 0],
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
          outputRange: [-45, 0],
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
    maxWidth: 540,

    alignSelf: 'center',

    paddingHorizontal:
      Espacamentos.margemHorizontal,

    paddingTop:
      Platform.OS === 'android' ? 70 : 58,

    paddingBottom: 100,
  },

  fundoDecorativo: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },

  areaConfirmacao: {
    height: 180,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 4,
  },

  brilhoCirculo: {
    position: 'absolute',

    width: 172,
    height: 172,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.16)',
  },

  circuloExterno: {
    width: 145,
    height: 145,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    borderWidth: 1.5,
    borderColor:
      'rgba(255, 255, 255, 0.42)',

    backgroundColor:
      'rgba(255, 255, 255, 0.14)',
  },

  circuloInterno: {
    width: 110,
    height: 110,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.18)',
  },

  saudacao: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoExtraBold,

    textAlign: 'center',

    color: 'rgba(255, 255, 255, 0.90)',
  },

  titulo: {
    marginTop: 7,

    fontSize: 34,
    lineHeight: 40,

    fontWeight: Tipografia.pesoBlack,

    textAlign: 'center',

    color: Cores.fundo,

    letterSpacing: -1,
  },

  descricao: {
    maxWidth: 390,

    alignSelf: 'center',

    marginTop: 10,
    marginBottom: Espacamentos.grande,

    fontSize: Tipografia.textoPequeno,
    lineHeight: 22,

    textAlign: 'center',

    color: 'rgba(255, 255, 255, 0.86)',
  },

  cardConteudo: {
    width: '100%',

    padding: Espacamentos.paddingPequeno,

    borderRadius: Bordas.extraGrande,

    backgroundColor:
      'rgba(255, 255, 255, 0.96)',

    ...Sombras.media,
  },

  areaEtapas: {
    width: '100%',

    marginTop: Espacamentos.grande,

    gap: Espacamentos.paddingPequeno,
  },

  itemEtapa: {
    width: '100%',
    minHeight: 76,

    flexDirection: 'row',
    alignItems: 'center',

    padding: Espacamentos.paddingPequeno,

    borderRadius: Bordas.grande,
    borderWidth: 1,

    borderColor:
      'rgba(255, 255, 255, 0.48)',

    backgroundColor:
      'rgba(255, 255, 255, 0.94)',

    ...Sombras.leve,
  },

  iconeEtapa: {
    width: 43,
    height: 43,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.grande,

    backgroundColor: Cores.primariaClara,
  },

  conteudoEtapa: {
    flex: 1,

    marginHorizontal:
      Espacamentos.paddingPequeno,
  },

  tituloEtapa: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.primariaEscura,
  },

  descricaoEtapa: {
    marginTop: 3,

    fontSize: Tipografia.legenda,
    lineHeight: 17,

    color: Cores.textoSuave,
  },

  areaFinal: {
    width: '100%',
  },

  aviso: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    marginTop: Espacamentos.grande,
    marginBottom: Espacamentos.grande,

    padding: Espacamentos.paddingPequeno,

    borderRadius: Bordas.grande,

    backgroundColor:
      'rgba(255, 255, 255, 0.92)',
  },

  textoAviso: {
    flex: 1,

    marginLeft: 7,

    fontSize: Tipografia.legenda,
    lineHeight: 17,

    color: Cores.textoSecundario,
  },

  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: Espacamentos.grande,

    paddingHorizontal: 10,
  },

  textoRodape: {
    flexShrink: 1,

    marginLeft: 7,

    fontSize: 11.5,

    textAlign: 'center',

    color:
      'rgba(255, 255, 255, 0.86)',
  },

  bolha: {
    position: 'absolute',

    borderRadius: Bordas.circular,
    borderWidth: 1,

    borderColor:
      'rgba(255, 255, 255, 0.18)',

    backgroundColor:
      'rgba(255, 255, 255, 0.08)',
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

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.08)',
  },

  formaInferior: {
    position: 'absolute',

    width: 360,
    height: 360,

    bottom: -230,
    left: -180,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.07)',
  },
});