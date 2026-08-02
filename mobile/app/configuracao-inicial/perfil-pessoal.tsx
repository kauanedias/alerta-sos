import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import {
  Alert,
  Animated,
  Easing,
  Image,
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
  CampoDataNascimento,
  CampoTexto,
  Card,
  ProgressoCadastro,
  SeletorOpcao,
} from '../../src/componentes';

import {
  Bordas,
  Cores,
  Espacamentos,
  Tipografia,
} from '../../src/tema';

const OPCOES_SEXO = [
  {
    rotulo: 'Feminino',
    valor: 'feminino',
  },
  {
    rotulo: 'Masculino',
    valor: 'masculino',
  },
  {
    rotulo: 'Outro',
    valor: 'outro',
  },
  {
    rotulo: 'Prefiro não informar',
    valor: 'nao-informar',
  },
];

export default function PerfilPessoalScreen() {
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [apelido, setApelido] = useState('');
  const [dataNascimento, setDataNascimento] =
    useState<Date>();
  const [sexo, setSexo] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  const [erroNome, setErroNome] = useState('');
  const [erroApelido, setErroApelido] = useState('');
  const [erroData, setErroData] = useState('');
  const [erroAltura, setErroAltura] = useState('');
  const [erroPeso, setErroPeso] = useState('');

  const [carregando, setCarregando] = useState(false);

  const entradaTela = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    Animated.timing(entradaTela, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entradaTela]);

  function validarNome() {
    const nomeFormatado = nomeCompleto.trim();

    if (!nomeFormatado) {
      setErroNome('Digite seu nome completo.');
      return false;
    }

    if (nomeFormatado.length < 3) {
      setErroNome(
        'O nome deve possuir pelo menos 3 caracteres.',
      );
      return false;
    }

    setErroNome('');
    return true;
  }

  function validarApelido() {
    const apelidoFormatado = apelido.trim();

    if (!apelidoFormatado) {
      setErroApelido(
        'Informe como você prefere ser chamado.',
      );
      return false;
    }

    setErroApelido('');
    return true;
  }

  function validarData() {
    if (!dataNascimento) {
      setErroData(
        'Selecione sua data de nascimento.',
      );
      return false;
    }

    setErroData('');
    return true;
  }

  function validarAltura() {
    if (!altura) {
      setErroAltura('');
      return true;
    }

    const alturaNumerica = Number(altura);

    if (alturaNumerica < 50 || alturaNumerica > 250) {
      setErroAltura('Informe uma altura entre 50 e 250 cm.');
      return false;
    }

    setErroAltura('');
    return true;
  }

  function validarPeso() {
    if (!peso) {
      setErroPeso('');
      return true;
    }

    const pesoNumerico = Number(peso.replace(',', '.'));

    if (pesoNumerico < 2 || pesoNumerico > 350) {
      setErroPeso('Informe um peso entre 2 e 350 kg.');
      return false;
    }

    setErroPeso('');
    return true;
  }

  function calcularIdade(data: Date) {
    const hoje = new Date();

    let idade =
      hoje.getFullYear() - data.getFullYear();

    const diferencaMes =
      hoje.getMonth() - data.getMonth();

    if (
      diferencaMes < 0 ||
      (diferencaMes === 0 &&
        hoje.getDate() < data.getDate())
    ) {
      idade -= 1;
    }

    return idade;
  }


  async function selecionarFoto() {
    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita o acesso às suas fotos para escolher uma imagem de perfil.',
      );

      return;
    }

    const resultado =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (resultado.canceled) {
      return;
    }

    setFotoPerfil(resultado.assets[0].uri);
  }


  function continuar() {
    const nomeValido = validarNome();
    const apelidoValido = validarApelido();
    const dataValida = validarData();
    const alturaValida = validarAltura();
    const pesoValido = validarPeso();

    if (
      !nomeValido ||
      !apelidoValido ||
      !dataValida ||
      !alturaValida ||
        !pesoValido
    ) {
      return;
    }

    setCarregando(true);

    setTimeout(() => {
      setCarregando(false);

      console.log({
        nomeCompleto: nomeCompleto.trim(),
        apelido: apelido.trim(),
        dataNascimento:
          dataNascimento?.toISOString(),
        idade: dataNascimento
          ? calcularIdade(dataNascimento)
          : null,
        sexo: sexo || null,
        altura: altura || null,
        peso: peso || null,
        fotoPerfil,
      });

      router.push(
        '/configuracao-inicial/perfil-saude',
      );
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
            'rgba(223, 239, 255, 0.95)',
            'rgba(248, 251, 255, 0)',
          ]}
          style={styles.luzSuperior}
        />

        <LinearGradient
          colors={[
            'rgba(226, 241, 255, 0)',
            'rgba(226, 241, 255, 0.78)',
          ]}
          style={styles.luzInferior}
        />

        <View style={styles.bolhaUm} />
        <View style={styles.bolhaDois} />
        <View style={styles.bolhaTres} />

        <View style={styles.gradePontos}>
          {Array.from({ length: 24 }).map(
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
            etapaAtual={2}
            totalEtapas={5}
            titulo="Perfil pessoal"
            descricao="Essas informações ajudam a identificar você rapidamente."
          />

          <Animated.View
            style={{
              opacity: entradaTela,
              transform: [
                {
                  translateY:
                    entradaTela.interpolate({
                      inputRange: [0, 1],
                      outputRange: [40, 0],
                    }),
                },
              ],
            }}
          >
            <View style={styles.areaApresentacao}>
              <Text style={styles.tituloPrincipal}>
                Conte-nos sobre você
              </Text>

              <Text style={styles.descricaoPrincipal}>
                Vamos começar pelas suas informações
                pessoais.
              </Text>
            </View>

            <Card>
              <View style={styles.cabecalhoCard}>
                <View style={styles.areaTituloCard}>
                  <Text style={styles.tituloCard}>
                    Identificação
                  </Text>

                  <Text style={styles.subtituloCard}>
                    Os campos marcados como opcionais
                    podem ser preenchidos depois.
                  </Text>
                </View>

                <View style={styles.iconeCabecalho}>
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color={Cores.primaria}
                  />
                </View>
              </View>

              <View style={styles.areaFoto}>
                <Pressable
                  onPress={selecionarFoto}
                  style={({ pressed }) => [
                    styles.foto,
                    pressed && styles.pressionado,
                  ]}
                >
                  {fotoPerfil ? (
                    <Image
                      source={{ uri: fotoPerfil }}
                      style={styles.imagemPerfil}
                    />
                  ) : (
                    <Ionicons
                      name="camera-outline"
                      size={29}
                      color={Cores.primaria}
                    />
                  )}

                  <View style={styles.seloCamera}>
                    <Ionicons
                      name="camera"
                      size={13}
                      color={Cores.fundo}
                    />
                  </View>
                </Pressable>

                <View style={styles.conteudoFoto}>
                  <Text style={styles.tituloFoto}>
                    Foto de perfil
                  </Text>

                  <Text style={styles.descricaoFoto}>
                    Opcional. Ajuda seus contatos a identificar você.
                  </Text>

                  <Pressable
                    onPress={selecionarFoto}
                    style={({ pressed }) => [
                      styles.botaoFoto,
                      pressed && styles.pressionado,
                    ]}
                  >
                    <Text style={styles.textoBotaoFoto}>
                      {fotoPerfil ? 'Trocar foto' : 'Adicionar foto'}
                    </Text>
                  </Pressable>

                  {fotoPerfil ? (
                    <Pressable
                      onPress={() => setFotoPerfil(null)}
                      style={({ pressed }) => [
                        styles.botaoRemoverFoto,
                        pressed && styles.pressionado,
                      ]}
                    >
                      <Text style={styles.textoRemoverFoto}>
                        Remover
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>

              <CampoTexto
                rotulo="NOME COMPLETO"
                value={nomeCompleto}
                onChangeText={(valor) => {
                  setNomeCompleto(valor);

                  if (erroNome) {
                    setErroNome('');
                  }
                }}
                onBlur={() => {
                  if (nomeCompleto) {
                    validarNome();
                  }
                }}
                placeholder="Como aparece no seu documento"
                autoCapitalize="words"
                autoCorrect={false}
                autoComplete="name"
                returnKeyType="next"
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
                rotulo="COMO PREFERE SER CHAMADO?"
                value={apelido}
                onChangeText={(valor) => {
                  setApelido(valor);

                  if (erroApelido) {
                    setErroApelido('');
                  }
                }}
                onBlur={() => {
                  if (apelido) {
                    validarApelido();
                  }
                }}
                placeholder="Como prefere ser chamado"
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                erro={erroApelido}
                icone={
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={21}
                    color={
                      erroApelido
                        ? Cores.erro
                        : Cores.primaria
                    }
                  />
                }
              />

              <CampoDataNascimento
                valor={dataNascimento}
                onChange={(data) => {
                  setDataNascimento(data);
                  setErroData('');
                }}
                erro={erroData}
              />

              <SeletorOpcao
                titulo="SEXO — OPCIONAL"
                opcoes={OPCOES_SEXO}
                valorSelecionado={sexo}
                onSelecionar={setSexo}
              />

              <View style={styles.linhaCampos}>
                <CampoTexto
                  rotulo="ALTURA (CM) — OPCIONAL"
                  tipo="altura"
                  value={altura}
                  onChangeText={(valor) => {
                    setAltura(valor);

                    if (erroAltura) {
                      setErroAltura('');
                    }
                  }}
                  onBlur={validarAltura}
                  erro={erroAltura}
                  placeholder="Ex.: 163"
                  returnKeyType="next"
                  containerStyle={styles.campoMetade}
                  icone={
                    <Ionicons
                      name="resize-outline"
                      size={21}
                      color={erroAltura ? Cores.erro : Cores.primaria}
                    />
                  }
                />

                <CampoTexto
                  rotulo="PESO (KG) — OPCIONAL"
                  tipo="peso"
                  value={peso}
                  onChangeText={(valor) => {
                    setPeso(valor);

                    if (erroPeso) {
                      setErroPeso('');
                    }
                  }}
                  onBlur={validarPeso}
                  erro={erroPeso}
                  placeholder="Ex.: 60,5"
                  returnKeyType="done"
                  onSubmitEditing={continuar}
                  containerStyle={styles.campoMetade}
                  icone={
                    <Ionicons
                      name="fitness-outline"
                      size={21}
                      color={erroPeso ? Cores.erro : Cores.primaria}
                    />
                  }
                />
              </View>

              <View style={styles.aviso}>
                <Ionicons
                  name="information-circle-outline"
                  size={19}
                  color={Cores.primaria}
                />

                <Text style={styles.textoAviso}>
                  Você poderá alterar essas informações
                  quando quiser nas configurações.
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
              Suas informações pessoais permanecem
              protegidas.
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
    width: 105,
    height: 105,
    top: 130,
    right: -50,
    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(72,145,246,0.09)',
  },

  bolhaDois: {
    position: 'absolute',
    width: 58,
    height: 58,
    top: 560,
    left: -22,
    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(72,145,246,0.08)',
  },

  bolhaTres: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 320,
    right: 30,
    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(46,125,245,0.20)',
  },

  gradePontos: {
    position: 'absolute',
    top: 190,
    right: 18,
    width: 78,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  pontoGrade: {
    width: 3,
    height: 3,
    margin: 5,
    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(46,125,245,0.17)',
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

  areaApresentacao: {
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
    marginTop: 7,
    fontSize: Tipografia.textoMedio,
    lineHeight: 22,
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
  },

  subtituloCard: {
    marginTop: 4,
    fontSize: 12.5,
    lineHeight: 18,
    color: Cores.textoSuave,
  },

  iconeCabecalho: {
    width: 47,
    height: 47,
    borderRadius: Bordas.grande,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  areaFoto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Espacamentos.grande,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  foto: {
    width: 76,
    height: 76,
    borderRadius: Bordas.circular,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Cores.primariaClara,
    backgroundColor: Cores.fundo,
  },

  imagemPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: Bordas.circular,
  },

  seloCamera: {
    position: 'absolute',
    right: -1,
    bottom: -1,

    width: 25,
    height: 25,

    borderRadius: Bordas.circular,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: Cores.fundo,

    backgroundColor: Cores.primaria,
  },

  conteudoFoto: {
    flex: 1,
    marginLeft: Espacamentos.paddingPequeno,
  },

  tituloFoto: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  descricaoFoto: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    lineHeight: 16,
    color: Cores.textoSuave,
  },

  botaoFoto: {
    alignSelf: 'flex-start',
    marginTop: 7,
    paddingVertical: 4,
  },

  textoBotaoFoto: {
    fontSize: Tipografia.legenda,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primaria,
  },

  botaoRemoverFoto: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingVertical: 3,
  },

  textoRemoverFoto: {
    fontSize: Tipografia.legenda,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.erro,
  },

  linhaCampos: {
    flexDirection: 'row',
    gap: Espacamentos.paddingPequeno,
  },

  campoMetade: {
    flex: 1,
  },

  aviso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Espacamentos.grande,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    backgroundColor: Cores.fundoAzuladoClaro,
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