import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams, } from 'expo-router';
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
    CampoLista,
    CampoMultilinha,
    Card,
    FormularioMedicamento,
    MensagemLuma,
    ProgressoCadastro,
    SeletorOpcao,
    type Medicamento,
} from '../../src/componentes';

import {
    Bordas,
    Cores,
    Espacamentos,
    Tipografia,
} from '../../src/tema';



const TIPOS_SANGUINEOS = [
    { rotulo: 'A+', valor: 'A+' },
    { rotulo: 'A-', valor: 'A-' },
    { rotulo: 'B+', valor: 'B+' },
    { rotulo: 'B-', valor: 'B-' },
    { rotulo: 'AB+', valor: 'AB+' },
    { rotulo: 'AB-', valor: 'AB-' },
    { rotulo: 'O+', valor: 'O+' },
    { rotulo: 'O-', valor: 'O-' },
    { rotulo: 'Não sei', valor: 'nao-sei' },
];

const OPCOES_MOBILIDADE = [
    { rotulo: 'Sem auxílio', valor: 'sem-auxilio' },
    { rotulo: 'Bengala', valor: 'bengala' },
    { rotulo: 'Andador', valor: 'andador' },
    { rotulo: 'Cadeira de rodas', valor: 'cadeira-rodas' },
    { rotulo: 'Outro', valor: 'outro' },
];

const OPCOES_SIM_NAO = [
    { rotulo: 'Não', valor: 'nao' },
    { rotulo: 'Sim', valor: 'sim' },
];

export default function PerfilSaudeScreen() {
    const parametros = useLocalSearchParams<{ nome?: string; }>();
    const nomePreferido = typeof parametros.nome === 'string' && parametros.nome.trim() ? parametros.nome.trim() : 'você';
    const [tipoSanguineo, setTipoSanguineo] = useState('');

    const [alergias, setAlergias] = useState<string[]>([]);
    const [condicoesSaude, setCondicoesSaude] = useState<string[]>([]);
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    const [mobilidade, setMobilidade] = useState('');
    const [dificuldadeFala, setDificuldadeFala] = useState('');
    const [deficienciaAuditiva, setDeficienciaAuditiva] =
        useState('');

    const [historicoQuedas, setHistoricoQuedas] = useState('');
    const [moraSozinho, setMoraSozinho] = useState('');

    const [observacoes, setObservacoes] = useState('');

    const [erroTipoSanguineo, setErroTipoSanguineo] =
        useState('');
    const [erroMobilidade, setErroMobilidade] = useState('');

    const [carregando, setCarregando] = useState(false);

    const entradaTela = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(entradaTela, {
            toValue: 1,
            duration: 650,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [entradaTela]);

    function validarFormulario() {
        let formularioValido = true;

        if (!tipoSanguineo) {
            setErroTipoSanguineo(
                'Selecione seu tipo sanguíneo ou marque “Não sei”.',
            );

            formularioValido = false;
        } else {
            setErroTipoSanguineo('');
        }

        if (!mobilidade) {
            setErroMobilidade(
                'Selecione uma opção relacionada à mobilidade.',
            );

            formularioValido = false;
        } else {
            setErroMobilidade('');
        }

        return formularioValido;
    }

    function continuar() {
        if (!validarFormulario()) {
            return;
        }

        setCarregando(true);

        setTimeout(() => {
            setCarregando(false);

            console.log({
                tipoSanguineo:
                    tipoSanguineo === 'nao-sei'
                        ? null
                        : tipoSanguineo,

                alergias,
                condicoesSaude,
                medicamentos,

                mobilidade,
                dificuldadeFala:
                    dificuldadeFala || null,

                deficienciaAuditiva:
                    deficienciaAuditiva || null,

                historicoQuedas:
                    historicoQuedas || null,

                moraSozinho:
                    moraSozinho || null,

                observacoes:
                    observacoes.trim() || null,
            });

            router.push({
                pathname: '/configuracao-inicial/contatos-emergencia',

                params: {
                    nome: nomePreferido,
                    moraSozinho,
                    historicoQuedas,
                    mobilidade,
                    quantidadeCondicoes: String(condicoesSaude.length),
                    quantidadeMedicamentos: String(medicamentos.length),
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
                    contentContainerStyle={styles.conteudo}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator
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

                    <ProgressoCadastro
                        etapaAtual={3}
                        totalEtapas={5}
                        titulo="Perfil de saúde"
                        descricao="Informações importantes para uma emergência."
                    />

                    <Animated.View
                        style={[
                            styles.areaAnimada,
                            {
                                opacity: entradaTela,

                                transform: [
                                    {
                                        translateY:
                                            entradaTela.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [35, 0],
                                            }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <View style={styles.areaTitulo}>
                            <Text style={styles.tituloPrincipal}>
                                Sua saúde
                            </Text>

                        </View>

                        <MensagemLuma
                            texto={`Vamos conhecer algumas informações importantes sobre sua saúde, ${nomePreferido}. Responda apenas o que souber.`}
                        />

                        <View style={styles.espacoMensagem} />

                        <Card>
                            <View style={styles.cabecalhoCard}>
                                <View style={styles.areaTituloCard}>
                                    <Text style={styles.tituloCard}>
                                        Informações médicas
                                    </Text>

                                    <Text style={styles.subtituloCard}>
                                        Você poderá editar tudo depois.
                                    </Text>
                                </View>

                                <View style={styles.seloEtapa}>
                                    <Text style={styles.numeroEtapa}>
                                        3
                                    </Text>

                                    <Text style={styles.textoEtapa}>
                                        de 5
                                    </Text>
                                </View>
                            </View>

                            <SeletorOpcao
                                titulo="TIPO SANGUÍNEO"
                                opcoes={TIPOS_SANGUINEOS}
                                valorSelecionado={tipoSanguineo}
                                onSelecionar={(valor) => {
                                    setTipoSanguineo(valor);
                                    setErroTipoSanguineo('');
                                }}
                                erro={erroTipoSanguineo}
                            />

                            <View style={styles.divisoria} />

                            <MensagemLuma
                                texto="Agora me conte se você possui alguma alergia, condição de saúde ou utiliza medicamentos atualmente."
                            />

                            <View style={styles.espacoMensagem} />

                            <CampoLista
                                rotulo="ALERGIAS"
                                descricao="Medicamentos, alimentos ou outras substâncias."
                                placeholder="Ex.: Penicilina"
                                textoBotao="Adicionar"
                                itens={alergias}
                                onChange={setAlergias}
                                icone={
                                    <Ionicons
                                        name="warning-outline"
                                        size={21}
                                        color={Cores.primaria}
                                    />
                                }
                            />

                            <CampoLista
                                rotulo="CONDIÇÕES DE SAÚDE"
                                descricao="Doenças, diagnósticos ou condições importantes."
                                placeholder="Ex.: Hipertensão"
                                textoBotao="Adicionar"
                                itens={condicoesSaude}
                                onChange={setCondicoesSaude}
                                icone={
                                    <Ionicons
                                        name="heart-outline"
                                        size={21}
                                        color={Cores.primaria}
                                    />
                                }
                            />

                            <FormularioMedicamento
                                medicamentos={medicamentos}
                                onChange={setMedicamentos}
                            />

                            <View style={styles.divisoria} />

                            <Text style={styles.tituloSecao}>
                                Mobilidade e comunicação
                            </Text>

                            <br></br>

                            <MensagemLuma
                                texto="Essas respostas me ajudam a entender como você se comunica e se locomove caso precise de ajuda."
                            />

                            <View style={styles.espacoMensagem} />

                            <SeletorOpcao
                                titulo="VOCÊ UTILIZA ALGUM AUXÍLIO?"
                                opcoes={OPCOES_MOBILIDADE}
                                valorSelecionado={mobilidade}
                                onSelecionar={(valor) => {
                                    setMobilidade(valor);
                                    setErroMobilidade('');
                                }}
                                erro={erroMobilidade}
                            />

                            <SeletorOpcao
                                titulo="POSSUI DIFICULDADE PARA FALAR?"
                                opcoes={OPCOES_SIM_NAO}
                                valorSelecionado={dificuldadeFala}
                                onSelecionar={setDificuldadeFala}
                            />

                            <SeletorOpcao
                                titulo="POSSUI DEFICIÊNCIA AUDITIVA?"
                                opcoes={OPCOES_SIM_NAO}
                                valorSelecionado={deficienciaAuditiva}
                                onSelecionar={setDeficienciaAuditiva}
                            />

                            <View style={styles.divisoria} />


                            <Text style={styles.tituloSecao}>
                                Segurança diária
                            </Text>

                            <Text style={styles.descricaoSecao}>
                                Essas respostas são opcionais.
                            </Text>

                            <SeletorOpcao
                                titulo="POSSUI HISTÓRICO DE QUEDAS?"
                                opcoes={OPCOES_SIM_NAO}
                                valorSelecionado={historicoQuedas}
                                onSelecionar={setHistoricoQuedas}
                            />

                            <SeletorOpcao
                                titulo="MORA SOZINHO?"
                                opcoes={OPCOES_SIM_NAO}
                                valorSelecionado={moraSozinho}
                                onSelecionar={setMoraSozinho}
                            />

                            <CampoMultilinha
                                rotulo="OUTRAS INFORMAÇÕES — OPCIONAL"
                                descricao="Inclua apenas algo importante que ainda não foi informado."
                                value={observacoes}
                                onChangeText={setObservacoes}
                                placeholder="Ex.: Uso marca-passo, tenho crises de ansiedade ou necessito de auxílio para levantar."
                                maxLength={500}
                                icone={
                                    <Ionicons
                                        name="document-text-outline"
                                        size={21}
                                        color={Cores.primaria}
                                    />
                                }
                            />

                            <View style={styles.areaResumo}>
                                <View style={styles.cabecalhoResumo}>
                                    <View>
                                        <Text style={styles.tituloResumo}>
                                            Resumo do perfil
                                        </Text>

                                        <Text style={styles.descricaoResumo}>
                                            Informações adicionadas até agora.
                                        </Text>
                                    </View>

                                    <View style={styles.seloResumo}>
                                        <Text style={styles.numeroResumo}>
                                            {[
                                                tipoSanguineo,
                                                alergias.length > 0,
                                                condicoesSaude.length > 0,
                                                medicamentos.length > 0,
                                                mobilidade,
                                            ].filter(Boolean).length}
                                        </Text>

                                        <Text style={styles.legendaResumo}>
                                            itens
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.listaResumo}>
                                    <View style={styles.itemResumo}>
                                        <Ionicons
                                            name="water-outline"
                                            size={18}
                                            color={Cores.primaria}
                                        />

                                        <Text style={styles.textoResumo}>
                                            Tipo sanguíneo:{' '}
                                            <Text style={styles.valorResumo}>
                                                {tipoSanguineo
                                                    ? tipoSanguineo === 'nao-sei'
                                                        ? 'Não informado'
                                                        : tipoSanguineo
                                                    : 'Pendente'}
                                            </Text>
                                        </Text>
                                    </View>

                                    <View style={styles.itemResumo}>
                                        <Ionicons
                                            name="warning-outline"
                                            size={18}
                                            color={Cores.primaria}
                                        />

                                        <Text style={styles.textoResumo}>
                                            Alergias:{' '}
                                            <Text style={styles.valorResumo}>
                                                {alergias.length}
                                            </Text>
                                        </Text>
                                    </View>

                                    <View style={styles.itemResumo}>
                                        <Ionicons
                                            name="heart-outline"
                                            size={18}
                                            color={Cores.primaria}
                                        />

                                        <Text style={styles.textoResumo}>
                                            Condições de saúde:{' '}
                                            <Text style={styles.valorResumo}>
                                                {condicoesSaude.length}
                                            </Text>
                                        </Text>
                                    </View>

                                    <View style={styles.itemResumo}>
                                        <Ionicons
                                            name="medical-outline"
                                            size={18}
                                            color={Cores.primaria}
                                        />

                                        <Text style={styles.textoResumo}>
                                            Medicamentos:{' '}
                                            <Text style={styles.valorResumo}>
                                                {medicamentos.length}
                                            </Text>
                                        </Text>
                                    </View>

                                    <View style={styles.itemResumo}>
                                        <Ionicons
                                            name="walk-outline"
                                            size={18}
                                            color={Cores.primaria}
                                        />

                                        <Text style={styles.textoResumo}>
                                            Mobilidade:{' '}
                                            <Text style={styles.valorResumo}>
                                                {mobilidade ? 'Informada' : 'Pendente'}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <MensagemLuma
                                texto="Ótimo! Com essas informações, consigo entender melhor seu perfil e destacar dados importantes quando você precisar."
                            />

                            <View style={styles.espacoMensagem} />

                            <View style={styles.aviso}>
                                <Ionicons
                                    name="shield-checkmark-outline"
                                    size={19}
                                    color={Cores.primaria}
                                />

                                <Text style={styles.textoAviso}>
                                    Esses dados poderão ajudar seus contatos e equipes de atendimento.
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
                            Suas informações de saúde permanecem protegidas.
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
        backgroundColor: Cores.fundoSecundario,
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
            Platform.OS === 'android' ? 52 : 40,

        paddingBottom: 90,
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

        borderRadius: Bordas.circular,

        backgroundColor:
            'rgba(72, 145, 246, 0.08)',
    },

    bolhaDois: {
        position: 'absolute',
        width: 52,
        height: 52,
        top: 620,
        left: -22,

        borderRadius: Bordas.circular,

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

        borderRadius: Bordas.circular,

        backgroundColor:
            'rgba(46, 125, 245, 0.15)',
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

    areaAnimada: {
        width: '100%',
    },

    areaTitulo: {
        marginBottom: Espacamentos.grande,
    },

    tituloPrincipal: {
        fontSize: 30,
        lineHeight: 36,

        fontWeight: Tipografia.pesoBlack,

        color: Cores.texto,

        letterSpacing: -1,
    },

    descricaoPrincipal: {
        marginTop: 5,

        fontSize: Tipografia.textoPequeno,
        lineHeight: 20,

        color: Cores.textoSecundario,
    },

    cabecalhoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginBottom: Espacamentos.grande,
    },

    areaTituloCard: {
        flex: 1,
        paddingRight: Espacamentos.medio,
    },

    tituloCard: {
        fontSize: Tipografia.subtitulo,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.primariaEscura,

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

        borderRadius: Bordas.grande,
        borderWidth: 1,
        borderColor: Cores.bordaMuitoSuave,

        backgroundColor:
            Cores.fundoAzuladoClaro,
    },

    numeroEtapa: {
        fontSize: 19,
        lineHeight: 21,

        fontWeight: Tipografia.pesoBlack,

        color: Cores.primaria,
    },

    textoEtapa: {
        marginTop: 1,

        fontSize: 9.5,
        fontWeight: Tipografia.pesoExtraBold,

        color: Cores.textoSuave,
    },

    divisoria: {
        width: '100%',
        height: 1,

        marginTop: 2,
        marginBottom: Espacamentos.grande,

        backgroundColor: Cores.divisoria,
    },

    tituloSecao: {
        fontSize: Tipografia.textoGrande,
        fontWeight: Tipografia.pesoBlack,

        color: Cores.primariaEscura,
    },

    descricaoSecao: {
        marginTop: 4,
        marginBottom: Espacamentos.grande,

        fontSize: Tipografia.legenda,
        lineHeight: 18,

        color: Cores.textoSuave,
    },

    espacoMensagem: {
        height: Espacamentos.grande,
    },

    areaResumo: {
        marginBottom: Espacamentos.grande,
        padding: Espacamentos.paddingMedio,

        borderRadius: Bordas.grande,
        borderWidth: 1,
        borderColor: Cores.bordaMuitoSuave,

        backgroundColor: Cores.fundoAzuladoClaro,
    },

    cabecalhoResumo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginBottom: Espacamentos.medio,
    },

    tituloResumo: {
        fontSize: Tipografia.textoGrande,
        fontWeight: Tipografia.pesoBlack,
        color: Cores.primariaEscura,
    },

    descricaoResumo: {
        marginTop: 3,

        fontSize: Tipografia.legenda,
        color: Cores.textoSuave,
    },

    seloResumo: {
        minWidth: 55,
        height: 52,

        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: 9,

        borderRadius: Bordas.grande,
        backgroundColor: Cores.fundo,
    },

    numeroResumo: {
        fontSize: 19,
        lineHeight: 21,

        fontWeight: Tipografia.pesoBlack,
        color: Cores.primaria,
    },

    legendaResumo: {
        marginTop: 1,

        fontSize: 9.5,
        fontWeight: Tipografia.pesoExtraBold,
        color: Cores.textoSuave,
    },

    listaResumo: {
        gap: Espacamentos.pequeno,
    },

    itemResumo: {
        minHeight: 42,

        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: Espacamentos.paddingPequeno,

        borderRadius: Bordas.media,
        backgroundColor: Cores.fundo,
    },

    textoResumo: {
        flex: 1,
        marginLeft: Espacamentos.pequeno,

        fontSize: Tipografia.legenda,
        color: Cores.textoSecundario,
    },

    valorResumo: {
        fontWeight: Tipografia.pesoExtraBold,
        color: Cores.primariaEscura,
    },

    aviso: {
        flexDirection: 'row',
        alignItems: 'flex-start',

        marginBottom: Espacamentos.grande,

        padding: Espacamentos.paddingPequeno,

        borderRadius: Bordas.grande,

        backgroundColor:
            Cores.fundoAzuladoClaro,
    },

    textoAviso: {
        flex: 1,

        marginLeft: 7,

        fontSize: Tipografia.legenda,
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