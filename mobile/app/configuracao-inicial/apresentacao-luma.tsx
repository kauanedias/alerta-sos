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
    Botao,
    MensagemLuma,
    ProgressoCadastro,
} from '../../src/componentes';

import {
    Bordas,
    Cores,
    Espacamentos,
    Sombras,
    Tipografia,
} from '../../src/tema';

export default function ApresentacaoLumaScreen() {
    const parametros = useLocalSearchParams<{
        nome?: string;
    }>();

    const nomePreferido =
        typeof parametros.nome === 'string' &&
            parametros.nome.trim()
            ? parametros.nome.trim()
            : 'você';

    const entradaCabecalho = useRef(
        new Animated.Value(0),
    ).current;

    const entradaConteudo = useRef(
        new Animated.Value(0),
    ).current;

    useEffect(() => {
        Animated.stagger(170, [
            Animated.timing(entradaCabecalho, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),

            Animated.timing(entradaConteudo, {
                toValue: 1,
                duration: 700,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, [entradaCabecalho, entradaConteudo]);

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
        <View style={styles.container}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />

            <View
                pointerEvents="none"
                style={styles.fundoDecorativo}
            >
                <LinearGradient
                    colors={[
                        'rgba(221, 238, 255, 0.95)',
                        'rgba(248, 251, 255, 0)',
                    ]}
                    style={styles.luzSuperior}
                />

                <LinearGradient
                    colors={[
                        'rgba(228, 242, 255, 0)',
                        'rgba(228, 242, 255, 0.75)',
                    ]}
                    style={styles.luzInferior}
                />

                <View style={styles.bolhaUm} />
                <View style={styles.bolhaDois} />

                <View style={styles.gradePontos}>
                    {Array.from({ length: 18 }).map(
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
                        color={Cores.primaria}
                    />

                    <Text style={styles.textoVoltar}>
                        Voltar
                    </Text>
                </Pressable>

                <Animated.View
                    style={{
                        opacity: entradaCabecalho,

                        transform: [
                            {
                                translateY:
                                    entradaCabecalho.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-20, 0],
                                    }),
                            },
                        ],
                    }}
                >
                    <ProgressoCadastro
                        etapaAtual={2}
                        totalEtapas={5}
                        titulo="Conheça a Luma"
                        descricao="Sua assistente durante a configuração do AlertaSOS."
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.areaPrincipal,

                        {
                            opacity: entradaConteudo,

                            transform: [
                                {
                                    translateY:
                                        entradaConteudo.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [35, 0],
                                        }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.areaAvatar}>
                        <LinearGradient
                            colors={[
                                Cores.primaria,
                                Cores.primariaEscura,
                            ]}
                            style={styles.avatar}
                        >
                            <Text style={styles.letraAvatar}>
                                L
                            </Text>
                        </LinearGradient>

                        <View style={styles.statusLuma}>
                            <View style={styles.pontoStatus} />

                            <Text style={styles.textoStatus}>
                                IA do AlertaSOS
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.saudacao}>
                        Olá, {nomePreferido}.
                    </Text>

                    <Text style={styles.tituloPrincipal}>
                        Eu sou a Luma
                    </Text>

                    <Text style={styles.descricaoPrincipal}>
                        Estou aqui para conhecer melhor você e ajudar o
                        AlertaSOS a cuidar da sua segurança.
                    </Text>

                    <MensagemLuma
                        texto={`Vamos conversar um pouco, ${nomePreferido}, vou fazer algumas perguntas simples sobre sua saúde e sobre quem deve ser avisado quando você precisar.`}
                    />

                    <View style={styles.areaInformacoes}>
                        <View style={styles.itemInformacao}>
                            <View style={styles.numeroInformacao}>
                                <Text style={styles.textoNumero}>
                                    1
                                </Text>
                            </View>

                            <View style={styles.conteudoInformacao}>
                                <Text style={styles.tituloInformacao}>
                                    Responda no seu ritmo
                                </Text>

                                <Text style={styles.textoInformacao}>
                                    Preencha apenas as informações que
                                    souber.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemInformacao}>
                            <View style={styles.numeroInformacao}>
                                <Text style={styles.textoNumero}>
                                    2
                                </Text>
                            </View>

                            <View style={styles.conteudoInformacao}>
                                <Text style={styles.tituloInformacao}>
                                    Revise quando quiser
                                </Text>

                                <Text style={styles.textoInformacao}>
                                    Tudo poderá ser alterado depois.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemInformacao}>
                            <View style={styles.numeroInformacao}>
                                <Text style={styles.textoNumero}>
                                    3
                                </Text>
                            </View>

                            <View style={styles.conteudoInformacao}>
                                <Text style={styles.tituloInformacao}>
                                    Informações protegidas
                                </Text>

                                <Text style={styles.textoInformacao}>
                                    Seus dados serão utilizados para
                                    personalizar sua segurança.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Botao
                        titulo="Vamos começar"
                        onPress={continuar}
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
                            size={15}
                            color={Cores.primaria}
                        />

                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Cores.fundoSecundario,
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
            Platform.OS === 'android' ? 52 : 40,

        paddingBottom: 120,
    },

    fundoDecorativo: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },

    luzSuperior: {
        position: 'absolute',

        width: 420,
        height: 420,

        top: -250,
        right: -190,

        borderRadius: 210,
    },

    luzInferior: {
        position: 'absolute',

        width: 380,
        height: 380,

        bottom: -250,
        left: -220,

        borderRadius: 190,
    },

    bolhaUm: {
        position: 'absolute',

        width: 100,
        height: 100,

        top: 170,
        right: -50,

        borderRadius: Bordas.circular,

        backgroundColor:
            'rgba(72, 145, 246, 0.08)',
    },

    bolhaDois: {
        position: 'absolute',

        width: 55,
        height: 55,

        bottom: 170,
        left: -22,

        borderRadius: Bordas.circular,

        backgroundColor:
            'rgba(72, 145, 246, 0.09)',
    },

    gradePontos: {
        position: 'absolute',

        top: 230,
        right: 20,

        width: 70,

        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    pontoGrade: {
        width: 3,
        height: 3,

        margin: 5,

        borderRadius: Bordas.circular,

        backgroundColor:
            'rgba(46, 125, 245, 0.16)',
    },

    botaoVoltar: {
        alignSelf: 'flex-start',

        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: Espacamentos.medio,

        paddingVertical: 7,
        paddingRight: 12,
    },

    textoVoltar: {
        marginLeft: 6,

        fontSize: Tipografia.textoPequeno,
        fontWeight: Tipografia.pesoExtraBold,

        color: Cores.primaria,
    },

    areaPrincipal: {
        width: '100%',

        padding: Espacamentos.paddingGrande,

        borderRadius: Bordas.extraGrande,
        borderWidth: 1,
        borderColor: Cores.bordaMuitoSuave,

        backgroundColor: Cores.fundo,

        ...Sombras.media,
    },

    areaAvatar: {
        alignItems: 'center',

        marginBottom: Espacamentos.grande,
    },

    avatar: {
        width: 92,
        height: 92,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: Bordas.circular,

        ...Sombras.media,
    },

    letraAvatar: {
        fontSize: 39,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.fundo,
    },

    statusLuma: {
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 12,

        paddingHorizontal: 11,
        paddingVertical: 6,

        borderRadius: Bordas.circular,

        backgroundColor: Cores.fundoAzuladoClaro,
    },

    pontoStatus: {
        width: 7,
        height: 7,

        marginRight: 6,

        borderRadius: Bordas.circular,

        backgroundColor: Cores.sucesso,
    },

    textoStatus: {
        fontSize: 11.5,
        fontWeight: Tipografia.pesoSemiBold,

        color: Cores.textoSecundario,
    },

    saudacao: {
        fontSize: Tipografia.textoPequeno,
        fontWeight: Tipografia.pesoExtraBold,

        textAlign: 'center',

        color: Cores.primaria,
    },

    tituloPrincipal: {
        marginTop: 6,

        fontSize: 31,
        lineHeight: 37,

        fontWeight: Tipografia.pesoBlack,

        textAlign: 'center',

        color: Cores.texto,

        letterSpacing: -1,
    },

    descricaoPrincipal: {
        maxWidth: 390,

        alignSelf: 'center',

        marginTop: 9,
        marginBottom: Espacamentos.grande,

        fontSize: Tipografia.textoPequeno,
        lineHeight: 21,

        textAlign: 'center',

        color: Cores.textoSecundario,
    },

    areaInformacoes: {
        marginVertical: Espacamentos.grande,

        gap: Espacamentos.paddingPequeno,
    },

    itemInformacao: {
        flexDirection: 'row',
        alignItems: 'center',

        padding: Espacamentos.paddingPequeno,

        borderRadius: Bordas.grande,

        backgroundColor: Cores.fundoSecundario,
    },

    numeroInformacao: {
        width: 35,
        height: 35,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: Bordas.circular,

        backgroundColor: Cores.primariaClara,
    },

    textoNumero: {
        fontSize: Tipografia.textoPequeno,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.primaria,
    },

    conteudoInformacao: {
        flex: 1,

        marginLeft: Espacamentos.paddingPequeno,
    },

    tituloInformacao: {
        fontSize: 13,
        fontWeight: Tipografia.pesoExtraBold,

        color: Cores.primariaEscura,
    },

    textoInformacao: {
        marginTop: 2,

        fontSize: Tipografia.legenda,
        lineHeight: 17,

        color: Cores.textoSuave,
    },

    rodape: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        marginTop: Espacamentos.medio,
    },

    textoRodape: {
        marginLeft: 6,

        fontSize: 11.5,

        color: Cores.textoSuave,
    },

    pressionado: {
        opacity: 0.6,
    },
});