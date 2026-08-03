import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import {
  Pressable,
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

import { CampoTexto } from './CampoTexto';

export type Medicamento = {
  id: string;
  nome: string;
  dosagem: string;
  frequencia: string;
  horario?: string;
};

type FormularioMedicamentoProps = {
  medicamentos: Medicamento[];
  onChange: (medicamentos: Medicamento[]) => void;
  erro?: string;
};

export function FormularioMedicamento({
  medicamentos,
  onChange,
  erro,
}: FormularioMedicamentoProps) {
  const [formularioAberto, setFormularioAberto] =
    useState(false);

  const [nome, setNome] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [horario, setHorario] = useState('');

  const [erroNome, setErroNome] = useState('');
  const [erroDosagem, setErroDosagem] = useState('');
  const [erroFrequencia, setErroFrequencia] =
    useState('');

  function limparFormulario() {
    setNome('');
    setDosagem('');
    setFrequencia('');
    setHorario('');

    setErroNome('');
    setErroDosagem('');
    setErroFrequencia('');
  }

  function fecharFormulario() {
    limparFormulario();
    setFormularioAberto(false);
  }

  function validarFormulario() {
    let formularioValido = true;

    if (!nome.trim()) {
      setErroNome('Digite o nome do medicamento.');
      formularioValido = false;
    } else {
      setErroNome('');
    }

    if (!dosagem.trim()) {
      setErroDosagem('Informe a dosagem.');
      formularioValido = false;
    } else {
      setErroDosagem('');
    }

    if (!frequencia.trim()) {
      setErroFrequencia('Informe a frequência de uso.');
      formularioValido = false;
    } else {
      setErroFrequencia('');
    }

    return formularioValido;
  }

  function adicionarMedicamento() {
    if (!validarFormulario()) {
      return;
    }

    const novoMedicamento: Medicamento = {
      id: `${Date.now()}-${Math.random()}`,
      nome: nome.trim(),
      dosagem: dosagem.trim(),
      frequencia: frequencia.trim(),
      horario: horario.trim() || undefined,
    };

    onChange([...medicamentos, novoMedicamento]);

    limparFormulario();
    setFormularioAberto(false);
  }

  function removerMedicamento(id: string) {
    const novaLista = medicamentos.filter(
      (medicamento) => medicamento.id !== id,
    );

    onChange(novaLista);
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.areaTitulo}>
          <Text style={styles.rotulo}>
            MEDICAMENTOS EM USO
          </Text>

          <Text style={styles.descricao}>
            Informe o nome, a dosagem e quando utiliza.
          </Text>
        </View>

        {!formularioAberto ? (
          <Pressable
            onPress={() => setFormularioAberto(true)}
            style={({ pressed }) => [
              styles.botaoAbrir,
              pressed && styles.pressionado,
            ]}
          >
            <Ionicons
              name="add"
              size={18}
              color={Cores.fundo}
            />

            <Text style={styles.textoBotaoAbrir}>
              Adicionar
            </Text>
          </Pressable>
        ) : null}
      </View>

      {medicamentos.length > 0 ? (
        <View style={styles.lista}>
          {medicamentos.map((medicamento) => (
            <View
              key={medicamento.id}
              style={styles.cardMedicamento}
            >
              <View style={styles.areaIcone}>
                <Ionicons
                  name="medical-outline"
                  size={21}
                  color={Cores.primaria}
                />
              </View>

              <View style={styles.conteudoMedicamento}>
                <Text style={styles.nomeMedicamento}>
                  {medicamento.nome}
                </Text>

                <Text style={styles.detalhesMedicamento}>
                  {medicamento.dosagem} •{' '}
                  {medicamento.frequencia}
                </Text>

                {medicamento.horario ? (
                  <Text style={styles.horarioMedicamento}>
                    Horário: {medicamento.horario}
                  </Text>
                ) : null}
              </View>

              <Pressable
                onPress={() =>
                  removerMedicamento(medicamento.id)
                }
                hitSlop={8}
                style={({ pressed }) => [
                  styles.botaoRemover,
                  pressed && styles.pressionado,
                ]}
              >
                <Ionicons
                  name="trash-outline"
                  size={19}
                  color={Cores.erro}
                />
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.estadoVazio}>
          <Ionicons
            name="medical-outline"
            size={23}
            color={Cores.textoClaro}
          />

          <Text style={styles.textoEstadoVazio}>
            Nenhum medicamento adicionado.
          </Text>
        </View>
      )}

      {formularioAberto ? (
        <View style={styles.formulario}>
          <View style={styles.cabecalhoFormulario}>
            <View>
              <Text style={styles.tituloFormulario}>
                Novo medicamento
              </Text>

              <Text style={styles.descricaoFormulario}>
                Preencha as informações abaixo.
              </Text>
            </View>

            <Pressable
              onPress={fecharFormulario}
              hitSlop={8}
              style={({ pressed }) => [
                styles.botaoFechar,
                pressed && styles.pressionado,
              ]}
            >
              <Ionicons
                name="close"
                size={21}
                color={Cores.textoSecundario}
              />
            </Pressable>
          </View>

          <CampoTexto
            rotulo="NOME DO MEDICAMENTO"
            value={nome}
            onChangeText={(valor) => {
              setNome(valor);

              if (erroNome) {
                setErroNome('');
              }
            }}
            placeholder="Ex.: Losartana"
            autoCapitalize="words"
            returnKeyType="next"
            erro={erroNome}
            icone={
              <Ionicons
                name="medical-outline"
                size={21}
                color={
                  erroNome ? Cores.erro : Cores.primaria
                }
              />
            }
          />

          <CampoTexto
            rotulo="DOSAGEM"
            value={dosagem}
            onChangeText={(valor) => {
              setDosagem(valor);

              if (erroDosagem) {
                setErroDosagem('');
              }
            }}
            placeholder="Ex.: 50 mg"
            returnKeyType="next"
            erro={erroDosagem}
            icone={
              <Ionicons
                name="flask-outline"
                size={21}
                color={
                  erroDosagem
                    ? Cores.erro
                    : Cores.primaria
                }
              />
            }
          />

          <CampoTexto
            rotulo="FREQUÊNCIA"
            value={frequencia}
            onChangeText={(valor) => {
              setFrequencia(valor);

              if (erroFrequencia) {
                setErroFrequencia('');
              }
            }}
            placeholder="Ex.: 2 vezes ao dia"
            returnKeyType="next"
            erro={erroFrequencia}
            icone={
              <Ionicons
                name="repeat-outline"
                size={21}
                color={
                  erroFrequencia
                    ? Cores.erro
                    : Cores.primaria
                }
              />
            }
          />

          <CampoTexto
            rotulo="HORÁRIO — OPCIONAL"
            value={horario}
            onChangeText={setHorario}
            placeholder="Ex.: 08:00 e 20:00"
            returnKeyType="done"
            onSubmitEditing={adicionarMedicamento}
            icone={
              <Ionicons
                name="time-outline"
                size={21}
                color={Cores.primaria}
              />
            }
          />

          <View style={styles.areaBotoes}>
            <Pressable
              onPress={fecharFormulario}
              style={({ pressed }) => [
                styles.botaoCancelar,
                pressed && styles.pressionado,
              ]}
            >
              <Text style={styles.textoCancelar}>
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              onPress={adicionarMedicamento}
              style={({ pressed }) => [
                styles.botaoSalvar,
                pressed && styles.pressionado,
              ]}
            >
              <Ionicons
                name="checkmark"
                size={18}
                color={Cores.fundo}
              />

              <Text style={styles.textoSalvar}>
                Salvar medicamento
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}

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

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Espacamentos.paddingPequeno,
  },

  areaTitulo: {
    flex: 1,
    paddingRight: Espacamentos.medio,
  },

  rotulo: {
    marginLeft: 3,
    fontSize: 11.5,
    fontWeight: Tipografia.pesoBlack,
    letterSpacing: 0.8,
    color: Cores.textoSecundario,
  },

  descricao: {
    marginTop: 4,
    marginLeft: 3,
    fontSize: Tipografia.legenda,
    lineHeight: 17,
    color: Cores.textoSuave,
  },

  botaoAbrir: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
    borderRadius: Bordas.media,
    backgroundColor: Cores.primaria,
  },

  textoBotaoAbrir: {
    marginLeft: 3,
    fontSize: Tipografia.legenda,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.fundo,
  },

  lista: {
    gap: Espacamentos.pequeno,
  },

  cardMedicamento: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  areaIcone: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.grande,
    backgroundColor: Cores.fundo,
  },

  conteudoMedicamento: {
    flex: 1,
    marginLeft: Espacamentos.paddingPequeno,
  },

  nomeMedicamento: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  detalhesMedicamento: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    lineHeight: 17,
    color: Cores.textoSecundario,
  },

  horarioMedicamento: {
    marginTop: 2,
    fontSize: 11.5,
    color: Cores.textoSuave,
  },

  botaoRemover: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.media,
    backgroundColor: Cores.erroFundo,
  },

  estadoVazio: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Espacamentos.paddingPequeno,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Cores.bordaCampo,
    backgroundColor: Cores.fundoAzulado,
  },

  textoEstadoVazio: {
    marginLeft: Espacamentos.pequeno,
    fontSize: Tipografia.legenda,
    color: Cores.textoSuave,
  },

  formulario: {
    marginTop: Espacamentos.paddingPequeno,
    padding: Espacamentos.paddingMedio,
    borderRadius: Bordas.campo,
    borderWidth: 1,
    borderColor: Cores.bordaMuitoSuave,
    backgroundColor: Cores.fundoAzuladoClaro,
  },

  cabecalhoFormulario: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Espacamentos.medio,
  },

  tituloFormulario: {
    fontSize: Tipografia.texto,
    fontWeight: Tipografia.pesoBlack,
    color: Cores.primariaEscura,
  },

  descricaoFormulario: {
    marginTop: 3,
    fontSize: Tipografia.legenda,
    color: Cores.textoSuave,
  },

  botaoFechar: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Bordas.media,
    backgroundColor: Cores.fundo,
  },

  areaBotoes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Espacamentos.pequeno,
  },

  botaoCancelar: {
    minHeight: 43,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Espacamentos.paddingPequeno,
    borderRadius: Bordas.media,
    borderWidth: 1,
    borderColor: Cores.bordaCampo,
    backgroundColor: Cores.fundo,
  },

  textoCancelar: {
    fontSize: Tipografia.legenda,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.textoSecundario,
  },

  botaoSalvar: {
    minHeight: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Espacamentos.paddingPequeno,
    borderRadius: Bordas.media,
    backgroundColor: Cores.primaria,
  },

  textoSalvar: {
    marginLeft: 4,
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