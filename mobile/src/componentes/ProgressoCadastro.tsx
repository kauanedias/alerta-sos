import {
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

type ProgressoCadastroProps = {
  etapaAtual: number;
  totalEtapas: number;
  titulo: string;
  descricao?: string;
};

export function ProgressoCadastro({
  etapaAtual,
  totalEtapas,
  titulo,
  descricao,
}: ProgressoCadastroProps) {
  const etapaSegura = Math.min(
    Math.max(etapaAtual, 1),
    totalEtapas,
  );

  const progresso = etapaSegura / totalEtapas;

  return (
    <View style={styles.container}>
      <View style={styles.areaInformacoes}>
        <View style={styles.areaTitulo}>
          <Text style={styles.titulo}>
            {titulo}
          </Text>

          <Text style={styles.etapa}>
            Etapa {etapaSegura} de {totalEtapas}
          </Text>
        </View>

        {descricao ? (
          <Text style={styles.descricao}>
            {descricao}
          </Text>
        ) : null}
      </View>

      <View style={styles.trilha}>
        <View
          style={[
            styles.preenchimento,
            {
              width: `${progresso * 100}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Espacamentos.grande,
  },

  areaInformacoes: {
    marginBottom: Espacamentos.paddingPequeno,
  },

  areaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titulo: {
    flex: 1,
    paddingRight: Espacamentos.medio,

    fontSize: Tipografia.cabecalho,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.texto,

    letterSpacing: -0.4,
  },

  etapa: {
    fontSize: Tipografia.legenda,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primaria,
  },

  descricao: {
    maxWidth: 390,
    marginTop: 7,

    fontSize: Tipografia.textoPequeno,
    lineHeight: 20,
    color: Cores.textoSecundario,
  },

  trilha: {
    width: '100%',
    height: 8,

    overflow: 'hidden',

    borderRadius: Bordas.circular,
    backgroundColor: Cores.primariaClara,
  },

  preenchimento: {
    height: '100%',

    borderRadius: Bordas.circular,
    backgroundColor: Cores.primaria,
  },
});