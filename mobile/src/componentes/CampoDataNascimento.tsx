import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import {
  Platform,
  Pressable,
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
} from '../tema';

type CampoDataNascimentoProps = {
  valor?: Date;
  onChange: (data: Date) => void;
  erro?: string;
};

export function CampoDataNascimento({
  valor,
  onChange,
  erro,
}: CampoDataNascimentoProps) {
  const [mostrarSeletor, setMostrarSeletor] =
    useState(false);

  const dataTemporaria = valor ?? new Date(2000, 0, 1);

  function formatarData(data?: Date) {
    if (!data) {
      return 'Selecione sua data de nascimento';
    }

    return new Intl.DateTimeFormat('pt-BR').format(data);
  }

  function selecionarData(
    evento: DateTimePickerEvent,
    dataSelecionada?: Date,
  ) {
    if (Platform.OS === 'android') {
      setMostrarSeletor(false);
    }

    if (
      evento.type === 'dismissed' ||
      !dataSelecionada
    ) {
      return;
    }

    onChange(dataSelecionada);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>
        DATA DE NASCIMENTO
      </Text>

      <Pressable
        onPress={() => setMostrarSeletor(true)}
        style={({ pressed }) => [
          styles.campo,
          valor && styles.campoPreenchido,
          erro && styles.campoComErro,
          pressed && styles.pressionado,
        ]}
      >
        <View style={styles.areaIcone}>
          <Ionicons
            name="calendar-outline"
            size={21}
            color={erro ? Cores.erro : Cores.primaria}
          />
        </View>

        <Text
          style={[
            styles.texto,
            !valor && styles.placeholder,
          ]}
        >
          {formatarData(valor)}
        </Text>

        <Ionicons
          name="chevron-down-outline"
          size={20}
          color={Cores.textoSuave}
        />
      </Pressable>

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

      {mostrarSeletor && Platform.OS !== 'web' ? (
        <DateTimePicker
          value={dataTemporaria}
          mode="date"
          display={
            Platform.OS === 'ios'
              ? 'spinner'
              : 'default'
          }
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
          onChange={selecionarData}
        />
      ) : null}

      {mostrarSeletor && Platform.OS === 'web' ? (
        <View style={styles.areaDatasWeb}>
          <Text style={styles.textoDatasWeb}>
            Selecione uma data:
          </Text>

          <View style={styles.listaDatasWeb}>
            {[1990, 2000, 2006, 2010].map((ano) => (
              <Pressable
                key={ano}
                onPress={() => {
                  onChange(new Date(ano, 0, 1));
                  setMostrarSeletor(false);
                }}
                style={({ pressed }) => [
                  styles.opcaoDataWeb,
                  pressed && styles.pressionado,
                ]}
              >
                <Text style={styles.textoOpcaoDataWeb}>
                  01/01/{ano}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.avisoWeb}>
            No aplicativo Android, será aberto o calendário
            completo do aparelho.
          </Text>
        </View>
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

  campoPreenchido: {
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

  texto: {
    flex: 1,
    paddingHorizontal: 13,
    fontSize: Tipografia.textoMedio,
    fontWeight: Tipografia.pesoMedio,
    color: Cores.textoEscuro,
  },

  placeholder: {
    color: Cores.textoPlaceholder,
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

  areaDatasWeb: {
    marginTop: Espacamentos.pequeno,
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  textoDatasWeb: {
    fontSize: Tipografia.legenda,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primariaEscura,
  },

  listaDatasWeb: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Espacamentos.pequeno,
    marginTop: Espacamentos.pequeno,
  },

  opcaoDataWeb: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Bordas.media,
    borderWidth: 1,
    borderColor: Cores.bordaCampo,
    backgroundColor: Cores.fundo,
  },

  textoOpcaoDataWeb: {
    fontSize: Tipografia.legenda,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.primaria,
  },

  avisoWeb: {
    marginTop: Espacamentos.pequeno,
    fontSize: 10.5,
    lineHeight: 15,
    color: Cores.textoSuave,
  },

  pressionado: {
    opacity: 0.7,
  },
});