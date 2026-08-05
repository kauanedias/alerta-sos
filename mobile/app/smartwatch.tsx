import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  router,
  useLocalSearchParams,
} from 'expo-router';
import { useEffect, useRef } from 'react';

import {
  Alert,
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
  Sombras,
  Tipografia,
} from '../src/tema';

type RecursoSmartwatchProps = {
  titulo: string;
  descricao: string;
  icone:
    | 'location-outline'
    | 'alert-circle-outline'
    | 'heart-outline'
    | 'walk-outline';
  animacaoEntrada: Animated.Value;
  animacaoIcone: Animated.Value;
  tipoAnimacao:
    | 'localizacao'
    | 'sos'
    | 'coracao'
    | 'queda';
  ultimo?: boolean;
  emBreve?: boolean;
};

type EtapaFluxoProps = {
  titulo: string;
  descricao: string;
  icone:
    | 'watch-outline'
    | 'phone-portrait-outline'
    | 'people-outline'
    | 'shield-checkmark-outline';
  ultima?: boolean;
};

export default function SmartwatchScreen() {
  const parametros = useLocalSearchParams<{
    nome?: string;
  }>();

  const nomePreferido =
    typeof parametros.nome === 'string' &&
    parametros.nome.trim()
      ? parametros.nome.trim()
      : 'você';

  /*
   * ANIMAÇÕES DE ENTRADA
   */

  const entradaTopo = useRef(
    new Animated.Value(0),
  ).current;

  const entradaRelogio = useRef(
    new Animated.Value(0),
  ).current;

  const entradaTitulo = useRef(
    new Animated.Value(0),
  ).current;

  const entradaLuma = useRef(
    new Animated.Value(0),
  ).current;

  const entradaFluxo = useRef(
    new Animated.Value(0),
  ).current;

  const entradaLocalizacao = useRef(
    new Animated.Value(0),
  ).current;

  const entradaSOS = useRef(
    new Animated.Value(0),
  ).current;

  const entradaSaude = useRef(
    new Animated.Value(0),
  ).current;

  const entradaQueda = useRef(
    new Animated.Value(0),
  ).current;

  const entradaGestos = useRef(
    new Animated.Value(0),
  ).current;

  const entradaPrivacidade = useRef(
    new Animated.Value(0),
  ).current;

  const entradaFinal = useRef(
    new Animated.Value(0),
  ).current;

  /*
   * ANIMAÇÕES DO HERO
   */

  const pulsoRelogio = useRef(
    new Animated.Value(1),
  ).current;

  const brilhoRelogio = useRef(
    new Animated.Value(0.2),
  ).current;

  const movimentoSinal = useRef(
    new Animated.Value(0),
  ).current;

  /*
   * ANIMAÇÕES DOS RECURSOS
   */

  const animacaoLocalizacao = useRef(
    new Animated.Value(0),
  ).current;

  const animacaoSOS = useRef(
    new Animated.Value(0),
  ).current;

  const animacaoCoracao = useRef(
    new Animated.Value(0),
  ).current;

  const animacaoQueda = useRef(
    new Animated.Value(0),
  ).current;

  /*
   * ANIMAÇÕES DOS GESTOS
   */

  const animacaoDoisToques = useRef(
    new Animated.Value(1),
  ).current;

  const animacaoTresToques = useRef(
    new Animated.Value(1),
  ).current;

  /*
   * BOLHAS
   */

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
    const animacaoPulsoRelogio = Animated.loop(
      Animated.sequence([
        Animated.timing(pulsoRelogio, {
          toValue: 1.035,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(pulsoRelogio, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const animacaoBrilhoRelogio = Animated.loop(
      Animated.sequence([
        Animated.timing(brilhoRelogio, {
          toValue: 0.42,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(brilhoRelogio, {
          toValue: 0.2,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const animacaoSinal = Animated.loop(
      Animated.sequence([
        Animated.timing(movimentoSinal, {
          toValue: 1,
          duration: 2100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),

        Animated.timing(movimentoSinal, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    const bolhaUm = criarAnimacaoBolha(
      movimentoBolhaUm,
      6600,
    );

    const bolhaDois = criarAnimacaoBolha(
      movimentoBolhaDois,
      8100,
    );

    const bolhaTres = criarAnimacaoBolha(
      movimentoBolhaTres,
      7200,
    );

    const gps = criarAnimacaoGPS(
      animacaoLocalizacao,
    );

    const sos = criarAnimacaoSOS(
      animacaoSOS,
    );

    const coracao = criarAnimacaoCoracao(
      animacaoCoracao,
    );

    const queda = criarAnimacaoQueda(
      animacaoQueda,
    );

    animacaoPulsoRelogio.start();
    animacaoBrilhoRelogio.start();
    animacaoSinal.start();

    bolhaUm.start();
    bolhaDois.start();
    bolhaTres.start();

    gps.start();
    sos.start();
    coracao.start();
    queda.start();

    Animated.sequence([
      criarAnimacaoEntrada(entradaTopo, 420),

      Animated.spring(entradaRelogio, {
        toValue: 1,
        friction: 7,
        tension: 55,
        useNativeDriver: true,
      }),

      criarAnimacaoEntrada(entradaTitulo, 430),

      criarAnimacaoEntrada(entradaLuma, 460),

      criarAnimacaoEntrada(entradaFluxo, 480),

      Animated.stagger(150, [
        criarAnimacaoEntradaLateral(
          entradaLocalizacao,
          400,
        ),

        criarAnimacaoEntradaLateral(
          entradaSOS,
          400,
        ),

        criarAnimacaoEntradaLateral(
          entradaSaude,
          400,
        ),

        criarAnimacaoEntradaLateral(
          entradaQueda,
          400,
        ),
      ]),

      criarAnimacaoEntrada(
        entradaGestos,
        450,
      ),

      /*
       * Demonstra dois e três toques.
       */
      Animated.sequence([
        pulsarQuantidade(
          animacaoDoisToques,
          2,
        ),

        Animated.delay(220),

        pulsarQuantidade(
          animacaoTresToques,
          3,
        ),
      ]),

      criarAnimacaoEntrada(
        entradaPrivacidade,
        430,
      ),

      criarAnimacaoEntrada(
        entradaFinal,
        480,
      ),
    ]).start();

    return () => {
      animacaoPulsoRelogio.stop();
      animacaoBrilhoRelogio.stop();
      animacaoSinal.stop();

      bolhaUm.stop();
      bolhaDois.stop();
      bolhaTres.stop();

      gps.stop();
      sos.stop();
      coracao.stop();
      queda.stop();
    };
  }, [
    animacaoCoracao,
    animacaoDoisToques,
    animacaoLocalizacao,
    animacaoQueda,
    animacaoSOS,
    animacaoTresToques,
    brilhoRelogio,
    entradaFinal,
    entradaFluxo,
    entradaGestos,
    entradaLocalizacao,
    entradaLuma,
    entradaPrivacidade,
    entradaQueda,
    entradaRelogio,
    entradaSOS,
    entradaSaude,
    entradaTitulo,
    entradaTopo,
    movimentoBolhaDois,
    movimentoBolhaTres,
    movimentoBolhaUm,
    movimentoSinal,
    pulsoRelogio,
  ]);

  const deslocamentoSinal =
    movimentoSinal.interpolate({
      inputRange: [0, 1],
      outputRange: [-15, 47],
    });

  const opacidadeSinal =
    movimentoSinal.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [0, 1, 1, 0],
    });

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

  function conectarSmartwatch() {
    Alert.alert(
      'Conexão em desenvolvimento',
      'Em breve você poderá conectar dispositivos compatíveis diretamente ao AlertaSOS.',
      [
        {
          text: 'Entendi',
        },
      ],
    );
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
          '#142E57',
          '#174F87',
          '#287FC0',
          '#5BB8E7',
        ]}
        start={{ x: 0.1, y: 0 }}
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

          <View style={styles.gradePontos}>
            {Array.from({ length: 24 }).map(
              (_, indice) => (
                <View
                  key={indice}
                  style={styles.pontoGrade}
                />
              ),
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator
        >
          <Animated.View
            style={[
              styles.cabecalho,
              obterEstiloEntrada(entradaTopo),
            ]}
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
                size={20}
                color={Cores.fundo}
              />

              <Text style={styles.textoVoltar}>
                Voltar
              </Text>
            </Pressable>

            <View style={styles.seloTecnologia}>
              <Ionicons
                name="sparkles-outline"
                size={14}
                color={Cores.fundo}
              />

              <Text style={styles.textoSeloTecnologia}>
                PROTEÇÃO INTELIGENTE
              </Text>
            </View>
          </Animated.View>

          {/*
           * HERO — MANTIDO NO MESMO ESTILO
           */}

          <Animated.View
            style={[
              styles.areaHero,
              {
                opacity: entradaRelogio,

                transform: [
                  {
                    scale: entradaRelogio,
                  },
                ],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.brilhoRelogio,
                {
                  opacity: brilhoRelogio,

                  transform: [
                    {
                      scale: pulsoRelogio,
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.areaRelogio,
                {
                  transform: [
                    {
                      scale: pulsoRelogio,
                    },
                  ],
                },
              ]}
            >
              <View style={styles.pulseiraSuperior} />

              <LinearGradient
                colors={[
                  '#18293D',
                  '#0B1420',
                ]}
                style={styles.corpoRelogio}
              >
                <View style={styles.telaRelogio}>
                  <View style={styles.statusRelogio}>
                    <View style={styles.pontoOnline} />

                    <Text style={styles.textoOnline}>
                      AlertaSOS
                    </Text>
                  </View>

                  <Ionicons
                    name="shield-checkmark"
                    size={42}
                    color="#75C9F4"
                  />

                  <Text style={styles.textoProtegido}>
                    Protegido
                  </Text>

                  <View style={styles.linhaBatimento}>
                    <View
                      style={styles.tracoBatimento}
                    />

                    <View
                      style={styles.picoBatimento}
                    />

                    <View
                      style={styles.tracoBatimento}
                    />
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.pulseiraInferior} />
            </Animated.View>

            <Animated.View
              style={[
                styles.sinalConexao,
                {
                  opacity: opacidadeSinal,

                  transform: [
                    {
                      translateX:
                        deslocamentoSinal,
                    },
                  ],
                },
              ]}
            >
              <View style={styles.pontoSinal} />
              <View style={styles.pontoSinal} />
              <View style={styles.pontoSinal} />
            </Animated.View>

            <View style={styles.celularMiniatura}>
              <Ionicons
                name="phone-portrait-outline"
                size={34}
                color={Cores.fundo}
              />
            </View>
          </Animated.View>

          <Animated.View
            style={obterEstiloEntrada(
              entradaTitulo,
            )}
          >
            <Text style={styles.titulo}>
              Sua proteção também no pulso
            </Text>

            <Text style={styles.descricao}>
              Um smartwatch pode transformar segundos
              importantes em uma resposta mais rápida.
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.falaLuma,
              obterEstiloEntrada(entradaLuma),
            ]}
          >
            <View style={styles.avatarLuma}>
              <Text style={styles.letraLuma}>
                L
              </Text>
            </View>

            <View style={styles.conteudoLuma}>
              <Text style={styles.nomeLuma}>
                Luma
              </Text>

              <Text style={styles.textoLuma}>
                {nomePreferido}, com um dispositivo
                compatível, você poderá iniciar pedidos
                de ajuda sem precisar procurar o celular.
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.areaFluxo,
              obterEstiloEntrada(entradaFluxo),
            ]}
          >
            <Text style={styles.tituloSecaoClaro}>
              Como a proteção acontece
            </Text>

            <View style={styles.fluxo}>
              <EtapaFluxo
                titulo="Smartwatch"
                descricao="O pedido começa no seu pulso."
                icone="watch-outline"
              />

              <EtapaFluxo
                titulo="AlertaSOS"
                descricao="O aplicativo prepara o alerta."
                icone="phone-portrait-outline"
              />

              <EtapaFluxo
                titulo="Rede de apoio"
                descricao="Seus contatos são avisados."
                icone="people-outline"
              />

              <EtapaFluxo
                titulo="Ajuda"
                descricao="Localização e dados autorizados."
                icone="shield-checkmark-outline"
                ultima
              />
            </View>
          </Animated.View>

          {/*
           * RECURSOS — NOVA LINHA DO TEMPO
           */}

          <View style={styles.areaRecursos}>
            <Text style={styles.tituloSecao}>
              Mais segurança em momentos importantes
            </Text>

            <View style={styles.painelRecursos}>
              <RecursoSmartwatch
                titulo="Localização compartilhada"
                descricao="Sua posição poderá ser enviada à rede de apoio durante um alerta."
                icone="location-outline"
                animacaoEntrada={entradaLocalizacao}
                animacaoIcone={animacaoLocalizacao}
                tipoAnimacao="localizacao"
              />

              <RecursoSmartwatch
                titulo="Pedido de ajuda pelo pulso"
                descricao="Uma sequência de toques poderá iniciar seu protocolo de segurança."
                icone="alert-circle-outline"
                animacaoEntrada={entradaSOS}
                animacaoIcone={animacaoSOS}
                tipoAnimacao="sos"
              />

              <RecursoSmartwatch
                titulo="Informações importantes"
                descricao="Contatos autorizados poderão receber dados essenciais para ajudar você."
                icone="heart-outline"
                animacaoEntrada={entradaSaude}
                animacaoIcone={animacaoCoracao}
                tipoAnimacao="coracao"
              />

              <RecursoSmartwatch
                titulo="Detecção de quedas"
                descricao="Dispositivos compatíveis poderão identificar uma possível queda."
                icone="walk-outline"
                animacaoEntrada={entradaQueda}
                animacaoIcone={animacaoQueda}
                tipoAnimacao="queda"
                emBreve
                ultimo
              />
            </View>
          </View>

          {/*
           * GESTOS — AGORA COM ESTILO DE VIDRO
           */}

          <Animated.View
            style={[
              styles.areaGestos,
              obterEstiloEntrada(
                entradaGestos,
              ),
            ]}
          >
            <View style={styles.cabecalhoGestos}>
              <View style={styles.conteudoCabecalhoGestos}>
                <Text style={styles.tituloGestos}>
                  Um gesto pode fazer diferença
                </Text>

                <Text style={styles.descricaoGestos}>
                  Você poderá escolher os comandos.
                </Text>
              </View>

              <View style={styles.iconeGestos}>
                <Ionicons
                  name="finger-print-outline"
                  size={27}
                  color={Cores.fundo}
                />
              </View>
            </View>

            <View style={styles.gesto}>
              <Animated.View
                style={[
                  styles.numeroGesto,
                  {
                    transform: [
                      {
                        scale:
                          animacaoDoisToques,
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.textoNumeroGesto}>
                  2
                </Text>
              </Animated.View>

              <View style={styles.conteudoGesto}>
                <Text style={styles.tituloGesto}>
                  Dois toques
                </Text>

                <Text style={styles.textoGesto}>
                  Preparar um alerta com nome e
                  localização para sua rede de apoio.
                </Text>
              </View>
            </View>

            <View style={styles.divisoriaGestos} />

            <View style={styles.gesto}>
              <Animated.View
                style={[
                  styles.numeroGesto,
                  {
                    transform: [
                      {
                        scale:
                          animacaoTresToques,
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.textoNumeroGesto}>
                  3
                </Text>
              </Animated.View>

              <View style={styles.conteudoGesto}>
                <Text style={styles.tituloGesto}>
                  Três toques
                </Text>

                <Text style={styles.textoGesto}>
                  Iniciar uma contagem para abrir a
                  ligação de emergência configurada.
                </Text>
              </View>
            </View>

            <View style={styles.avisoCancelamento}>
              <Ionicons
                name="timer-outline"
                size={18}
                color="#91DBFF"
              />

              <Text style={styles.textoCancelamento}>
                Haverá alguns segundos para cancelar
                uma ação iniciada por engano.
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.areaPrivacidade,
              obterEstiloEntrada(
                entradaPrivacidade,
              ),
            ]}
          >
            <View style={styles.iconePrivacidade}>
              <Ionicons
                name="lock-closed-outline"
                size={23}
                color={Cores.fundo}
              />
            </View>

            <View style={styles.conteudoPrivacidade}>
              <Text style={styles.tituloPrivacidade}>
                Você continua no controle
              </Text>

              <Text style={styles.textoPrivacidade}>
                Escolha quem pode receber sua
                localização e quais informações de saúde
                poderão ser compartilhadas.
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.areaFinal,
              obterEstiloEntrada(entradaFinal),
            ]}
          >
            <View style={styles.statusCompatibilidade}>
              <View
                style={styles.pontoCompatibilidade}
              />

              <Text
                style={styles.textoCompatibilidade}
              >
                Integração com dispositivos compatíveis
                em desenvolvimento
              </Text>
            </View>

            <Pressable
              onPress={conectarSmartwatch}
              style={({ pressed }) => [
                styles.botaoConectar,
                pressed &&
                  styles.botaoConectarPressionado,
              ]}
            >
              <View>
                <Text style={styles.textoBotao}>
                  Conectar smartwatch
                </Text>

                <Text style={styles.subtextoBotao}>
                  Preparar proteção pelo pulso
                </Text>
              </View>

              <View style={styles.areaSeta}>
                <Ionicons
                  name="bluetooth-outline"
                  size={22}
                  color={Cores.fundo}
                />
              </View>
            </Pressable>

            <Text style={styles.rodape}>
              Mesmo sem um smartwatch, o AlertaSOS
              continuará funcionando normalmente.
            </Text>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

function RecursoSmartwatch({
  titulo,
  descricao,
  icone,
  animacaoEntrada,
  animacaoIcone,
  tipoAnimacao,
  ultimo = false,
  emBreve = false,
}: RecursoSmartwatchProps) {
  const escalaPadrao =
    animacaoIcone.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.12],
    });

  const escalaGPS =
    animacaoIcone.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.75, 1.35, 1.65],
    });

  const opacidadeGPS =
    animacaoIcone.interpolate({
      inputRange: [0, 0.25, 1],
      outputRange: [0, 0.45, 0],
    });

  const rotacaoQueda =
    animacaoIcone.interpolate({
      inputRange: [0, 0.35, 0.7, 1],
      outputRange: [
        '0deg',
        '10deg',
        '-6deg',
        '0deg',
      ],
    });

  const transformacaoIcone =
    tipoAnimacao === 'queda'
      ? [
          {
            rotate: rotacaoQueda,
          },
        ]
      : [
          {
            scale: escalaPadrao,
          },
        ];

  return (
    <Animated.View
      style={[
        styles.recurso,
        obterEstiloEntradaLateral(
          animacaoEntrada,
        ),
      ]}
    >
      <View style={styles.areaLinhaRecurso}>
        <View style={styles.areaIconeRecurso}>
          {tipoAnimacao === 'localizacao' ? (
            <Animated.View
              style={[
                styles.ondaGPS,
                {
                  opacity: opacidadeGPS,

                  transform: [
                    {
                      scale: escalaGPS,
                    },
                  ],
                },
              ]}
            />
          ) : null}

          <Animated.View
            style={{
              transform: transformacaoIcone,
            }}
          >
            <Ionicons
              name={icone}
              size={23}
              color={Cores.fundo}
            />
          </Animated.View>
        </View>

        {!ultimo ? (
          <View style={styles.linhaRecurso} />
        ) : null}
      </View>

      <View style={styles.conteudoRecurso}>
        <View style={styles.linhaTituloRecurso}>
          <Text style={styles.tituloRecurso}>
            {titulo}
          </Text>

          {emBreve ? (
            <View style={styles.seloEmBreve}>
              <Text style={styles.textoEmBreve}>
                EM BREVE
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.descricaoRecurso}>
          {descricao}
        </Text>
      </View>
    </Animated.View>
  );
}

function EtapaFluxo({
  titulo,
  descricao,
  icone,
  ultima = false,
}: EtapaFluxoProps) {
  return (
    <View style={styles.etapaFluxo}>
      <View style={styles.areaMarcadorFluxo}>
        <View style={styles.iconeFluxo}>
          <Ionicons
            name={icone}
            size={20}
            color={Cores.fundo}
          />
        </View>

        {!ultima ? (
          <View style={styles.linhaFluxo} />
        ) : null}
      </View>

      <View style={styles.conteudoFluxo}>
        <Text style={styles.tituloFluxo}>
          {titulo}
        </Text>

        <Text style={styles.descricaoFluxo}>
          {descricao}
        </Text>
      </View>
    </View>
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

function criarAnimacaoGPS(
  valor: Animated.Value,
) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(valor, {
        toValue: 1,
        duration: 1800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(valor, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),

      Animated.delay(450),
    ]),
  );
}

function criarAnimacaoSOS(
  valor: Animated.Value,
) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(valor, {
        toValue: 1,
        duration: 230,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(valor, {
        toValue: 0,
        duration: 230,
        useNativeDriver: true,
      }),

      Animated.delay(1300),
    ]),
  );
}

function criarAnimacaoCoracao(
  valor: Animated.Value,
) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(valor, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }),

      Animated.timing(valor, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),

      Animated.timing(valor, {
        toValue: 0.7,
        duration: 130,
        useNativeDriver: true,
      }),

      Animated.timing(valor, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),

      Animated.delay(1250),
    ]),
  );
}

function criarAnimacaoQueda(
  valor: Animated.Value,
) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(valor, {
        toValue: 1,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.delay(1450),

      Animated.timing(valor, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]),
  );
}

function pulsarQuantidade(
  valor: Animated.Value,
  quantidade: number,
) {
  const animacoes: Animated.CompositeAnimation[] =
    [];

  for (let indice = 0; indice < quantidade; indice += 1) {
    animacoes.push(
      Animated.timing(valor, {
        toValue: 1.18,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.timing(valor, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.delay(90),
    );
  }

  return Animated.sequence(animacoes);
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
          outputRange: [-38, 0],
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
    maxWidth: 560,

    alignSelf: 'center',

    paddingHorizontal:
      Espacamentos.margemHorizontal,

    paddingTop:
      Platform.OS === 'android' ? 54 : 43,

    paddingBottom: 90,
  },

  fundoDecorativo: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },

  formaSuperior: {
    position: 'absolute',

    width: 360,
    height: 360,

    top: -210,
    right: -130,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.06)',
  },

  formaInferior: {
    position: 'absolute',

    width: 420,
    height: 420,

    bottom: -280,
    left: -225,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.06)',
  },

  bolha: {
    position: 'absolute',

    borderRadius: Bordas.circular,
    borderWidth: 1,

    borderColor:
      'rgba(255, 255, 255, 0.17)',

    backgroundColor:
      'rgba(255, 255, 255, 0.06)',
  },

  bolhaUm: {
    width: 24,
    height: 24,

    top: '23%',
    left: '10%',
  },

  bolhaDois: {
    width: 48,
    height: 48,

    top: '68%',
    right: '8%',
  },

  bolhaTres: {
    width: 15,
    height: 15,

    top: '46%',
    right: '20%',
  },

  gradePontos: {
    position: 'absolute',

    top: 235,
    right: 17,

    width: 78,

    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  pontoGrade: {
    width: 3,
    height: 3,

    margin: 5,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.20)',
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  botaoVoltar: {
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

  seloTecnologia: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: Bordas.circular,

    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.24)',

    backgroundColor:
      'rgba(255, 255, 255, 0.09)',
  },

  textoSeloTecnologia: {
    marginLeft: 5,

    fontSize: 8.5,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,

    letterSpacing: 0.6,
  },

  areaHero: {
    position: 'relative',

    height: 310,

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 12,
  },

  brilhoRelogio: {
    position: 'absolute',

    width: 235,
    height: 235,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(111, 204, 255, 0.20)',
  },

  areaRelogio: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  pulseiraSuperior: {
    width: 66,
    height: 52,

    marginBottom: -13,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    backgroundColor: '#19283A',
  },

  corpoRelogio: {
    width: 142,
    height: 164,

    alignItems: 'center',
    justifyContent: 'center',

    padding: 8,

    borderRadius: 37,

    borderWidth: 2,
    borderColor:
      'rgba(255, 255, 255, 0.22)',

    ...Sombras.forte,
  },

  telaRelogio: {
    width: '100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 29,

    backgroundColor: '#101C2A',
  },

  statusRelogio: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 13,
  },

  pontoOnline: {
    width: 6,
    height: 6,

    marginRight: 5,

    borderRadius: Bordas.circular,

    backgroundColor: '#72F0B1',
  },

  textoOnline: {
    fontSize: 9.5,
    fontWeight: Tipografia.pesoExtraBold,

    color:
      'rgba(255, 255, 255, 0.72)',
  },

  textoProtegido: {
    marginTop: 8,

    fontSize: 13,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  linhaBatimento: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 13,
  },

  tracoBatimento: {
    width: 19,
    height: 2,

    backgroundColor:
      'rgba(117, 201, 244, 0.72)',
  },

  picoBatimento: {
    width: 13,
    height: 13,

    marginHorizontal: 2,

    borderLeftWidth: 2,
    borderBottomWidth: 2,

    borderColor: '#75C9F4',

    transform: [{ rotate: '135deg' }],
  },

  pulseiraInferior: {
    width: 66,
    height: 52,

    marginTop: -13,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

    backgroundColor: '#19283A',
  },

  sinalConexao: {
    position: 'absolute',

    flexDirection: 'row',
    alignItems: 'center',

    left: '61%',
    bottom: 89,
  },

  pontoSinal: {
    width: 6,
    height: 6,

    marginHorizontal: 5,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.85)',
  },

  celularMiniatura: {
    position: 'absolute',

    right: '22%',
    bottom: 62,

    width: 58,
    height: 73,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 17,

    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.28)',

    backgroundColor:
      'rgba(255, 255, 255, 0.10)',
  },

  titulo: {
    maxWidth: 430,

    alignSelf: 'center',

    fontSize: 34,
    lineHeight: 40,

    fontWeight: Tipografia.pesoBlack,

    textAlign: 'center',

    color: Cores.fundo,

    letterSpacing: -1,
  },

  descricao: {
    maxWidth: 410,

    alignSelf: 'center',

    marginTop: 11,

    fontSize: Tipografia.textoPequeno,
    lineHeight: 22,

    textAlign: 'center',

    color:
      'rgba(255, 255, 255, 0.82)',
  },

  falaLuma: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 29,

    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.extraGrande,

    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.22)',

    backgroundColor:
      'rgba(7, 35, 67, 0.22)',
  },

  avatarLuma: {
    width: 50,
    height: 50,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.15)',
  },

  letraLuma: {
    fontSize: 23,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  conteudoLuma: {
    flex: 1,

    marginLeft: 13,
  },

  nomeLuma: {
    fontSize: 11,
    fontWeight: Tipografia.pesoBlack,

    color: '#8DD7FA',

    letterSpacing: 0.5,
  },

  textoLuma: {
    marginTop: 4,

    fontSize: Tipografia.legenda,
    lineHeight: 18,

    color:
      'rgba(255, 255, 255, 0.88)',
  },

  areaFluxo: {
    marginTop: 31,

    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.extraGrande,

    backgroundColor:
      'rgba(255, 255, 255, 0.08)',
  },

  tituloSecaoClaro: {
    marginBottom: 20,

    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  fluxo: {
    width: '100%',
  },

  etapaFluxo: {
    flexDirection: 'row',
  },

  areaMarcadorFluxo: {
    width: 46,

    alignItems: 'center',
  },

  iconeFluxo: {
    width: 40,
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.14)',
  },

  linhaFluxo: {
    width: 1,
    minHeight: 35,

    backgroundColor:
      'rgba(255, 255, 255, 0.25)',
  },

  conteudoFluxo: {
    flex: 1,

    paddingLeft: 10,
    paddingBottom: 18,
  },

  tituloFluxo: {
    fontSize: 13,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  descricaoFluxo: {
    marginTop: 3,

    fontSize: Tipografia.legenda,
    lineHeight: 17,

    color:
      'rgba(255, 255, 255, 0.70)',
  },

  areaRecursos: {
    marginTop: 31,
  },

  tituloSecao: {
    marginBottom: Espacamentos.medio,

    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  painelRecursos: {
    width: '100%',

    paddingHorizontal:
      Espacamentos.paddingMedio,

    paddingTop: Espacamentos.paddingMedio,
    paddingBottom: 5,

    borderRadius: Bordas.extraGrande,

    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.19)',

    backgroundColor:
      'rgba(6, 35, 68, 0.22)',
  },

  recurso: {
    minHeight: 92,

    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  areaLinhaRecurso: {
    width: 54,

    alignItems: 'center',
  },

  areaIconeRecurso: {
    width: 46,
    height: 46,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.26)',

    backgroundColor:
      'rgba(255, 255, 255, 0.13)',
  },

  ondaGPS: {
    position: 'absolute',

    width: 34,
    height: 34,

    borderRadius: Bordas.circular,

    borderWidth: 1,
    borderColor: '#91DBFF',
  },

  linhaRecurso: {
    width: 1,
    flex: 1,

    marginTop: 5,

    backgroundColor:
      'rgba(255, 255, 255, 0.20)',
  },

  conteudoRecurso: {
    flex: 1,

    paddingLeft: 12,
    paddingBottom: 22,
  },

  linhaTituloRecurso: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',

    gap: 7,
  },

  tituloRecurso: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  descricaoRecurso: {
    marginTop: 5,

    fontSize: Tipografia.legenda,
    lineHeight: 18,

    color:
      'rgba(255, 255, 255, 0.72)',
  },

  seloEmBreve: {
    paddingHorizontal: 7,
    paddingVertical: 3,

    borderRadius: Bordas.circular,

    borderWidth: 1,
    borderColor:
      'rgba(145, 219, 255, 0.40)',

    backgroundColor:
      'rgba(145, 219, 255, 0.12)',
  },

  textoEmBreve: {
    fontSize: 8,
    fontWeight: Tipografia.pesoBlack,

    color: '#A7E2FF',

    letterSpacing: 0.5,
  },

  areaGestos: {
    marginTop: 23,

    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.extraGrande,

    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.20)',

    backgroundColor:
      'rgba(6, 35, 68, 0.24)',
  },

  cabecalhoGestos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 22,
  },

  conteudoCabecalhoGestos: {
    flex: 1,
  },

  tituloGestos: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  descricaoGestos: {
    marginTop: 3,

    fontSize: Tipografia.legenda,

    color:
      'rgba(255, 255, 255, 0.65)',
  },

  iconeGestos: {
    width: 48,
    height: 48,

    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 12,

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.13)',
  },

  gesto: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  numeroGesto: {
    width: 45,
    height: 45,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.30)',

    backgroundColor:
      'rgba(255, 255, 255, 0.15)',
  },

  textoNumeroGesto: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  conteudoGesto: {
    flex: 1,

    marginLeft: 13,
  },

  tituloGesto: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  textoGesto: {
    marginTop: 4,

    fontSize: Tipografia.legenda,
    lineHeight: 18,

    color:
      'rgba(255, 255, 255, 0.70)',
  },

  divisoriaGestos: {
    height: 1,

    marginVertical: 18,

    backgroundColor:
      'rgba(255, 255, 255, 0.17)',
  },

  avisoCancelamento: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    marginTop: 20,

    padding: Espacamentos.paddingPequeno,

    borderRadius: Bordas.grande,

    backgroundColor:
      'rgba(255, 255, 255, 0.08)',
  },

  textoCancelamento: {
    flex: 1,

    marginLeft: 8,

    fontSize: Tipografia.legenda,
    lineHeight: 17,

    color:
      'rgba(255, 255, 255, 0.68)',
  },

  areaPrivacidade: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 23,

    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.extraGrande,

    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.22)',

    backgroundColor:
      'rgba(5, 31, 61, 0.25)',
  },

  iconePrivacidade: {
    width: 49,
    height: 49,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor:
      'rgba(255, 255, 255, 0.14)',
  },

  conteudoPrivacidade: {
    flex: 1,

    marginLeft: 13,
  },

  tituloPrivacidade: {
    fontSize: 13,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  textoPrivacidade: {
    marginTop: 4,

    fontSize: Tipografia.legenda,
    lineHeight: 18,

    color:
      'rgba(255, 255, 255, 0.76)',
  },

  areaFinal: {
    marginTop: 31,
  },

  statusCompatibilidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 15,
  },

  pontoCompatibilidade: {
    width: 7,
    height: 7,

    marginRight: 7,

    borderRadius: Bordas.circular,

    backgroundColor: '#FFD166',
  },

  textoCompatibilidade: {
    flexShrink: 1,

    fontSize: 11,

    textAlign: 'center',

    color:
      'rgba(255, 255, 255, 0.78)',
  },

  botaoConectar: {
    minHeight: 72,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingLeft: 22,
    paddingRight: 11,

    borderRadius: Bordas.extraGrande,

    backgroundColor: Cores.fundo,

    ...Sombras.media,
  },

  botaoConectarPressionado: {
    opacity: 0.87,
    transform: [{ scale: 0.985 }],
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
    width: 48,
    height: 48,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor: Cores.primaria,
  },

  rodape: {
    maxWidth: 390,

    alignSelf: 'center',

    marginTop: 17,

    fontSize: 11.5,
    lineHeight: 17,

    textAlign: 'center',

    color:
      'rgba(255, 255, 255, 0.76)',
  },

  pressionado: {
    opacity: 0.65,
  },
});