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
    KeyboardAvoidingView,
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
    Card,
    FormularioContatoEmergencia,
    MensagemLuma,
    ProgressoCadastro,
    type ContatoEmergencia,
} from '../../src/componentes';

import {
    Bordas,
    Cores,
    Espacamentos,
    Tipografia,
} from '../../src/tema';

export default function ContatosEmergenciaScreen() {

    const parametros = useLocalSearchParams<{
        nome?: string;
        moraSozinho?: string;
        historicoQuedas?: string;
        mobilidade?: string;
        quantidadeCondicoes?: string;
        quantidadeMedicamentos?: string;
    }>();

    const nomePreferido =
        typeof parametros.nome === 'string' &&
            parametros.nome.trim()
            ? parametros.nome.trim()
            : 'você';

    const moraSozinho = parametros.moraSozinho === 'sim';

    const possuiHistoricoQuedas =
        parametros.historicoQuedas === 'sim';

    const mobilidadeInformada =
        typeof parametros.mobilidade === 'string'
            ? parametros.mobilidade
            : '';

    const quantidadeCondicoes = Number(
        parametros.quantidadeCondicoes ?? 0,
    );

    const quantidadeMedicamentos = Number(
        parametros.quantidadeMedicamentos ?? 0,
    );

    const [contatos, setContatos] = useState<
        ContatoEmergencia[]
    >([]);

    const [erroContatos, setErroContatos] =
        useState('');

    const [carregando, setCarregando] =
        useState(false);

    const entradaTela = useRef(
        new Animated.Value(0),
    ).current;

    useEffect(() => {
        Animated.timing(entradaTela, {
            toValue: 1,
            duration: 650,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [entradaTela]);

    function atualizarContatos(
        novosContatos: ContatoEmergencia[],
    ) {
        setContatos(novosContatos);

        if (novosContatos.length > 0) {
            setErroContatos('');
        }
    }

    function obterQuantidadeContatosPrincipais() {
        return contatos.filter(
            (contato) => contato.prioridade === '1',
        ).length;
    }

    function obterQuantidadeMoramPerto() {
        return contatos.filter(
            (contato) => contato.moraPerto === 'sim',
        ).length;
    }

    function obterQuantidadeComChave() {
        return contatos.filter(
            (contato) =>
                contato.possuiChave === 'sim',
        ).length;
    }

    function validarFormulario() {
        if (contatos.length === 0) {
            setErroContatos(
                'Cadastre pelo menos um contato de emergência.',
            );

            return false;
        }

        const possuiContatoPrincipal =
            contatos.some(
                (contato) => contato.prioridade === '1',
            );

        if (!possuiContatoPrincipal) {
            setErroContatos(
                'Defina pelo menos um contato como primeiro.',
            );

            return false;
        }

        setErroContatos('');

        return true;
    }

    function obterMensagemContextual() {
        if (moraSozinho && possuiHistoricoQuedas) {
            return `Como você informou que mora sozinho e possui histórico de quedas, ${nomePreferido}, é muito importante cadastrar pessoas que possam chegar rapidamente.`;
        }

        if (moraSozinho) {
            return `Como você informou que mora sozinho, ${nomePreferido}, vamos montar uma rede de apoio que possa ser acionada quando você precisar.`;
        }

        if (possuiHistoricoQuedas) {
            return `Como você informou possuir histórico de quedas, ${nomePreferido}, é importante escolher pessoas que possam ajudar rapidamente.`;
        }

        if (
            mobilidadeInformada &&
            mobilidadeInformada !== 'sem-auxilio'
        ) {
            return `Agora vamos escolher pessoas que possam ajudar você caso tenha alguma dificuldade de mobilidade, ${nomePreferido}.`;
        }

        if (
            quantidadeCondicoes > 0 ||
            quantidadeMedicamentos > 0
        ) {
            return `Agora vamos montar sua rede de apoio, ${nomePreferido}. Essas pessoas poderão receber informações importantes quando você precisar.`;
        }

        return `Agora vamos montar sua rede de apoio, ${nomePreferido}. Escolha pessoas de confiança que poderão ajudar você em uma emergência.`;
    }

    function continuar() {
        if (!validarFormulario()) {
            return;
        }

        setCarregando(true);

        setTimeout(() => {
            setCarregando(false);

            console.log({
                contatosEmergencia: contatos,

                resumo: {
                    totalContatos: contatos.length,

                    contatosPrincipais:
                        obterQuantidadeContatosPrincipais(),

                    moramPerto:
                        obterQuantidadeMoramPerto(),

                    possuemChave:
                        obterQuantidadeComChave(),
                },
            });

            router.push({
                pathname:
                    '/configuracao-inicial/permissoes',

                params: {
                    nome: nomePreferido,
                },
            });
        }, 1200);
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
                        'rgba(223, 239, 255, 0.90)',
                        'rgba(248, 251, 255, 0)',
                    ]}
                    style={styles.luzSuperior}
                />

                <LinearGradient
                    colors={[
                        'rgba(226, 241, 255, 0)',
                        'rgba(226, 241, 255, 0.72)',
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

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={
                    Platform.OS === 'ios'
                        ? 'padding'
                        : undefined
                }
            >
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={
                        styles.conteudo
                    }
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator
                >
                    <Pressable
                        onPress={() => router.back()}
                        style={({ pressed }) => [
                            styles.botaoVoltar,

                            pressed &&
                            styles.pressionado,
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

                    <ProgressoCadastro
                        etapaAtual={4}
                        totalEtapas={5}
                        titulo="Rede de apoio"
                        descricao="Escolha as pessoas que poderão ajudar você."
                    />

                    <Animated.View
                        style={[
                            styles.areaAnimada,

                            {
                                opacity: entradaTela,

                                transform: [
                                    {
                                        translateY:
                                            entradaTela.interpolate(
                                                {
                                                    inputRange: [
                                                        0,
                                                        1,
                                                    ],

                                                    outputRange: [
                                                        35,
                                                        0,
                                                    ],
                                                },
                                            ),
                                    },
                                ],
                            },
                        ]}
                    >
                        <View style={styles.areaTitulo}>
                            <Text style={styles.tituloPrincipal}>
                                Sua rede de apoio
                            </Text>

                            <Text style={styles.descricaoPrincipal}>
                                Cadastre pelo menos uma pessoa de confiança.
                            </Text>
                        </View>

                        <MensagemLuma texto={obterMensagemContextual()} />

                        <View style={styles.espacoMensagem} />

                        <Card>
                            <View style={styles.cabecalhoCard}>
                                <View
                                    style={
                                        styles.areaTituloCard
                                    }
                                >
                                    <Text style={styles.tituloCard}>
                                        Pessoas de confiança
                                    </Text>

                                    <Text style={styles.subtituloCard}>
                                        Defina quem deve ser avisado primeiro.
                                    </Text>
                                </View>

                                <View style={styles.seloEtapa}>
                                    <Text
                                        style={styles.numeroEtapa}
                                    >
                                        4
                                    </Text>

                                    <Text
                                        style={styles.textoEtapa}
                                    >
                                        de 5
                                    </Text>
                                </View>
                            </View>

                            <FormularioContatoEmergencia
                                contatos={contatos}
                                onChange={
                                    atualizarContatos
                                }
                                erro={erroContatos}
                            />

                            {contatos.length > 0 ? (
                                <>
                                    <View style={styles.espacoMensagem} />

                                    <MensagemLuma
                                        texto={
                                            contatos.length === 1
                                                ? 'Ótimo! Agora já conheço uma pessoa importante da sua rede de apoio. Você pode adicionar outras pessoas para deixar sua proteção ainda mais completa.'
                                                : `Muito bem! Sua rede de apoio já possui ${contatos.length} pessoas cadastradas.`
                                        }
                                    />
                                </>
                            ) : null}

                            {contatos.length > 0 ? (
                                <>
                                    <View
                                        style={
                                            styles.divisoria
                                        }
                                    />

                                    <View
                                        style={
                                            styles.areaResumo
                                        }
                                    >
                                        <View
                                            style={
                                                styles.cabecalhoResumo
                                            }
                                        >
                                            <View>
                                                <Text
                                                    style={
                                                        styles.tituloResumo
                                                    }
                                                >
                                                    Resumo
                                                </Text>

                                                <Text
                                                    style={
                                                        styles.descricaoResumo
                                                    }
                                                >
                                                    Sua rede de apoio até
                                                    agora.
                                                </Text>
                                            </View>


                                            <View
                                                style={
                                                    styles.totalContatos
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.numeroTotal
                                                    }
                                                >
                                                    {contatos.length}
                                                </Text>

                                                <Text
                                                    style={
                                                        styles.legendaTotal
                                                    }
                                                >
                                                    {contatos.length === 1
                                                        ? 'contato'
                                                        : 'contatos'}
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={
                                                styles.listaResumo
                                            }
                                        >
                                            <View
                                                style={
                                                    styles.itemResumo
                                                }
                                            >
                                                <View
                                                    style={
                                                        styles.areaIconeResumo
                                                    }
                                                >
                                                    <Ionicons
                                                        name="flag-outline"
                                                        size={18}
                                                        color={
                                                            Cores.primaria
                                                        }
                                                    />
                                                </View>

                                                <View
                                                    style={
                                                        styles.conteudoResumo
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.valorResumo
                                                        }
                                                    >
                                                        {obterQuantidadeContatosPrincipais()}
                                                    </Text>

                                                    <Text
                                                        style={
                                                            styles.textoResumo
                                                        }
                                                    >
                                                        definido como primeiro
                                                    </Text>
                                                </View>
                                            </View>

                                            <View
                                                style={
                                                    styles.itemResumo
                                                }
                                            >
                                                <View
                                                    style={
                                                        styles.areaIconeResumo
                                                    }
                                                >
                                                    <Ionicons
                                                        name="location-outline"
                                                        size={18}
                                                        color={
                                                            Cores.primaria
                                                        }
                                                    />
                                                </View>

                                                <View
                                                    style={
                                                        styles.conteudoResumo
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.valorResumo
                                                        }
                                                    >
                                                        {obterQuantidadeMoramPerto()}
                                                    </Text>

                                                    <Text
                                                        style={
                                                            styles.textoResumo
                                                        }
                                                    >
                                                        moram perto
                                                    </Text>
                                                </View>
                                            </View>

                                            <View
                                                style={
                                                    styles.itemResumo
                                                }
                                            >
                                                <View
                                                    style={
                                                        styles.areaIconeResumo
                                                    }
                                                >
                                                    <Ionicons
                                                        name="key-outline"
                                                        size={18}
                                                        color={
                                                            Cores.primaria
                                                        }
                                                    />
                                                </View>

                                                <View
                                                    style={
                                                        styles.conteudoResumo
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.valorResumo
                                                        }
                                                    >
                                                        {obterQuantidadeComChave()}
                                                    </Text>

                                                    <Text
                                                        style={
                                                            styles.textoResumo
                                                        }
                                                    >
                                                        possuem chave
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </>
                            ) : null}


                            {contatos.length > 0 ? (
                                <>
                                    <MensagemLuma
                                        texto={
                                            contatos.length >= 3
                                                ? 'Perfeito! Sua rede de apoio está completa. Agora vamos configurar as permissões para que o AlertaSOS funcione corretamente.'
                                                : `Sua rede de apoio já começou, ${nomePreferido}. Para aumentar sua segurança, recomendo cadastrar pelo menos 3 contatos. Você pode continuar agora e adicionar outras pessoas depois.`
                                        }
                                    />

                                    <View style={styles.espacoMensagem} />
                                </>
                            ) : null}

                            <View style={styles.aviso}>
                                <Ionicons
                                    name="information-circle-outline"
                                    size={19}
                                    color={Cores.primaria}
                                />

                                <Text
                                    style={styles.textoAviso}
                                >
                                    Essas informações ajudarão a
                                    Luma a entender quem poderá
                                    chegar mais rápido.
                                </Text>
                            </View>

                            <Botao
                                titulo="Continuar"
                                textoCarregando="Salvando..."
                                carregando={carregando}
                                onPress={continuar}
                                iconeDireita={
                                    <Ionicons
                                        name="arrow-forward"
                                        size={18}
                                        color={Cores.fundo}
                                    />
                                }
                            />
                        </Card>
                    </Animated.View>

                    <View style={styles.rodape}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={14}
                            color={Cores.primaria}
                        />

                        <Text style={styles.textoRodape}>
                            Os dados dos seus contatos
                            permanecem protegidos.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:
            Cores.fundoSecundario,
    },

    keyboardView: {
        flex: 1,
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
            Platform.OS === 'android'
                ? 52
                : 40,

        paddingBottom: 110,
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

        width: 95,
        height: 95,

        top: 160,
        right: -48,

        borderRadius:
            Bordas.circular,

        backgroundColor:
            'rgba(72, 145, 246, 0.08)',
    },

    bolhaDois: {
        position: 'absolute',

        width: 52,
        height: 52,

        top: 620,
        left: -22,

        borderRadius:
            Bordas.circular,

        backgroundColor:
            'rgba(72, 145, 246, 0.08)',
    },

    gradePontos: {
        position: 'absolute',

        top: 210,
        right: 18,

        width: 70,

        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    pontoGrade: {
        width: 3,
        height: 3,

        margin: 5,

        borderRadius:
            Bordas.circular,

        backgroundColor:
            'rgba(46, 125, 245, 0.15)',
    },

    botaoVoltar: {
        alignSelf: 'flex-start',

        flexDirection: 'row',
        alignItems: 'center',

        marginBottom:
            Espacamentos.medio,

        paddingVertical: 7,
        paddingRight: 12,
    },

    textoVoltar: {
        marginLeft: 6,

        fontSize:
            Tipografia.textoPequeno,

        fontWeight:
            Tipografia.pesoExtraBold,

        color: Cores.primaria,
    },

    areaAnimada: {
        width: '100%',
    },

    areaTitulo: {
        marginBottom:
            Espacamentos.grande,
    },

    tituloPrincipal: {
        fontSize: 30,
        lineHeight: 36,

        fontWeight:
            Tipografia.pesoBlack,

        color: Cores.texto,

        letterSpacing: -1,
    },

    descricaoPrincipal: {
        marginTop: 5,

        fontSize:
            Tipografia.textoPequeno,

        lineHeight: 20,

        color:
            Cores.textoSecundario,
    },

    espacoMensagem: {
        height: Espacamentos.grande,
    },

    cabecalhoCard: {
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent:
            'space-between',

        marginBottom:
            Espacamentos.grande,
    },

    areaTituloCard: {
        flex: 1,

        paddingRight:
            Espacamentos.medio,
    },

    tituloCard: {
        fontSize:
            Tipografia.subtitulo,

        fontWeight:
            Tipografia.pesoBlack,

        color:
            Cores.primariaEscura,

        letterSpacing: -0.4,
    },

    subtituloCard: {
        marginTop: 4,

        fontSize: 12.5,
        lineHeight: 18,

        color: Cores.textoSuave,
    },

    seloEtapa: {
        width: 53,
        height: 53,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius:
            Bordas.grande,

        borderWidth: 1,

        borderColor:
            Cores.bordaMuitoSuave,

        backgroundColor:
            Cores.fundoAzuladoClaro,
    },

    numeroEtapa: {
        fontSize: 19,
        lineHeight: 21,

        fontWeight:
            Tipografia.pesoBlack,

        color: Cores.primaria,
    },

    textoEtapa: {
        marginTop: 1,

        fontSize: 9.5,

        fontWeight:
            Tipografia.pesoExtraBold,

        color: Cores.textoSuave,
    },

    divisoria: {
        width: '100%',
        height: 1,

        marginTop:
            Espacamentos.grande,

        marginBottom:
            Espacamentos.grande,

        backgroundColor:
            Cores.divisoria,
    },

    areaResumo: {
        marginBottom:
            Espacamentos.grande,

        padding:
            Espacamentos.paddingMedio,

        borderRadius:
            Bordas.grande,

        borderWidth: 1,

        borderColor:
            Cores.bordaMuitoSuave,

        backgroundColor:
            Cores.fundoAzuladoClaro,
    },

    cabecalhoResumo: {
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent:
            'space-between',

        marginBottom:
            Espacamentos.medio,
    },

    tituloResumo: {
        fontSize:
            Tipografia.textoGrande,

        fontWeight:
            Tipografia.pesoBlack,

        color:
            Cores.primariaEscura,
    },

    descricaoResumo: {
        marginTop: 3,

        fontSize:
            Tipografia.legenda,

        color: Cores.textoSuave,
    },

    totalContatos: {
        minWidth: 58,
        height: 52,

        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: 9,

        borderRadius:
            Bordas.grande,

        backgroundColor:
            Cores.fundo,
    },

    numeroTotal: {
        fontSize: 19,
        lineHeight: 21,

        fontWeight:
            Tipografia.pesoBlack,

        color: Cores.primaria,
    },

    legendaTotal: {
        marginTop: 1,

        fontSize: 9.5,

        fontWeight:
            Tipografia.pesoExtraBold,

        color: Cores.textoSuave,
    },

    listaResumo: {
        gap: Espacamentos.pequeno,
    },

    itemResumo: {
        flexDirection: 'row',
        alignItems: 'center',

        padding:
            Espacamentos.paddingPequeno,

        borderRadius:
            Bordas.media,

        backgroundColor:
            Cores.fundo,
    },

    areaIconeResumo: {
        width: 37,
        height: 37,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius:
            Bordas.media,

        backgroundColor:
            Cores.primariaClara,
    },

    conteudoResumo: {
        flex: 1,

        flexDirection: 'row',
        alignItems: 'baseline',

        marginLeft:
            Espacamentos.pequeno,
    },

    valorResumo: {
        fontSize:
            Tipografia.texto,

        fontWeight:
            Tipografia.pesoBlack,

        color:
            Cores.primariaEscura,
    },

    textoResumo: {
        marginLeft: 5,

        fontSize:
            Tipografia.legenda,

        color:
            Cores.textoSecundario,
    },

    aviso: {
        flexDirection: 'row',
        alignItems: 'flex-start',

        marginTop:
            Espacamentos.grande,

        marginBottom:
            Espacamentos.grande,

        padding:
            Espacamentos.paddingPequeno,

        borderRadius:
            Bordas.grande,

        backgroundColor:
            Cores.fundoAzuladoClaro,
    },

    textoAviso: {
        flex: 1,

        marginLeft: 7,

        fontSize:
            Tipografia.legenda,

        lineHeight: 17,

        color: Cores.textoSuave,
    },

    rodape: {
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'center',

        marginTop: 25,

        paddingHorizontal: 10,
    },

    textoRodape: {
        flexShrink: 1,

        marginLeft: 7,

        fontSize: 11.5,

        color: Cores.textoSuave,
    },

    pressionado: {
        opacity: 0.6,
    },
});