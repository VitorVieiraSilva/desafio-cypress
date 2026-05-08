# 🧪 Desafio Cypress - Automação Frontend e Backend

[![Cypress Tests](https://github.com/VitorVieiraSilva/desafio-cypress/actions/workflows/cypress.yml/badge.svg)](https://github.com/VitorVieiraSilva/desafio-cypress/actions/workflows/cypress.yml)

Suite completa de testes automatizados com Cypress para validar cenários de **API** e **Interface Web** do sistema.

## 📋 Sobre

- ✅ **Testes de API**: Endpoints REST, autenticação e operações CRUD
- ✅ **Testes Web**: Interface do usuário e fluxos de negócio
- ✅ **CI/CD**: Pipeline automatizado com GitHub Actions
- ✅ **Page Objects**: Organização e manutenção dos testes

## 🏗️ Estrutura

```
cypress/
├── e2e/
│   ├── api/produtoApi.cy.js      # Testes de API
│   └── web/                      # Testes web
├── fixtures/                     # Dados de teste
├── pages/                        # Page Objects e helpers
└── support/                      # Configurações globais
```

## 🚀 Execução

### Pré-requisitos
- Node.js >= 18
- NPM

### Instalação e Execução
```bash
# Instalar dependências
npm install

# Modo interativo
npm run cy:open

# Modo headless
npm run test

# Apenas API
npx cypress run --spec "cypress/e2e/api/**"

# Apenas Web
npx cypress run --spec "cypress/e2e/web/**"
```

## 📊 Cenários de Teste

### API Tests
- **Cadastro de Produto**: Criação, listagem e exclusão via API
- **Autenticação**: Login e obtenção de tokens

### Web Tests
- **Login**: Autenticação na interface
- **Cadastro de Produto**: Fluxo completo via interface
- **Cenários Negativos**: Tratamento de erros

## 🛠️ Tecnologias

- **Cypress 15.14.2** - Framework de testes E2E
- **JavaScript/Node.js** - Linguagem
- **Serverest API** - API de teste
- **GitHub Actions** - CI/CD

## ⚙️ Configuração

### Variáveis de Ambiente (`cypress.env.json`)
A fins de teste foi utilizado o arquivo cypress.env.json
em situação real dados sencíveis são protegidos por secretes ou arquivos não versionado.
```json
{
  "password": "sua_senha_aqui"
}
```

### Fixtures
- `user.json`: Dados de usuário para testes
- `product.json`: Dados de produto para testes

## 🔄 CI/CD

Pipeline automatizado executando testes em paralelo:
- **API Tests**: Chrome headless
- **Web Tests**: Chrome headless
- **Artefatos**: Screenshots e vídeos salvos em caso de falha

**Desenvolvido por [Vitor Vieira Silva](https://github.com/VitorVieiraSilva)**
