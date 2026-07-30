import { ReactNode, useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../tema';

type CampoTextoProps = TextInputProps & {
  rotulo: string;
  erro?: string;
  icone: ReactNode;
  senha?: boolean;
  iconeDestacado?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export function CampoTexto({
  rotulo,
  erro,
  icone,
  senha = false,
  iconeDestacado = false,
  containerStyle,
  onFocus,
  onBlur,
  style,
  ...props
}: CampoTextoProps) {
  const [focado, setFocado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={[styles.grupo, containerStyle]}>
      <Text style={styles.rotulo}>{rotulo}</Text>

      <View
        style={[
          styles.campo,
          focado && styles.campoFocado,
          erro ? styles.campoComErro : null,
        ]}
      >
        <View
          style={[
            styles.areaIcone,
            iconeDestacado && styles.areaIconeDestacado,
            erro && styles.areaIconeComErro,
          ]}
        >
          {icone}
        </View>

        <TextInput
          {...props}
          secureTextEntry={senha && !mostrarSenha}
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

        {senha ? (
          <Pressable
            onPress={() => setMostrarSenha((atual) => !atual)}
            hitSlop={10}
            style={({ pressed }) => [
              styles.botaoOlho,
              pressed && styles.pressionado,
            ]}
          >
            <Ionicons
              name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
              size={23}
              color={Cores.textoSuave}
            />
          </Pressable>
        ) : null}
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
  grupo: {
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

  campo: {
    minHeight: 60,
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
    borderRadius: Bordas.grande,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Cores.bordaIcone,
    backgroundColor: Cores.fundo,
  },

  areaIconeDestacado: {
    borderColor: Cores.primaria,
    backgroundColor: Cores.primaria,
  },

  areaIconeComErro: {
    borderColor: Cores.erroBordaSuave,
  },

  input: {
    flex: 1,
    height: 58,
    paddingHorizontal: 13,
    fontSize: Tipografia.textoMedio,
    fontWeight: Tipografia.pesoMedio,
    color: Cores.textoEscuro,
    outlineStyle: 'none',
  } as any,

  botaoOlho: {
    width: 45,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
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
    opacity: 0.55,
  },
});
