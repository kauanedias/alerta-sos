import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    Bordas,
    Cores,
    Espacamentos,
    Tipografia,
} from '../tema';

import { CampoMultilinha } from './CampoMultilinha';
import { CampoTexto } from './CampoTexto';
import { SeletorOpcao } from './SeletorOpcao';

export type ContatoEmergencia = {
    id: string;
    nome: string;
    telefone: string;
    parentesco: string;
    prioridade: string;
    moraPerto: string;
    possuiChave: string;
    motivo: string;
};

type FormularioContatoEmergenciaProps = {
    contatos: ContatoEmergencia[];
    onChange: (contatos: ContatoEmergencia[]) => void;
    erro?: string;
};

const OPCOES_PARENTESCO = [
    { rotulo: 'Filho(a)', valor: 'filho' },
    { rotulo: 'Pai ou mãe', valor: 'pais' },
    { rotulo: 'Irmão(ã)', valor: 'irmao' },
    { rotulo: 'Companheiro(a)', valor: 'companheiro' },
    { rotulo: 'Vizinho(a)', valor: 'vizinho' },
    { rotulo: 'Amigo(a)', valor: 'amigo' },
    { rotulo: 'Médico(a)', valor: 'medico' },
    { rotulo: 'Outro', valor: 'outro' },
];

const OPCOES_PRIORIDADE = [
    { rotulo: 'Primeiro', valor: '1' },
    { rotulo: 'Segundo', valor: '2' },
    { rotulo: 'Terceiro', valor: '3' },
];

const OPCOES_SIM_NAO = [
    { rotulo: 'Não', valor: 'nao' },
    { rotulo: 'Sim', valor: 'sim' },
];

export function FormularioContatoEmergencia({
    contatos,
    onChange,
    erro,
}: FormularioContatoEmergenciaProps) {
    const [formularioAberto, setFormularioAberto] =
        useState(false);

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [parentesco, setParentesco] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [moraPerto, setMoraPerto] = useState('');
    const [possuiChave, setPossuiChave] = useState('');
    const [motivo, setMotivo] = useState('');

    const [erroNome, setErroNome] = useState('');
    const [erroTelefone, setErroTelefone] = useState('');
    const [erroParentesco, setErroParentesco] =
        useState('');
    const [erroPrioridade, setErroPrioridade] =
        useState('');
    const [erroMotivo, setErroMotivo] = useState('');

    function limparFormulario() {
        setNome('');
        setTelefone('');
        setParentesco('');
        setPrioridade('');
        setMoraPerto('');
        setPossuiChave('');
        setMotivo('');

        setErroNome('');
        setErroTelefone('');
        setErroParentesco('');
        setErroPrioridade('');
        setErroMotivo('');
    }

    function fecharFormulario() {
        limparFormulario();
        setFormularioAberto(false);
    }

    function validarFormulario() {
        let valido = true;

        if (!nome.trim()) {
            setErroNome('Digite o nome do contato.');
            valido = false;
        } else {
            setErroNome('');
        }

        const telefoneNumerico = telefone.replace(/\D/g, '');

        if (!telefoneNumerico) {
            setErroTelefone('Digite o telefone do contato.');
            valido = false;
        } else if (telefoneNumerico.length < 10) {
            setErroTelefone('Digite um telefone válido.');
            valido = false;
        } else {
            setErroTelefone('');
        }

        if (!parentesco) {
            setErroParentesco(
                'Selecione a relação com esse contato.',
            );
            valido = false;
        } else {
            setErroParentesco('');
        }

        if (!prioridade) {
            setErroPrioridade(
                'Selecione a prioridade do contato.',
            );
            valido = false;
        } else {
            setErroPrioridade('');
        }

        if (!motivo.trim()) {
            setErroMotivo(
                'Explique por que esse contato é importante.',
            );
            valido = false;
        } else {
            setErroMotivo('');
        }

        return valido;
    }

    function adicionarContato() {
        if (!validarFormulario()) {
            return;
        }

        const novoContato: ContatoEmergencia = {
            id: `${Date.now()}-${Math.random()}`,
            nome: nome.trim(),
            telefone,
            parentesco,
            prioridade,
            moraPerto: moraPerto || 'nao-informado',
            possuiChave: possuiChave || 'nao-informado',
            motivo: motivo.trim(),
        };

        const contatosAtualizados = [
            ...contatos,
            novoContato,
        ].sort(
            (contatoA, contatoB) =>
                Number(contatoA.prioridade) -
                Number(contatoB.prioridade),
        );

        onChange(contatosAtualizados);

        limparFormulario();
        setFormularioAberto(false);
    }

    function removerContato(id: string) {
        onChange(
            contatos.filter((contato) => contato.id !== id),
        );
    }

    function obterParentesco(valor: string) {
        return (
            OPCOES_PARENTESCO.find(
                (opcao) => opcao.valor === valor,
            )?.rotulo ?? valor
        );
    }

    function obterPrioridade(valor: string) {
        if (valor === '1') {
            return 'Contato principal';
        }

        if (valor === '2') {
            return 'Segunda opção';
        }

        return 'Terceira opção';
    }

    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <View style={styles.areaTitulo}>
                    <Text style={styles.rotulo}>
                        CONTATOS DE EMERGÊNCIA
                    </Text>

                    <Text style={styles.descricao}>
                        Cadastre quem deve ser avisado quando você
                        precisar.
                    </Text>
                </View>

                {!formularioAberto ? (
                    <Pressable
                        onPress={() => setFormularioAberto(true)}
                        style={({ pressed }) => [
                            styles.botaoAdicionar,
                            pressed && styles.pressionado,
                        ]}
                    >
                        <Ionicons
                            name="add"
                            size={18}
                            color={Cores.fundo}
                        />

                        <Text style={styles.textoBotaoAdicionar}>
                            Adicionar
                        </Text>
                    </Pressable>
                ) : null}
            </View>

            {contatos.length > 0 ? (
                <View style={styles.listaContatos}>
                    {contatos.map((contato) => (
                        <View
                            key={contato.id}
                            style={styles.cardContato}
                        >
                            <View style={styles.topoContato}>
                                <View style={styles.avatar}>
                                    <Text style={styles.letraAvatar}>
                                        {contato.nome
                                            .charAt(0)
                                            .toUpperCase()}
                                    </Text>
                                </View>

                                <View style={styles.informacoesContato}>
                                    <Text style={styles.nomeContato}>
                                        {contato.nome}
                                    </Text>

                                    <Text style={styles.parentescoContato}>
                                        {obterParentesco(
                                            contato.parentesco,
                                        )}
                                    </Text>
                                </View>

                                <Pressable
                                    onPress={() =>
                                        removerContato(contato.id)
                                    }
                                    hitSlop={8}
                                    style={({ pressed }) => [
                                        styles.botaoRemover,
                                        pressed && styles.pressionado,
                                    ]}
                                >
                                    <Ionicons
                                        name="trash-outline"
                                        size={19}
                                        color={Cores.erro}
                                    />
                                </Pressable>
                            </View>

                            <View style={styles.linhaDetalhes}>
                                <View style={styles.seloPrioridade}>
                                    <Text style={styles.textoPrioridade}>
                                        {obterPrioridade(
                                            contato.prioridade,
                                        )}
                                    </Text>
                                </View>

                                <Text style={styles.telefoneContato}>
                                    {contato.telefone}
                                </Text>
                            </View>

                            <Text style={styles.motivoContato}>
                                {contato.motivo}
                            </Text>

                            <View style={styles.indicadores}>
                                {contato.moraPerto === 'sim' ? (
                                    <View style={styles.indicador}>
                                        <Ionicons
                                            name="location-outline"
                                            size={14}
                                            color={Cores.primaria}
                                        />

                                        <Text style={styles.textoIndicador}>
                                            Mora perto
                                        </Text>
                                    </View>
                                ) : null}

                                {contato.possuiChave === 'sim' ? (
                                    <View style={styles.indicador}>
                                        <Ionicons
                                            name="key-outline"
                                            size={14}
                                            color={Cores.primaria}
                                        />

                                        <Text style={styles.textoIndicador}>
                                            Possui chave
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    ))}
                </View>
            ) : (
                <View style={styles.estadoVazio}>
                    <Ionicons
                        name="people-outline"
                        size={23}
                        color={Cores.textoClaro}
                    />

                    <Text style={styles.textoEstadoVazio}>
                        Nenhum contato cadastrado.
                    </Text>
                </View>
            )}

            {formularioAberto ? (
                <View style={styles.formulario}>
                    <View style={styles.cabecalhoFormulario}>
                        <View style={styles.areaTituloFormulario}>
                            <Text style={styles.tituloFormulario}>
                                Novo contato
                            </Text>

                            <Text style={styles.descricaoFormulario}>
                                Informe quem poderá ajudar você.
                            </Text>
                        </View>

                        <Pressable
                            onPress={fecharFormulario}
                            hitSlop={8}
                            style={({ pressed }) => [
                                styles.botaoFechar,
                                pressed && styles.pressionado,
                            ]}
                        >
                            <Ionicons
                                name="close"
                                size={21}
                                color={Cores.textoSecundario}
                            />
                        </Pressable>
                    </View>

                    <CampoTexto
                        rotulo="NOME"
                        value={nome}
                        onChangeText={(valor) => {
                            setNome(valor);

                            if (erroNome) {
                                setErroNome('');
                            }
                        }}
                        placeholder="Nome do contato"
                        autoCapitalize="words"
                        erro={erroNome}
                        icone={
                            <Ionicons
                                name="person-outline"
                                size={21}
                                color={
                                    erroNome
                                        ? Cores.erro
                                        : Cores.primaria
                                }
                            />
                        }
                    />

                    <CampoTexto
                        rotulo="TELEFONE"
                        tipo="telefone"
                        value={telefone}
                        onChangeText={(valor) => {
                            setTelefone(valor);

                            if (erroTelefone) {
                                setErroTelefone('');
                            }
                        }}
                        placeholder="(77) 99999-9999"
                        erro={erroTelefone}
                        icone={
                            <Ionicons
                                name="call-outline"
                                size={21}
                                color={
                                    erroTelefone
                                        ? Cores.erro
                                        : Cores.primaria
                                }
                            />
                        }
                    />

                    <SeletorOpcao
                        titulo="RELAÇÃO COM VOCÊ"
                        opcoes={OPCOES_PARENTESCO}
                        valorSelecionado={parentesco}
                        onSelecionar={(valor) => {
                            setParentesco(valor);
                            setErroParentesco('');
                        }}
                        erro={erroParentesco}
                    />

                    <Text style={styles.ajudaPrioridade}>
                        Escolha a ordem em que esta pessoa deverá ser avisada em uma emergência.
                    </Text>

                    <SeletorOpcao
                        titulo="QUAL É A PRIORIDADE DESTE CONTATO?"
                        opcoes={OPCOES_PRIORIDADE}
                        valorSelecionado={prioridade}
                        onSelecionar={(valor) => {
                            setPrioridade(valor);
                            setErroPrioridade('');
                        }}
                        erro={erroPrioridade}
                    />

                    <SeletorOpcao
                        titulo="MORA PERTO?"
                        opcoes={OPCOES_SIM_NAO}
                        valorSelecionado={moraPerto}
                        onSelecionar={setMoraPerto}
                    />

                    <SeletorOpcao
                        titulo="POSSUI CHAVE DA SUA CASA?"
                        opcoes={OPCOES_SIM_NAO}
                        valorSelecionado={possuiChave}
                        onSelecionar={setPossuiChave}
                    />

                    <CampoMultilinha
                        rotulo="POR QUE ESSE CONTATO É IMPORTANTE?"
                        descricao="Essa informação ajudará a Luma a entender quem pode chegar mais rápido."
                        value={motivo}
                        onChangeText={(valor) => {
                            setMotivo(valor);

                            if (erroMotivo) {
                                setErroMotivo('');
                            }
                        }}
                        placeholder="Ex.: É meu filho, mora a duas ruas e pode chegar rapidamente."
                        erro={erroMotivo}
                        maxLength={350}
                        icone={
                            <Ionicons
                                name="chatbubble-ellipses-outline"
                                size={21}
                                color={
                                    erroMotivo
                                        ? Cores.erro
                                        : Cores.primaria
                                }
                            />
                        }
                    />

                    <View style={styles.areaBotoes}>
                        <Pressable
                            onPress={fecharFormulario}
                            style={({ pressed }) => [
                                styles.botaoCancelar,
                                pressed && styles.pressionado,
                            ]}
                        >
                            <Text style={styles.textoCancelar}>
                                Cancelar
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={adicionarContato}
                            style={({ pressed }) => [
                                styles.botaoSalvar,
                                pressed && styles.pressionado,
                            ]}
                        >
                            <Ionicons
                                name="checkmark"
                                size={18}
                                color={Cores.fundo}
                            />

                            <Text style={styles.textoSalvar}>
                                Salvar contato
                            </Text>
                        </Pressable>
                    </View>
                </View>
            ) : null}

            {erro ? (
                <View style={styles.areaErro}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={15}
                        color={Cores.erro}
                    />

                    <Text style={styles.textoErro}>
                        {erro}
                    </Text>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    ajudaPrioridade: {
        marginBottom: Espacamentos.pequeno,
        fontSize: Tipografia.legenda,
        lineHeight: 17,
        color: Cores.textoSuave,
    },

    container: {
        width: '100%',
    },

    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Espacamentos.paddingPequeno,
    },

    areaTitulo: {
        flex: 1,
        paddingRight: Espacamentos.medio,
    },

    rotulo: {
        marginLeft: 3,
        fontSize: 11.5,
        fontWeight: Tipografia.pesoBlack,
        letterSpacing: 0.8,
        color: Cores.textoSecundario,
    },

    descricao: {
        marginTop: 4,
        marginLeft: 3,
        fontSize: Tipografia.legenda,
        lineHeight: 17,
        color: Cores.textoSuave,
    },

    botaoAdicionar: {
        minHeight: 39,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 11,
        borderRadius: Bordas.media,
        backgroundColor: Cores.primaria,
    },

    textoBotaoAdicionar: {
        marginLeft: 3,
        fontSize: Tipografia.legenda,
        fontWeight: Tipografia.pesoExtraBold,
        color: Cores.fundo,
    },

    listaContatos: {
        gap: Espacamentos.paddingPequeno,
    },

    cardContato: {
        padding: Espacamentos.paddingMedio,
        borderRadius: Bordas.grande,
        borderWidth: 1,
        borderColor: Cores.bordaMuitoSuave,
        backgroundColor: Cores.fundoAzuladoClaro,
    },

    topoContato: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Bordas.circular,
        backgroundColor: Cores.primaria,
    },

    letraAvatar: {
        fontSize: Tipografia.textoGrande,
        fontWeight: Tipografia.pesoBlack,
        color: Cores.fundo,
    },

    informacoesContato: {
        flex: 1,
        marginLeft: Espacamentos.paddingPequeno,
    },

    nomeContato: {
        fontSize: Tipografia.texto,
        fontWeight: Tipografia.pesoBlack,
        color: Cores.primariaEscura,
    },

    parentescoContato: {
        marginTop: 2,
        fontSize: Tipografia.legenda,
        color: Cores.textoSuave,
    },

    botaoRemover: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Bordas.media,
        backgroundColor: Cores.erroFundo,
    },

    linhaDetalhes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Espacamentos.paddingPequeno,
    },

    seloPrioridade: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: Bordas.circular,
        backgroundColor: Cores.primariaClara,
    },

    textoPrioridade: {
        fontSize: 10.5,
        fontWeight: Tipografia.pesoExtraBold,
        color: Cores.primariaEscura,
    },

    telefoneContato: {
        fontSize: Tipografia.legenda,
        fontWeight: Tipografia.pesoSemiBold,
        color: Cores.textoSecundario,
    },

    motivoContato: {
        marginTop: Espacamentos.paddingPequeno,
        fontSize: Tipografia.legenda,
        lineHeight: 18,
        color: Cores.textoSecundario,
    },

    indicadores: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Espacamentos.pequeno,
        marginTop: Espacamentos.paddingPequeno,
    },

    indicador: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: Bordas.circular,
        backgroundColor: Cores.fundo,
    },

    textoIndicador: {
        marginLeft: 4,
        fontSize: 10.5,
        fontWeight: Tipografia.pesoSemiBold,
        color: Cores.primariaEscura,
    },

    estadoVazio: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Espacamentos.paddingPequeno,
        borderRadius: Bordas.grande,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Cores.bordaCampo,
        backgroundColor: Cores.fundoAzulado,
    },

    textoEstadoVazio: {
        marginLeft: Espacamentos.pequeno,
        fontSize: Tipografia.legenda,
        color: Cores.textoSuave,
    },

    formulario: {
        marginTop: Espacamentos.paddingPequeno,
        padding: Espacamentos.paddingMedio,
        borderRadius: Bordas.campo,
        borderWidth: 1,
        borderColor: Cores.bordaMuitoSuave,
        backgroundColor: Cores.fundoAzuladoClaro,
    },

    cabecalhoFormulario: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: Espacamentos.grande,
    },

    areaTituloFormulario: {
        flex: 1,
    },

    tituloFormulario: {
        fontSize: Tipografia.texto,
        fontWeight: Tipografia.pesoBlack,
        color: Cores.primariaEscura,
    },

    descricaoFormulario: {
        marginTop: 3,
        fontSize: Tipografia.legenda,
        color: Cores.textoSuave,
    },

    botaoFechar: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Bordas.media,
        backgroundColor: Cores.fundo,
    },

    areaBotoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: Espacamentos.pequeno,
    },

    botaoCancelar: {
        minHeight: 43,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Espacamentos.paddingPequeno,
        borderRadius: Bordas.media,
        borderWidth: 1,
        borderColor: Cores.bordaCampo,
        backgroundColor: Cores.fundo,
    },

    textoCancelar: {
        fontSize: Tipografia.legenda,
        fontWeight: Tipografia.pesoExtraBold,
        color: Cores.textoSecundario,
    },

    botaoSalvar: {
        minHeight: 43,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Espacamentos.paddingPequeno,
        borderRadius: Bordas.media,
        backgroundColor: Cores.primaria,
    },

    textoSalvar: {
        marginLeft: 4,
        fontSize: Tipografia.legenda,
        fontWeight: Tipografia.pesoExtraBold,
        color: Cores.fundo,
    },

    areaErro: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
        marginLeft: 4,
    },

    textoErro: {
        flex: 1,
        marginLeft: 5,
        fontSize: Tipografia.legenda,
        color: Cores.erro,
    },

    pressionado: {
        opacity: 0.6,
        transform: [{ scale: 0.98 }],
    },
});