import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';

import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../tema';

type CardPermissaoProps = {
  titulo: string;
  descricao: string;
  ativa: boolean;
  onChange: (valor: boolean) => void;
  icone: ReactNode;
  obrigatoria?: boolean;
  recomendada?: boolean;
  indisponivel?: boolean;
};

export function CardPermissao({
  titulo,
  descricao,
  ativa,
  onChange,
  icone,
  obrigatoria = false,
  recomendada = false,
  indisponivel = false,
}: CardPermissaoProps) {
  function alternarPermissao() {
    if (indisponivel) {
      return;
    }

    onChange(!ativa);
  }

  return (
    <Pressable
      onPress={alternarPermissao}
      disabled={indisponivel}
      style={({ pressed }) => [
        styles.container,
        ativa && styles.containerAtivo,
        indisponivel && styles.containerIndisponivel,
        pressed &&
          !indisponivel &&
          styles.pressionado,
      ]}
    >
      <View
        style={[
          styles.areaIcone,
          ativa && styles.areaIconeAtiva,
        ]}
      >
        {icone}
      </View>

      <View style={styles.conteudo}>
        <View style={styles.linhaTitulo}>
          <Text style={styles.titulo}>
            {titulo}
          </Text>

          {obrigatoria ? (
            <View style={styles.seloObrigatoria}>
              <Text style={styles.textoSeloObrigatoria}>
                Essencial
              </Text>
            </View>
          ) : null}

          {!obrigatoria && recomendada ? (
            <View style={styles.seloRecomendada}>
              <Text style={styles.textoSeloRecomendada}>
                Recomendada
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.descricao}>
          {descricao}
        </Text>

        {indisponivel ? (
          <Text style={styles.textoIndisponivel}>
            Disponível em uma próxima versão.
          </Text>
        ) : (
          <Text
            style={[
              styles.status,
              ativa && styles.statusAtivo,
            ]}
          >
            {ativa ? 'Ativada' : 'Desativada'}
          </Text>
        )}
      </View>

      <Switch
        value={ativa}
        onValueChange={onChange}
        disabled={indisponivel}
        trackColor={{
          false: Cores.bordaCampo,
          true: Cores.primariaClara,
        }}
        thumbColor={
          ativa
            ? Cores.primaria
            : Cores.textoClaro
        }
        ios_backgroundColor={Cores.bordaCampo}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 116,

    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: Espacamentos.paddingPequeno,
    padding: Espacamentos.paddingMedio,

    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,

    backgroundColor: Cores.fundoAzulado,
  },

  containerAtivo: {
    borderColor: Cores.primariaClara,
    backgroundColor: Cores.fundoAzuladoClaro,
    ...Sombras.leve,
  },

  containerIndisponivel: {
    opacity: 0.58,
  },

  areaIcone: {
    width: 48,
    height: 48,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaIcone,

    backgroundColor: Cores.fundo,
  },

  areaIconeAtiva: {
    borderColor: Cores.primariaClara,
    backgroundColor: Cores.primariaClara,
  },

  conteudo: {
    flex: 1,
    marginHorizontal: Espacamentos.paddingPequeno,
  },

  linhaTitulo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },

  titulo: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  descricao: {
    marginTop: 5,

    fontSize: Tipografia.legenda,
    lineHeight: 17,

    color: Cores.textoSecundario,
  },

  status: {
    marginTop: 6,

    fontSize: 11,
    fontWeight: Tipografia.pesoExtraBold,

    color: Cores.textoSuave,
  },

  statusAtivo: {
    color: Cores.sucesso,
  },

  seloObrigatoria: {
    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: Bordas.circular,
    backgroundColor: Cores.primaria,
  },

  textoSeloObrigatoria: {
    fontSize: 9,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.fundo,
  },

  seloRecomendada: {
    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: Bordas.circular,
    backgroundColor: Cores.primariaClara,
  },

  textoSeloRecomendada: {
    fontSize: 9,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  textoIndisponivel: {
    marginTop: 6,

    fontSize: 11,
    fontWeight: Tipografia.pesoSemiBold,

    color: Cores.textoSuave,
  },

  pressionado: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
});