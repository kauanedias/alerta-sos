import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

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
  CabecalhoAuth,
  Card,
  CodigoVerificacao,
} from '../src/componentes';

import {
  Bordas,
  Cores,
  Espacamentos,
  Tipografia,
} from '../src/tema';

const TEMPO_REENVIO = 60;

export default function VerificarEmailScreen() {
  const parametros = useLocalSearchParams<{
    email?: string;
  }>();

  const emailRecebido =
    typeof parametros.email === 'string'
      ? parametros.email
      : 'seu e-mail';

  const [codigo, setCodigo] = useState(
    Array.from({ length: 6 }, () => ''),
  );

  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [reenviando, setReenviando] = useState(false);
  const [segundosRestantes, setSegundosRestantes] =
    useState(TEMPO_REENVIO);

  const entradaCard = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    Animated.timing(entradaCard, {
      toValue: 1,
      duration: 750,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entradaCard]);

  useEffect(() => {
    if (segundosRestantes <= 0) {
      return;
    }

    const temporizador = setInterval(() => {
      setSegundosRestantes((valorAtual) =>
        Math.max(valorAtual - 1, 0),
      );
    }, 1000);

    return () => {
      clearInterval(temporizador);
    };
  }, [segundosRestantes]);

  function codigoCompleto() {
    return codigo.every((digito) => digito !== '');
  }

  function atualizarCodigo(novoCodigo: string[]) {
    setCodigo(novoCodigo);

    if (erro) {
      setErro('');
    }
  }

  function verificarCodigo() {
    if (!codigoCompleto()) {
      setErro('Digite os 6 números enviados ao seu e-mail.');
      return;
    }

    setCarregando(true);

    const codigoDigitado = codigo.join('');

    // simulação temporária até conectarmos a api
    setTimeout(() => {
      setCarregando(false);

      console.log({
        email: emailRecebido,
        codigo: codigoDigitado,
      });

      // temporariamente, qualquer código de 6 dígitos será aceito
      // futuramente a api fará a validação real

      // próxima etapa:
      router.replace('/configuracao-inicial/boas-vindas');
    }, 1500);
  }

  function reenviarCodigo() {
    if (segundosRestantes > 0 || reenviando) {
      return;
    }

    setReenviando(true);
    setErro('');

    // simulação temporária do reenvio
    setTimeout(() => {
      setReenviando(false);
      setSegundosRestantes(TEMPO_REENVIO);
      setCodigo(Array.from({ length: 6 }, () => ''));

      console.log(
        `Novo código enviado para ${emailRecebido}`,
      );
    }, 1200);
  }

  function formatarTempo(segundos: number) {
    const minutos = Math.floor(segundos / 60);
    const segundosFormatados = segundos % 60;

    return `${String(minutos).padStart(2, '0')}:${String(
      segundosFormatados,
    ).padStart(2, '0')}`;
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
            'rgba(223, 239, 255, 0.95)',
            'rgba(247, 251, 255, 0)',
          ]}
          style={styles.luzSuperior}
        />

        <LinearGradient
          colors={[
            'rgba(226, 241, 255, 0)',
            'rgba(226, 241, 255, 0.75)',
          ]}
          style={styles.luzInferior}
        />

        <View style={styles.bolhaUm} />
        <View style={styles.bolhaDois} />
        <View style={styles.bolhaTres} />

        <View style={styles.gradePontos}>
          {Array.from({ length: 24 }).map(
            (_, index) => (
              <View
                key={index}
                style={styles.pontoGrade}
              />
            ),
          )}
        </View>
      </View>

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
            pressed && styles.elementoPressionado,
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

        <CabecalhoAuth
          titulo="Verifique seu e-mail"
          descricao="Enviamos um código de segurança para confirmar que este endereço pertence a você."
          icone={
            <Ionicons
              name="mail-unread-outline"
              size={38}
              color={Cores.primaria}
            />
          }
        />

        <Animated.View
          style={{
            opacity: entradaCard,
            transform: [
              {
                translateY:
                  entradaCard.interpolate({
                    inputRange: [0, 1],
                    outputRange: [45, 0],
                  }),
              },
            ],
          }}
        >
          <Card>
            <View style={styles.cabecalhoCard}>
              <View style={styles.areaTituloCard}>
                <Text style={styles.tituloCard}>
                  Digite o código
                </Text>

                <Text style={styles.subtituloCard}>
                  Insira os 6 números enviados para
                </Text>

                <Text style={styles.email}>
                  {emailRecebido}
                </Text>
              </View>

              <View style={styles.iconeSeguranca}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={24}
                  color={Cores.primaria}
                />
              </View>
            </View>

            <View style={styles.areaCodigo}>
              <CodigoVerificacao
                codigo={codigo}
                onChange={atualizarCodigo}
                erro={Boolean(erro)}
              />
            </View>

            {erro ? (
              <View style={styles.areaErro}>
                <Ionicons
                  name="alert-circle-outline"
                  size={16}
                  color={Cores.erro}
                />

                <Text style={styles.textoErro}>
                  {erro}
                </Text>
              </View>
            ) : null}

            <View style={styles.aviso}>
              <View style={styles.iconeAviso}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={Cores.primaria}
                />
              </View>

              <View style={styles.conteudoAviso}>
                <Text style={styles.tituloAviso}>
                  Não recebeu o código?
                </Text>

                <Text style={styles.textoAviso}>
                  Verifique também sua caixa de spam ou
                  lixo eletrônico.
                </Text>
              </View>
            </View>

            <Botao
              titulo="Verificar código"
              textoCarregando="Verificando..."
              onPress={verificarCodigo}
              carregando={carregando}
              iconeDireita={
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={Cores.fundo}
                />
              }
            />

            <View style={styles.areaReenvio}>
              {segundosRestantes > 0 ? (
                <>
                  <Text style={styles.textoReenvio}>
                    Você poderá solicitar um novo código em
                  </Text>

                  <View style={styles.contador}>
                    <Ionicons
                      name="timer-outline"
                      size={16}
                      color={Cores.primaria}
                    />

                    <Text style={styles.textoContador}>
                      {formatarTempo(segundosRestantes)}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.textoReenvio}>
                    O código não chegou?
                  </Text>

                  <Pressable
                    onPress={reenviarCodigo}
                    disabled={reenviando}
                    style={({ pressed }) => [
                      styles.botaoReenviar,
                      pressed &&
                        !reenviando &&
                        styles.elementoPressionado,
                    ]}
                  >
                    {reenviando ? (
                      <Text style={styles.textoReenviar}>
                        Reenviando...
                      </Text>
                    ) : (
                      <>
                        <Ionicons
                          name="refresh-outline"
                          size={18}
                          color={Cores.primaria}
                        />

                        <Text
                          style={styles.textoReenviar}
                        >
                          Reenviar código
                        </Text>
                      </>
                    )}
                  </Pressable>
                </>
              )}
            </View>

            <View style={styles.divisoria} />

            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.botaoAlterarEmail,
                pressed && styles.elementoPressionado,
              ]}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={Cores.primaria}
              />

              <Text style={styles.textoAlterarEmail}>
                Alterar endereço de e-mail
              </Text>
            </Pressable>
          </Card>
        </Animated.View>

        <View style={styles.rodape}>
          <View style={styles.escudoRodape}>
            <Ionicons
              name="lock-closed"
              size={13}
              color={Cores.primaria}
            />
          </View>

          <Text style={styles.textoRodape}>
            Nunca compartilhe este código com outras
            pessoas
          </Text>
        </View>
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
      Platform.OS === 'android' ? 55 : 42,
    paddingBottom: 90,
  },

  fundoDecorativo: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },

  luzSuperior: {
    position: 'absolute',
    width: 430,
    height: 430,
    top: -250,
    right: -190,
    borderRadius: 215,
  },

  luzInferior: {
    position: 'absolute',
    width: 390,
    height: 390,
    bottom: -250,
    left: -220,
    borderRadius: 195,
  },

  bolhaUm: {
    position: 'absolute',
    width: 95,
    height: 95,
    top: 120,
    right: -45,
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(72,145,246,0.09)',
  },

  bolhaDois: {
    position: 'absolute',
    width: 52,
    height: 52,
    top: 480,
    left: -18,
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(72,145,246,0.09)',
  },

  bolhaTres: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 310,
    right: 32,
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(46,125,245,0.22)',
  },

  gradePontos: {
    position: 'absolute',
    top: 180,
    right: 19,
    width: 78,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  pontoGrade: {
    width: 3,
    height: 3,
    margin: 5,
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(46,125,245,0.18)',
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
    fontWeight:
      Tipografia.pesoExtraBold,
    color: Cores.primaria,
  },

  cabecalhoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginTop: 5,
    fontSize: 12.5,
    lineHeight: 18,
    color: Cores.textoSuave,
  },

  email: {
    marginTop: 3,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primaria,
  },

  iconeSeguranca: {
    width: 47,
    height: 47,
    borderRadius: Bordas.grande,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor:
      Cores.fundoAzuladoClaro,
  },

  areaCodigo: {
    marginBottom: Espacamentos.medio,
  },

  areaErro: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -6,
    marginBottom: Espacamentos.medio,
    paddingHorizontal: 4,
  },

  textoErro: {
    flex: 1,
    marginLeft: 6,
    fontSize: Tipografia.legenda,
    color: Cores.erro,
  },

  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Espacamentos.grande,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor:
      Cores.fundoAzuladoClaro,
  },

  iconeAviso: {
    width: 40,
    height: 40,
    borderRadius: Bordas.media,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Cores.fundo,
  },

  conteudoAviso: {
    flex: 1,
    marginLeft: Espacamentos.paddingPequeno,
  },

  tituloAviso: {
    fontSize: 12.5,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primariaEscura,
  },

  textoAviso: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    lineHeight: 17,
    color: Cores.textoSuave,
  },

  areaReenvio: {
    alignItems: 'center',
    marginTop: Espacamentos.grande,
  },

  textoReenvio: {
    fontSize: 12.5,
    color: Cores.textoSuave,
    textAlign: 'center',
  },

  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Espacamentos.pequeno,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Bordas.circular,
    backgroundColor:
      Cores.fundoAzuladoClaro,
  },

  textoContador: {
    marginLeft: 5,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primaria,
  },

  botaoReenviar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Espacamentos.pequeno,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },

  textoReenviar: {
    marginLeft: 5,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primaria,
  },

  divisoria: {
    width: '100%',
    height: 1,
    marginVertical: Espacamentos.grande,
    backgroundColor: Cores.divisoria,
  },

  botaoAlterarEmail: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },

  textoAlterarEmail: {
    marginLeft: 6,
    fontSize: 12.5,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primaria,
  },

  elementoPressionado: {
    opacity: 0.55,
  },

  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    paddingHorizontal: 10,
  },

  escudoRodape: {
    width: 31,
    height: 31,
    marginRight: 9,
    borderRadius: Bordas.media,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Cores.bordaSuave,
    backgroundColor:
      Cores.fundoAzuladoClaro,
  },

  textoRodape: {
    flexShrink: 1,
    fontSize: 11.5,
    color: Cores.textoSuave,
  },
});