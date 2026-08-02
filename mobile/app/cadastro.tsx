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
  CabecalhoAuth,
  CampoTexto,
  Card,
  Checkbox,
  Separador,
} from '../src/componentes';

import {
  Bordas,
  Cores,
  Espacamentos,
  Tipografia,
} from '../src/tema';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [erroNome, setErroNome] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroConfirmacao, setErroConfirmacao] = useState('');
  const [erroTermos, setErroTermos] = useState('');
  const [erroAltura, setErroAltura] = useState('');
  const [erroPeso, setErroPeso] = useState('');

  const entradaCard = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entradaCard, {
      toValue: 1,
      duration: 750,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    esconderOlhoAutomaticoDoNavegador();
  }, [entradaCard]);

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

  function validarNome(valor: string) {
    const nomeFormatado = valor.trim();

    if (!nomeFormatado) {
      setErroNome('Digite seu nome completo.');
      return false;
    }

    if (nomeFormatado.length < 3) {
      setErroNome('O nome deve possuir pelo menos 3 caracteres.');
      return false;
    }

    setErroNome('');
    return true;
  }

  function validarEmail(valor: string) {
    const emailFormatado = valor.trim();
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailFormatado) {
      setErroEmail('Digite seu e-mail.');
      return false;
    }

    if (!formatoEmail.test(emailFormatado)) {
      setErroEmail('Digite um e-mail válido.');
      return false;
    }

    setErroEmail('');
    return true;
  }

  function validarSenha(valor: string) {
    if (!valor) {
      setErroSenha('Crie uma senha.');
      return false;
    }

    if (valor.length < 8) {
      setErroSenha('A senha deve possuir pelo menos 8 caracteres.');
      return false;
    }

    if (!/[A-Z]/.test(valor)) {
      setErroSenha('Inclua pelo menos uma letra maiúscula.');
      return false;
    }

    if (!/[0-9]/.test(valor)) {
      setErroSenha('Inclua pelo menos um número.');
      return false;
    }

    setErroSenha('');
    return true;
  }

  function validarConfirmacao(valor: string) {
    if (!valor) {
      setErroConfirmacao('Confirme sua senha.');
      return false;
    }

    if (valor !== senha) {
      setErroConfirmacao('As senhas não são iguais.');
      return false;
    }

    setErroConfirmacao('');
    return true;
  }

  function validarTermos() {
    if (!aceitouTermos) {
      setErroTermos('Você precisa aceitar os termos para continuar.');
      return false;
    }

    setErroTermos('');
    return true;
  }

  function cadastrar() {
    const nomeValido = validarNome(nome);
    const emailValido = validarEmail(email);
    const senhaValida = validarSenha(senha);
    const confirmacaoValida = validarConfirmacao(confirmarSenha);
    const termosValidos = validarTermos();

    if (
      !nomeValido ||
      !emailValido ||
      !senhaValida ||
      !confirmacaoValida ||
      !termosValidos
    ) {
      return;
    }

    setCarregando(true);

    // Simulação temporária até conectarmos a API.
    setTimeout(() => {
      setCarregando(false);

      console.log({
        nome: nome.trim(),
        email: email.trim(),
      });

      router.replace({
      pathname: '/verificar-email',
      params: {
      email: email.trim(),
  },
});    
    }, 1600);
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
          nestedScrollEnabled
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

            <Text style={styles.textoVoltar}>Voltar</Text>
          </Pressable>

          <CabecalhoAuth
            titulo="Crie sua conta"
            descricao="Comece sua jornada com mais segurança, cuidado e conexão."
            icone={
              <Ionicons
                name="person-add-outline"
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
                  translateY: entradaCard.interpolate({
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
                    Dados de acesso
                  </Text>

                  <Text style={styles.subtituloCard}>
                    Preencha as informações para criar sua conta
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
                rotulo="NOME COMPLETO"
                value={nome}
                onChangeText={(valor) => {
                  setNome(valor);

                  if (erroNome) {
                    setErroNome('');
                  }
                }}
                onBlur={() => {
                  if (nome) {
                    validarNome(nome);
                  }
                }}
                placeholder="Digite seu nome completo"
                autoCapitalize="words"
                autoCorrect={false}
                autoComplete="name"
                returnKeyType="next"
                erro={erroNome}
                icone={
                  <Ionicons
                    name="person-outline"
                    size={21}
                    color={erroNome ? Cores.erro : Cores.primaria}
                  />
                }
              />

              <CampoTexto
                rotulo="E-MAIL"
                value={email}
                onChangeText={(valor) => {
                  setEmail(valor);

                  if (erroEmail) {
                    setErroEmail('');
                  }
                }}
                onBlur={() => {
                  if (email) {
                    validarEmail(email);
                  }
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

                  if (erroSenha) {
                    setErroSenha('');
                  }

                  if (erroConfirmacao && confirmarSenha === valor) {
                    setErroConfirmacao('');
                  }
                }}
                onBlur={() => {
                  if (senha) {
                    validarSenha(senha);
                  }
                }}
                placeholder="Crie uma senha segura"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="newPassword"
                returnKeyType="next"
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

              <View style={styles.requisitosSenha}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={Cores.primaria}
                />

                <Text style={styles.textoRequisitos}>
                  Use 8 caracteres, uma letra maiúscula e um número.
                </Text>
              </View>

              <CampoTexto
                rotulo="CONFIRMAR SENHA"
                value={confirmarSenha}
                onChangeText={(valor) => {
                  setConfirmarSenha(valor);

                  if (erroConfirmacao) {
                    setErroConfirmacao('');
                  }
                }}
                onBlur={() => {
                  if (confirmarSenha) {
                    validarConfirmacao(confirmarSenha);
                  }
                }}
                placeholder="Digite a senha novamente"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="newPassword"
                returnKeyType="done"
                onSubmitEditing={cadastrar}
                erro={erroConfirmacao}
                senha
                iconeDestacado
                icone={
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={21}
                    color={Cores.fundo}
                  />
                }
              />

              <View style={styles.areaTermos}>
                <Checkbox
                  marcado={aceitouTermos}
                  texto="Li e aceito os termos"
                  onPress={() => {
                    setAceitouTermos((valorAtual) => !valorAtual);

                    if (erroTermos) {
                      setErroTermos('');
                    }
                  }}
                />

                <View style={styles.linksTermos}>
                  <Pressable
                    onPress={() =>
                      console.log('Abrir termos de uso')
                    }
                  >
                    <Text style={styles.linkTermos}>
                      Termos de Uso
                    </Text>
                  </Pressable>

                  <Text style={styles.separadorTermos}>•</Text>

                  <Pressable
                    onPress={() =>
                      console.log('Abrir política de privacidade')
                    }
                  >
                    <Text style={styles.linkTermos}>
                      Privacidade
                    </Text>
                  </Pressable>
                </View>

                {erroTermos ? (
                  <View style={styles.areaErroTermos}>
                    <Ionicons
                      name="alert-circle-outline"
                      size={15}
                      color={Cores.erro}
                    />

                    <Text style={styles.textoErroTermos}>
                      {erroTermos}
                    </Text>
                  </View>
                ) : null}
              </View>

              <Botao
                titulo="Criar conta"
                textoCarregando="Criando conta..."
                onPress={cadastrar}
                carregando={carregando}
                iconeDireita={
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={Cores.fundo}
                  />
                }
              />

              <Separador texto="OU CADASTRE-SE COM" />

              <View style={styles.areaLoginSocial}>
                <BotaoSocial
                  titulo="Google"
                  onPress={() =>
                    console.log('Cadastro com Google')
                  }
                  icone={
                    <View style={styles.logoGoogle}>
                      <Text style={styles.letraGoogle}>G</Text>
                    </View>
                  }
                />

                <BotaoSocial
                  titulo="Apple"
                  onPress={() =>
                    console.log('Cadastro com Apple')
                  }
                  icone={
                    <Ionicons
                      name="logo-apple"
                      size={22}
                      color={Cores.textoEscuro}
                    />
                  }
                />
              </View>

              <View style={styles.areaLogin}>
                <Text style={styles.textoPossuiConta}>
                  Já possui uma conta?
                </Text>

                <Pressable
                  onPress={() => router.replace('/login')}
                  style={({ pressed }) => [
                    styles.botaoLogin,
                    pressed && styles.elementoPressionado,
                  ]}
                >
                  <Text style={styles.textoLogin}>Entrar</Text>

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
              Seus dados serão protegidos e criptografados
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
    paddingTop: Platform.OS === 'android' ? 55 : 42,
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
    top: 500,
    left: -18,
    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(72,145,246,0.09)',
  },

  bolhaTres: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 310,
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

  cabecalhoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
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

  requisitosSenha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -9,
    marginBottom: Espacamentos.medio,
    paddingHorizontal: 5,
  },

  textoRequisitos: {
    flex: 1,
    marginLeft: 6,
    fontSize: Tipografia.legenda,
    lineHeight: 17,
    color: Cores.textoSuave,
  },

  areaTermos: {
    marginTop: -2,
    marginBottom: 22,
  },

  linksTermos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 30,
  },

  linkTermos: {
    fontSize: Tipografia.legenda,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primaria,
    textDecorationLine: 'underline',
  },

  separadorTermos: {
    marginHorizontal: 8,
    color: Cores.textoClaro,
  },

  areaErroTermos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
  },

  textoErroTermos: {
    flex: 1,
    marginLeft: 5,
    fontSize: Tipografia.legenda,
    color: Cores.erro,
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

  areaLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: Espacamentos.grande,
  },

  textoPossuiConta: {
    fontSize: 13,
    color: Cores.textoSuave,
  },

  botaoLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    paddingVertical: 5,
  },

  textoLogin: {
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