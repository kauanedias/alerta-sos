import { Ionicons } from '@expo/vector-icons';
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

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
  Tipografia,
} from '../tema';

type TipoCampo =
  | 'texto'
  | 'numero'
  | 'altura'
  | 'peso'
  | 'telefone';

type CampoTextoProps = TextInputProps & {
  rotulo: string;
  erro?: string;
  icone: ReactNode;
  senha?: boolean;
  iconeDestacado?: boolean;
  tipo?: TipoCampo;
  somenteNumeros?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export function CampoTexto({
  rotulo,
  erro,
  icone,
  senha = false,
  iconeDestacado = false,
  tipo = 'texto',
  somenteNumeros = false,
  containerStyle,
  onFocus,
  onBlur,
  onChangeText,
  keyboardType,
  inputMode,
  style,
  ...props
}: CampoTextoProps) {
  const [focado, setFocado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function formatarTelefone(valor: string) {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 6) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    if (numeros.length <= 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(
        2,
        6,
      )}-${numeros.slice(6)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(
      2,
      7,
    )}-${numeros.slice(7)}`;
  }

  function formatarPeso(valor: string) {
    const valorNormalizado = valor.replace('.', ',');

    const somentePermitidos = valorNormalizado.replace(
      /[^0-9,]/g,
      '',
    );

    const partes = somentePermitidos.split(',');
    const parteInteira = partes[0].slice(0, 3);
    const parteDecimal = partes[1]?.slice(0, 1);

    if (somentePermitidos.includes(',')) {
      return `${parteInteira},${parteDecimal ?? ''}`;
    }

    return parteInteira;
  }

  function formatarValor(valor: string) {
    if (tipo === 'telefone') {
      return formatarTelefone(valor);
    }

    if (tipo === 'altura') {
      const numeros = valor.replace(/\D/g, '').slice(0, 3);

      if (numeros.length <= 1) {
        return numeros;
      }

      return `${numeros.slice(0, 1)},${numeros.slice(1)}`;
    }

    if (tipo === 'peso') {
      return formatarPeso(valor);
    }

    if (tipo === 'numero' || somenteNumeros) {
      return valor.replace(/\D/g, '');
    }

    return valor;
  }

  function obterKeyboardType() {
    if (keyboardType) {
      return keyboardType;
    }

    if (
      tipo === 'numero' ||
      tipo === 'altura' ||
      tipo === 'telefone'
    ) {
      return 'number-pad';
    }

    if (tipo === 'peso') {
      return 'decimal-pad';
    }

    return 'default';
  }

  function obterInputMode() {
    if (inputMode) {
      return inputMode;
    }

    if (
      tipo === 'numero' ||
      tipo === 'altura' ||
      tipo === 'telefone'
    ) {
      return 'numeric';
    }

    if (tipo === 'peso') {
      return 'decimal';
    }

    return 'text';
  }

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
          keyboardType={obterKeyboardType()}
          inputMode={obterInputMode()}
          placeholderTextColor={Cores.textoPlaceholder}
          selectionColor={Cores.primaria}
          cursorColor={Cores.primaria}
          style={[styles.input, style]}
          onChangeText={(texto) => {
            const valorFormatado = formatarValor(texto);
            onChangeText?.(valorFormatado);
          }}
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
            onPress={() =>
              setMostrarSenha((valorAtual) => !valorAtual)
            }
            hitSlop={10}
            style={({ pressed }) => [
              styles.botaoOlho,
              pressed && styles.pressionado,
            ]}
          >
            <Ionicons
              name={
                mostrarSenha
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
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

          <Text style={styles.textoErro}>
            {erro}
          </Text>
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