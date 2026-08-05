import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';

import {
  Alert,
  Animated,
  Easing,
  Linking,
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
} from '../../src/tema';

type PassoProps = {
  numero: number;
  titulo: string;
  descricao: string;
  icone:
    | 'stop-circle-outline'
    | 'water-outline'
    | 'remove-circle-outline'
    | 'bandage-outline'
    | 'medkit-outline';
  ultimo?: boolean;
};

type SinalProps = {
  icone:
    | 'color-fill-outline'
    | 'water-outline'
    | 'layers-outline'
    | 'warning-outline';
  titulo: string;
  descricao: string;
};

export default function QueimadurasScreen() {
  const entradaTopo = useRef(new Animated.Value(0)).current;
  const entradaSinais = useRef(new Animated.Value(0)).current;
  const entradaPassos = useRef(new Animated.Value(0)).current;
  const entradaEspeciais = useRef(new Animated.Value(0)).current;
  const entradaNaoFazer = useRef(new Animated.Value(0)).current;
  const entradaEmergencia = useRef(new Animated.Value(0)).current;

  const pulsoEmergencia = useRef(
    new Animated.Value(1),
  ).current;

  const movimentoBolhaUm = useRef(
    new Animated.Value(0),
  ).current;

  const movimentoBolhaDois = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    const animacaoPulso = Animated.loop(
      Animated.sequence([
        Animated.timing(pulsoEmergencia, {
          toValue: 1.045,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(pulsoEmergencia, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.delay(900),
      ]),
    );

    const bolhaUm = criarAnimacaoBolha(
      movimentoBolhaUm,
      6800,
    );

    const bolhaDois = criarAnimacaoBolha(
      movimentoBolhaDois,
      8200,
    );

    animacaoPulso.start();
    bolhaUm.start();
    bolhaDois.start();

    Animated.sequence([
      criarEntrada(entradaTopo, 450),
      criarEntrada(entradaSinais, 450),
      criarEntrada(entradaPassos, 520),
      criarEntrada(entradaEspeciais, 470),
      criarEntrada(entradaNaoFazer, 470),
      criarEntrada(entradaEmergencia, 470),
    ]).start();

    return () => {
      animacaoPulso.stop();
      bolhaUm.stop();
      bolhaDois.stop();
    };
  }, [
    entradaEmergencia,
    entradaEspeciais,
    entradaNaoFazer,
    entradaPassos,
    entradaSinais,
    entradaTopo,
    movimentoBolhaDois,
    movimentoBolhaUm,
    pulsoEmergencia,
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

  async function ligarEmergencia(
    numero: string,
  ) {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Disponível no celular',
        `Em uma emergência, ligue para ${numero}.`,
      );

      return;
    }

    try {
      await Linking.openURL(`tel:${numero}`);
    } catch (erro) {
      console.error(
        'Não foi possível abrir o discador:',
        erro,
      );

      Alert.alert(
        'Não foi possível abrir o telefone',
        `Ligue manualmente para ${numero}.`,
      );
    }
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
          '#4B2748',
          '#A34D54',
          '#EF966E',
          '#FFF6F1',
        ]}
        locations={[0, 0.31, 0.58, 0.58]}
        style={styles.container}
      >
        <View
          pointerEvents="none"
          style={styles.fundoDecorativo}
        >
          <View style={styles.formaSuperior} />

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

            <View style={styles.seloEmergencia}>
              <Ionicons
                name="flame-outline"
                size={14}
                color={Cores.fundo}
              />

              <Text style={styles.textoSelo}>
                CUIDADO IMEDIATO
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.areaHero,
              obterEstiloEntrada(entradaTopo),
            ]}
          >
            <View style={styles.iconeHero}>
              <Ionicons
                name="flame-outline"
                size={42}
                color={Cores.fundo}
              />
            </View>

            <Text style={styles.titulo}>
              Como agir em uma queimadura
            </Text>

            <Text style={styles.descricao}>
              Interrompa a causa, resfrie a região e
              não aplique receitas caseiras.
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.avisoInicial,
              obterEstiloEntrada(entradaSinais),
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
                Use somente água corrente em temperatura
                ambiente. Gelo, pasta de dente, manteiga
                e outros produtos podem piorar a lesão.
              </Text>
            </View>
          </Animated.View>

          <View style={styles.areaClara}>
            <Animated.View
              style={obterEstiloEntrada(
                entradaSinais,
              )}
            >
              <Text style={styles.tituloSecao}>
                Observe a queimadura
              </Text>

              <Text style={styles.subtituloSecao}>
                A aparência ajuda a perceber quando o
                atendimento precisa ser urgente.
              </Text>

              <View style={styles.gradeSinais}>
                <Sinal
                  icone="color-fill-outline"
                  titulo="Vermelhidão e ardência"
                  descricao="Pode ocorrer em queimaduras superficiais."
                />

                <Sinal
                  icone="water-outline"
                  titulo="Bolhas ou inchaço"
                  descricao="Não fure nem retire a pele."
                />

                <Sinal
                  icone="layers-outline"
                  titulo="Pele branca ou escura"
                  descricao="Pode indicar uma lesão profunda."
                />

                <Sinal
                  icone="warning-outline"
                  titulo="Pouca ou nenhuma dor"
                  descricao="Uma queimadura grave também pode doer pouco."
                />
              </View>

              <View style={styles.avisoGravidade}>
                <Ionicons
                  name="information-circle-outline"
                  size={19}
                  color={Cores.primariaEscura}
                />

                <Text style={styles.textoAvisoGravidade}>
                  Não tente definir sozinho o “grau” da
                  queimadura. Profundidade, extensão e
                  região atingida precisam ser avaliadas
                  por um profissional.
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaPassos,
                obterEstiloEntrada(
                  entradaPassos,
                ),
              ]}
            >
              <Text style={styles.tituloSecao}>
                O que fazer
              </Text>

              <Text style={styles.subtituloSecao}>
                Primeiro garanta que o local está seguro.
              </Text>

              <View style={styles.listaPassos}>
                <Passo
                  numero={1}
                  titulo="Interrompa a causa"
                  descricao="Afaste a pessoa do calor, chama, líquido quente ou superfície aquecida sem colocar você em risco."
                  icone="stop-circle-outline"
                />

                <Passo
                  numero={2}
                  titulo="Resfrie com água corrente"
                  descricao="Coloque a região sob água corrente em temperatura ambiente, com jato suave, por aproximadamente 10 minutos."
                  icone="water-outline"
                />

                <Passo
                  numero={3}
                  titulo="Retire objetos apertados"
                  descricao="Remova anéis, relógios e roupas soltas antes que a região inche. Não puxe tecidos grudados na pele."
                  icone="remove-circle-outline"
                />

                <Passo
                  numero={4}
                  titulo="Proteja a região"
                  descricao="Depois de resfriar, cubra suavemente com pano limpo e úmido, sem apertar."
                  icone="bandage-outline"
                />

                <Passo
                  numero={5}
                  titulo="Procure atendimento"
                  descricao="Busque avaliação quando houver bolhas, dor importante, dúvida sobre a profundidade ou qualquer sinal de gravidade."
                  icone="medkit-outline"
                  ultimo
                />
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaEspeciais,
                obterEstiloEntrada(
                  entradaEspeciais,
                ),
              ]}
            >
              <Text style={styles.tituloEspeciais}>
                Situações que exigem cuidado especial
              </Text>

              <SituacaoEspecial
                icone="flash-outline"
                titulo="Queimadura elétrica"
                texto="Não toque na pessoa enquanto houver contato com a corrente. Desligue a energia, se isso puder ser feito com segurança, e chame o socorro."
              />

              <SituacaoEspecial
                icone="flask-outline"
                titulo="Queimadura química"
                texto="Afaste a pessoa do produto sem se contaminar e irrigue a região com bastante água corrente. Procure atendimento urgente."
              />

              <SituacaoEspecial
                icone="shirt-outline"
                titulo="Roupa em chamas"
                texto="Faça a pessoa parar, deitar e rolar. Também é possível abafar as chamas com manta ou tecido grosso, sem usar material inflamável."
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.areaNaoFazer,
                obterEstiloEntrada(
                  entradaNaoFazer,
                ),
              ]}
            >
              <View style={styles.cabecalhoNaoFazer}>
                <View style={styles.iconeNaoFazer}>
                  <Ionicons
                    name="close"
                    size={24}
                    color={Cores.fundo}
                  />
                </View>

                <Text style={styles.tituloNaoFazer}>
                  O que não fazer
                </Text>
              </View>

              <ItemNaoFazer
                texto="Não aplique gelo diretamente."
              />

              <ItemNaoFazer
                texto="Não use pasta de dente, manteiga, óleo, café, pomadas ou receitas caseiras."
              />

              <ItemNaoFazer
                texto="Não fure as bolhas."
              />

              <ItemNaoFazer
                texto="Não retire tecidos grudados, pele solta, graxa ou objetos presos na queimadura."
              />

              <ItemNaoFazer
                texto="Não cubra com algodão ou material que solte fibras."
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.areaChamar,
                obterEstiloEntrada(
                  entradaEmergencia,
                ),
              ]}
            >
              <View style={styles.cabecalhoChamar}>
                <Ionicons
                  name="warning-outline"
                  size={25}
                  color={Cores.sos}
                />

                <Text style={styles.tituloChamar}>
                  Procure socorro imediatamente se:
                </Text>
              </View>

              <CondicaoEmergencia
                texto="A queimadura for extensa, profunda ou tiver pele branca, acinzentada ou carbonizada."
              />

              <CondicaoEmergencia
                texto="Atingir face, olhos, pescoço, mãos, pés, genitais ou grandes articulações."
              />

              <CondicaoEmergencia
                texto="For causada por eletricidade ou produto químico."
              />

              <CondicaoEmergencia
                texto="Houver fumaça inalada, rouquidão, tosse, queimadura dentro da boca ou dificuldade para respirar."
              />

              <CondicaoEmergencia
                texto="A vítima for bebê, idosa, estiver inconsciente ou apresentar sinais de choque."
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.areaEmergencia,
                obterEstiloEntrada(
                  entradaEmergencia,
                ),
              ]}
            >
              <Text style={styles.tituloEmergencia}>
                Precisa de ajuda agora?
              </Text>

              <Text style={styles.textoEmergencia}>
                Em queimaduras graves, o SAMU pode
                orientar as primeiras ações e avaliar o
                envio de uma equipe.
              </Text>

              <Animated.View
                style={{
                  transform: [
                    {
                      scale: pulsoEmergencia,
                    },
                  ],
                }}
              >
                <Pressable
                  onPress={() =>
                    ligarEmergencia('192')
                  }
                  style={({ pressed }) => [
                    styles.botaoSAMU,
                    pressed &&
                      styles.botaoSAMUPressionado,
                  ]}
                >
                  <View style={styles.iconeSAMU}>
                    <Ionicons
                      name="call"
                      size={23}
                      color={Cores.fundo}
                    />
                  </View>

                  <View style={styles.conteudoSAMU}>
                    <Text style={styles.textoLigar}>
                      Ligar para o SAMU
                    </Text>

                    <Text style={styles.numeroSAMU}>
                      192
                    </Text>
                  </View>

                  <Ionicons
                    name="arrow-forward"
                    size={21}
                    color={Cores.fundo}
                  />
                </Pressable>
              </Animated.View>

              <Pressable
                onPress={() =>
                  ligarEmergencia('193')
                }
                style={({ pressed }) => [
                  styles.botaoBombeiros,
                  pressed && styles.pressionado,
                ]}
              >
                <Ionicons
                  name="flame-outline"
                  size={20}
                  color={Cores.sos}
                />

                <Text style={styles.textoBombeiros}>
                  Ou ligar para Bombeiros — 193
                </Text>
              </Pressable>
            </Animated.View>

            <View style={styles.fonte}>
              <Ionicons
                name="document-text-outline"
                size={16}
                color={Cores.textoClaro}
              />

              <Text style={styles.textoFonte}>
                Conteúdo educativo baseado em
                orientações de órgãos públicos de
                saúde. Não substitui treinamento,
                avaliação ou atendimento profissional.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

function Sinal({
  icone,
  titulo,
  descricao,
}: SinalProps) {
  return (
    <View style={styles.sinal}>
      <View style={styles.iconeSinal}>
        <Ionicons
          name={icone}
          size={21}
          color={stylesTokens.corQueimadura}
        />
      </View>

      <Text style={styles.tituloSinal}>
        {titulo}
      </Text>

      <Text style={styles.descricaoSinal}>
        {descricao}
      </Text>
    </View>
  );
}

function Passo({
  numero,
  titulo,
  descricao,
  icone,
  ultimo = false,
}: PassoProps) {
  return (
    <View style={styles.passo}>
      <View style={styles.areaNumeroPasso}>
        <View style={styles.numeroPasso}>
          <Text style={styles.textoNumeroPasso}>
            {numero}
          </Text>
        </View>

        {!ultimo ? (
          <View style={styles.linhaPasso} />
        ) : null}
      </View>

      <View style={styles.conteudoPasso}>
        <View style={styles.linhaTituloPasso}>
          <Ionicons
            name={icone}
            size={19}
            color={stylesTokens.corQueimadura}
          />

          <Text style={styles.tituloPasso}>
            {titulo}
          </Text>
        </View>

        <Text style={styles.descricaoPasso}>
          {descricao}
        </Text>
      </View>
    </View>
  );
}

function SituacaoEspecial({
  icone,
  titulo,
  texto,
}: {
  icone:
    | 'flash-outline'
    | 'flask-outline'
    | 'shirt-outline';
  titulo: string;
  texto: string;
}) {
  return (
    <View style={styles.situacaoEspecial}>
      <View style={styles.iconeSituacaoEspecial}>
        <Ionicons
          name={icone}
          size={21}
          color={stylesTokens.corQueimadura}
        />
      </View>

      <View style={styles.conteudoSituacaoEspecial}>
        <Text style={styles.tituloSituacaoEspecial}>
          {titulo}
        </Text>

        <Text style={styles.textoSituacaoEspecial}>
          {texto}
        </Text>
      </View>
    </View>
  );
}

function ItemNaoFazer({
  texto,
}: {
  texto: string;
}) {
  return (
    <View style={styles.itemNaoFazer}>
      <Ionicons
        name="close-circle-outline"
        size={18}
        color={Cores.sos}
      />

      <Text style={styles.textoNaoFazer}>
        {texto}
      </Text>
    </View>
  );
}

function CondicaoEmergencia({
  texto,
}: {
  texto: string;
}) {
  return (
    <View style={styles.condicaoEmergencia}>
      <View style={styles.pontoCondicao} />

      <Text style={styles.textoCondicao}>
        {texto}
      </Text>
    </View>
  );
}

function criarEntrada(
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

const stylesTokens = {
  corQueimadura: '#C85E4B',
  corQueimaduraEscura: '#713A45',
  corQueimaduraClara: '#FDE8E0',
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  conteudo: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 580,
    alignSelf: 'center',
    paddingTop:
      Platform.OS === 'android' ? 54 : 43,
    paddingBottom: 70,
  },

  fundoDecorativo: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },

  formaSuperior: {
    position: 'absolute',
    width: 350,
    height: 350,
    top: -215,
    right: -135,
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(255, 255, 255, 0.06)',
  },

  bolha: {
    position: 'absolute',
    borderRadius: Bordas.circular,
    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.18)',
    backgroundColor:
      'rgba(255, 255, 255, 0.06)',
  },

  bolhaUm: {
    width: 24,
    height: 24,
    top: 180,
    left: 30,
  },

  bolhaDois: {
    width: 46,
    height: 46,
    top: 430,
    right: 24,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:
      Espacamentos.margemHorizontal,
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

  seloEmergencia: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: Bordas.circular,
    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.23)',
    backgroundColor:
      'rgba(255, 255, 255, 0.09)',
  },

  textoSelo: {
    marginLeft: 5,
    fontSize: 8,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
    letterSpacing: 0.5,
  },

  areaHero: {
    alignItems: 'center',
    paddingHorizontal:
      Espacamentos.margemHorizontal,
    paddingTop: 36,
    paddingBottom: 24,
  },

  iconeHero: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.27)',
    backgroundColor:
      'rgba(255, 255, 255, 0.13)',
  },

  titulo: {
    maxWidth: 430,
    marginTop: 20,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: Tipografia.pesoBlack,
    textAlign: 'center',
    color: Cores.fundo,
    letterSpacing: -1,
  },

  descricao: {
    maxWidth: 400,
    marginTop: 9,
    fontSize: Tipografia.textoPequeno,
    lineHeight: 22,
    textAlign: 'center',
    color:
      'rgba(255, 255, 255, 0.82)',
  },

  avisoInicial: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:
      Espacamentos.margemHorizontal,
    marginBottom: 25,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.21)',
    backgroundColor:
      'rgba(57, 21, 42, 0.25)',
  },

  avatarLuma: {
    width: 49,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(255, 255, 255, 0.15)',
  },

  letraLuma: {
    fontSize: 22,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  conteudoLuma: {
    flex: 1,
    marginLeft: 12,
  },

  nomeLuma: {
    fontSize: 11,
    fontWeight: Tipografia.pesoBlack,
    color: '#FFD7C7',
  },

  textoLuma: {
    marginTop: 4,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color:
      'rgba(255, 255, 255, 0.88)',
  },

  areaClara: {
    minHeight: 700,
    paddingHorizontal:
      Espacamentos.margemHorizontal,
    paddingTop: 29,
    paddingBottom: 46,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: '#FFF6F1',
  },

  tituloSecao: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,
    color: stylesTokens.corQueimaduraEscura,
  },

  subtituloSecao: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSuave,
  },

  gradeSinais: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Espacamentos.paddingPequeno,
  },

  sinal: {
    width: '48%',
    minHeight: 145,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: 'rgba(200, 94, 75, 0.14)',
    backgroundColor: Cores.fundo,
    ...Sombras.leve,
  },

  iconeSinal: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.grande,
    backgroundColor: stylesTokens.corQueimaduraClara,
  },

  tituloSinal: {
    marginTop: 9,
    fontSize: Tipografia.legenda,
    lineHeight: 17,
    fontWeight: Tipografia.pesoBlack,
    color: stylesTokens.corQueimaduraEscura,
  },

  descricaoSinal: {
    marginTop: 4,
    fontSize: 10.5,
    lineHeight: 16,
    color: Cores.textoSuave,
  },

  avisoGravidade: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    backgroundColor: '#FDEDE6',
  },

  textoAvisoGravidade: {
    flex: 1,
    marginLeft: 8,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSecundario,
  },

  areaPassos: {
    marginTop: 31,
  },

  listaPassos: {
    marginTop: 18,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    backgroundColor: Cores.fundo,
    ...Sombras.leve,
  },

  passo: {
    flexDirection: 'row',
  },

  areaNumeroPasso: {
    width: 42,
    alignItems: 'center',
  },

  numeroPasso: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: stylesTokens.corQueimadura,
  },

  textoNumeroPasso: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  linhaPasso: {
    width: 1,
    flex: 1,
    minHeight: 55,
    backgroundColor: '#F0DAD2',
  },

  conteudoPasso: {
    flex: 1,
    paddingLeft: 11,
    paddingBottom: 22,
  },

  linhaTituloPasso: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tituloPasso: {
    flex: 1,
    marginLeft: 7,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: stylesTokens.corQueimaduraEscura,
  },

  descricaoPasso: {
    marginTop: 6,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSuave,
  },

  areaEspeciais: {
    marginTop: 23,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    backgroundColor: stylesTokens.corQueimaduraEscura,
  },

  tituloEspeciais: {
    marginBottom: 15,
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  situacaoEspecial: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },

  iconeSituacaoEspecial: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(255, 255, 255, 0.13)',
  },

  conteudoSituacaoEspecial: {
    flex: 1,
    marginLeft: 11,
  },

  tituloSituacaoEspecial: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  textoSituacaoEspecial: {
    marginTop: 4,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color:
      'rgba(255, 255, 255, 0.76)',
  },

  areaNaoFazer: {
    marginTop: 23,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor:
      'rgba(240, 68, 56, 0.18)',
    backgroundColor:
      'rgba(240, 68, 56, 0.05)',
  },

  cabecalhoNaoFazer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  iconeNaoFazer: {
    width: 39,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: Cores.sos,
  },

  tituloNaoFazer: {
    marginLeft: 10,
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.sos,
  },

  itemNaoFazer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },

  textoNaoFazer: {
    flex: 1,
    marginLeft: 8,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSecundario,
  },

  areaChamar: {
    marginTop: 22,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor:
      'rgba(240, 68, 56, 0.18)',
    backgroundColor: Cores.fundo,
  },

  cabecalhoChamar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  tituloChamar: {
    flex: 1,
    marginLeft: 9,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.sos,
  },

  condicaoEmergencia: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },

  pontoCondicao: {
    width: 7,
    height: 7,
    marginTop: 6,
    borderRadius: Bordas.circular,
    backgroundColor: Cores.sos,
  },

  textoCondicao: {
    flex: 1,
    marginLeft: 9,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSecundario,
  },

  areaEmergencia: {
    marginTop: 25,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    backgroundColor: stylesTokens.corQueimaduraEscura,
  },

  tituloEmergencia: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  textoEmergencia: {
    marginTop: 5,
    marginBottom: 17,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color:
      'rgba(255, 255, 255, 0.76)',
  },

  botaoSAMU: {
    minHeight: 67,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: Bordas.grande,
    backgroundColor: Cores.sos,
  },

  botaoSAMUPressionado: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },

  iconeSAMU: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(255, 255, 255, 0.16)',
  },

  conteudoSAMU: {
    flex: 1,
    marginLeft: 11,
  },

  textoLigar: {
    fontSize: 11.5,
    fontWeight: Tipografia.pesoExtraBold,
    color:
      'rgba(255, 255, 255, 0.80)',
  },

  numeroSAMU: {
    marginTop: 1,
    fontSize: 24,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  botaoBombeiros: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
    paddingVertical: 11,
    borderRadius: Bordas.grande,
    backgroundColor: Cores.fundo,
  },

  textoBombeiros: {
    marginLeft: 7,
    fontSize: Tipografia.legenda,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.sos,
  },

  fonte: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 22,
    paddingHorizontal: 5,
  },

  textoFonte: {
    flex: 1,
    marginLeft: 7,
    fontSize: 10.5,
    lineHeight: 16,
    color: Cores.textoClaro,
  },

  pressionado: {
    opacity: 0.65,
  },
});
