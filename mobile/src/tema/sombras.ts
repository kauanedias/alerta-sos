import { Platform } from 'react-native';

export const Sombras = {
  leve: Platform.select({
    ios: {
      shadowColor: '#2E7DF5',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.09,
      shadowRadius: 9,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0px 4px 9px rgba(46, 125, 245, 0.09)',
    },
  }),

  media: Platform.select({
    ios: {
      shadowColor: '#2E7DF5',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.23,
      shadowRadius: 17,
    },
    android: {
      elevation: 7,
    },
    web: {
      boxShadow: '0px 12px 17px rgba(46, 125, 245, 0.23)',
    },
  }),

  forte: Platform.select({
    ios: {
      shadowColor: '#3C638E',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.11,
      shadowRadius: 30,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0px 16px 30px rgba(60, 99, 142, 0.11)',
    },
  }),
};
