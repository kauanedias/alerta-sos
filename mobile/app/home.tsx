import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  router,
  useLocalSearchParams,
} from 'expo-router';
import { useState } from 'react';

import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../src/tema';

export default function HomeScreen() {
  const parametros = useLocalSearchParams<{
    nome?: string;
  }>();

  const nomePreferido =
    typeof parametros.nome === 'string' &&
      parametros.nome.trim()
      ? parametros.nome.trim()
      : 'Kauane';

  const [sosPressionado, setSosPressionado] =
    useState(false);

  function acionarSOS() {
    setSosPressionado(true);

    Alert.alert(
      'Acionar SOS?',
      'Se você continuar, seus contatos de emergência serão avisados e sua localização será compartilhada.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => setSosPressionado(false),
        },
        {
          text: 'Acionar SOS',
          style: 'destructive',
          onPress: () => {
            console.log('SOS acionado');

            setSosPressionado(false);

            // Depois vamos abrir a tela real de emergência.
          },
        },
      ],
    );
  }

  async function abrirDiscador(
    numero: string,
    servico: string,
  ) {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Recurso disponível no celular',
        `Abra o AlertaSOS no celular para ligar para ${servico}.`,
      );

      return;
    }

    const url = `tel:${numero}`;

    try {
      const podeAbrir = await Linking.canOpenURL(url);

      if (!podeAbrir) {
        Alert.alert(
          'Não foi possível abrir o telefone',
          `Ligue manualmente para ${numero}.`,
        );

        return;
      }

      await Linking.openURL(url);
    } catch (erro) {
      console.error(
        `Erro ao abrir ligação para ${servico}:`,
        erro,
      );

      Alert.alert(
        'Não foi possível iniciar a ligação',
        `Ligue manualmente para ${numero}.`,
      );
    }
  }

  function confirmarLigacaoPolicia() {
    Alert.alert(
      'Ligar para a Polícia Militar?',
      'O número 190 será colocado no discador do seu celular.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Abrir discador',
          onPress: () =>
            abrirDiscador('190', 'a Polícia Militar'),
        },
      ],
    );
  }

  function confirmarLigacaoAmbulancia() {
    Alert.alert(
      'Ligar para o SAMU?',
      'O número 192 será colocado no discador do seu celular.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Abrir discador',
          onPress: () =>
            abrirDiscador('192', 'o SAMU'),
        },
      ],
    );
  }

  function abrirSmartwatch() {
    router.push({
      pathname: '/smartwatch',

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
            'rgba(214, 235, 255, 0.98)',
            'rgba(248, 251, 255, 0)',
          ]}
          style={styles.luzSuperior}
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
      >
        <View style={styles.cabecalho}>
          <View style={styles.areaSaudacao}>
            <Text style={styles.saudacao}>
              Olá, {nomePreferido}
            </Text>

            <Text style={styles.subtitulo}>
              Como você está hoje?
            </Text>
          </View>

          <Pressable
            onPress={() =>
              router.push('/configuracao-inicial/perfil-pessoal')
            }
            style={({ pressed }) => [
              styles.avatar,
              pressed && styles.pressionado,
            ]}
          >
            <Text style={styles.letraAvatar}>
              {nomePreferido.charAt(0).toUpperCase()}
            </Text>
          </Pressable>
        </View>

        <View style={styles.statusProtecao}>
          <View style={styles.areaStatus}>
            <View style={styles.pontoStatus} />

            <View>
              <Text style={styles.tituloStatus}>
                Proteção ativa
              </Text>

              <Text style={styles.textoStatus}>
                O AlertaSOS está pronto para ajudar.
              </Text>
            </View>
          </View>

          <Ionicons
            name="shield-checkmark-outline"
            size={27}
            color={Cores.sucesso}
          />
        </View>

        <View style={styles.areaSOS}>
          <Text style={styles.tituloSOS}>
            Precisa de ajuda?
          </Text>

          <Text style={styles.descricaoSOS}>
            Pressione o botão abaixo em uma emergência.
          </Text>

          <View style={styles.areaCirculosSOS}>
            <View style={styles.circuloExternoSOS}>
              <View style={styles.circuloMedioSOS}>
                <Pressable
                  onPress={acionarSOS}
                  style={({ pressed }) => [
                    styles.botaoSOS,
                    (pressed || sosPressionado) &&
                    styles.botaoSOSPressionado,
                  ]}
                >
                  <Text style={styles.textoSOS}>
                    SOS
                  </Text>

                  <Text style={styles.textoToqueSOS}>
                    TOQUE PARA ACIONAR
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.avisoSOS}>
            <Ionicons
              name="location-outline"
              size={16}
              color={Cores.textoSuave}
            />

            <Text style={styles.textoAvisoSOS}>
              Sua localização será compartilhada com sua
              rede de apoio.
            </Text>
          </View>
        </View>

        <View style={styles.areaAtalhos}>
          <Text style={styles.tituloSecao}>
            Acesso rápido
          </Text>

          <View style={styles.gradeAtalhos}>
            <Atalho
              titulo="Localização"
              descricao="Ver posição atual"
              icone="location-outline"
              onPress={() =>
                console.log('Abrir localização')
              }
            />

            <Atalho
              titulo="Rede de apoio"
              descricao="Seus contatos"
              icone="people-outline"
              onPress={() =>
                router.push(
                  '/configuracao-inicial/contatos-emergencia',
                )
              }
            />

            <Atalho
              titulo="Polícia"
              descricao="Ligar para 190"
              icone="shield-outline"
              emergencia
              onPress={confirmarLigacaoPolicia}
            />

            <Atalho
              titulo="Ambulância"
              descricao="Ligar para 192"
              icone="medkit-outline"
              emergencia
              onPress={confirmarLigacaoAmbulancia}
            />
          </View>
        </View>

        <Pressable
          onPress={abrirSmartwatch}
          style={({ pressed }) => [
            styles.cardSmartwatch,
            pressed && styles.pressionado,
          ]}
        >
          <LinearGradient
            colors={[
              Cores.primaria,
              Cores.primariaEscura,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradienteSmartwatch}
          >
            <View style={styles.areaIconeSmartwatch}>
              <Ionicons
                name="watch-outline"
                size={29}
                color={Cores.fundo}
              />
            </View>

            <View style={styles.conteudoSmartwatch}>
              <View style={styles.linhaTituloSmartwatch}>
                <Text style={styles.tituloSmartwatch}>
                  Conecte seu smartwatch
                </Text>

                <View style={styles.seloSmartwatch}>
                  <Text style={styles.textoSeloSmartwatch}>
                    NOVO
                  </Text>
                </View>
              </View>

              <Text style={styles.textoSmartwatch}>
                Prepare alertas pelo pulso e recursos para
                situações de emergência.
              </Text>

              <View style={styles.acaoSmartwatch}>
                <Text style={styles.textoAcaoSmartwatch}>
                  Conhecer recurso
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={Cores.fundo}
                />
              </View>
            </View>
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={() => router.push('/medidas-protecao')}
          style={({ pressed }) => [
            styles.cardAprender,
            pressed && styles.pressionado,
          ]}
        >
          <View style={styles.decoracaoAprenderUm} />
          <View style={styles.decoracaoAprenderDois} />

          <View style={styles.areaIconeAprender}>
            <Ionicons
              name="heart-outline"
              size={28}
              color={Cores.fundo}
            />
          </View>

          <View style={styles.conteudoAprender}>
            <View style={styles.linhaTituloAprender}>
              <Text style={styles.tituloAprender}>
                Aprenda a agir
              </Text>

              <View style={styles.seloAprender}>
                <Text style={styles.textoSeloAprender}>
                  NOVO
                </Text>
              </View>
            </View>

            <Text style={styles.textoAprender}>
              Orientações rápidas para saber o que fazer
              enquanto a ajuda está a caminho.
            </Text>

            <View style={styles.acaoAprender}>
              <Text style={styles.textoAcaoAprender}>
                Ver medidas de proteção
              </Text>

              <View style={styles.setaAprender}>
                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={Cores.primariaEscura}
                />
              </View>
            </View>
          </View>
        </Pressable>

        <Pressable
          onPress={() =>
            console.log('Conversar com a Luma')
          }
          style={({ pressed }) => [
            styles.cardLuma,
            pressed && styles.pressionado,
          ]}
        >
          <View style={styles.areaVisualLuma}>
            <View style={styles.brillhoLuma} />

            <View style={styles.avatarLuma}>
              <Text style={styles.letraLuma}>L</Text>
            </View>

            <View style={styles.statusLumaHome} />
          </View>

          <View style={styles.conteudoLuma}>
            <Text style={styles.tituloLuma}>
              Luma
            </Text>

            <Text style={styles.textoLuma}>
              Sua assistente de segurança está por aqui.
            </Text>

            <Text style={styles.acaoLuma}>
              Conversar com a Luma
            </Text>
          </View>

          <View style={styles.setaLuma}>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Cores.primaria}
            />
          </View>
        </Pressable>
      </ScrollView>

      <View style={styles.navegacaoInferior}>
        <ItemNavegacao
          titulo="Início"
          icone="home"
          ativo
          onPress={() => undefined}
        />

        <ItemNavegacao
          titulo="Histórico"
          icone="time-outline"
          onPress={() =>
            console.log('Abrir histórico')
          }
        />

        <View style={styles.espacoCentral} />

        <ItemNavegacao
          titulo="Contatos"
          icone="people-outline"
          onPress={() =>
            router.push(
              '/configuracao-inicial/contatos-emergencia',
            )
          }
        />

        <ItemNavegacao
          titulo="Perfil"
          icone="person-outline"
          onPress={() =>
            router.push(
              '/configuracao-inicial/perfil-pessoal',
            )
          }
        />

        <Pressable
          onPress={acionarSOS}
          style={({ pressed }) => [
            styles.botaoSOSFlutuante,
            pressed && styles.pressionado,
          ]}
        >
          <Ionicons
            name="alert"
            size={25}
            color={Cores.fundo}
          />
        </Pressable>
      </View>
    </View>
  );
}

type AtalhoProps = {
  titulo: string;
  descricao: string;

  icone:
  | 'location-outline'
  | 'people-outline'
  | 'shield-outline'
  | 'medkit-outline';

  emergencia?: boolean;
  onPress: () => void;
};

function Atalho({
  titulo,
  descricao,
  icone,
  emergencia = false,
  onPress,
}: AtalhoProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.atalho,
        pressed && styles.pressionado,
      ]}
    >
      <View
        style={[
          styles.iconeAtalho,
          emergencia && styles.iconeAtalhoEmergencia,
        ]}
      >
        <Ionicons
          name={icone}
          size={23}
          color={
            emergencia
              ? Cores.sos
              : Cores.primaria
          }
        />
      </View>

      <Text
        style={[
          styles.tituloAtalho,
          emergencia &&
          styles.tituloAtalhoEmergencia,
        ]}
      >
        {titulo}
      </Text>

      <Text style={styles.descricaoAtalho}>
        {descricao}
      </Text>
    </Pressable>
  );
}

type ItemNavegacaoProps = {
  titulo: string;
  icone:
  | 'home'
  | 'time-outline'
  | 'people-outline'
  | 'person-outline';
  ativo?: boolean;
  onPress: () => void;
};

function ItemNavegacao({
  titulo,
  icone,
  ativo = false,
  onPress,
}: ItemNavegacaoProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.itemNavegacao}
    >
      <Ionicons
        name={icone}
        size={21}
        color={
          ativo
            ? Cores.primaria
            : Cores.textoClaro
        }
      />

      <Text
        style={[
          styles.textoNavegacao,
          ativo && styles.textoNavegacaoAtivo,
        ]}
      >
        {titulo}
      </Text>
    </Pressable>
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
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',

    paddingHorizontal:
      Espacamentos.margemHorizontal,

    paddingTop:
      Platform.OS === 'android' ? 58 : 45,

    paddingBottom: 135,
  },

  fundoDecorativo: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },

  luzSuperior: {
    position: 'absolute',
    width: 430,
    height: 430,
    top: -255,
    right: -185,
    borderRadius: 215,
  },

  bolhaUm: {
    position: 'absolute',
    width: 90,
    height: 90,
    top: 170,
    right: -45,
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(72, 145, 246, 0.08)',
  },

  bolhaDois: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 610,
    left: -20,
    borderRadius: Bordas.circular,
    backgroundColor:
      'rgba(72, 145, 246, 0.08)',
  },

  gradePontos: {
    position: 'absolute',
    top: 225,
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
      'rgba(46, 125, 245, 0.15)',
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: Espacamentos.grande,
  },

  areaSaudacao: {
    flex: 1,
  },

  saudacao: {
    fontSize: 28,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.texto,
    letterSpacing: -0.7,
  },

  subtitulo: {
    marginTop: 4,
    fontSize: Tipografia.textoPequeno,
    color: Cores.textoSecundario,
  },

  avatar: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: Cores.primaria,
    ...Sombras.leve,
  },

  letraAvatar: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  statusProtecao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: Espacamentos.grande,
    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,

    backgroundColor: Cores.fundo,
    ...Sombras.leve,
  },

  areaStatus: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  pontoStatus: {
    width: 10,
    height: 10,
    marginRight: Espacamentos.pequeno,
    borderRadius: Bordas.circular,
    backgroundColor: Cores.sucesso,
  },

  tituloStatus: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  textoStatus: {
    marginTop: 2,
    fontSize: Tipografia.legenda,
    color: Cores.textoSuave,
  },

  areaSOS: {
    alignItems: 'center',

    marginBottom: Espacamentos.grande,
    padding: Espacamentos.paddingGrande,

    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,

    backgroundColor: Cores.fundo,
    ...Sombras.media,
  },

  tituloSOS: {
    fontSize: Tipografia.subtitulo,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.texto,
  },

  descricaoSOS: {
    marginTop: 5,
    fontSize: Tipografia.legenda,
    color: Cores.textoSuave,
    textAlign: 'center',
  },

  areaCirculosSOS: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Espacamentos.grande,
  },

  circuloExternoSOS: {
    width: 225,
    height: 225,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(240, 68, 56, 0.08)',
  },

  circuloMedioSOS: {
    width: 190,
    height: 190,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,
    backgroundColor: 'rgba(240, 68, 56, 0.14)',
  },

  botaoSOS: {
    width: 158,
    height: 158,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    borderWidth: 7,
    borderColor: 'rgba(255, 255, 255, 0.72)',

    backgroundColor: Cores.sos,

    ...Sombras.forte,
  },

  botaoSOSPressionado: {
    transform: [{ scale: 0.95 }],
    opacity: 0.88,
  },

  textoSOS: {
    fontSize: 43,
    lineHeight: 47,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
    letterSpacing: 1,
  },

  textoToqueSOS: {
    marginTop: 5,
    fontSize: 9.5,
    fontWeight: Tipografia.pesoBlack,
    color: 'rgba(255, 255, 255, 0.86)',
    letterSpacing: 0.7,
  },

  avisoSOS: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textoAvisoSOS: {
    flexShrink: 1,
    marginLeft: 6,
    fontSize: 11.5,
    color: Cores.textoSuave,
    textAlign: 'center',
  },

  areaAtalhos: {
    marginBottom: Espacamentos.grande,
  },

  tituloSecao: {
    marginBottom: Espacamentos.medio,
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  gradeAtalhos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Espacamentos.paddingPequeno,
  },

  atalho: {
    width: '48%',
    minHeight: 122,

    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,

    backgroundColor: Cores.fundo,
    ...Sombras.leve,
  },

  iconeAtalho: {
    width: 43,
    height: 43,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: Espacamentos.pequeno,

    borderRadius: Bordas.grande,
    backgroundColor: Cores.primariaClara,
  },

  tituloAtalho: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  descricaoAtalho: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    color: Cores.textoSuave,
  },

  cardAprender: {
    position: 'relative',
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: Espacamentos.grande,
    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.extraGrande,
    borderWidth: 1,
    borderColor: 'rgba(42, 125, 196, 0.18)',

    backgroundColor: '#EAF6FF',

    overflow: 'hidden',

    ...Sombras.media,
  },

  decoracaoAprenderUm: {
    position: 'absolute',

    width: 120,
    height: 120,

    top: -72,
    right: -42,

    borderRadius: Bordas.circular,

    backgroundColor: 'rgba(61, 146, 216, 0.10)',
  },

  decoracaoAprenderDois: {
    position: 'absolute',

    width: 67,
    height: 67,

    bottom: -40,
    right: 48,

    borderRadius: Bordas.circular,

    backgroundColor: 'rgba(61, 146, 216, 0.08)',
  },

  areaIconeAprender: {
    width: 66,
    height: 66,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.extraGrande,

    backgroundColor: Cores.primaria,
  },

  conteudoAprender: {
    flex: 1,

    marginLeft: Espacamentos.paddingMedio,
  },

  linhaTituloAprender: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',

    gap: 7,
  },

  tituloAprender: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.primariaEscura,
  },

  seloAprender: {
    paddingHorizontal: 7,
    paddingVertical: 3,

    borderRadius: Bordas.circular,

    backgroundColor: Cores.primariaClara,
  },

  textoSeloAprender: {
    fontSize: 8.5,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.primaria,

    letterSpacing: 0.6,
  },

  textoAprender: {
    marginTop: 6,

    fontSize: Tipografia.legenda,
    lineHeight: 18,

    color: Cores.textoSecundario,
  },

  acaoAprender: {
    alignSelf: 'flex-start',

    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 11,
  },

  textoAcaoAprender: {
    marginRight: 7,

    fontSize: 11.5,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.primaria,
  },

  setaAprender: {
    width: 27,
    height: 27,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor: Cores.fundo,
  },

  cardLuma: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,

    backgroundColor: Cores.fundoAzuladoClaro,
  },

  avatarLuma: {
    width: 44,
    height: 44,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,
    backgroundColor: Cores.primaria,
  },

  letraLuma: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  conteudoLuma: {
    flex: 1,
    marginLeft: Espacamentos.paddingPequeno,
  },

  tituloLuma: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  textoLuma: {
    marginTop: 2,
    fontSize: Tipografia.legenda,
    color: Cores.textoSuave,
  },

  iconeAtalhoEmergencia: {
    borderWidth: 1,
    borderColor: 'rgba(240, 68, 56, 0.16)',
    backgroundColor: 'rgba(240, 68, 56, 0.08)',
  },

  tituloAtalhoEmergencia: {
    color: Cores.sos,
  },

  cardSmartwatch: {
    width: '100%',

    marginBottom: Espacamentos.grande,

    borderRadius: Bordas.extraGrande,

    overflow: 'hidden',

    ...Sombras.media,
  },

  gradienteSmartwatch: {
    minHeight: 145,

    flexDirection: 'row',
    alignItems: 'center',

    padding: Espacamentos.paddingMedio,
  },

  areaIconeSmartwatch: {
    width: 67,
    height: 67,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.extraGrande,

    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',

    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },

  conteudoSmartwatch: {
    flex: 1,

    marginLeft: Espacamentos.paddingMedio,
  },

  linhaTituloSmartwatch: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',

    gap: 7,
  },

  tituloSmartwatch: {
    fontSize: Tipografia.textoGrande,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  seloSmartwatch: {
    paddingHorizontal: 7,
    paddingVertical: 3,

    borderRadius: Bordas.circular,

    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },

  textoSeloSmartwatch: {
    fontSize: 8.5,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,

    letterSpacing: 0.6,
  },

  textoSmartwatch: {
    marginTop: 6,

    fontSize: Tipografia.legenda,
    lineHeight: 18,

    color: 'rgba(255, 255, 255, 0.84)',
  },

  acaoSmartwatch: {
    alignSelf: 'flex-start',

    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 11,
  },

  textoAcaoSmartwatch: {
    marginRight: 6,

    fontSize: 11.5,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.fundo,
  },

  areaVisualLuma: {
    width: 55,
    height: 55,

    alignItems: 'center',
    justifyContent: 'center',
  },

  brillhoLuma: {
    position: 'absolute',

    width: 55,
    height: 55,

    borderRadius: Bordas.circular,

    backgroundColor: Cores.primariaClara,
  },

  statusLumaHome: {
    position: 'absolute',

    width: 12,
    height: 12,

    right: 1,
    bottom: 2,

    borderRadius: Bordas.circular,

    borderWidth: 2,
    borderColor: Cores.fundo,

    backgroundColor: Cores.sucesso,
  },

  acaoLuma: {
    marginTop: 7,

    fontSize: 11.5,
    fontWeight: Tipografia.pesoBlack,

    color: Cores.primaria,
  },

  setaLuma: {
    width: 37,
    height: 37,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,

    backgroundColor: Cores.fundo,
  },

  navegacaoInferior: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    height: 86,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingHorizontal: 8,
    paddingBottom:
      Platform.OS === 'ios' ? 14 : 5,

    borderTopWidth: 1,
    borderTopColor: Cores.divisoria,

    backgroundColor: Cores.fundo,

    ...Sombras.media,
  },

  itemNavegacao: {
    minWidth: 63,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoNavegacao: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: Tipografia.pesoSemiBold,
    color: Cores.textoClaro,
  },

  textoNavegacaoAtivo: {
    color: Cores.primaria,
  },

  espacoCentral: {
    width: 58,
  },

  botaoSOSFlutuante: {
    position: 'absolute',
    top: -29,

    width: 62,
    height: 62,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.circular,
    borderWidth: 5,
    borderColor: Cores.fundo,

    backgroundColor: Cores.sos,

    ...Sombras.forte,
  },

  pressionado: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },
});