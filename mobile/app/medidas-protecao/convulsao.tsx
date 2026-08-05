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
    | 'move-outline'
    | 'timer-outline'
    | 'body-outline'
    | 'eye-outline';
  ultimo?: boolean;
};

type SinalProps = {
  icone:
    | 'pulse-outline'
    | 'body-outline'
    | 'eye-off-outline'
    | 'cloudy-outline';
  texto: string;
};

export default function ConvulsaoScreen() {
  const entradaTopo = useRef(new Animated.Value(0)).current;
  const entradaSinais = useRef(new Animated.Value(0)).current;
  const entradaPassos = useRef(new Animated.Value(0)).current;
  const entradaNaoFazer = useRef(new Animated.Value(0)).current;
  const entradaDepois = useRef(new Animated.Value(0)).current;
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
      criarEntrada(entradaNaoFazer, 470),
      criarEntrada(entradaDepois, 470),
      criarEntrada(entradaEmergencia, 470),
    ]).start();

    return () => {
      animacaoPulso.stop();
      bolhaUm.stop();
      bolhaDois.stop();
    };
  }, [
    entradaDepois,
    entradaEmergencia,
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
          '#17365F',
          '#276EA5',
          '#61B5DE',
          '#F2F8FD',
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
                name="alert-circle-outline"
                size={14}
                color={Cores.fundo}
              />

              <Text style={styles.textoSelo}>
                PRIMEIROS SOCORROS
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
                name="pulse-outline"
                size={41}
                color={Cores.fundo}
              />
            </View>

            <Text style={styles.titulo}>
              Como agir em uma convulsão
            </Text>

            <Text style={styles.descricao}>
              Proteja a pessoa, marque o tempo e
              mantenha o ambiente seguro.
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
                Não tente impedir os movimentos e
                nunca coloque objetos ou os dedos na
                boca da pessoa.
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
                Como reconhecer
              </Text>

              <View style={styles.gradeSinais}>
                <Sinal
                  icone="pulse-outline"
                  texto="Movimentos involuntários"
                />

                <Sinal
                  icone="body-outline"
                  texto="Rigidez ou queda repentina"
                />

                <Sinal
                  icone="eye-off-outline"
                  texto="Perda ou alteração da consciência"
                />

                <Sinal
                  icone="cloudy-outline"
                  texto="Confusão após a crise"
                />
              </View>

              <View style={styles.avisoVariacao}>
                <Ionicons
                  name="information-circle-outline"
                  size={19}
                  color={Cores.primaria}
                />

                <Text style={styles.textoAvisoVariacao}>
                  Nem toda convulsão apresenta os
                  mesmos sinais. Algumas crises podem
                  causar apenas olhar parado, ausência
                  de resposta ou movimentos localizados.
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
                O que fazer durante a crise
              </Text>

              <Text style={styles.subtituloSecao}>
                Mantenha a calma e siga estes passos.
              </Text>

              <View style={styles.listaPassos}>
                <Passo
                  numero={1}
                  titulo="Proteja a pessoa"
                  descricao="Ajude-a a se deitar no chão, se for possível fazer isso com segurança. Afaste móveis, objetos cortantes, fogo, água e outros perigos."
                  icone="shield-outline"
                />

                <Passo
                  numero={2}
                  titulo="Proteja a cabeça"
                  descricao="Coloque algo macio sob a cabeça, como uma roupa dobrada, sem bloquear o rosto ou a respiração."
                  icone="body-outline"
                />

                <Passo
                  numero={3}
                  titulo="Afrouxe roupas apertadas"
                  descricao="Afrouxe roupas ao redor do pescoço e retire óculos. Não tente segurar os braços ou as pernas."
                  icone="move-outline"
                />

                <Passo
                  numero={4}
                  titulo="Marque a duração"
                  descricao="Observe o horário de início e cronometre a crise. Essa informação será importante para o atendimento."
                  icone="timer-outline"
                />

                <Passo
                  numero={5}
                  titulo="Observe a respiração"
                  descricao="Permaneça por perto, mantenha outras pessoas afastadas e observe até os movimentos pararem."
                  icone="eye-outline"
                  ultimo
                />
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
                texto="Não segure ou tente impedir os movimentos."
              />

              <ItemNaoFazer
                texto="Não coloque objetos, panos, medicamentos, água ou os dedos na boca."
              />

              <ItemNaoFazer
                texto="Não tente puxar ou desenrolar a língua."
              />

              <ItemNaoFazer
                texto="Não dê água, comida ou remédios até a pessoa estar totalmente acordada."
              />

              <ItemNaoFazer
                texto="Não jogue água no rosto e não sacuda a pessoa."
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.areaDepois,
                obterEstiloEntrada(
                  entradaDepois,
                ),
              ]}
            >
              <View style={styles.cabecalhoDepois}>
                <View style={styles.iconeDepois}>
                  <Ionicons
                    name="heart-outline"
                    size={24}
                    color={Cores.primaria}
                  />
                </View>

                <View style={styles.textosDepois}>
                  <Text style={styles.tituloDepois}>
                    Depois que os movimentos pararem
                  </Text>

                  <Text style={styles.subtituloDepois}>
                    A recuperação pode levar alguns
                    minutos.
                  </Text>
                </View>
              </View>

              <ItemDepois
                texto="Se estiver respirando, coloque a pessoa de lado para facilitar a respiração e permitir a saída de saliva ou vômito."
              />

              <ItemDepois
                texto="Permaneça ao lado dela, fale com calma e explique onde ela está."
              />

              <ItemDepois
                texto="Observe se houve ferimentos, sangramento ou dificuldade para respirar."
              />

              <ItemDepois
                texto="Não ofereça água ou comida até que esteja totalmente consciente e consiga engolir normalmente."
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
                texto="A convulsão durar 5 minutos ou mais."
              />

              <CondicaoEmergencia
                texto="Outra crise começar antes da recuperação."
              />

              <CondicaoEmergencia
                texto="For a primeira convulsão conhecida da pessoa."
              />

              <CondicaoEmergencia
                texto="A pessoa estiver grávida, ferida, na água ou com dificuldade para respirar."
              />

              <CondicaoEmergencia
                texto="Ela não recuperar a consciência ou não voltar a respirar normalmente."
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
                O SAMU pode orientar as primeiras
                ações pelo telefone e avaliar o envio
                de uma equipe.
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
                saúde. Não substitui treinamento ou
                atendimento profissional.
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
  texto,
}: SinalProps) {
  return (
    <View style={styles.sinal}>
      <View style={styles.iconeSinal}>
        <Ionicons
          name={icone}
          size={21}
          color={Cores.primaria}
        />
      </View>

      <Text style={styles.textoSinal}>
        {texto}
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
            color={Cores.primaria}
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

function ItemDepois({
  texto,
}: {
  texto: string;
}) {
  return (
    <View style={styles.itemDepois}>
      <Ionicons
        name="checkmark-circle-outline"
        size={19}
        color={Cores.primaria}
      />

      <Text style={styles.textoItemDepois}>
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
      'rgba(7, 35, 67, 0.22)',
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
    color: '#A2E5FF',
  },

  textoLuma: {
    marginTop: 4,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color:
      'rgba(255, 255, 255, 0.86)',
  },

  areaClara: {
    minHeight: 700,
    paddingHorizontal:
      Espacamentos.margemHorizontal,
    paddingTop: 29,
    paddingBottom: 46,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: '#F2F8FD',
  },

  tituloSecao: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
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
    marginTop: 16,
  },

  sinal: {
    width: '48%',
    minHeight: 105,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor: Cores.fundo,
    ...Sombras.leve,
  },

  iconeSinal: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.grande,
    backgroundColor: Cores.primariaClara,
  },

  textoSinal: {
    marginTop: 9,
    fontSize: Tipografia.legenda,
    lineHeight: 17,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primariaEscura,
  },

  avisoVariacao: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  textoAvisoVariacao: {
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
    backgroundColor: Cores.primaria,
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
    backgroundColor: Cores.divisoria,
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
    color: Cores.primariaEscura,
  },

  descricaoPasso: {
    marginTop: 6,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSuave,
  },

  areaNaoFazer: {
    marginTop: 25,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor:
      'rgba(240, 68, 56, 0.18)',
    backgroundColor:
      'rgba(240, 68, 56, 0.06)',
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

  areaDepois: {
    marginTop: 22,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor: Cores.fundo,
    ...Sombras.leve,
  },

  cabecalhoDepois: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  iconeDepois: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: Cores.primariaClara,
  },

  textosDepois: {
    flex: 1,
    marginLeft: 11,
  },

  tituloDepois: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  subtituloDepois: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    color: Cores.textoSuave,
  },

  itemDepois: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 11,
  },

  textoItemDepois: {
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
    backgroundColor: Cores.primariaEscura,
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
