import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

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

import Svg, { Path } from 'react-native-svg';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../../src/tema';

type TipoVitima = 'bebe' | 'maior';

type PassoProps = {
  numero: number;
  titulo: string;
  descricao: string;
  icone:
    | 'call-outline'
    | 'hand-left-outline'
    | 'repeat-outline'
    | 'eye-outline'
    | 'body-outline'
    | 'arrow-up-outline';
  ultimo?: boolean;
};

type SinalProps = {
  icone: ReactNode;
  texto: string;
};

type IconeAnatomicoProps = {
  size?: number;
  color?: string;
};

function IconeNariz({
  size = 23,
  color = Cores.primaria,
}: IconeAnatomicoProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 3C12 7.5 10.5 10.5 9 13.5C8.2 15.1 8.8 17 10.6 17.7C12 18.2 13.2 17.5 14 16.5C14.8 17.5 16 18.2 17.4 17.7C19.2 17 19.8 15.1 19 13.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.5 20C10.3 20.6 11.1 21 12 21C12.9 21 13.7 20.6 14.5 20"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function IconeLabios({
  size = 23,
  color = Cores.primaria,
}: IconeAnatomicoProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M3 12C5.7 8.8 8.5 7 12 7C15.5 7 18.3 8.8 21 12C18.3 15.2 15.5 17 12 17C8.5 17 5.7 15.2 3 12Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.5 12H20.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M8 9.2C9.1 10 10.3 10.4 12 10.4C13.7 10.4 14.9 10 16 9.2"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function EngasgoScreen() {
  const [tipoVitima, setTipoVitima] =
    useState<TipoVitima>('bebe');

  const entradaTopo = useRef(new Animated.Value(0)).current;
  const entradaSinais = useRef(new Animated.Value(0)).current;
  const entradaSelecao = useRef(new Animated.Value(0)).current;
  const entradaPassos = useRef(new Animated.Value(0)).current;
  const entradaCuidados = useRef(new Animated.Value(0)).current;
  const entradaEmergencia = useRef(new Animated.Value(0)).current;
  const pulsoEmergencia = useRef(new Animated.Value(1)).current;
  const movimentoBolhaUm = useRef(new Animated.Value(0)).current;
  const movimentoBolhaDois = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animacaoPulso = Animated.loop(
      Animated.sequence([
        Animated.timing(pulsoEmergencia, {
          toValue: 1.05,
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

    const bolhaUm = criarAnimacaoBolha(movimentoBolhaUm, 6800);
    const bolhaDois = criarAnimacaoBolha(movimentoBolhaDois, 8200);

    animacaoPulso.start();
    bolhaUm.start();
    bolhaDois.start();

    Animated.sequence([
      criarEntrada(entradaTopo, 450),
      criarEntrada(entradaSinais, 450),
      criarEntrada(entradaSelecao, 450),
      criarEntrada(entradaPassos, 520),
      criarEntrada(entradaCuidados, 470),
      criarEntrada(entradaEmergencia, 470),
    ]).start();

    return () => {
      animacaoPulso.stop();
      bolhaUm.stop();
      bolhaDois.stop();
    };
  }, [
    entradaCuidados,
    entradaEmergencia,
    entradaPassos,
    entradaSelecao,
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

  async function ligarEmergencia(numero: string) {
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
      console.error('Não foi possível abrir o discador:', erro);
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
        colors={['#18385F', '#246EA7', '#58B5E2', '#F1F8FD']}
        locations={[0, 0.31, 0.58, 0.58]}
        style={styles.container}
      >
        <View pointerEvents="none" style={styles.fundoDecorativo}>
          <View style={styles.formaSuperior} />

          <Animated.View
            style={[
              styles.bolha,
              styles.bolhaUm,
              {
                transform: [{ translateY: deslocamentoBolhaUm }],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.bolha,
              styles.bolhaDois,
              {
                transform: [{ translateY: deslocamentoBolhaDois }],
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
              <Text style={styles.textoVoltar}>Voltar</Text>
            </Pressable>

            <View style={styles.seloEmergencia}>
              <Ionicons
                name="alert-circle-outline"
                size={14}
                color={Cores.fundo}
              />
              <Text style={styles.textoSelo}>AÇÃO RÁPIDA</Text>
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
                name="fitness-outline"
                size={39}
                color={Cores.fundo}
              />
            </View>

            <Text style={styles.titulo}>
              Como agir em um engasgo
            </Text>

            <Text style={styles.descricao}>
              Reconheça os sinais e escolha abaixo quem precisa de ajuda.
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.avisoInicial,
              obterEstiloEntrada(entradaSinais),
            ]}
          >
            <View style={styles.avatarLuma}>
              <Text style={styles.letraLuma}>L</Text>
            </View>

            <View style={styles.conteudoLuma}>
              <Text style={styles.nomeLuma}>Luma</Text>
              <Text style={styles.textoLuma}>
                Se a pessoa não consegue respirar, falar ou tossir,
                trate como uma emergência e peça ajuda imediatamente.
              </Text>
            </View>
          </Animated.View>

          <View style={styles.areaClara}>
            <Animated.View
              style={obterEstiloEntrada(entradaSinais)}
            >
              <Text style={styles.tituloSecao}>Como reconhecer</Text>

              <View style={styles.gradeSinais}>
                <Sinal
                  icone={
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={21}
                      color={Cores.primaria}
                    />
                  }
                  texto="Não consegue falar"
                />

                <Sinal
                  icone={
                    <Ionicons
                      name="volume-mute-outline"
                      size={21}
                      color={Cores.primaria}
                    />
                  }
                  texto="Não consegue tossir"
                />

                <Sinal
                  icone={
                    <IconeNariz
                      size={23}
                      color={Cores.primaria}
                    />
                  }
                  texto="Dificuldade para respirar"
                />

                <Sinal
                  icone={
                    <IconeLabios
                      size={23}
                      color={Cores.primaria}
                    />
                  }
                  texto="Lábios ficando arroxeados"
                />
              </View>

              <View style={styles.avisoTosse}>
                <Ionicons
                  name="information-circle-outline"
                  size={19}
                  color={Cores.primaria}
                />
                <Text style={styles.textoAvisoTosse}>
                  Se a pessoa ainda consegue tossir com força e respirar,
                  incentive a tosse e observe. Não faça compressões sem necessidade.
                </Text>
              </View>

              <View style={styles.areaTiposObstrucao}>
                <View style={styles.tipoObstrucaoParcial}>
                  <View style={styles.cabecalhoTipoObstrucao}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={21}
                      color={Cores.sucesso}
                    />

                    <Text style={styles.tituloObstrucaoParcial}>
                      Obstrução parcial
                    </Text>
                  </View>

                  <Text style={styles.textoTipoObstrucao}>
                    A pessoa ainda consegue tossir, respirar ou emitir sons.
                    Incentive a tosse, observe e não a deixe sozinha.
                  </Text>
                </View>

                <View style={styles.tipoObstrucaoTotal}>
                  <View style={styles.cabecalhoTipoObstrucao}>
                    <Ionicons
                      name="alert-circle-outline"
                      size={21}
                      color={Cores.sos}
                    />

                    <Text style={styles.tituloObstrucaoTotal}>
                      Obstrução total
                    </Text>
                  </View>

                  <Text style={styles.textoTipoObstrucao}>
                    A pessoa não consegue falar, tossir ou respirar.
                    Inicie as manobras e peça ajuda imediatamente.
                  </Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaEscolha,
                obterEstiloEntrada(entradaSelecao),
              ]}
            >
              <Text style={styles.tituloSecao}>Quem está engasgado?</Text>
              <Text style={styles.subtituloSecao}>
                A técnica muda conforme a idade.
              </Text>

              <View style={styles.opcoes}>
                <Pressable
                  onPress={() => setTipoVitima('bebe')}
                  style={({ pressed }) => [
                    styles.opcao,
                    tipoVitima === 'bebe' && styles.opcaoSelecionada,
                    pressed && styles.pressionado,
                  ]}
                >
                  <View
                    style={[
                      styles.iconeOpcao,
                      tipoVitima === 'bebe' &&
                        styles.iconeOpcaoSelecionada,
                    ]}
                  >
                    <Ionicons
                      name="happy-outline"
                      size={25}
                      color={
                        tipoVitima === 'bebe'
                          ? Cores.fundo
                          : Cores.primaria
                      }
                    />
                  </View>

                  <Text
                    style={[
                      styles.tituloOpcao,
                      tipoVitima === 'bebe' &&
                        styles.textoOpcaoSelecionada,
                    ]}
                  >
                    Bebê
                  </Text>

                  <Text
                    style={[
                      styles.textoOpcao,
                      tipoVitima === 'bebe' &&
                        styles.textoOpcaoSelecionada,
                    ]}
                  >
                    Menor de 1 ano
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setTipoVitima('maior')}
                  style={({ pressed }) => [
                    styles.opcao,
                    tipoVitima === 'maior' && styles.opcaoSelecionada,
                    pressed && styles.pressionado,
                  ]}
                >
                  <View
                    style={[
                      styles.iconeOpcao,
                      tipoVitima === 'maior' &&
                        styles.iconeOpcaoSelecionada,
                    ]}
                  >
                    <Ionicons
                      name="people-outline"
                      size={25}
                      color={
                        tipoVitima === 'maior'
                          ? Cores.fundo
                          : Cores.primaria
                      }
                    />
                  </View>

                  <Text
                    style={[
                      styles.tituloOpcao,
                      tipoVitima === 'maior' &&
                        styles.textoOpcaoSelecionada,
                    ]}
                  >
                    Criança ou adulto
                  </Text>

                  <Text
                    style={[
                      styles.textoOpcao,
                      tipoVitima === 'maior' &&
                        styles.textoOpcaoSelecionada,
                    ]}
                  >
                    A partir de 1 ano
                  </Text>
                </Pressable>
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaPassos,
                obterEstiloEntrada(entradaPassos),
              ]}
            >
              <Text style={styles.tituloSecao}>O que fazer</Text>
              <Text style={styles.subtituloSecao}>
                Peça para outra pessoa ligar para o SAMU enquanto você inicia as manobras.
              </Text>

              <View style={styles.listaPassos}>
                {tipoVitima === 'bebe' ? (
                  <>
                    <Passo
                      numero={1}
                      titulo="Apoie o bebê com segurança"
                      descricao="Coloque-o de bruços sobre seu antebraço, mantendo a cabeça mais baixa que o tronco e sustentando a cabeça e a mandíbula."
                      icone="body-outline"
                    />
                    <Passo
                      numero={2}
                      titulo="Faça 5 golpes nas costas"
                      descricao="Com a base da mão, aplique cinco golpes firmes entre as escápulas, no meio das costas."
                      icone="hand-left-outline"
                    />
                    <Passo
                      numero={3}
                      titulo="Vire o bebê de barriga para cima"
                      descricao="Mantenha a cabeça mais baixa e apoie o bebê com cuidado sobre o outro antebraço."
                      icone="repeat-outline"
                    />
                    <Passo
                      numero={4}
                      titulo="Faça 5 compressões no peito"
                      descricao="Use dois dedos sobre o centro do peito, no esterno, na altura dos mamilos."
                      icone="arrow-up-outline"
                    />
                    <Passo
                      numero={5}
                      titulo="Repita e observe"
                      descricao="Alterne os cinco golpes nas costas e as cinco compressões no peito até o objeto sair ou o socorro chegar."
                      icone="eye-outline"
                      ultimo
                    />
                  </>
                ) : (
                  <>
                    <Passo
                      numero={1}
                      titulo="Incline a pessoa para a frente"
                      descricao="Fique ao lado e um pouco atrás. Apoie o peito com uma mão e incline o tronco para a frente."
                      icone="body-outline"
                    />

                    <Passo
                      numero={2}
                      titulo="Faça 5 golpes nas costas"
                      descricao="Com a base da mão, dê cinco golpes firmes e separados entre as escápulas."
                      icone="hand-left-outline"
                    />

                    <Passo
                      numero={3}
                      titulo="Posicione-se atrás"
                      descricao="Se for uma criança pequena, ajoelhe-se. Passe os braços ao redor do abdômen."
                      icone="body-outline"
                    />

                    <Passo
                      numero={4}
                      titulo="Faça 5 compressões abdominais"
                      descricao="Posicione o punho acima do umbigo e abaixo do osso do peito. Segure-o com a outra mão e puxe para dentro e para cima."
                      icone="arrow-up-outline"
                    />

                    <Passo
                      numero={5}
                      titulo="Alterne as manobras"
                      descricao="Repita cinco golpes nas costas e cinco compressões abdominais até o objeto sair ou a pessoa ficar inconsciente."
                      icone="repeat-outline"
                      ultimo
                    />
                  </>
                )}
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaSituacoesEspeciais,
                obterEstiloEntrada(entradaCuidados),
              ]}
            >
              <View style={styles.cabecalhoSituacoesEspeciais}>
                <View style={styles.iconeSituacoesEspeciais}>
                  <Ionicons
                    name="accessibility-outline"
                    size={23}
                    color={Cores.fundo}
                  />
                </View>

                <View style={styles.textosSituacoesEspeciais}>
                  <Text style={styles.tituloSituacoesEspeciais}>
                    Gestantes e pessoas com obesidade
                  </Text>

                  <Text style={styles.subtituloSituacoesEspeciais}>
                    A posição das compressões muda.
                  </Text>
                </View>
              </View>

              <Text style={styles.textoSituacoesEspeciais}>
                Faça cinco golpes nas costas e, em vez de compressões no abdômen,
                faça cinco compressões no centro do tórax. Continue alternando
                até a desobstrução ou até a pessoa ficar inconsciente.
              </Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaAutoSocorro,
                obterEstiloEntrada(entradaCuidados),
              ]}
            >
              <View style={styles.cabecalhoAutoSocorro}>
                <View style={styles.iconeAutoSocorro}>
                  <Ionicons
                    name="person-outline"
                    size={23}
                    color={Cores.primaria}
                  />
                </View>

                <View style={styles.textosAutoSocorro}>
                  <Text style={styles.tituloAutoSocorro}>
                    Estou sozinho e engasguei
                  </Text>

                  <Text style={styles.subtituloAutoSocorro}>
                    Tente pedir ajuda antes de perder a consciência.
                  </Text>
                </View>
              </View>

              <View style={styles.passoAutoSocorro}>
                <View style={styles.numeroAutoSocorro}>
                  <Text style={styles.textoNumeroAutoSocorro}>1</Text>
                </View>

                <Text style={styles.textoPassoAutoSocorro}>
                  Ligue para o SAMU 192 no viva-voz ou acione o recurso de emergência
                  do celular, mesmo que não consiga falar.
                </Text>
              </View>

              <View style={styles.passoAutoSocorro}>
                <View style={styles.numeroAutoSocorro}>
                  <Text style={styles.textoNumeroAutoSocorro}>2</Text>
                </View>

                <Text style={styles.textoPassoAutoSocorro}>
                  Faça compressões abdominais em si mesmo, colocando o punho acima
                  do umbigo e puxando para dentro e para cima.
                </Text>
              </View>

              <View style={styles.passoAutoSocorro}>
                <View style={styles.numeroAutoSocorro}>
                  <Text style={styles.textoNumeroAutoSocorro}>3</Text>
                </View>

                <Text style={styles.textoPassoAutoSocorro}>
                  Outra opção é pressionar a parte superior do abdômen contra o
                  encosto firme de uma cadeira ou outro apoio sem quinas cortantes.
                </Text>
              </View>

              <View style={styles.avisoAutoSocorro}>
                <Ionicons
                  name="warning-outline"
                  size={18}
                  color={Cores.sos}
                />

                <Text style={styles.textoAvisoAutoSocorro}>
                  Não use objetos pontiagudos, quinas afiadas ou apoios altos que
                  possam provocar queda.
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaDepoisDesengasgo,
                obterEstiloEntrada(entradaCuidados),
              ]}
            >
              <View style={styles.iconeDepoisDesengasgo}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={24}
                  color={Cores.primaria}
                />
              </View>

              <View style={styles.conteudoDepoisDesengasgo}>
                <Text style={styles.tituloDepoisDesengasgo}>
                  Depois que o objeto sair
                </Text>

                <Text style={styles.textoDepoisDesengasgo}>
                  Observe a respiração e o estado da pessoa. Procure avaliação de
                  saúde se houver dor, dificuldade para respirar, tosse persistente,
                  alteração da voz, perda de consciência ou se foram necessárias
                  compressões fortes.
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaNaoFazer,
                obterEstiloEntrada(entradaCuidados),
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

              <ItemNaoFazer texto="Não ofereça água, comida ou outros líquidos." />
              <ItemNaoFazer texto="Não sacuda a pessoa nem pendure o bebê de cabeça para baixo." />
              <ItemNaoFazer texto="Não coloque os dedos na boca às cegas. Retire o objeto apenas se ele estiver visível e acessível." />
            </Animated.View>

            <Animated.View
              style={[
                styles.avisoInconsciente,
                obterEstiloEntrada(entradaCuidados),
              ]}
            >
              <Ionicons
                name="warning-outline"
                size={25}
                color={Cores.sos}
              />

              <View style={styles.conteudoInconsciente}>
                <Text style={styles.tituloInconsciente}>
                  Se a pessoa ficar inconsciente
                </Text>
                <Text style={styles.textoInconsciente}>
                  Coloque-a em uma superfície firme, ligue imediatamente
                  para o SAMU 192 e siga as orientações do atendente.
                  A vítima precisa de atendimento urgente.
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.areaEmergencia,
                obterEstiloEntrada(entradaEmergencia),
              ]}
            >
              <Text style={styles.tituloEmergencia}>
                Precisa de ajuda agora?
              </Text>
              <Text style={styles.textoEmergencia}>
                O SAMU pode orientar as primeiras ações pelo telefone enquanto envia ajuda.
              </Text>

              <Animated.View
                style={{
                  transform: [{ scale: pulsoEmergencia }],
                }}
              >
                <Pressable
                  onPress={() => ligarEmergencia('192')}
                  style={({ pressed }) => [
                    styles.botaoSAMU,
                    pressed && styles.botaoSAMUPressionado,
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
                    <Text style={styles.numeroSAMU}>192</Text>
                  </View>

                  <Ionicons
                    name="arrow-forward"
                    size={21}
                    color={Cores.fundo}
                  />
                </Pressable>
              </Animated.View>

              <Pressable
                onPress={() => ligarEmergencia('193')}
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
                Conteúdo educativo baseado em orientações de órgãos públicos de saúde.
                Não substitui treinamento ou atendimento profissional.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

function Sinal({ icone, texto }: SinalProps) {
  return (
    <View style={styles.sinal}>
      <View style={styles.iconeSinal}>{icone}</View>
      <Text style={styles.textoSinal}>{texto}</Text>
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

        {!ultimo ? <View style={styles.linhaPasso} /> : null}
      </View>

      <View style={styles.conteudoPasso}>
        <View style={styles.linhaTituloPasso}>
          <Ionicons
            name={icone}
            size={19}
            color={Cores.primaria}
          />
          <Text style={styles.tituloPasso}>{titulo}</Text>
        </View>
        <Text style={styles.descricaoPasso}>{descricao}</Text>
      </View>
    </View>
  );
}

function ItemNaoFazer({ texto }: { texto: string }) {
  return (
    <View style={styles.itemNaoFazer}>
      <Ionicons
        name="close-circle-outline"
        size={18}
        color={Cores.sos}
      />
      <Text style={styles.textoNaoFazer}>{texto}</Text>
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

function obterEstiloEntrada(valor: Animated.Value) {
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
    fontSize: 8.5,
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
    backgroundColor: '#F1F8FD',
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
    minHeight: 100,
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

  avisoTosse: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  textoAvisoTosse: {
    flex: 1,
    marginLeft: 8,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSecundario,
  },

  areaTiposObstrucao: {
    marginTop: 16,
    gap: Espacamentos.paddingPequeno,
  },

  tipoObstrucaoParcial: {
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: 'rgba(45, 170, 110, 0.20)',
    backgroundColor: 'rgba(45, 170, 110, 0.07)',
  },

  tipoObstrucaoTotal: {
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: 'rgba(240, 68, 56, 0.20)',
    backgroundColor: 'rgba(240, 68, 56, 0.06)',
  },

  cabecalhoTipoObstrucao: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tituloObstrucaoParcial: {
    marginLeft: 8,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.sucesso,
  },

  tituloObstrucaoTotal: {
    marginLeft: 8,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.sos,
  },

  textoTipoObstrucao: {
    marginTop: 7,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSecundario,
  },

  areaEscolha: {
    marginTop: 30,
  },

  opcoes: {
    flexDirection: 'row',
    gap: Espacamentos.paddingPequeno,
  },

  opcao: {
    flex: 1,
    minHeight: 135,
    alignItems: 'center',
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor: Cores.fundo,
  },

  opcaoSelecionada: {
    borderColor: Cores.primaria,
    backgroundColor: Cores.primaria,
  },

  iconeOpcao: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: Cores.primariaClara,
  },

  iconeOpcaoSelecionada: {
    backgroundColor:
      'rgba(255, 255, 255, 0.17)',
  },

  tituloOpcao: {
    marginTop: 11,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    textAlign: 'center',
    color: Cores.primariaEscura,
  },

  textoOpcao: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    textAlign: 'center',
    color: Cores.textoSuave,
  },

  textoOpcaoSelecionada: {
    color: Cores.fundo,
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

  areaSituacoesEspeciais: {
    marginTop: 25,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor: 'rgba(67, 148, 214, 0.20)',
    backgroundColor: Cores.fundo,
    ...Sombras.leve,
  },

  cabecalhoSituacoesEspeciais: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconeSituacoesEspeciais: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: Cores.primaria,
  },

  textosSituacoesEspeciais: {
    flex: 1,
    marginLeft: 11,
  },

  tituloSituacoesEspeciais: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  subtituloSituacoesEspeciais: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    color: Cores.textoSuave,
  },

  textoSituacoesEspeciais: {
    marginTop: 13,
    fontSize: Tipografia.legenda,
    lineHeight: 19,
    color: Cores.textoSecundario,
  },

  areaAutoSocorro: {
    marginTop: 22,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor: 'rgba(67, 148, 214, 0.20)',
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  cabecalhoAutoSocorro: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },

  iconeAutoSocorro: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: Cores.primariaClara,
  },

  textosAutoSocorro: {
    flex: 1,
    marginLeft: 11,
  },

  tituloAutoSocorro: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  subtituloAutoSocorro: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    lineHeight: 17,
    color: Cores.textoSuave,
  },

  passoAutoSocorro: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 11,
  },

  numeroAutoSocorro: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: Cores.primaria,
  },

  textoNumeroAutoSocorro: {
    fontSize: 12,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  textoPassoAutoSocorro: {
    flex: 1,
    marginLeft: 10,
    fontSize: Tipografia.legenda,
    lineHeight: 19,
    color: Cores.textoSecundario,
  },

  avisoAutoSocorro: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    backgroundColor: 'rgba(240, 68, 56, 0.06)',
  },

  textoAvisoAutoSocorro: {
    flex: 1,
    marginLeft: 8,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSecundario,
  },

  areaDepoisDesengasgo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 22,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor: Cores.fundo,
  },

  iconeDepoisDesengasgo: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: Cores.primariaClara,
  },

  conteudoDepoisDesengasgo: {
    flex: 1,
    marginLeft: 11,
  },

  tituloDepoisDesengasgo: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  textoDepoisDesengasgo: {
    marginTop: 5,
    fontSize: Tipografia.legenda,
    lineHeight: 19,
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

  avisoInconsciente: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 22,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor:
      'rgba(240, 68, 56, 0.18)',
    backgroundColor: Cores.fundo,
  },

  conteudoInconsciente: {
    flex: 1,
    marginLeft: 11,
  },

  tituloInconsciente: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.sos,
  },

  textoInconsciente: {
    marginTop: 5,
    fontSize: Tipografia.legenda,
    lineHeight: 18,
    color: Cores.textoSuave,
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
