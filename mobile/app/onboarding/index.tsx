import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Svg, {
  Circle,
  Line,
  Path,
  Rect,
} from 'react-native-svg';

import { Botao } from '../../src/componentes/Botao';
import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../../src/tema';

type TipoIlustracao = 'sos' | 'saude' | 'protecao';

type PaginaOnboarding = {
  id: string;
  titulo: string;
  descricao: string;
  ilustracao: TipoIlustracao;
};

const paginas: PaginaOnboarding[] = [
  {
    id: '1',
    titulo: 'Ajuda ao alcance de um toque',
    descricao:
      'Acione rapidamente seus contatos e compartilhe sua localização em uma emergência.',
    ilustracao: 'sos',
  },
  {
    id: '2',
    titulo: 'Sua saúde sempre acessível',
    descricao:
      'Mantenha informações importantes organizadas para facilitar o atendimento quando necessário.',
    ilustracao: 'saude',
  },
  {
    id: '3',
    titulo: 'Proteção para você e sua família',
    descricao:
      'Conte com recursos pensados para oferecer mais segurança nos momentos importantes.',
    ilustracao: 'protecao',
  },
];

export default function Onboarding() {
  const { width } = useWindowDimensions();

  const listaRef =
    useRef<FlatList<PaginaOnboarding>>(null);

  const [paginaAtual, setPaginaAtual] = useState(0);

  const movimentoFormaUm =
    useRef(new Animated.Value(0)).current;

  const movimentoFormaDois =
    useRef(new Animated.Value(0)).current;

  const ultimaPagina =
    paginaAtual === paginas.length - 1;

  useEffect(() => {
    const animacaoFormaUm = Animated.loop(
      Animated.sequence([
        Animated.timing(movimentoFormaUm, {
          toValue: 1,
          duration: 6000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(movimentoFormaUm, {
          toValue: 0,
          duration: 6000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const animacaoFormaDois = Animated.loop(
      Animated.sequence([
        Animated.timing(movimentoFormaDois, {
          toValue: 1,
          duration: 7500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(movimentoFormaDois, {
          toValue: 0,
          duration: 7500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animacaoFormaUm.start();
    animacaoFormaDois.start();

    return () => {
      animacaoFormaUm.stop();
      animacaoFormaDois.stop();
    };
  }, [movimentoFormaDois, movimentoFormaUm]);

  const deslocamentoFormaUm =
    movimentoFormaUm.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 28],
    });

  const deslocamentoFormaDois =
    movimentoFormaDois.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -35],
    });

  function avancar() {
    if (ultimaPagina) {
      finalizarOnboarding();
      return;
    }

    const proximaPagina = paginaAtual + 1;

    listaRef.current?.scrollToOffset({
      offset: width * proximaPagina,
      animated: true,
    });

    setPaginaAtual(proximaPagina);
  }

  function finalizarOnboarding() {
    router.replace('/login');
  }

  function atualizarPagina(
    evento: NativeSyntheticEvent<NativeScrollEvent>,
  ) {
    const novaPagina = Math.round(
      evento.nativeEvent.contentOffset.x / width,
    );

    setPaginaAtual(novaPagina);
  }

  return (
    <View style={styles.container}>
      <View style={styles.fundoSuperior} />

      <Animated.View
        style={[
          styles.formaFlutuante,
          styles.formaUm,
          {
            transform: [
              {
                translateY: deslocamentoFormaUm,
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.formaFlutuante,
          styles.formaDois,
          {
            transform: [
              {
                translateY: deslocamentoFormaDois,
              },
            ],
          },
        ]}
      />

      <FlatList
        ref={listaRef}
        data={paginas}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={atualizarPagina}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollToIndexFailed={({ index }) => {
          listaRef.current?.scrollToOffset({
            offset: width * index,
            animated: true,
          });
        }}
        renderItem={({ item, index }) => (
          <Pagina
            pagina={item}
            largura={width}
            ativa={paginaAtual === index}
            ultima={index === paginas.length - 1}
            onPular={finalizarOnboarding}
          />
        )}
      />

      <View style={styles.rodape}>
        <View style={styles.indicadores}>
          {paginas.map((pagina, index) => (
            <View
              key={pagina.id}
              style={[
                styles.indicador,
                paginaAtual === index &&
                  styles.indicadorAtivo,
              ]}
            />
          ))}
        </View>

        <Botao
          titulo={
            ultimaPagina ? 'Começar' : 'Próximo'
          }
          onPress={avancar}
        />
      </View>
    </View>
  );
}

type PaginaProps = {
  pagina: PaginaOnboarding;
  largura: number;
  ativa: boolean;
  ultima: boolean;
  onPular: () => void;
};

function Pagina({
  pagina,
  largura,
  ativa,
  ultima,
  onPular,
}: PaginaProps) {
  const opacidade =
    useRef(new Animated.Value(0)).current;

  const deslocamento =
    useRef(new Animated.Value(30)).current;

  const escala =
    useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (!ativa) {
      opacidade.setValue(0);
      deslocamento.setValue(30);
      escala.setValue(0.9);
      return;
    }

    Animated.parallel([
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(deslocamento, {
        toValue: 0,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(escala, {
        toValue: 1,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();
  }, [ativa, deslocamento, escala, opacidade]);

  return (
    <View style={[styles.pagina, { width: largura }]}>
      <View style={styles.cabecalho}>
        {!ultima ? (
          <Pressable
            onPress={onPular}
            style={({ pressed }) => [
              styles.botaoPular,
              pressed && styles.botaoPularPressionado,
            ]}
          >
            <Text style={styles.textoPular}>Pular</Text>
          </Pressable>
        ) : (
          <View style={styles.espacoPular} />
        )}
      </View>

      <Animated.View
        style={[
          styles.conteudoPagina,
          {
            opacity: opacidade,
            transform: [
              { translateY: deslocamento },
              { scale: escala },
            ],
          },
        ]}
      >
        <Ilustracao tipo={pagina.ilustracao} />

        <Text style={styles.titulo}>
          {pagina.titulo}
        </Text>

        <Text style={styles.descricao}>
          {pagina.descricao}
        </Text>
      </Animated.View>
    </View>
  );
}

type IlustracaoProps = {
  tipo: TipoIlustracao;
};

function Ilustracao({ tipo }: IlustracaoProps) {
  const flutuar =
    useRef(new Animated.Value(0)).current;

  const pulso =
    useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animacaoFlutuar = Animated.loop(
      Animated.sequence([
        Animated.timing(flutuar, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(flutuar, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const animacaoPulso = Animated.loop(
      Animated.sequence([
        Animated.timing(pulso, {
          toValue: 1.05,
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

    animacaoFlutuar.start();
    animacaoPulso.start();

    return () => {
      animacaoFlutuar.stop();
      animacaoPulso.stop();
    };
  }, [flutuar, pulso]);

  const deslocamento = flutuar.interpolate({
    inputRange: [0, 1],
    outputRange: [5, -8],
  });

  return (
    <View style={styles.areaIlustracao}>
      <View style={styles.circuloDecorativoUm} />
      <View style={styles.circuloDecorativoDois} />

      <Animated.View
        style={[
          styles.brilhoIlustracao,
          {
            transform: [{ scale: pulso }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.cartaoIlustracao,
          {
            transform: [
              { translateY: deslocamento },
              { scale: pulso },
            ],
          },
        ]}
      >
        {tipo === 'sos' && <IlustracaoSos />}
        {tipo === 'saude' && <IlustracaoSaude />}
        {tipo === 'protecao' && (
          <IlustracaoProtecao />
        )}
      </Animated.View>
    </View>
  );
}

function IlustracaoSos() {
  return (
    <Svg
      width="210"
      height="210"
      viewBox="0 0 210 210"
    >
      <Circle
        cx="105"
        cy="105"
        r="78"
        fill="#EAF4FF"
      />

      <Circle
        cx="105"
        cy="105"
        r="60"
        fill="#FFFFFF"
        stroke="#B9DDF7"
        strokeWidth="4"
      />

      <Circle
        cx="105"
        cy="105"
        r="44"
        fill="#F04438"
      />

      <Path
        d="M77 41 L67 25"
        stroke="#4FA3E3"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <Path
        d="M133 41 L143 25"
        stroke="#4FA3E3"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <Path
        d="M157 61 L175 50"
        stroke="#4FA3E3"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <Path
        d="M53 61 L35 50"
        stroke="#4FA3E3"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <Path
        d="M79 105
           C82 91 94 84 105 84
           C119 84 130 94 131 108
           C131 128 105 141 105 141
           C105 141 79 128 79 105Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

function IlustracaoSaude() {
  return (
    <Svg
      width="210"
      height="210"
      viewBox="0 0 210 210"
    >
      <Circle
        cx="105"
        cy="105"
        r="78"
        fill="#EAF4FF"
      />

      <Rect
        x="48"
        y="39"
        width="114"
        height="136"
        rx="24"
        fill="#FFFFFF"
        stroke="#B9DDF7"
        strokeWidth="4"
      />

      <Rect
        x="84"
        y="27"
        width="42"
        height="24"
        rx="10"
        fill="#4FA3E3"
      />

      <Circle
        cx="105"
        cy="82"
        r="25"
        fill="#DDF1FF"
      />

      <Rect
        x="98"
        y="64"
        width="14"
        height="36"
        rx="5"
        fill="#4FA3E3"
      />

      <Rect
        x="87"
        y="75"
        width="36"
        height="14"
        rx="5"
        fill="#4FA3E3"
      />

      <Path
        d="M66 132
           H82
           L91 116
           L101 148
           L112 123
           L121 132
           H145"
        fill="none"
        stroke="#F04438"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Line
        x1="67"
        y1="157"
        x2="143"
        y2="157"
        stroke="#D8E8F5"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function IlustracaoProtecao() {
  return (
    <Svg
      width="210"
      height="210"
      viewBox="0 0 210 210"
    >
      <Circle
        cx="105"
        cy="105"
        r="78"
        fill="#EAF4FF"
      />

      <Path
        d="M105 35
           C123 47 143 51 158 54
           V101
           C158 136 137 160 105 176
           C73 160 52 136 52 101
           V54
           C68 51 88 47 105 35Z"
        fill="#4FA3E3"
      />

      <Path
        d="M105 51
           C119 59 134 63 144 65
           V101
           C144 127 129 145 105 158
           C81 145 66 127 66 101
           V65
           C77 63 92 59 105 51Z"
        fill="#FFFFFF"
        opacity="0.2"
      />

      <Circle
        cx="105"
        cy="94"
        r="25"
        fill="#FFFFFF"
      />

      <Path
        d="M91 94
           L101 104
           L120 83"
        fill="none"
        stroke="#4FA3E3"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M82 138
           C88 124 96 117 105 117
           C114 117 122 124 128 138"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: Cores.fundoAzulado,
  },

  fundoSuperior: {
    position: 'absolute',
    top: -190,
    left: -80,
    width: '145%',
    height: 430,
    borderBottomLeftRadius: 220,
    borderBottomRightRadius: 220,
    backgroundColor: Cores.primariaClara,
    transform: [{ rotate: '-4deg' }],
  },

  formaFlutuante: {
    position: 'absolute',
    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(79, 163, 227, 0.10)',
  },

  formaUm: {
    width: 84,
    height: 84,
    top: '18%',
    right: -28,
  },

  formaDois: {
    width: 45,
    height: 45,
    top: '56%',
    left: -12,
  },

  pagina: {
    flex: 1,
  },

  cabecalho: {
    height: 95,
    justifyContent: 'flex-end',
    paddingHorizontal: Espacamentos.margemHorizontal,
  },

  botaoPular: {
    alignSelf: 'flex-end',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
  },

  botaoPularPressionado: {
    opacity: 0.65,
  },

  textoPular: {
    color: Cores.primariaEscura,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoSemiBold,
  },

  espacoPular: {
    height: 38,
  },

  conteudoPagina: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Espacamentos.margemHorizontal,
    paddingBottom: 175,
  },

  areaIlustracao: {
    width: 280,
    height: 285,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brilhoIlustracao: {
    position: 'absolute',
    width: 238,
    height: 238,
    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(79, 163, 227, 0.12)',
  },

  cartaoIlustracao: {
    width: 225,
    height: 225,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 58,
    borderWidth: 1,
    borderColor: 'rgba(79, 163, 227, 0.16)',
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    ...Sombras.media,
  },

  circuloDecorativoUm: {
    position: 'absolute',
    width: 18,
    height: 18,
    top: 31,
    right: 30,
    borderRadius: Bordas.circular,
    backgroundColor: Cores.primaria,
    opacity: 0.35,
  },

  circuloDecorativoDois: {
    position: 'absolute',
    width: 11,
    height: 11,
    bottom: 34,
    left: 36,
    borderRadius: Bordas.circular,
    backgroundColor: Cores.sos,
    opacity: 0.35,
  },

  titulo: {
    maxWidth: 340,
    marginTop: Espacamentos.medio,
    color: Cores.texto,
    fontSize: 28,
    fontWeight: Tipografia.pesoBold,
    lineHeight: 36,
    textAlign: 'center',
  },

  descricao: {
    maxWidth: 345,
    marginTop: Espacamentos.medio,
    color: Cores.textoSecundario,
    fontSize: Tipografia.texto,
    lineHeight: 25,
    textAlign: 'center',
  },

  rodape: {
    position: 'absolute',
    right: Espacamentos.margemHorizontal,
    bottom: 34,
    left: Espacamentos.margemHorizontal,
  },

  indicadores: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: Espacamentos.grande,
  },

  indicador: {
    width: 9,
    height: 9,
    borderRadius: Bordas.circular,
    backgroundColor: '#C6DDED',
  },

  indicadorAtivo: {
    width: 30,
    backgroundColor: Cores.primariaEscura,
  },
});