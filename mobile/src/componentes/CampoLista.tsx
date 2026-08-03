import { Ionicons } from '@expo/vector-icons';
import { ReactNode, useState } from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../tema';

type CampoListaProps = {
  rotulo: string;
  descricao?: string;
  placeholder: string;
  itens: string[];
  onChange: (itens: string[]) => void;
  icone?: ReactNode;
  textoBotao?: string;
  erro?: string;
};

export function CampoLista({
  rotulo,
  descricao,
  placeholder,
  itens,
  onChange,
  icone,
  textoBotao = 'Adicionar',
  erro,
}: CampoListaProps) {
  const [novoItem, setNovoItem] = useState('');
  const [focado, setFocado] = useState(false);

  function adicionarItem() {
    const itemFormatado = novoItem.trim();

    if (!itemFormatado) {
      return;
    }

    const itemJaExiste = itens.some(
      (item) =>
        item.toLowerCase() === itemFormatado.toLowerCase(),
    );

    if (itemJaExiste) {
      setNovoItem('');
      return;
    }

    onChange([...itens, itemFormatado]);
    setNovoItem('');
  }

  function removerItem(indice: number) {
    const novaLista = itens.filter(
      (_, indiceAtual) => indiceAtual !== indice,
    );

    onChange(novaLista);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>{rotulo}</Text>

      {descricao ? (
        <Text style={styles.descricao}>{descricao}</Text>
      ) : null}

      {itens.length > 0 ? (
        <View style={styles.listaItens}>
          {itens.map((item, indice) => (
            <View key={`${item}-${indice}`} style={styles.chip}>
              <Text style={styles.textoChip}>{item}</Text>

              <Pressable
                onPress={() => removerItem(indice)}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.botaoRemover,
                  pressed && styles.pressionado,
                ]}
              >
                <Ionicons
                  name="close"
                  size={15}
                  color={Cores.primariaEscura}
                />
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      <View
        style={[
          styles.campo,
          focado && styles.campoFocado,
          erro ? styles.campoComErro : null,
        ]}
      >
        {icone ? (
          <View style={styles.areaIcone}>{icone}</View>
        ) : null}

        <TextInput
          value={novoItem}
          onChangeText={setNovoItem}
          onFocus={() => setFocado(true)}
          onBlur={() => setFocado(false)}
          onSubmitEditing={adicionarItem}
          placeholder={placeholder}
          placeholderTextColor={Cores.textoPlaceholder}
          selectionColor={Cores.primaria}
          cursorColor={Cores.primaria}
          returnKeyType="done"
          style={styles.input}
        />

        <Pressable
          onPress={adicionarItem}
          disabled={!novoItem.trim()}
          style={({ pressed }) => [
            styles.botaoAdicionar,
            !novoItem.trim() && styles.botaoDesabilitado,
            pressed &&
              novoItem.trim() &&
              styles.pressionado,
          ]}
        >
          <Ionicons
            name="add"
            size={18}
            color={Cores.fundo}
          />

          <Text style={styles.textoAdicionar}>
            {textoBotao}
          </Text>
        </Pressable>
      </View>

      {erro ? (
        <View style={styles.areaErro}>
          <Ionicons
            name="alert-circle-outline"
            size={15}
            color={Cores.erro}
          />

          <Text style={styles.textoErro}>{erro}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },

  rotulo: {
    marginLeft: 3,
    marginBottom: Espacamentos.pequeno,
    fontSize: 11.5,
    fontWeight: Tipografia.pesoBlack,
    letterSpacing: 0.8,
    color: Cores.textoSecundario,
  },

  descricao: {
    marginTop: -3,
    marginBottom: Espacamentos.pequeno,
    marginLeft: 3,
    fontSize: Tipografia.legenda,
    lineHeight: 17,
    color: Cores.textoSuave,
  },

  listaItens: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Espacamentos.pequeno,
    marginBottom: Espacamentos.paddingPequeno,
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 7,
    paddingVertical: 8,
    borderRadius: Bordas.circular,
    borderWidth: 1,
    borderColor: Cores.primariaClara,
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  textoChip: {
    maxWidth: 220,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoSemiBold,
    color: Cores.primariaEscura,
  },

  botaoRemover: {
    width: 24,
    height: 24,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.circular,
    backgroundColor: Cores.primariaClara,
  },

  campo: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Espacamentos.campoHorizontal,
    borderRadius: Bordas.campo,
    borderWidth: 1.3,
    borderColor: Cores.bordaCampo,
    backgroundColor: Cores.fundoAzulado,
  },

  campoFocado: {
    borderColor: Cores.bordaCampoFocado,
    backgroundColor: Cores.fundo,
    ...Sombras.leve,
  },

  campoComErro: {
    borderColor: Cores.erroBorda,
    backgroundColor: Cores.erroFundo,
  },

  areaIcone: {
    width: 43,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaIcone,
    backgroundColor: Cores.fundo,
  },

  input: {
    flex: 1,
    height: 58,
    paddingHorizontal: 12,
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoMedio,
    color: Cores.textoEscuro,
    outlineStyle: 'none',
  } as any,

  botaoAdicionar: {
    minHeight: 39,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
    borderRadius: Bordas.media,
    backgroundColor: Cores.primaria,
  },

  botaoDesabilitado: {
    opacity: 0.45,
  },

  textoAdicionar: {
    marginLeft: 3,
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