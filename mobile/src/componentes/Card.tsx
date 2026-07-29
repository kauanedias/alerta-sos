import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
} from '../tema';

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: Cores.card,
    borderRadius: Bordas.grande,
    padding: Espacamentos.paddingGrande,
    borderWidth: 1,
    borderColor: Cores.bordaCard,
    ...Sombras.leve,
  },
});