# 🏗️ Arquitetura do Projeto

Este documento descreve a arquitetura do projeto DOAKI, detalhando a estrutura e a organização proposta para o backend, com foco em escalabilidade, separação de responsabilidades e boas práticas de desenvolvimento com Node.js, TypeScript e Prisma.

---

## 🖥️ Backend

A arquitetura do backend foi baseada em um modelo **MVC aprimorado**, com a inclusão de camadas como repositórios e middlewares para melhor organização e desacoplamento.

### 🔍 Estrutura de Pastas

```
.
├── prisma/                   # Configurações e migrações do Prisma
│   ├── migrations/           # Histórico de migrações do banco de dados
│   └── schema.prisma         # Definição dos modelos e datasource do Prisma
│
├── src/                      # Código-fonte principal
│   ├── controllers/          # Lógica de controle para lidar com requisições
│   ├── middlewares/          # Middlewares como autenticação, validações, etc.
│   ├── repositories/         # Acesso a dados, abstração sobre Prisma
│   ├── routes/               # Definição das rotas da API
│   ├── lib/                  # Bibliotecas utilitárias e funções auxiliares
│   └── generated/            # Código gerado automaticamente (ex: Prisma client)
│
├── server.ts                 # Arquivo principal de inicialização da aplicação
├── entrypoint.sh             # Script de inicialização usado no Docker
├── Dockerfile                # Dockerfile para build da imagem do backend
├── docker-compose.yml        # Orquestração dos containers (backend + db)
├── .env                      # Variáveis de ambiente (conexões, secrets, etc.)
├── tsconfig.json             # Configuração do TypeScript
└── package.json              # Dependências e scripts do projeto

```


### 🎯 Justificativa

Optamos por essa estrutura por ela:

- Ter uma boa separação de responsabilidades, tornando o código mais limpo e modular;

- Facilidade para testar cada parte da aplicação isoladamente;

- Permitir uso do Prisma para um acesso a dados seguro, performático e tipado;

- Pronto para escalar, com estrutura que permite o crescimento da aplicação e da equipe;

- Contendo Dockerização, que garante consistência entre ambientes (dev/staging/prod).

---

## 🛠️ Backend

A arquitetura adotada no backend segue o padrão **MVC aprimorado**, com camadas de serviço adicionais para permitir maior desacoplamento e escalabilidade.

### 🧱 Camadas do Backend

- **Model**: Representação dos dados e entidades.
- **Controller**: Responsável por receber as requisições e direcioná-las corretamente.
- **Service**: Camada intermediária entre os controllers e os repositórios, onde fica a lógica de negócio.
- **Repository**: Camada responsável pela comunicação direta com o banco de dados.

### ✅ Benefícios dessa Arquitetura

- Clareza e **separação de responsabilidades**;
- **Escalabilidade**, com espaço para adicionar novas regras de negócio e serviços;
- Facilita **testes unitários** e **mocking**;
- Menor acoplamento entre as partes da aplicação;
- Agilidade na resolução de erros e bugs.

---

## 📄 Documentação Extra

- `docs/architecture.md`: Documento atual contendo a arquitetura.

- `docs/database.md`: Especificações e decisões sobre o modelo de dados.

- `docs/setup.mdP`: Instruções de como rodar o projeto localmente usando Docker.

---

## 💡 Considerações Finais

A estrutura foi pensada para manter o projeto modular, escalável e de fácil manutenção. Seguindo boas práticas de desenvolvimento backend com Node.js e Prisma, a arquitetura garante um ponto de partida sólido para o crescimento técnico e de negócio do projeto.