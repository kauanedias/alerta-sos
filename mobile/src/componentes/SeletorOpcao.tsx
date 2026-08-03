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

type Opcao = {
  rotulo: string;
  valor: string;
};

type SeletorOpcaoProps = {
  titulo: string;
  opcoes: Opcao[];
  valorSelecionado?: string;
  onSelecionar: (valor: string) => void;
  erro?: string;
};

export function SeletorOpcao({
  titulo,
  opcoes,
  valorSelecionado,
  onSelecionar,
  erro,
}: SeletorOpcaoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>

      <View style={styles.lista}>
        {opcoes.map((opcao) => {
          const selecionada =
            valorSelecionado === opcao.valor;

          return (
            <Pressable
              key={opcao.valor}
              onPress={() => onSelecionar(opcao.valor)}
              style={({ pressed }) => [
                styles.opcao,
                selecionada && styles.opcaoSelecionada,
                pressed && styles.opcaoPressionada,
              ]}
            >
              <Text
                style={[
                  styles.textoOpcao,
                  selecionada &&
                    styles.textoOpcaoSelecionada,
                ]}
              >
                {opcao.rotulo}
              </Text>
            </Pressable>
          );
        })}
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

  titulo: {
    marginLeft: 3,
    marginBottom: Espacamentos.pequeno,
    fontSize: 11.5,
    fontWeight: Tipografia.pesoBlack,
    letterSpacing: 0.8,
    color: Cores.textoSecundario,
  },

  lista: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Espacamentos.pequeno,
  },

  opcao: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Espacamentos.paddingMedio,
    paddingVertical: 10,
    borderRadius: Bordas.grande,
    borderWidth: 1,
    borderColor: Cores.bordaCampo,
    backgroundColor: Cores.fundoAzulado,
  },

  opcaoSelecionada: {
    borderColor: Cores.primaria,
    backgroundColor: Cores.primaria,
  },

  textoOpcao: {
    fontSize: Tipografia.textoPequeno,
    fontWeight: Tipografia.pesoExtraBold,
    color: Cores.textoSecundario,
    textAlign: 'center',
  },

  textoOpcaoSelecionada: {
    color: Cores.fundo,
  },

  opcaoPressionada: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  erro: {
    marginTop: 7,
    marginLeft: 4,
    fontSize: Tipografia.legenda,
    color: Cores.erro,
  },
});