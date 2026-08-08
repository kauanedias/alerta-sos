
---

# Roadmap

- [x] Splash Screen
- [x] Onboarding
- [x] Sistema de tema
- [x] Componentes reutilizáveis
- [x] Tela de Login
- [x] Tela de Cadastro
- [x] Verificação de E-mail
- [x] Tela de Boas-vindas
- [x] Perfil Pessoal
- [x] Perfil de Saúde
- [x] Contatos de Emergência
- [x] Permissões
- [x] Tela de Cadastro Concluído
- [x] Tela Principal


- [ ] Integração com API
- [ ] Banco de Dados
- [ ] Histórico de Alertas
- [ ] Geolocalização
- [ ] Compartilhamento de Localização
- [ ] Notificações Push
- [ ] Envio de SMS
- [ ] Integração com IA
- [ ] Smartwatch
- [ ] Testes
- [ ] Publicação na Play Store



# Development Log

## 29/07/2026

### Concluído
- Organização das pastas do projeto
- Criação do tema global
- Componentes reutilizáveis
- Splash Screen animada
- Onboarding redesenhada
- Navegação inicial configurada

### Próximos passos
- Tela de Login


## 30/07/2026

### Concluído
- Estrutura inicial do projeto organizada.
- Tema centralizado (cores, tipografia, bordas, sombras e espaçamentos).
- Componentes reutilizáveis criados.
- Tela de Login desenvolvida.
- Animações e elementos visuais adicionados.
- Validação de e-mail e senha.
- Loading no botão de login.
- Login social (estrutura).
- Correção do botão de mostrar senha no Expo Web.

### Próximo passo
- Tela de Cadastro.



## 31/07/2026

### Concluído
- Tela de Cadastro desenvolvida.
- Tela de Verificação de E-mail criada.
- Fluxo de cadastro conectado.
- Início da Configuração Inicial do usuário.
- Criação do componente reutilizável `ProgressoCadastro`.
- Criação do componente reutilizável `CardInformacao`.
- Refatoração para maior reutilização dos componentes.
- Melhorias visuais na tela de Boas-vindas da configuração.
- Planejamento das próximas etapas do onboarding do usuário.

### Próximo passo
- Perfil Pessoal.


## 01/08/2026

### Concluído
- Tela de Perfil Pessoal desenvolvida.
- Integração com seleção de foto de perfil (Image Picker).
- Componente reutilizável `CampoDataNascimento`.
- Evolução do componente `CampoTexto` com suporte a diferentes tipos de entrada.
- Validação de altura e peso.
- Melhorias na experiência do formulário.
- Ajustes visuais e refinamento da interface.

### Próximo passo
- Tela de Perfil de Saúde.


## 03/08/2026

### Concluído
- Tela de Perfil de Saúde desenvolvida.
- Inclusão de alergias, condições de saúde, medicamentos, mobilidade e informações de segurança.
- Mini resumo das informações de saúde.
- Integração das mensagens programadas da Luma ao fluxo de configuração.
- Tela de apresentação da Luma desenvolvida.
- Tela de Rede de Apoio desenvolvida.
- Cadastro estruturado de contatos de emergência.
- Definição da prioridade dos contatos.
- Inclusão de informações como proximidade e acesso à residência.
- Resumo da rede de apoio.
- Tela de Permissões desenvolvida.
- Validação das permissões essenciais.
- Tela animada de cadastro concluído desenvolvida.
- Melhorias nos componentes reutilizáveis.
- Ajustes de responsividade e rolagem nas telas.

### Em análise
- No Expo Go para Android, os campos da tela de cadastro ficam piscando e alternando o foco entre si ao abrir o teclado.
- O problema não acontece na versão web.
- A animação do formulário foi removida como teste, mas o comportamento continuou.

### Próximos passos
- Investigar o conflito de foco dos campos no Android.
- Testar a desativação do preenchimento automático.
- Revisar o controle de foco do componente `CampoTexto`.
- Criar a tela principal do AlertaSOS.


## 04/08/2026

### Concluído
- Fluxo completo de configuração inicial finalizado.
- Tela principal do AlertaSOS criada.
- Botão SOS em destaque adicionado à tela principal.
- Atalhos para localização, rede de apoio, histórico e perfil adicionados.
- Navegação inferior inicial criada.
- Animação de entrada da tela de cadastro restaurada após teste no Android.

### Em análise
- No Expo Go para Android, os campos da tela de cadastro piscam e o foco alterna entre eles ao abrir o teclado.
- O problema não acontece na versão Web.
- A remoção da animação do formulário não resolveu o problema.
- O próximo teste será investigar o preenchimento automático do Android e o controle de foco do componente `CampoTexto`.

### Próximos passos
- Corrigir o conflito de foco dos campos no Expo Go para Android.
- Refinar e testar a tela principal.
- Criar o fluxo real de acionamento do SOS.
- Criar as telas de Histórico, Localização e Perfil.


## 04/08/2026 (Atualização)

### Correções
- Corrigido erro de renderização no Android ao navegar para a tela de Perfil de Saúde.
- Identificada a utilização da tag HTML `<br>`, que funciona na Web, mas não é suportada pelo React Native.
- O espaçamento entre componentes passou a ser tratado utilizando `View`, `margin` e `padding`, seguindo o padrão do React Native.




## 05/08/2026

### Concluído

- Redesign da tela de apresentação da Luma com novas animações e identidade visual.
- Reformulação completa da tela de cadastro concluído.
- Ajustes na Home com novos atalhos para Polícia e Ambulância.
- Criação da tela de integração com Smartwatch.
- Criação do módulo "Medidas de Proteção".
- Implementação das telas de Engasgo, Convulsão, Queimaduras e Sangramento.
- Correção de bugs de interface e componentes.
- Reorganização da estrutura do projeto (`mobile`, `api` e `docs`).
- Definição da arquitetura do backend.
- Escolha das tecnologias da API (Node.js, Express, TypeScript, Prisma e MySQL).

### Próximo passo

- Iniciar a construção da API.
- Configurar Node.js, Express, TypeScript e Prisma.
- Conectar a API ao MySQL.


```md

# API 

## 06/08/2026

### Concluído

- Configuração da API com Express e TypeScript.
- Integração da API com o MySQL.
- Criação da tabela `usuarios`.
- Conexão da API com o banco de dados.
- Criação do primeiro endpoint de status.
- Implementação do cadastro de usuários.
- Criptografia de senhas com bcrypt.
- Implementação do login com JWT.
- Organização da arquitetura em controllers, models e routes.
- Integração do aplicativo React Native com a API.
- Login funcionando no Android utilizando a API e o MySQL.

### Próximo passo

- Persistência da sessão do usuário.
- Abrir diretamente na Home quando houver um usuário autenticado.
- Integração do cadastro do aplicativo com a API.



## 08/08/2026

### Concluído

- Reorganização do banco de dados, separando conta e perfil pessoal.
- Criação da tabela `perfil_pessoal`.
- Ajuste da tabela `usuarios` para autenticação e verificação.
- Implementação do envio de código de verificação por e-mail.
- Implementação da confirmação e reenvio do código.
- Integração do cadastro e da verificação de e-mail com o aplicativo.
- Configuração do Nodemailer para envio real de e-mails.
- Configuração do `expo-secure-store`.
- Persistência do fluxo de cadastro ao sair e retornar ao aplicativo.
- Retomada automática da verificação ou configuração inicial.
- Correção do seletor de data de nascimento no iOS.
- Teste da criação do perfil pessoal pela API e MySQL.

### Próximo passo

- Integrar a tela de Perfil Pessoal com a API.
- Salvar os dados do Perfil Pessoal no MySQL pelo aplicativo.
- Continuar a integração das próximas etapas da configuração inicial.