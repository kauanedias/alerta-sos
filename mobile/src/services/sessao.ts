import * as SecureStore from 'expo-secure-store';

const CHAVE_TOKEN = 'token';
const CHAVE_USUARIO = 'usuario';

export async function salvarSessao(token: string, usuario: any) {
  await SecureStore.setItemAsync(CHAVE_TOKEN, token);
  await SecureStore.setItemAsync(CHAVE_USUARIO, JSON.stringify(usuario));
}

export async function obterToken() {
  return await SecureStore.getItemAsync(CHAVE_TOKEN);
}

export async function obterUsuario() {
  const usuario = await SecureStore.getItemAsync(CHAVE_USUARIO);

  if (!usuario) {
    return null;
  }

  return JSON.parse(usuario);
}

export async function limparSessao() {
  await SecureStore.deleteItemAsync(CHAVE_TOKEN);
  await SecureStore.deleteItemAsync(CHAVE_USUARIO);
}