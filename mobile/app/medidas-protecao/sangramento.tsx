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
    | 'shield-outline'
    | 'hand-left-outline'
    | 'layers-outline'
    | 'body-outline'
    | 'call-outline';
  ultimo?: boolean;
};

type SinalProps = {
  icone:
    | 'water-outline'
    | 'color-palette-outline'
    | 'heart-outline'
    | 'moon-outline';
  titulo: string;
  descricao: string;
};

export default function SangramentoScreen() {
  const entradaTopo = useRef(new Animated.Value(0)).current;
  const entradaSinais = useRef(new Animated.Value(0)).current;
  const entradaPassos = useRef(new Animated.Value(0)).current;
  const entradaObjeto = useRef(new Animated.Value(0)).current;
  const entradaInterna = useRef(new Animated.Value(0)).current;
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
      criarEntrada(entradaObjeto, 470),
      criarEntrada(entradaInterna, 470),
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
    entradaInterna,
    entradaNaoFazer,
    entradaObjeto,
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
          '#3D1020',
          '#7A2032',
          '#B94752',
          '#FFF5F5',
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
                name="medical-outline"
                size={14}
                color={Cores.fundo}
              />

              <Text style={styles.textoSelo}>
                CONTROLE DO SANGRAMENTO
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
                name="water-outline"
                size={42}
                color={Cores.fundo}
              />
            </View>

            <Text style={styles.titulo}>
              Como agir em um sangramento
            </Text>

            <Text style={styles.descricao}>
              Pressão direta e ajuda rápida podem
              reduzir a perda de sangue.
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
                Proteja suas mãos, pressione o ferimento
                com firmeza e não retire a primeira
                compressa se ela ficar encharcada.
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
                Sinais de maior gravidade
              </Text>

              <Text style={styles.subtituloSecao}>
                Sangramento intenso pode evoluir
                rapidamente para choque.
              </Text>

              <View style={styles.gradeSinais}>
                <Sinal
                  icone="water-outline"
                  titulo="Sangue em grande quantidade"
                  descricao="Fluxo contínuo, forte ou que encharca panos rapidamente."
                />

                <Sinal
                  icone="color-palette-outline"
                  titulo="Palidez e pele fria"
                  descricao="A pessoa pode ficar pálida, fria ou suada."
                />

                <Sinal
                  icone="heart-outline"
                  titulo="Coração acelerado"
                  descricao="Pulso rápido, fraqueza ou sensação de desmaio."
                />

                <Sinal
                  icone="moon-outline"
                  titulo="Sonolência ou confusão"
                  descricao="Alteração da consciência exige ajuda imediata."
                />
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
                Antes de tocar na vítima, verifique se
                o local está seguro.
              </Text>

              <View style={styles.listaPassos}>
                <Passo
                  numero={1}
                  titulo="Proteja-se"
                  descricao="Use luvas, saco plástico limpo ou outra barreira, quando disponível, para evitar contato direto com o sangue."
                  icone="shield-outline"
                />

                <Passo
                  numero={2}
                  titulo="Faça pressão direta"
                  descricao="Coloque gaze ou pano limpo sobre o ferimento e pressione com firmeza, de forma contínua."
                  icone="hand-left-outline"
                />

                <Passo
                  numero={3}
                  titulo="Não retire a primeira compressa"
                  descricao="Se o sangue atravessar o pano, coloque outro por cima e continue pressionando. Retirar pode desfazer o coágulo."
                  icone="layers-outline"
                />

                <Passo
                  numero={4}
                  titulo="Mantenha a pessoa deitada"
                  descricao="Ajude-a a permanecer imóvel, aquecida e calma. Evite movimentos desnecessários, principalmente após quedas ou acidentes."
                  icone="body-outline"
                />

                <Passo
                  numero={5}
                  titulo="Peça ajuda"
                  descricao="Acione o SAMU 192 em sangramento intenso, trauma grave, alteração da consciência ou sinais de choque."
                  icone="call-outline"
                  ultimo
                />
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaObjeto,
                obterEstiloEntrada(
                  entradaObjeto,
                ),
              ]}
            >
              <View style={styles.cabecalhoObjeto}>
                <View style={styles.iconeObjeto}>
                  <Ionicons
                    name="warning-outline"
                    size={24}
                    color={Cores.fundo}
                  />
                </View>

                <View style={styles.textosObjeto}>
                  <Text style={styles.tituloObjeto}>
                    Há um objeto encravado?
                  </Text>

                  <Text style={styles.subtituloObjeto}>
                    Não tente removê-lo.
                  </Text>
                </View>
              </View>

              <Text style={styles.textoObjeto}>
                O objeto pode estar reduzindo o
                sangramento. Faça pressão ao redor dele,
                sem pressioná-lo diretamente, estabilize
                com panos ou gazes e chame o socorro.
              </Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaInterna,
                obterEstiloEntrada(
                  entradaInterna,
                ),
              ]}
            >
              <View style={styles.cabecalhoInterna}>
                <View style={styles.iconeInterna}>
                  <Ionicons
                    name="scan-outline"
                    size={24}
                    color={stylesTokens.corSangramento}
                  />
                </View>

                <View style={styles.textosInterna}>
                  <Text style={styles.tituloInterna}>
                    Suspeita de hemorragia interna
                  </Text>

                  <Text style={styles.subtituloInterna}>
                    O sangue pode não estar visível.
                  </Text>
                </View>
              </View>

              <ItemInterna
                texto="Dor forte no abdômen ou no peito após queda, colisão ou agressão."
              />

              <ItemInterna
                texto="Manchas roxas extensas, barriga rígida ou inchada."
              />

              <ItemInterna
                texto="Vômito, tosse, urina ou fezes com sangue."
              />

              <ItemInterna
                texto="Palidez, suor frio, fraqueza, confusão ou desmaio."
              />

              <View style={styles.avisoInterna}>
                <Ionicons
                  name="alert-circle-outline"
                  size={19}
                  color={Cores.sos}
                />

                <Text style={styles.textoAvisoInterna}>
                  Mantenha a pessoa deitada, não ofereça
                  água, comida ou medicamentos e chame o
                  SAMU imediatamente.
                </Text>
              </View>
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
                texto="Não retire objetos encravados."
              />

              <ItemNaoFazer
                texto="Não aplique pó, café, álcool, pomadas ou outras substâncias no ferimento."
              />

              <ItemNaoFazer
                texto="Não fique levantando a compressa para verificar se parou."
              />

              <ItemNaoFazer
                texto="Não ofereça água, comida ou remédios em traumas graves ou suspeita de hemorragia interna."
              />

              <ItemNaoFazer
                texto="Não improvise torniquete sem orientação ou treinamento apropriado."
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
                  Chame o SAMU imediatamente se:
                </Text>
              </View>

              <CondicaoEmergencia
                texto="O sangramento for intenso, pulsátil ou não diminuir com pressão direta."
              />

              <CondicaoEmergencia
                texto="A pessoa estiver pálida, fria, confusa, desmaiada ou com dificuldade para respirar."
              />

              <CondicaoEmergencia
                texto="Houver amputação, ferimento profundo, objeto encravado ou trauma por arma."
              />

              <CondicaoEmergencia
                texto="Existir suspeita de hemorragia interna."
              />

              <CondicaoEmergencia
                texto="A vítima usar anticoagulante ou tiver distúrbio de coagulação."
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
                Continue pressionando o ferimento
                enquanto outra pessoa liga para o SAMU.
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
                saúde e emergência. Não substitui
                treinamento ou atendimento profissional.
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
          color={stylesTokens.corSangramento}
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
            color={stylesTokens.corSangramento}
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

function ItemInterna({
  texto,
}: {
  texto: string;
}) {
  return (
    <View style={styles.itemInterna}>
      <View style={styles.pontoInterna} />

      <Text style={styles.textoInterna}>
        {texto}
      </Text>
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
  corSangramento: '#A83246',
  corSangramentoEscura: '#53172A',
  corSangramentoClara: '#FCE7EA',
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
    fontSize: 7.7,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
    letterSpacing: 0.45,
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
      'rgba(40, 5, 18, 0.26)',
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
    color: '#FFC6CF',
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
    backgroundColor: '#FFF5F5',
  },

  tituloSecao: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,
    color: stylesTokens.corSangramentoEscura,
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
    borderColor: 'rgba(168, 50, 70, 0.14)',
    backgroundColor: Cores.fundo,
    ...Sombras.leve,
  },

  iconeSinal: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.grande,
    backgroundColor: stylesTokens.corSangramentoClara,
  },

  tituloSinal: {
    marginTop: 9,
    fontSize: Tipografia.legenda,
    lineHeight: 17,
    fontWeight: Tipografia.pesoBlack,
    color: stylesTokens.corSangramentoEscura,
  },

  descricaoSinal: {
    marginTop: 4,
    fontSize: 10.5,
    lineHeight: 16,
    color: Cores.textoSuave,
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
    backgroundColor: stylesTokens.corSangramento,
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
    backgroundColor: '#F1D7DC',
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
    color: stylesTokens.corSangramentoEscura,
  },

  descricaoPasso: {
    marginTop: 6,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSuave,
  },

  areaObjeto: {
    marginTop: 23,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    backgroundColor: stylesTokens.corSangramentoEscura,
  },

  cabecalhoObjeto: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconeObjeto: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(255, 255, 255, 0.14)',
  },

  textosObjeto: {
    flex: 1,
    marginLeft: 11,
  },

  tituloObjeto: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  subtituloObjeto: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    color: '#FFC6CF',
  },

  textoObjeto: {
    marginTop: 13,
    fontSize: Tipografia.legenda,
    lineHeight: 19,
    color:
      'rgba(255, 255, 255, 0.78)',
  },

  areaInterna: {
    marginTop: 22,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor: 'rgba(168, 50, 70, 0.18)',
    backgroundColor: Cores.fundo,
    ...Sombras.leve,
  },

  cabecalhoInterna: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },

  iconeInterna: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: stylesTokens.corSangramentoClara,
  },

  textosInterna: {
    flex: 1,
    marginLeft: 11,
  },

  tituloInterna: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: stylesTokens.corSangramentoEscura,
  },

  subtituloInterna: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    color: Cores.textoSuave,
  },

  itemInterna: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },

  pontoInterna: {
    width: 7,
    height: 7,
    marginTop: 6,
    borderRadius: Bordas.circular,
    backgroundColor: stylesTokens.corSangramento,
  },

  textoInterna: {
    flex: 1,
    marginLeft: 9,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSecundario,
  },

  avisoInterna: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    backgroundColor: 'rgba(240, 68, 56, 0.06)',
  },

  textoAvisoInterna: {
    flex: 1,
    marginLeft: 8,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSecundario,
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
    backgroundColor: stylesTokens.corSangramentoEscura,
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
