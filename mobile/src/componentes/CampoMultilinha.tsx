import { ReactNode, useState } from 'react';

import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Tipografia,
} from '../tema';

type CampoMultilinhaProps = TextInputProps & {
  rotulo: string;
  icone?: ReactNode;
  erro?: string;
  descricao?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function CampoMultilinha({
  rotulo,
  icone,
  erro,
  descricao,
  containerStyle,
  onFocus,
  onBlur,
  style,
  ...props
}: CampoMultilinhaProps) {
  const [focado, setFocado] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.rotulo}>{rotulo}</Text>

      {descricao ? (
        <Text style={styles.descricao}>
          {descricao}
        </Text>
      ) : null}

      <View
        style={[
          styles.caixa,
          focado && styles.caixaFocada,
          erro ? styles.caixaComErro : null,
        ]}
      >
        {icone ? (
          <View style={styles.areaIcone}>
            {icone}
          </View>
        ) : null}

        <TextInput
          {...props}
          multiline
          textAlignVertical="top"
          placeholderTextColor={Cores.textoPlaceholder}
          selectionColor={Cores.primaria}
          cursorColor={Cores.primaria}
          style={[styles.input, style]}
          onFocus={(evento) => {
            setFocado(true);
            onFocus?.(evento);
          }}
          onBlur={(evento) => {
            setFocado(false);
            onBlur?.(evento);
          }}
        />
      </View>

      {erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 18,
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

  caixa: {
    minHeight: 126,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: Espacamentos.campoHorizontal,
    paddingVertical: Espacamentos.pequeno,
    borderRadius: Bordas.campo,
    borderWidth: 1.3,
    borderColor: Cores.bordaCampo,
    backgroundColor: Cores.fundoAzulado,
  },

  caixaFocada: {
    borderColor: Cores.bordaCampoFocado,
    backgroundColor: Cores.fundo,
  },

  caixaComErro: {
    borderColor: Cores.erroBorda,
    backgroundColor: Cores.erroFundo,
  },

  areaIcone: {
    width: 43,
    height: 43,
    marginTop: 1,
    borderRadius: Bordas.grande,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Cores.bordaIcone,
    backgroundColor: Cores.fundo,
  },

  input: {
    flex: 1,
    minHeight: 105,
    paddingHorizontal: 13,
    paddingTop: 11,
    fontSize: Tipografia.textoMedio,
    fontWeight: Tipografia.pesoMedio,
    color: Cores.textoEscuro,
    outlineStyle: 'none',
  } as any,

  erro: {
    marginTop: 7,
    marginLeft: 4,
    fontSize: Tipografia.legenda,
    color: Cores.erro,
  },
});