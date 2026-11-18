<h1 align="center">Rumo ao Estrelato</h1>

<p align="center">Registre e acompanhe a carreira dos seus jogadores no modo carreira: temporadas, clubes, números e momentos que marcaram cada ano.</p>

**Produção:** *(Em breve)*

# Sobre

O Rumo ao Estrelato é uma aplicação web para quem joga modo carreira e quer guardar a trajetória dos jogadores em um lugar só. Planilhas e anotações soltas esquecem transferências no meio da temporada, títulos por competição e aquele gol na final; com o tempo fica difícil montar o panorama da carreira.

Você cria jogadores com nome, posição e nacionalidade, abre temporadas ligadas a clubes e preenche estatísticas (jogos, gols, assistências, cartões, nota média e clean sheets). Dá para registrar transferência no decorrer da temporada e finalizar o ano quando fechar o ciclo. Conquistas entram como título de competição (com tipo de torneio) ou prêmio individual; na visão do jogador aparecem totais de carreira e o histórico agrupado por temporada.

Cada temporada também aceita momentos marcantes (tipos do sistema ou criados por você), com título e descrição, para lembrar viradas, lesões, hat-tricks e o que mais importar. Os dados ficam na sua conta (cadastro, login, recuperação e alteração de senha via e-mail). O acesso aos registros é isolado por usuário no banco.

# Ferramentas

- [TanStack Start](https://tanstack.com/start) e [Vite](https://vite.dev/)
- [React](https://react.dev/) e [TypeScript](https://www.typescriptlang.org/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query) e [TanStack Form](https://tanstack.com/form)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/) e [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/docs) (Auth, Postgres e RLS)

# Rodando o projeto

Você precisa do [Node.js](https://nodejs.org/), [Git](https://git-scm.com/), [npm](https://docs.npmjs.com/) e, se for usar o Supabase na máquina, [Docker](https://docs.docker.com/get-docker/).

O schema versionado fica em `supabase/migrations/` (tabelas, RLS, funções RPC, países e tipos de momento iniciais). Dá para desenvolver de duas formas:

- **Supabase local:** sobe o stack com Docker e aplica as migrações automaticamente.
- **Supabase remoto:** aponte o app para o projeto na nuvem (URL e chave publishable no painel **Settings → API**). Para alinhar o schema local ao remoto, use o CLI (`supabase link` no projeto e `supabase db pull` quando quiser trazer o estado do banco remoto).

1. Clone o repositório:

```bash
git clone https://github.com/gabriellima2/rumo-ao-estrelato.git
cd rumo-ao-estrelato
```

2. Instale as dependências:

```bash
npm install
```

3. **(Opcional: Supabase local)** Suba o banco e o Auth na máquina:

```bash
npx supabase start
```

Na primeira execução as migrações em `supabase/migrations/` são aplicadas. Para recriar do zero: `npx supabase db reset`.

4. Configure variáveis de ambiente (veja `.env.example`):

```bash
cp .env.example .env
```

| Variável | Uso |
|----------|-----|
| `VITE_SUPABASE_URL` | URL da API (`http://127.0.0.1:54321` no local após `supabase start`, ou a URL do projeto remoto) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave **publishable**. Em local: `npx supabase status`; em remoto: painel Supabase |

5. Inicie o app:

```bash
npm run dev
```

A aplicação abre em [http://localhost:3000](http://localhost:3000) (porta definida no script `dev`).

**Scripts adicionais:**

```bash
npm run build          # build de produção
npm run preview        # preview do build
npm run test           # testes (Vitest)
npm run generate-routes  # regenera rotas do TanStack Router (tsr)
npm run lint           # ESLint
npm run format         # Prettier + ESLint --fix
npm run check          # checagem Prettier sem escrever
```

## Encerrar o desenvolvimento

1. Pare o servidor Vite (`npm run dev`) com `Ctrl+C`.

2. Se usou Supabase local:

```bash
npx supabase stop
```

Para conferir o que ainda está ativo: `npx supabase status`.

<h4 align="center">Projeto feito com 💙 por Gabriel Lima</h4>