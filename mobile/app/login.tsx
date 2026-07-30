import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
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
  BotaoSocial,
  CampoTexto,
  Card,
  Checkbox,
  Separador,
} from '../src/componentes';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../src/tema';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarDeMim, setLembrarDeMim] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const animacaoCabecalho = useRef(new Animated.Value(0)).current;
  const animacaoCard = useRef(new Animated.Value(0)).current;
  const animacaoLogo = useRef(new Animated.Value(1)).current;

  useEffect(() => { 
    esconderOlhoAutomaticoDoNavegador();

  Animated.stagger(180, [
    Animated.timing(animacaoCabecalho, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),

    Animated.timing(animacaoCard, {
      toValue: 1,
      duration: 750,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
  ]).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(animacaoLogo, {
        toValue: 1.05,
        duration: 1800,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),

      Animated.timing(animacaoLogo, {
        toValue: 1,
        duration: 1800,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ]),
  ).start();
}, []);

function esconderOlhoAutomaticoDoNavegador() {
  if (Platform.OS !== 'web') {
    return;
  }

  const documento = globalThis.document;

  if (!documento) {
    return;
  }

  const idEstilo = 'ocultar-olho-nativo-senha';

  if (documento.getElementById(idEstilo)) {
    return;
  }

  const estilo = documento.createElement('style');

  estilo.id = idEstilo;

  estilo.innerHTML = `
    input::-ms-reveal,
    input::-ms-clear {
      display: none !important;
    }

    input[type="password"]::-webkit-credentials-auto-fill-button,
    input[type="password"]::-webkit-contacts-auto-fill-button {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  `;

  documento.head.appendChild(estilo);
}

  function validarEmail(valor: string) {
    const formatado = valor.trim();
    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatado) {
      setErroEmail('Digite seu e-mail.');
      return false;
    }

    if (!formato.test(formatado)) {
      setErroEmail('Digite um e-mail válido.');
      return false;
    }

    setErroEmail('');
    return true;
  }

  function validarSenha(valor: string) {
    if (!valor) {
      setErroSenha('Digite sua senha.');
      return false;
    }

    if (valor.length < 6) {
      setErroSenha('A senha deve possuir pelo menos 6 caracteres.');
      return false;
    }

    setErroSenha('');
    return true;
  }

  function entrar() {
    const emailValido = validarEmail(email);
    const senhaValida = validarSenha(senha);

    if (!emailValido || !senhaValida) return;

    setCarregando(true);

    setTimeout(() => {
      setCarregando(false);
      console.log({ email, lembrarDeMim });
    }, 1500);
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View pointerEvents="none" style={styles.fundoDecorativo}>
        <LinearGradient
          colors={['rgba(223,239,255,0.95)', 'rgba(247,251,255,0)']}
          style={styles.luzSuperior}
        />
        <LinearGradient
          colors={['rgba(226,241,255,0)', 'rgba(226,241,255,0.75)']}
          style={styles.luzInferior}
        />
        <View style={styles.bolhaUm} />
        <View style={styles.bolhaDois} />
        <View style={styles.bolhaTres} />
        <View style={styles.gradePontos}>
          {Array.from({ length: 24 }).map((_, index) => (
            <View key={index} style={styles.pontoGrade} />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
        >
          <Animated.View
            style={[
              styles.cabecalho,
              {
                opacity: animacaoCabecalho,
                transform: [
                  {
                    translateY: animacaoCabecalho.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.areaMarca}>
              <Animated.View
                style={[
                  styles.logoSombra,
                  { transform: [{ scale: animacaoLogo }] },
                ]}
              >
                <LinearGradient
                  colors={[Cores.fundo, Cores.fundoAzuladoClaro]}
                  style={styles.logo}
                >
                  <Ionicons
                    name="pulse"
                    size={39}
                    color={Cores.primaria}
                  />
                </LinearGradient>
              </Animated.View>

              <View style={styles.areaNome}>
                <Text style={styles.nomeAplicativo}>
                  Alerta<Text style={styles.nomeSos}>SOS</Text>
                </Text>

                <View style={styles.status}>
                  <View style={styles.pontoStatus} />
                  <Text style={styles.textoStatus}>
                    Sua segurança conectada
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.linhaPulso}>
              <View style={styles.tracoPulsoEsquerdo} />
              <View style={styles.pulsoContainer}>
                <View style={styles.pulsoDescida} />
                <View style={styles.pulsoSubida} />
                <View style={styles.pulsoDescidaFinal} />
              </View>
              <View style={styles.tracoPulsoDireito} />
            </View>

            <Text style={styles.titulo}>Bem-vinda de volta</Text>
            <Text style={styles.subtitulo}>
              Entre para continuar monitorando sua saúde e seus alertas.
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: animacaoCard,
              transform: [
                {
                  translateY: animacaoCard.interpolate({
                    inputRange: [0, 1],
                    outputRange: [45, 0],
                  }),
                },
              ],
            }}
          >
            <Card>
              <View style={styles.cabecalhoCard}>
                <View>
                  <Text style={styles.tituloCard}>Acessar sua conta</Text>
                  <Text style={styles.subtituloCard}>
                    Digite seus dados para continuar
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

              <CampoTexto
                rotulo="E-MAIL"
                value={email}
                onChangeText={(valor) => {
                  setEmail(valor);
                  if (erroEmail) setErroEmail('');
                }}
                onBlur={() => {
                  if (email) validarEmail(email);
                }}
                placeholder="voce@exemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                returnKeyType="next"
                erro={erroEmail}
                icone={
                  <Ionicons
                    name="mail-outline"
                    size={21}
                    color={erroEmail ? Cores.erro : Cores.primaria}
                  />
                }
              />

              <CampoTexto
                rotulo="SENHA"
                value={senha}
                onChangeText={(valor) => {
                  setSenha(valor);
                  if (erroSenha) setErroSenha('');
                }}
                onBlur={() => {
                  if (senha) validarSenha(senha);
                }}
                placeholder="Digite sua senha"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={entrar}
                erro={erroSenha}
                senha
                iconeDestacado
                icone={
                  <Ionicons
                    name="lock-closed-outline"
                    size={21}
                    color={Cores.fundo}
                  />
                }
              />

              <View style={styles.areaOpcoes}>
                <Checkbox
                  marcado={lembrarDeMim}
                  texto="Lembrar de mim"
                  onPress={() => setLembrarDeMim((atual) => !atual)}
                />

                <Pressable
                  onPress={() => router.push('/esqueceu-senha' as never)}
                  style={({ pressed }) => [
                    styles.botaoEsqueciSenha,
                    pressed && styles.elementoPressionado,
                  ]}
                >
                  <Text style={styles.textoEsqueciSenha}>
                    Esqueci minha senha
                  </Text>
                </Pressable>
              </View>

              <Botao
                titulo="Entrar"
                textoCarregando="Entrando..."
                onPress={entrar}
                carregando={carregando}
                iconeDireita={
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={Cores.fundo}
                  />
                }
              />

              <Separador />

              <View style={styles.areaLoginSocial}>
                <BotaoSocial
                  titulo="Google"
                  onPress={() => console.log('Login Google')}
                  icone={
                    <View style={styles.logoGoogle}>
                      <Text style={styles.letraGoogle}>G</Text>
                    </View>
                  }
                />

                <BotaoSocial
                  titulo="Apple"
                  onPress={() => console.log('Login Apple')}
                  icone={
                    <Ionicons
                      name="logo-apple"
                      size={22}
                      color={Cores.textoEscuro}
                    />
                  }
                />
              </View>

              <View style={styles.areaCadastro}>
                <Text style={styles.textoSemConta}>
                  Ainda não possui uma conta?
                </Text>

                <Pressable
                  onPress={() => router.push('/cadastro' as never)}
                  style={({ pressed }) => [
                    styles.botaoCadastro,
                    pressed && styles.elementoPressionado,
                  ]}
                >
                  <Text style={styles.textoCadastro}>Cadastre-se</Text>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={17}
                    color={Cores.primaria}
                  />
                </Pressable>
              </View>
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
              Seus dados são protegidos e criptografados
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
    maxWidth: 520,
    alignSelf: 'center',
    paddingHorizontal: Espacamentos.margemHorizontal,
    paddingTop: Platform.OS === 'android' ? 68 : 55,
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
    backgroundColor: 'rgba(72,145,246,0.09)',
  },

  bolhaDois: {
    position: 'absolute',
    width: 52,
    height: 52,
    top: 385,
    left: -18,
    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(72,145,246,0.09)',
  },

  bolhaTres: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 290,
    right: 32,
    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(46,125,245,0.22)',
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
    backgroundColor: 'rgba(46,125,245,0.18)',
  },

  cabecalho: {
    marginBottom: 27,
  },

  areaMarca: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoSombra: {
    borderRadius: Bordas.logo,
    ...Sombras.media,
  },

  logo: {
    width: 74,
    height: 74,
    borderRadius: Bordas.logo,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Cores.bordaCard,
  },

  areaNome: {
    marginLeft: Espacamentos.medio,
  },

  nomeAplicativo: {
    fontSize: Tipografia.cabecalho,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
    letterSpacing: -0.7,
  },

  nomeSos: {
    color: Cores.primaria,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
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
    color: Cores.textoSuave,
  },

  linhaPulso: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 155,
    height: 34,
    marginTop: 21,
  },

  tracoPulsoEsquerdo: {
    width: 52,
    height: 2,
    backgroundColor: Cores.linhaPulso,
  },

  pulsoContainer: {
    width: 52,
    height: 34,
    position: 'relative',
  },

  pulsoDescida: {
    position: 'absolute',
    left: 0,
    top: 15,
    width: 18,
    height: 2,
    backgroundColor: Cores.linhaPulsoMedia,
    transform: [{ rotate: '42deg' }],
  },

  pulsoSubida: {
    position: 'absolute',
    left: 13,
    top: 10,
    width: 28,
    height: 2,
    backgroundColor: Cores.linhaPulsoDestaque,
    transform: [{ rotate: '-62deg' }],
  },

  pulsoDescidaFinal: {
    position: 'absolute',
    right: 0,
    top: 15,
    width: 20,
    height: 2,
    backgroundColor: Cores.linhaPulsoMedia,
    transform: [{ rotate: '42deg' }],
  },

  tracoPulsoDireito: {
    flex: 1,
    height: 2,
    backgroundColor: Cores.linhaPulso,
  },

  titulo: {
    marginTop: 13,
    fontSize: Tipografia.titulo,
    lineHeight: 40,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.texto,
    letterSpacing: -1.2,
  },

  subtitulo: {
    maxWidth: 375,
    marginTop: 9,
    fontSize: Tipografia.textoMedio,
    lineHeight: 23,
    color: Cores.textoSecundario,
  },

  cabecalhoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
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
    color: Cores.textoSuave,
  },

  iconeSeguranca: {
    width: 47,
    height: 47,
    borderRadius: Bordas.grande,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  areaOpcoes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -2,
    marginBottom: 22,
  },

  botaoEsqueciSenha: {
    paddingVertical: 5,
  },

  textoEsqueciSenha: {
    fontSize: 12.5,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primaria,
    textDecorationLine: 'underline',
  },

  areaLoginSocial: {
    flexDirection: 'row',
    gap: 11,
  },

  logoGoogle: {
    width: 24,
    height: 24,
    borderRadius: Bordas.circular,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  letraGoogle: {
    fontSize: 15,
    fontWeight: Tipografia.pesoBlack,
    color: '#4285F4',
  },

  areaCadastro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: Espacamentos.grande,
  },

  textoSemConta: {
    fontSize: 13,
    color: Cores.textoSuave,
  },

  botaoCadastro: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    paddingVertical: 5,
  },

  textoCadastro: {
    marginRight: 4,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
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
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  textoRodape: {
    flexShrink: 1,
    fontSize: 11.5,
    color: Cores.textoSuave,
  },
});
