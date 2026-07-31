import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
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
  Card,
  CardInformacao,
  ProgressoCadastro,
} from '../../src/componentes';

import {
  Bordas,
  Cores,
  Espacamentos,
  Tipografia,
} from '../../src/tema';

export default function BoasVindasConfiguracaoScreen() {
  const animacaoCabecalho = useRef(
    new Animated.Value(0),
  ).current;

  const animacaoCard = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    Animated.stagger(180, [
      Animated.timing(animacaoCabecalho, {
        toValue: 1,
        duration: 650,
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
  }, [animacaoCabecalho, animacaoCard]);

  function comecarConfiguracao() {
    router.push('/configuracao-inicial/perfil-pessoal');
  }

  function voltar() {
    router.back();
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

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          onPress={voltar}
          style={({ pressed }) => [
            styles.botaoVoltar,
            pressed && styles.elementoPressionado,
          ]}
        >
          <Text style={styles.setaVoltar}>‹</Text>

          <Text style={styles.textoVoltar}>
            Voltar
          </Text>
        </Pressable>

        <Animated.View
          style={{
            opacity: animacaoCabecalho,
            transform: [
              {
                translateY:
                  animacaoCabecalho.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-25, 0],
                  }),
              },
            ],
          }}
        >
          <ProgressoCadastro
            etapaAtual={1}
            totalEtapas={5}
            titulo="Configuração inicial"
            descricao="Vamos preparar o AlertaSOS para conhecer você e agir melhor quando cada segundo importar."
          />

          <View style={styles.areaApresentacao}>
            <View style={styles.marca}>
              <Text style={styles.nomeAplicativo}>
                Alerta
                <Text style={styles.nomeSos}>
                  SOS
                </Text>
              </Text>

              <View style={styles.status}>
                <View style={styles.pontoStatus} />

                <Text style={styles.textoStatus}>
                  Configuração personalizada
                </Text>
              </View>
            </View>

            <Text style={styles.tituloPrincipal}>
              Vamos conhecer você
            </Text>

          </View>
        </Animated.View>

        <Animated.View
          style={{
            opacity: animacaoCard,
            transform: [
              {
                translateY:
                  animacaoCard.interpolate({
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
                  Vamos conhecer você
                </Text>

                <Text style={styles.subtituloCard}>
                  Leva menos de 2 minutos.
                </Text>
              </View>

              <View style={styles.numeroEtapas}>
                <Text style={styles.textoNumeroEtapas}>
                  5
                </Text>

                <Text style={styles.legendaNumeroEtapas}>
                  etapas
                </Text>
              </View>
            </View>

            <View style={styles.areaCards}>
              <CardInformacao
                titulo="Perfil pessoal"
                descricao="Sua identificação e como prefere ser chamado."
                style={styles.cardInformacao}
              />

              <CardInformacao
                titulo="Perfil de saúde"
                descricao="Condições, alergias, medicamentos e mobilidade."
                style={styles.cardInformacao}
              />

              <CardInformacao
                titulo="Contatos"
                descricao="Quem deve ser avisado e por que esse contato é importante."
                style={styles.cardInformacao}
              />

              <CardInformacao
                titulo="Permissões"
                descricao="Recursos necessários para localização, alertas e comunicação."
                style={styles.cardInformacao}
              />
            </View>

            <View style={styles.areaImportancia}>
              <View style={styles.linhaImportancia} />

              <Text style={styles.textoImportancia}>
                Essas informações ajudam o AlertaSOS a agir com mais rapidez quando você precisar.
              </Text>
            </View>

            <View style={styles.areaTempo}>
              <View style={styles.contadorTempo}>
                <Text style={styles.numeroTempo}>
                  2
                </Text>

                <Text style={styles.unidadeTempo}>
                  min
                </Text>
              </View>

              <View style={styles.conteudoTempo}>
                <Text style={styles.tituloTempo}>
                  Configuração rápida
                </Text>

                <Text style={styles.textoTempo}>
                  Você poderá alterar todas as
                  informações depois.
                </Text>
              </View>
            </View>

            <Botao
              titulo="Começar configuração"
              onPress={comecarConfiguracao}
              iconeDireita={
                <Text style={styles.setaBotao}>
                  →
                </Text>
              }
            />
          </Card>
        </Animated.View>

        <View style={styles.rodape}>
          <View style={styles.seloPrivacidade}>
            <View style={styles.pontoPrivacidade} />

            <Text style={styles.tituloPrivacidade}>
              Seus dados são privados
            </Text>
          </View>

          <Text style={styles.textoPrivacidade}>
            As informações serão utilizadas para
            personalizar sua proteção e poderão ser
            compartilhadas em situações de emergência
            conforme suas permissões.
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
    backgroundColor:
      'rgba(72, 145, 246, 0.09)',
  },

  bolhaDois: {
    position: 'absolute',
    width: 58,
    height: 58,
    top: 520,
    left: -22,
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(72, 145, 246, 0.08)',
  },

  bolhaTres: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 320,
    right: 30,
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(46, 125, 245, 0.20)',
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
    backgroundColor:
      'rgba(46, 125, 245, 0.17)',
  },

  botaoVoltar: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Espacamentos.medio,
    paddingVertical: 7,
    paddingRight: 12,
  },

  setaVoltar: {
    marginTop: -2,
    fontSize: 27,
    lineHeight: 27,
    fontWeight: Tipografia.pesoRegular,
    color: Cores.primaria,
  },

  textoVoltar: {
    marginLeft: 5,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primaria,
  },

  areaApresentacao: {
    marginBottom: 28,
  },

  marca: {
    marginBottom: 18,
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

  tituloPrincipal: {
    maxWidth: 430,
    fontSize: Tipografia.titulo,
    lineHeight: 40,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.texto,
    letterSpacing: -1.1,
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
    marginTop: 5,
    fontSize: 12.5,
    lineHeight: 18,
    color: Cores.textoSuave,
  },

  numeroEtapas: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor:
      Cores.fundoAzuladoClaro,
  },

  textoNumeroEtapas: {
    fontSize: 21,
    lineHeight: 23,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primaria,
  },

  legendaNumeroEtapas: {
    marginTop: 1,
    fontSize: 9.5,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.textoSuave,
  },

  areaCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Espacamentos.paddingPequeno,
  },

  cardInformacao: {
    width: '47%',
    flexGrow: 1,
  },

  areaImportancia: {
    marginTop: Espacamentos.grande,
    paddingHorizontal: 4,
  },

  linhaImportancia: {
    width: 48,
    height: 3,
    marginBottom: 10,
    borderRadius: Bordas.circular,
    backgroundColor: Cores.primariaMedia,
  },

  textoImportancia: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: Tipografia.pesoSemiBold,
    color: Cores.textoSecundario,
  },

  areaTempo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Espacamentos.grande,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor:
      Cores.fundoAzuladoClaro,
  },

  contadorTempo: {
    width: 53,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.grande,
    backgroundColor: Cores.fundo,
  },

  numeroTempo: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primaria,
  },

  unidadeTempo: {
    fontSize: 9.5,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.textoSuave,
  },

  conteudoTempo: {
    flex: 1,
    marginLeft: Espacamentos.paddingPequeno,
  },

  tituloTempo: {
    fontSize: 13,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primariaEscura,
  },

  textoTempo: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    lineHeight: 17,
    color: Cores.textoSuave,
  },

  setaBotao: {
    fontSize: 20,
    fontWeight: Tipografia.pesoBold,
    color: Cores.fundo,
  },

  rodape: {
    marginTop: 25,
    paddingHorizontal: 10,
  },

  seloPrivacidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pontoPrivacidade: {
    width: 7,
    height: 7,
    marginRight: 7,
    borderRadius: Bordas.circular,
    backgroundColor: Cores.sucesso,
  },

  tituloPrivacidade: {
    fontSize: 12,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primariaEscura,
  },

  textoPrivacidade: {
    maxWidth: 390,
    alignSelf: 'center',
    marginTop: 7,
    fontSize: 11.5,
    lineHeight: 17,
    textAlign: 'center',
    color: Cores.textoSuave,
  },

  elementoPressionado: {
    opacity: 0.55,
  },
});