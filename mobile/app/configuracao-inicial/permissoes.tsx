import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';


import {
    Botao,
    Card,
    CardPermissao,
    MensagemLuma,
    ProgressoCadastro,
} from '../../src/componentes';

import {
    Bordas,
    Cores,
    Espacamentos,
    Tipografia,
} from '../../src/tema';

export default function PermissoesScreen() {
    const parametros = useLocalSearchParams<{
        nome?: string;
    }>();

    const nomePreferido =
        parametros.nome || 'você';

    const [localizacao, setLocalizacao] =
        useState(true);

    const [notificacoes, setNotificacoes] =
        useState(true);

    const [telefone, setTelefone] =
        useState(true);

    const [bluetooth, setBluetooth] =
        useState(false);

    const [smartwatch, setSmartwatch] =
        useState(false);

    const [erroPermissoes, setErroPermissoes] =
        useState('');

    function continuar() {
        if (!localizacao || !notificacoes || !telefone) {
            setErroPermissoes(
                'Ative Localização, Notificações e Telefone e SMS para continuar.',
            );

            return;
        }

        setErroPermissoes('');

        console.log({
            localizacao,
            notificacoes,
            telefone,
            bluetooth,
            smartwatch,
        });

        router.push({
            pathname:
                '/configuracao-inicial/cadastro-concluido',

            params: {
                nome: nomePreferido,
            },
        });
    }


    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.conteudo}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
        >

            <ProgressoCadastro
                etapaAtual={5}
                totalEtapas={5}
                titulo="Permissões"
                descricao="Última etapa."
            />

            <View style={styles.areaTitulo}>
                <Text style={styles.titulo}>
                    Quase terminamos
                </Text>

                <Text style={styles.subtitulo}>
                    Vamos preparar o AlertaSOS para
                    funcionar corretamente.
                </Text>
            </View>

            <MensagemLuma
                texto={`Estamos quase terminando, ${nomePreferido}! Essas permissões permitem que eu envie alertas, compartilhe sua localização e utilize recursos importantes quando você realmente precisar.`}
            />


            <View style={styles.espaco} />

            <Card>

                <CardPermissao
                    titulo="Localização"
                    descricao="Compartilha sua localização durante uma emergência."
                    ativa={localizacao}
                    onChange={(valor) => {
                        setLocalizacao(valor);

                        if (valor && erroPermissoes) {
                            setErroPermissoes('');
                        }
                    }}
                    obrigatoria
                    icone={
                        <Ionicons
                            name="location-outline"
                            size={22}
                            color={Cores.primaria}
                        />
                    }
                />

                <CardPermissao
                    titulo="Notificações"
                    descricao="Permite avisos importantes e confirmações."
                    ativa={notificacoes}
                    onChange={(valor) => {
                        setNotificacoes(valor);

                        if (valor && erroPermissoes) {
                            setErroPermissoes('');
                        }
                    }}
                    obrigatoria
                    icone={
                        <Ionicons
                            name="notifications-outline"
                            size={22}
                            color={Cores.primaria}
                        />
                    }
                />

                <CardPermissao
                    titulo="Telefone e SMS"
                    descricao="Permite ligar ou enviar mensagens rapidamente."
                    ativa={telefone}
                    onChange={(valor) => {
                        setTelefone(valor);

                        if (valor && erroPermissoes) {
                            setErroPermissoes('');
                        }
                    }}
                    obrigatoria
                    icone={
                        <Ionicons
                            name="call-outline"
                            size={22}
                            color={Cores.primaria}
                        />
                    }
                />

                <CardPermissao
                    titulo="Bluetooth"
                    descricao="Necessário para integração com dispositivos externos."
                    ativa={bluetooth}
                    onChange={setBluetooth}
                    recomendada
                    icone={
                        <Ionicons
                            name="bluetooth-outline"
                            size={22}
                            color={Cores.primaria}
                        />
                    }
                />

                <CardPermissao
                    titulo="Smartwatch"
                    descricao="Será utilizado futuramente para detectar quedas e monitorar sinais."
                    ativa={smartwatch}
                    onChange={setSmartwatch}
                    recomendada
                    indisponivel
                    icone={
                        <Ionicons
                            name="watch-outline"
                            size={22}
                            color={Cores.primaria}
                        />
                    }
                />

            </Card>

            {erroPermissoes ? (
                <View style={styles.areaErro}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={18}
                        color={Cores.erro}
                    />

                    <Text style={styles.textoErro}>
                        {erroPermissoes}
                    </Text>
                </View>
            ) : null}

            <View style={styles.espaco} />

            <MensagemLuma
                texto="Perfeito! Depois de finalizar o cadastro, o próprio celular solicitará apenas as permissões que forem realmente necessárias."
            />

            <View style={styles.aviso}>
                <Ionicons
                    name="shield-checkmark-outline"
                    size={18}
                    color={Cores.primaria}
                />

                <Text style={styles.textoAviso}>
                    Nenhuma informação será compartilhada sem sua autorização.
                </Text>
            </View>

            <Botao
                titulo="Finalizar cadastro"
                onPress={continuar}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Cores.fundo,
    },

    conteudo: {
        flexGrow: 1,
        width: '100%',
        maxWidth: 540,
        alignSelf: 'center',

        paddingHorizontal: Espacamentos.margemHorizontal,
        paddingTop: Platform.OS === 'android' ? 52 : 40,
        paddingBottom: 120,
    },

    areaTitulo: {
        marginBottom: Espacamentos.grande,
    },

    titulo: {
        fontSize: 30,
        fontWeight: Tipografia.pesoBlack,
        color: Cores.primariaEscura,
    },

    subtitulo: {
        marginTop: 6,
        fontSize: Tipografia.textoPequeno,
        color: Cores.textoSuave,
        lineHeight: 22,
    },

    espaco: {
        height: Espacamentos.grande,
    },

    areaErro: {
        flexDirection: 'row',
        alignItems: 'flex-start',

        marginTop: Espacamentos.medio,
        padding: Espacamentos.paddingPequeno,

        borderRadius: Bordas.grande,
        borderWidth: 1,
        borderColor: Cores.erroBorda,

        backgroundColor: Cores.erroFundo,
    },

    textoErro: {
        flex: 1,
        marginLeft: Espacamentos.pequeno,

        fontSize: Tipografia.legenda,
        lineHeight: 18,

        color: Cores.erro,
    },

    aviso: {
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: Espacamentos.grande,
        marginBottom: Espacamentos.grande,

        padding: Espacamentos.paddingMedio,

        borderRadius: Bordas.grande,
        backgroundColor: Cores.fundoAzulado,
    },

    textoAviso: {
        flex: 1,
        marginLeft: Espacamentos.pequeno,
        fontSize: Tipografia.legenda,
        color: Cores.textoSecundario,
    },
});