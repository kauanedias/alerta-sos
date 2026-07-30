import { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import {
  Bordas,
  Cores,
  Espacamentos,
  Sombras,
} from '../tema';

type CardProps = {
  children: ReactNode;
  detalheSuperior?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Card({
  children,
  detalheSuperior = true,
  style,
}: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {detalheSuperior ? <View style={styles.detalheSuperior} /> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingHorizontal: Espacamentos.cardHorizontal,
    paddingTop: Espacamentos.grande,
    paddingBottom: Espacamentos.grande,
    borderRadius: Bordas.card,
    borderWidth: 1,
    borderColor: Cores.bordaCard,
    backgroundColor: Cores.card,
    overflow: 'hidden',
    ...Sombras.forte,
  },

  detalheSuperior: {
    position: 'absolute',
    top: 0,
    left: 50,
    right: 50,
    height: 3,
    borderBottomLeftRadius: Bordas.media,
    borderBottomRightRadius: Bordas.media,
    backgroundColor: Cores.primariaMedia,
  },
});
