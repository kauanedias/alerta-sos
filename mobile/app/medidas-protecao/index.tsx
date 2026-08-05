import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';

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
    TextInput,
    View,
} from 'react-native';

import {
    Bordas,
    Cores,
    Espacamentos,
    Sombras,
    Tipografia,
} from '../../src/tema';

type NomeIcone =
    | 'fitness-outline'
    | 'flame-outline'
    | 'pulse-outline'
    | 'water-outline'
    | 'bandage-outline'
    | 'flash-outline'
    | 'body-outline'
    | 'sad-outline';

type ConteudoProtecao = {
    id: string;
    titulo: string;
    descricao: string;
    icone: NomeIcone;
    rota?: string;
    destaque?: boolean;
};

const CONTEUDOS: ConteudoProtecao[] = [
    {
        id: 'engasgo',
        titulo: 'Engasgo',
        descricao: 'Bebês, crianças e adultos.',
        icone: 'fitness-outline',
        rota: '/medidas-protecao/engasgo',
        destaque: true,
    },
    {
        id: 'convulsao',
        titulo: 'Convulsão',
        descricao: 'Proteja sem imobilizar.',
        icone: 'pulse-outline',
        rota: '/medidas-protecao/convulsao',
        destaque: true,
    },
    {
        id: 'queimaduras',
        titulo: 'Queimaduras',
        descricao: 'Cuidados nos primeiros minutos.',
        icone: 'flame-outline',
        rota: '/medidas-protecao/queimaduras',
        destaque: true,
    },
    {
        id: 'sangramento',
        titulo: 'Sangramento',
        descricao: 'Controle a perda de sangue.',
        icone: 'bandage-outline',
        rota: '/medidas-protecao/sangramento',
    },
    {
        id: 'desmaio',
        titulo: 'Desmaio',
        descricao: 'O que observar e fazer.',
        icone: 'body-outline',
    },
    {
        id: 'afogamento',
        titulo: 'Afogamento',
        descricao: 'Segurança antes de ajudar.',
        icone: 'water-outline',
    },
    {
        id: 'choque',
        titulo: 'Choque elétrico',
        descricao: 'Não toque antes de avaliar.',
        icone: 'flash-outline',
    },
    {
        id: 'ansiedade',
        titulo: 'Crise de ansiedade',
        descricao: 'Acolhimento e respiração.',
        icone: 'sad-outline',
    },
];

export default function MedidasProtecaoScreen() {
    const [pesquisa, setPesquisa] = useState('');

    const entradaTopo = useRef(
        new Animated.Value(0),
    ).current;

    const entradaLuma = useRef(
        new Animated.Value(0),
    ).current;

    const entradaDestaque = useRef(
        new Animated.Value(0),
    ).current;

    const entradaPesquisa = useRef(
        new Animated.Value(0),
    ).current;

    const entradaCategorias = useRef(
        new Animated.Value(0),
    ).current;

    const entradaEmergencia = useRef(
        new Animated.Value(0),
    ).current;

    const pulsoCoracao = useRef(
        new Animated.Value(1),
    ).current;

    const brilhoDestaque = useRef(
        new Animated.Value(0.18),
    ).current;

    const movimentoBolhaUm = useRef(
        new Animated.Value(0),
    ).current;

    const movimentoBolhaDois = useRef(
        new Animated.Value(0),
    ).current;

    useEffect(() => {
        const animacaoCoracao = Animated.loop(
            Animated.sequence([
                Animated.timing(pulsoCoracao, {
                    toValue: 1.08,
                    duration: 180,
                    useNativeDriver: true,
                }),

                Animated.timing(pulsoCoracao, {
                    toValue: 1,
                    duration: 190,
                    useNativeDriver: true,
                }),

                Animated.delay(140),

                Animated.timing(pulsoCoracao, {
                    toValue: 1.05,
                    duration: 150,
                    useNativeDriver: true,
                }),

                Animated.timing(pulsoCoracao, {
                    toValue: 1,
                    duration: 170,
                    useNativeDriver: true,
                }),

                Animated.delay(1700),
            ]),
        );

        const animacaoBrilho = Animated.loop(
            Animated.sequence([
                Animated.timing(brilhoDestaque, {
                    toValue: 0.36,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),

                Animated.timing(brilhoDestaque, {
                    toValue: 0.18,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
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

        animacaoCoracao.start();
        animacaoBrilho.start();
        bolhaUm.start();
        bolhaDois.start();

        Animated.sequence([
            criarEntrada(entradaTopo, 450),
            criarEntrada(entradaLuma, 450),
            criarEntrada(entradaDestaque, 500),
            criarEntrada(entradaPesquisa, 420),
            criarEntrada(entradaCategorias, 520),
            criarEntrada(entradaEmergencia, 470),
        ]).start();

        return () => {
            animacaoCoracao.stop();
            animacaoBrilho.stop();
            bolhaUm.stop();
            bolhaDois.stop();
        };
    }, [
        brilhoDestaque,
        entradaCategorias,
        entradaDestaque,
        entradaEmergencia,
        entradaLuma,
        entradaPesquisa,
        entradaTopo,
        movimentoBolhaDois,
        movimentoBolhaUm,
        pulsoCoracao,
    ]);

    const conteudosFiltrados = useMemo(() => {
        const termo = pesquisa
            .trim()
            .toLocaleLowerCase('pt-BR');

        if (!termo) {
            return CONTEUDOS;
        }

        return CONTEUDOS.filter((conteudo) => {
            const texto =
                `${conteudo.titulo} ${conteudo.descricao}`
                    .toLocaleLowerCase('pt-BR');

            return texto.includes(termo);
        });
    }, [pesquisa]);

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

    function abrirConteudo(
        conteudo: ConteudoProtecao,
    ) {
        if (!conteudo.rota) {
            Alert.alert(
                'Conteúdo em preparação',
                'Essa orientação será adicionada em uma próxima etapa.',
            );

            return;
        }

        router.push(conteudo.rota as never);
    }

    function abrirEngasgo() {
        router.push(
            '/medidas-protecao/engasgo' as never,
        );
    }

    async function abrirDiscador(
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
                    '#17345E',
                    '#205F99',
                    '#3C9BD0',
                    '#EAF6FF',
                ]}
                locations={[0, 0.32, 0.61, 0.61]}
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

                    <View style={styles.gradePontos}>
                        {Array.from({ length: 20 }).map(
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
                    keyboardShouldPersistTaps="handled"
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

                        <View style={styles.seloEducativo}>
                            <Ionicons
                                name="school-outline"
                                size={14}
                                color={Cores.fundo}
                            />

                            <Text style={styles.textoSelo}>
                                CONTEÚDO EDUCATIVO
                            </Text>
                        </View>
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.areaHero,
                            obterEstiloEntrada(entradaTopo),
                        ]}
                    >
                        <Animated.View
                            style={[
                                styles.iconeHero,
                                {
                                    transform: [
                                        {
                                            scale: pulsoCoracao,
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Ionicons
                                name="heart"
                                size={39}
                                color={Cores.fundo}
                            />
                        </Animated.View>

                        <Text style={styles.titulo}>
                            Aprenda a agir
                        </Text>

                        <Text style={styles.descricao}>
                            Conhecimento pode fazer diferença
                            enquanto a ajuda está a caminho.
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
                                Você não precisa decorar tudo. Quando
                                precisar, eu ajudo a encontrar a
                                orientação certa.
                            </Text>
                        </View>
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.areaDestaque,
                            obterEstiloEntrada(
                                entradaDestaque,
                            ),
                        ]}
                    >
                        <Animated.View
                            pointerEvents="none"
                            style={[
                                styles.brilhoDestaque,
                                {
                                    opacity: brilhoDestaque,
                                },
                            ]}
                        />

                        <LinearGradient
                            colors={[
                                '#FFFFFF',
                                '#EDF7FF',
                            ]}
                            style={styles.cardDestaque}
                        >
                            <View style={styles.topoDestaque}>
                                <View style={styles.seloDoDia}>
                                    <Ionicons
                                        name="sparkles"
                                        size={13}
                                        color={Cores.primaria}
                                    />

                                    <Text style={styles.textoSeloDoDia}>
                                        APRENDIZADO DO DIA
                                    </Text>
                                </View>

                                <View style={styles.tempoLeitura}>
                                    <Ionicons
                                        name="time-outline"
                                        size={14}
                                        color={Cores.textoSuave}
                                    />

                                    <Text style={styles.textoTempo}>
                                        2 min
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.conteudoDestaque}>
                                <View style={styles.iconeDestaque}>
                                    <Ionicons
                                        name="fitness-outline"
                                        size={30}
                                        color={Cores.primaria}
                                    />
                                </View>

                                <View style={styles.textosDestaque}>
                                    <Text style={styles.tituloDestaque}>
                                        Como agir em um engasgo?
                                    </Text>

                                    <Text style={styles.descricaoDestaque}>
                                        Aprenda a reconhecer o perigo e
                                        veja como pedir ajuda rapidamente.
                                    </Text>
                                </View>
                            </View>

                            <Pressable
                                onPress={abrirEngasgo}
                                style={({ pressed }) => [
                                    styles.botaoAprender,
                                    pressed &&
                                    styles.botaoAprenderPressionado,
                                ]}
                            >
                                <Text style={styles.textoBotaoAprender}>
                                    Aprender agora
                                </Text>

                                <View style={styles.setaAprender}>
                                    <Ionicons
                                        name="arrow-forward"
                                        size={18}
                                        color={Cores.fundo}
                                    />
                                </View>
                            </Pressable>
                        </LinearGradient>
                    </Animated.View>

                    <View style={styles.areaClara}>
                        <Animated.View
                            style={obterEstiloEntrada(
                                entradaPesquisa,
                            )}
                        >
                            <View style={styles.campoPesquisa}>
                                <Ionicons
                                    name="search-outline"
                                    size={21}
                                    color={Cores.textoClaro}
                                />

                                <TextInput
                                    value={pesquisa}
                                    onChangeText={setPesquisa}
                                    placeholder="Pesquisar uma emergência"
                                    placeholderTextColor={
                                        Cores.textoPlaceholder
                                    }
                                    autoCorrect={false}
                                    style={styles.inputPesquisa}
                                />

                                {pesquisa ? (
                                    <Pressable
                                        onPress={() => setPesquisa('')}
                                        hitSlop={10}
                                    >
                                        <Ionicons
                                            name="close-circle"
                                            size={20}
                                            color={Cores.textoClaro}
                                        />
                                    </Pressable>
                                ) : null}
                            </View>
                        </Animated.View>

                        <Animated.View
                            style={[
                                styles.areaCategorias,
                                obterEstiloEntrada(
                                    entradaCategorias,
                                ),
                            ]}
                        >
                            <View style={styles.cabecalhoSecao}>
                                <View>
                                    <Text style={styles.tituloSecao}>
                                        Emergências e cuidados
                                    </Text>

                                    <Text style={styles.subtituloSecao}>
                                        Escolha um assunto para aprender.
                                    </Text>
                                </View>

                                <Text style={styles.quantidade}>
                                    {conteudosFiltrados.length}
                                </Text>
                            </View>

                            {conteudosFiltrados.length > 0 ? (
                                <View style={styles.gradeCategorias}>
                                    {conteudosFiltrados.map(
                                        (conteudo) => (
                                            <CardCategoria
                                                key={conteudo.id}
                                                conteudo={conteudo}
                                                onPress={() =>
                                                    abrirConteudo(conteudo)
                                                }
                                            />
                                        ),
                                    )}
                                </View>
                            ) : (
                                <View style={styles.semResultado}>
                                    <Ionicons
                                        name="search-outline"
                                        size={31}
                                        color={Cores.textoClaro}
                                    />

                                    <Text
                                        style={styles.tituloSemResultado}
                                    >
                                        Nenhum conteúdo encontrado
                                    </Text>

                                    <Text
                                        style={styles.textoSemResultado}
                                    >
                                        Tente pesquisar usando outra
                                        palavra.
                                    </Text>
                                </View>
                            )}
                        </Animated.View>

                        <Animated.View
                            style={[
                                styles.avisoEducativo,
                                obterEstiloEntrada(
                                    entradaEmergencia,
                                ),
                            ]}
                        >
                            <View style={styles.iconeAviso}>
                                <Ionicons
                                    name="medical-outline"
                                    size={25}
                                    color={Cores.fundo}
                                />
                            </View>

                            <View style={styles.conteudoAviso}>
                                <Text style={styles.tituloAviso}>
                                    Em uma emergência real
                                </Text>

                                <Text style={styles.textoAviso}>
                                    Ligue para um serviço de emergência
                                    e siga as orientações do atendente.
                                </Text>
                            </View>
                        </Animated.View>

                        <Animated.View
                            style={[
                                styles.areaTelefones,
                                obterEstiloEntrada(
                                    entradaEmergencia,
                                ),
                            ]}
                        >
                            <BotaoEmergencia
                                titulo="SAMU"
                                numero="192"
                                icone="medkit-outline"
                                onPress={() =>
                                    abrirDiscador('192')
                                }
                            />

                            <BotaoEmergencia
                                titulo="Bombeiros"
                                numero="193"
                                icone="flame-outline"
                                onPress={() =>
                                    abrirDiscador('193')
                                }
                            />
                        </Animated.View>

                        <Text style={styles.rodape}>
                            Conteúdo educativo. Não substitui
                            avaliação, treinamento ou atendimento
                            profissional.
                        </Text>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

type CardCategoriaProps = {
    conteudo: ConteudoProtecao;
    onPress: () => void;
};

function CardCategoria({
    conteudo,
    onPress,
}: CardCategoriaProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.cardCategoria,
                pressed && styles.cardPressionado,
            ]}
        >
            <View style={styles.iconeCategoria}>
                <Ionicons
                    name={conteudo.icone}
                    size={24}
                    color={Cores.primaria}
                />
            </View>

            <Text style={styles.tituloCategoria}>
                {conteudo.titulo}
            </Text>

            <Text style={styles.descricaoCategoria}>
                {conteudo.descricao}
            </Text>

            <View style={styles.rodapeCategoria}>
                <Text style={styles.textoAbrir}>
                    {conteudo.rota
                        ? 'Aprender'
                        : 'Em breve'}
                </Text>

                <Ionicons
                    name="arrow-forward"
                    size={15}
                    color={Cores.primaria}
                />
            </View>
        </Pressable>
    );
}

type BotaoEmergenciaProps = {
    titulo: string;
    numero: string;
    icone:
    | 'medkit-outline'
    | 'flame-outline';
    onPress: () => void;
};

function BotaoEmergencia({
    titulo,
    numero,
    icone,
    onPress,
}: BotaoEmergenciaProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.botaoEmergencia,
                pressed && styles.cardPressionado,
            ]}
        >
            <View style={styles.iconeTelefone}>
                <Ionicons
                    name={icone}
                    size={20}
                    color={Cores.sos}
                />
            </View>

            <View>
                <Text style={styles.tituloTelefone}>
                    {titulo}
                </Text>

                <Text style={styles.numeroTelefone}>
                    {numero}
                </Text>
            </View>

            <Ionicons
                name="call-outline"
                size={20}
                color={Cores.sos}
            />
        </Pressable>
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

        width: 340,
        height: 340,

        top: -205,
        right: -125,

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
        width: 25,
        height: 25,

        top: 170,
        left: 34,
    },

    bolhaDois: {
        width: 48,
        height: 48,

        top: 460,
        right: 26,
    },

    gradePontos: {
        position: 'absolute',

        top: 220,
        right: 16,

        width: 72,

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

    seloEducativo: {
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

        paddingTop: 38,
        paddingBottom: 25,
    },

    iconeHero: {
        width: 76,
        height: 76,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: Bordas.circular,

        borderWidth: 1,
        borderColor:
            'rgba(255, 255, 255, 0.28)',

        backgroundColor:
            'rgba(255, 255, 255, 0.13)',
    },

    titulo: {
        marginTop: 20,

        fontSize: 36,
        lineHeight: 42,

        fontWeight: Tipografia.pesoBlack,

        textAlign: 'center',

        color: Cores.fundo,

        letterSpacing: -1,
    },

    descricao: {
        maxWidth: 400,

        marginTop: 10,

        fontSize: Tipografia.textoPequeno,
        lineHeight: 22,

        textAlign: 'center',

        color:
            'rgba(255, 255, 255, 0.82)',
    },

    falaLuma: {
        flexDirection: 'row',
        alignItems: 'center',

        marginHorizontal:
            Espacamentos.margemHorizontal,

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

    areaDestaque: {
        position: 'relative',

        marginHorizontal:
            Espacamentos.margemHorizontal,

        marginTop: 24,
        marginBottom: 27,
    },

    brilhoDestaque: {
        position: 'absolute',

        left: 15,
        right: 15,
        top: 14,
        bottom: -9,

        borderRadius: Bordas.extraGrande,

        backgroundColor:
            'rgba(159, 224, 255, 0.65)',
    },

    cardDestaque: {
        padding: Espacamentos.paddingMedio,

        borderRadius: Bordas.extraGrande,

        ...Sombras.media,
    },

    topoDestaque: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    seloDoDia: {
        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 9,
        paddingVertical: 5,

        borderRadius: Bordas.circular,

        backgroundColor: Cores.primariaClara,
    },

    textoSeloDoDia: {
        marginLeft: 5,

        fontSize: 8.5,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.primaria,

        letterSpacing: 0.5,
    },

    tempoLeitura: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    textoTempo: {
        marginLeft: 4,

        fontSize: 11,

        color: Cores.textoSuave,
    },

    conteudoDestaque: {
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 17,
    },

    iconeDestaque: {
        width: 60,
        height: 60,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: Bordas.extraGrande,

        backgroundColor: Cores.primariaClara,
    },

    textosDestaque: {
        flex: 1,

        marginLeft: 14,
    },

    tituloDestaque: {
        fontSize: Tipografia.textoGrande,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.primariaEscura,
    },

    descricaoDestaque: {
        marginTop: 5,

        fontSize: Tipografia.legenda,
        lineHeight: 18,

        color: Cores.textoSuave,
    },

    botaoAprender: {
        minHeight: 52,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginTop: 17,

        paddingLeft: 17,
        paddingRight: 7,

        borderRadius: Bordas.grande,

        backgroundColor: Cores.primaria,
    },

    botaoAprenderPressionado: {
        opacity: 0.85,
        transform: [{ scale: 0.985 }],
    },

    textoBotaoAprender: {
        fontSize: Tipografia.textoPequeno,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.fundo,
    },

    setaAprender: {
        width: 39,
        height: 39,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: Bordas.circular,

        backgroundColor:
            'rgba(255, 255, 255, 0.18)',
    },

    areaClara: {
        minHeight: 600,

        paddingHorizontal:
            Espacamentos.margemHorizontal,

        paddingTop: 28,
        paddingBottom: 45,

        borderTopLeftRadius: 34,
        borderTopRightRadius: 34,

        backgroundColor: '#EAF6FF',
    },

    campoPesquisa: {
        minHeight: 57,

        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 16,

        borderRadius: Bordas.grande,
        borderWidth: 1,

        borderColor: Cores.bordaMuitoSuave,

        backgroundColor: Cores.fundo,

        ...Sombras.leve,
    },

    inputPesquisa: {
        flex: 1,

        height: 55,

        marginHorizontal: 10,

        fontSize: Tipografia.textoPequeno,

        color: Cores.texto,
    },

    areaCategorias: {
        marginTop: 27,
    },

    cabecalhoSecao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginBottom: 16,
    },

    tituloSecao: {
        fontSize: Tipografia.textoGrande,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.primariaEscura,
    },

    subtituloSecao: {
        marginTop: 3,

        fontSize: Tipografia.legenda,

        color: Cores.textoSuave,
    },

    quantidade: {
        minWidth: 36,

        paddingVertical: 8,

        borderRadius: Bordas.circular,

        fontSize: Tipografia.textoPequeno,
        fontWeight: Tipografia.pesoBlack,

        textAlign: 'center',

        color: Cores.primaria,

        backgroundColor: Cores.primariaClara,
    },

    gradeCategorias: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        gap: Espacamentos.paddingPequeno,
    },

    cardCategoria: {
        width: '48%',
        minHeight: 157,

        padding: Espacamentos.paddingMedio,

        borderRadius: Bordas.grande,
        borderWidth: 1,

        borderColor: Cores.bordaMuitoSuave,

        backgroundColor: Cores.fundo,

        ...Sombras.leve,
    },

    cardPressionado: {
        opacity: 0.72,
        transform: [{ scale: 0.98 }],
    },

    iconeCategoria: {
        width: 44,
        height: 44,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: Bordas.grande,

        backgroundColor: Cores.primariaClara,
    },

    tituloCategoria: {
        marginTop: 12,

        fontSize: Tipografia.textoPequeno,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.primariaEscura,
    },

    descricaoCategoria: {
        flex: 1,

        marginTop: 4,

        fontSize: Tipografia.legenda,
        lineHeight: 17,

        color: Cores.textoSuave,
    },

    rodapeCategoria: {
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 12,
    },

    textoAbrir: {
        marginRight: 5,

        fontSize: 10.5,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.primaria,
    },

    semResultado: {
        alignItems: 'center',

        paddingVertical: 45,
    },

    tituloSemResultado: {
        marginTop: 12,

        fontSize: Tipografia.textoPequeno,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.primariaEscura,
    },

    textoSemResultado: {
        marginTop: 5,

        fontSize: Tipografia.legenda,

        color: Cores.textoSuave,
    },

    avisoEducativo: {
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 30,

        padding: Espacamentos.paddingMedio,

        borderRadius: Bordas.extraGrande,

        backgroundColor: Cores.primariaEscura,
    },

    iconeAviso: {
        width: 47,
        height: 47,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: Bordas.circular,

        backgroundColor:
            'rgba(255, 255, 255, 0.14)',
    },

    conteudoAviso: {
        flex: 1,

        marginLeft: 12,
    },

    tituloAviso: {
        fontSize: Tipografia.textoPequeno,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.fundo,
    },

    textoAviso: {
        marginTop: 4,

        fontSize: Tipografia.legenda,
        lineHeight: 18,

        color:
            'rgba(255, 255, 255, 0.76)',
    },

    areaTelefones: {
        flexDirection: 'row',

        gap: Espacamentos.paddingPequeno,

        marginTop: 13,
    },

    botaoEmergencia: {
        flex: 1,
        minHeight: 70,

        flexDirection: 'row',
        alignItems: 'center',

        padding: 10,

        borderRadius: Bordas.grande,
        borderWidth: 1,

        borderColor:
            'rgba(240, 68, 56, 0.18)',

        backgroundColor: Cores.fundo,
    },

    iconeTelefone: {
        width: 40,
        height: 40,

        alignItems: 'center',
        justifyContent: 'center',

        marginRight: 8,

        borderRadius: Bordas.circular,

        backgroundColor:
            'rgba(240, 68, 56, 0.09)',
    },

    tituloTelefone: {
        fontSize: 11,
        fontWeight: Tipografia.pesoExtraBold,

        color: Cores.textoSecundario,
    },

    numeroTelefone: {
        marginTop: 1,

        fontSize: Tipografia.textoGrande,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.sos,
    },

    rodape: {
        maxWidth: 420,

        alignSelf: 'center',

        marginTop: 19,

        fontSize: 10.5,
        lineHeight: 16,

        textAlign: 'center',

        color: Cores.textoClaro,
    },

    pressionado: {
        opacity: 0.65,
    },
});