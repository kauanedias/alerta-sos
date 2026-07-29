import { Platform } from 'react-native';

export const Sombras = {
  leve: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    },
  }),

  media: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: {
      elevation: 5,
    },
    web: {
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
    },
  }),

  forte: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.16,
      shadowRadius: 16,
    },
    android: {
      elevation: 10,
    },
    web: {
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.16)',
    },
  }),
};