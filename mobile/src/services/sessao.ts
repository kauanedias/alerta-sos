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

const CHAVE_EMAIL_VERIFICACAO = 'email_verificacao';
const CHAVE_ETAPA_CADASTRO = 'etapa_cadastro';

export async function salvarEmailVerificacao(email: string) {
  await SecureStore.setItemAsync(
    CHAVE_EMAIL_VERIFICACAO,
    email,
  );
}

export async function obterEmailVerificacao() {
  return SecureStore.getItemAsync(
    CHAVE_EMAIL_VERIFICACAO,
  );
}

export async function salvarEtapaCadastro(etapa: string) {
  await SecureStore.setItemAsync(
    CHAVE_ETAPA_CADASTRO,
    etapa,
  );
}

export async function obterEtapaCadastro() {
  return SecureStore.getItemAsync(
    CHAVE_ETAPA_CADASTRO,
  );
}

export async function limparFluxoCadastro() {
  await SecureStore.deleteItemAsync(
    CHAVE_EMAIL_VERIFICACAO,
  );

  await SecureStore.deleteItemAsync(
    CHAVE_ETAPA_CADASTRO,
  );
}