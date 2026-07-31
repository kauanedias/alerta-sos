import { useRef } from 'react';

import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Tipografia,
} from '../tema';

type CodigoVerificacaoProps = {
  codigo: string[];
  onChange: (novoCodigo: string[]) => void;
  tamanho?: number;
  erro?: boolean;
};

export function CodigoVerificacao({
  codigo,
  onChange,
  tamanho = 6,
  erro = false,
}: CodigoVerificacaoProps) {
  const referencias = useRef<Array<TextInput | null>>([]);

  function atualizarDigito(valor: string, indice: number) {
    const apenasNumero = valor.replace(/\D/g, '');

    if (!apenasNumero) {
      const novoCodigo = [...codigo];

      novoCodigo[indice] = '';

      onChange(novoCodigo);

      return;
    }

    const novoCodigo = [...codigo];

    novoCodigo[indice] = apenasNumero.slice(-1);

    onChange(novoCodigo);

    if (indice < tamanho - 1) {
      referencias.current[indice + 1]?.focus();
    }
  }

  function tratarTecla(
    evento: NativeSyntheticEvent<TextInputKeyPressEventData>,
    indice: number,
  ) {
    if (
      evento.nativeEvent.key === 'Backspace' &&
      !codigo[indice] &&
      indice > 0
    ) {
      referencias.current[indice - 1]?.focus();
    }
  }

  function tratarColagem(valor: string) {
    const numeros = valor.replace(/\D/g, '').slice(0, tamanho);

    if (numeros.length <= 1) {
      return false;
    }

    const novoCodigo = Array.from(
      { length: tamanho },
      (_, indice) => numeros[indice] ?? '',
    );

    onChange(novoCodigo);

    const ultimoIndice = Math.min(
      numeros.length - 1,
      tamanho - 1,
    );

    referencias.current[ultimoIndice]?.focus();

    return true;
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: tamanho }).map((_, indice) => (
        <TextInput
          key={indice}
          ref={(referencia) => {
            referencias.current[indice] = referencia;
          }}
          value={codigo[indice] ?? ''}
          onChangeText={(valor) => {
            const foiColagem = tratarColagem(valor);

            if (!foiColagem) {
              atualizarDigito(valor, indice);
            }
          }}
          onKeyPress={(evento) =>
            tratarTecla(evento, indice)
          }
          keyboardType="number-pad"
          inputMode="numeric"
          maxLength={tamanho}
          selectTextOnFocus
          selectionColor={Cores.primaria}
          cursorColor={Cores.primaria}
          style={[
            styles.campo,
            codigo[indice] && styles.campoPreenchido,
            erro && styles.campoComErro,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Espacamentos.pequeno,
  },

  campo: {
    flex: 1,
    minWidth: 42,
    maxWidth: 56,
    height: 60,

    borderWidth: 1.3,
    borderColor: Cores.bordaCampo,
    borderRadius: Bordas.grande,

    backgroundColor: Cores.fundoAzulado,

    color: Cores.texto,
    fontSize: Tipografia.subtitulo,
    fontWeight: Tipografia.pesoBlack,
    textAlign: 'center',

    outlineStyle: 'none',
  } as any,

  campoPreenchido: {
    borderColor: Cores.primaria,
    backgroundColor: Cores.fundo,
  },

  campoComErro: {
    borderColor: Cores.erroBorda,
    backgroundColor: Cores.erroFundo,
  },
});