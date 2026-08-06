# AlertaSOS

O **AlertaSOS** é um aplicativo mobile desenvolvido em **React Native** com foco em auxiliar pessoas em situações de emergência de forma rápida, intuitiva e acessível.

O projeto nasceu inspirado em uma experiência real vivida na minha família e tem como objetivo facilitar o acionamento de ajuda, compartilhar informações importantes e oferecer recursos que possam fazer diferença em momentos críticos.

---

# Objetivo

Desenvolver uma plataforma que permita ao usuário:

- Solicitar ajuda rapidamente.
- Compartilhar sua localização em situações de emergência.
- Armazenar informações de saúde importantes.
- Gerenciar contatos de emergência.
- Integrar futuramente smartwatches para detecção de quedas e monitoramento.
- Disponibilizar conteúdos educativos sobre primeiros socorros.

---

# Tecnologias

## Mobile

- React Native
- Expo
- Expo Router
- TypeScript
- React Native Reanimated
- React Native SVG

## Backend *(em desenvolvimento)*

- Node.js
- Express
- TypeScript
- MySQL

---

# Estrutura do projeto

```text
alerta-sos/
│
├── mobile/          # Aplicativo React Native
├── api/             # Backend Node.js + Express
├── docs/            # Documentação do projeto
├── README.md
└── DEVELOPMENT.md
```

---

# Funcionalidades

## Já implementadas

- Splash Screen animada
- Onboarding
- Login
- Cadastro de usuário
- Perfil pessoal
- Perfil de saúde
- Cadastro de contatos de emergência
- Tela principal (Home)
- Botão SOS
- Tela de apresentação da Luma
- Integração futura com Smartwatch
- Módulo "Medidas de Proteção"

### Conteúdos disponíveis

- Engasgo
- Convulsão
- Queimaduras
- Sangramento

---

# Funcionalidades em desenvolvimento

- API REST
- Banco de dados MySQL
- Persistência de usuários
- Login integrado
- Histórico de alertas
- Compartilhamento de localização em tempo real
- Integração com Smartwatch
- Assistente IA (Luma)
- Sistema de notificações
- Modo offline para emergências

---

# Arquitetura

O aplicativo **não acessa diretamente o banco de dados**.

Toda comunicação acontece através da API.

```text
Aplicativo
      │
      ▼
API Node.js
      │
      ▼
Banco de Dados MySQL
```

Essa arquitetura facilita manutenção, escalabilidade e segurança da aplicação.

---

# Status do projeto

Em desenvolvimento.

Atualmente o foco está na construção da API e integração com banco de dados para permitir autenticação, armazenamento de usuários e sincronização das informações do aplicativo.

---

# Autor

Desenvolvido por **Kauane Dias** como projeto de estudo e portfólio, com foco em desenvolvimento Mobile e Back-end.