# IDev — Landing Page Oficial

> **Microtarefas Sob Demanda:** Marketplace on-demand de microtarefas técnicas com negociação em 1 clique, acesso automatizado via **GitHub API**, homologação por **Webhooks** e custódia segura (**Escrow**) com proteção **Auto-Release de 48h**.

## Links Oficiais

- **Plataforma em Produção (App):** [https://idev-platform.vercel.app](https://idev-platform.vercel.app)
- **Repositório da Plataforma:** [DevAsouzzlv/idev-platform](https://github.com/DevAsouzzlv/idev-platform)

## Arquitetura & Destaques da Landing Page

- **Simulador Interativo Multi-Etapas:** Demonstra ao vivo o fluxo completo em 3 abas (*Radar Ao Vivo*, *GitHub API & Webhook*, *Timer 48h & Proteção Bilateral*).
- **Fluxo Dual (Contratante vs. Desenvolvedor):** Toggle interativo explicando a jornada completa de ponta a ponta.
- **Calculadora & Tabela Referencial P / M / G:** Simulação transparente de valores recomendados, SLA e ganho líquido via Pix (85% para o dev, 15% taxa de serviço).
- **Segurança & Arquitetura Real:** Detalhamento de HMAC-SHA256, AES-256-GCM, BullMQ + Redis e transações ACID no Escrow.
- **Validação de Mercado Real:** Dados e depoimentos coletados na pesquisa de campo do projeto.

## Desenvolvimento Local

```bash
npm install
npm run dev
```

## Build de Produção

```bash
npm run typecheck
npm run build
```
