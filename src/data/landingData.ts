export const PLATFORM_URL = 'https://idev-platform.vercel.app';
export const PLATFORM_REPO_URL = 'https://github.com/DevAsouzzlv/idev-platform';
export const LANDING_REPO_URL = 'https://github.com/DevAsouzzlv/idev-landing';

export const PLATFORM_FEE_RATE = 0.15;
export const DEV_NET_RATE = 1 - PLATFORM_FEE_RATE;
export const COUNTER_OFFER_INCREMENTS = [20, 40, 60] as const;

export interface TelemetryEvent {
  id: string;
  tag: 'MATCH' | 'GITHUB_API' | 'WEBHOOK' | 'ESCROW' | 'BULLMQ';
  message: string;
  latencyMs: number;
  hash: string;
  tone: 'amber' | 'sky' | 'emerald';
}

export const LIVE_TELEMETRY_EVENTS: TelemetryEvent[] = [
  {
    id: 'evt-1',
    tag: 'MATCH',
    message: '@dev_rafa assumiu acme/checkout-api (Porte M • R$ 180) em 1 clique',
    latencyMs: 11,
    hash: '9f42c1a',
    tone: 'amber',
  },
  {
    id: 'evt-2',
    tag: 'GITHUB_API',
    message: 'PUT /repos/loja-vibe/storefront/collaborators aprovado em background',
    latencyMs: 74,
    hash: '3c18e0b',
    tone: 'sky',
  },
  {
    id: 'evt-3',
    tag: 'WEBHOOK',
    message: 'pull_request.closed (merged: true) autenticado via X-Hub-Signature-256',
    latencyMs: 9,
    hash: '7e21d9f',
    tone: 'emerald',
  },
  {
    id: 'evt-4',
    tag: 'ESCROW',
    message: 'Transação ACID liberou R$ 153,00 líquidos na carteira Pix do dev',
    latencyMs: 14,
    hash: '5a08b4d',
    tone: 'emerald',
  },
  {
    id: 'evt-5',
    tag: 'BULLMQ',
    message: 'Timer 48h IN_REVIEW ativo para PR #112 em fintech-ops/auth-gateway',
    latencyMs: 4,
    hash: 'd190a7c',
    tone: 'amber',
  },
];

export interface ArchitectureNode {
  id: string;
  step: string;
  title: string;
  engine: string;
  protocol: string;
  latency: string;
  summary: string;
  fileTarget: string;
  codeSnippet: string;
}

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'escrow-lock',
    step: '01',
    title: 'Escrow ACID Lock',
    engine: 'PostgreSQL 15+',
    protocol: 'ACID / FOR UPDATE',
    latency: '14ms',
    summary:
      'Antes de ir para o Radar, o saldo do contratante é bloqueado em transação isolada com lock pessimista, garantindo pagamento zero-risco.',
    fileTarget: 'apps/api/src/services/escrow.ts',
    codeSnippet: `BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SELECT balance FROM wallets WHERE user_id = $clientId FOR UPDATE;
UPDATE wallets SET balance = balance - 160.00, held = held + 160.00;
INSERT INTO escrow_ledger (task_id, amount_brl, status)
VALUES ('tsk_48a9', 160.00, 'LOCKED');
COMMIT; -- Custódia garantida antes do despacho`,
  },
  {
    id: 'radar-ws',
    step: '02',
    title: 'Radar 99Negocia',
    engine: 'Fastify + Socket.io',
    protocol: 'WSS Full-Duplex',
    latency: '12ms',
    summary:
      'Chamados chegam em tempo real para devs ONLINE na stack. Aceite direto ou contraproposta (+R$20/+R$40/+R$60) sem chat de leilão.',
    fileTarget: 'apps/api/src/realtime/radar.ts',
    codeSnippet: `io.to('stack:typescript').emit('radar:task_dispatched', {
  taskId: 'tsk_48a9',
  tier: 'M',
  offerBrl: 160,
  quickCounters: [180, 200, 220],
  preMatchChatEnabled: false
});`,
  },
  {
    id: 'github-invite',
    step: '03',
    title: 'Convite Invisível Git',
    engine: 'GitHub REST API v3',
    protocol: 'OAuth + AES-256-GCM',
    latency: '78ms',
    summary:
      'No instante do match, o servidor adiciona o dev como colaborador e aceita o convite via API usando tokens criptografados em repouso.',
    fileTarget: 'apps/api/src/integrations/github.ts',
    codeSnippet: `PUT /repos/acme/checkout-api/collaborators/dev_rafa
Authorization: Bearer <aes_256_gcm_decrypted_token>
{ "permission": "push" }

PATCH /user/repository_invitations/98412011 -> 204 No Content
# Branch pronta: git checkout -b idev-task-48a9`,
  },
  {
    id: 'webhook-hmac',
    step: '04',
    title: 'Homologação HMAC',
    engine: 'GitHub Webhooks',
    protocol: 'X-Hub-Signature-256',
    latency: '9ms',
    summary:
      'Ao clicar em Merge Pull Request no próprio GitHub, o webhook autenticado via HMAC-SHA256 valida a entrega e finaliza a tarefa.',
    fileTarget: 'apps/api/src/routes/webhooks.ts',
    codeSnippet: `POST /api/webhooks/github
X-Hub-Signature-256: sha256=4b8e9f30d21a... [VERIFIED]
{
  "action": "closed",
  "pull_request": { "number": 48, "merged": true }
}
// -> Status: COMPLETED | Escrow liberado instantaneamente`,
  },
  {
    id: 'bullmq-48h',
    step: '05',
    title: 'Timer 48h & Pix',
    engine: 'Redis + BullMQ',
    protocol: 'Persistent Job Queue',
    latency: '4ms',
    summary:
      'Cronômetro resiliente protege o dev contra cliente fantasma (Auto-Release 48h) e congela instantaneamente se o cliente pedir correção.',
    fileTarget: 'apps/api/src/workers/reviewTimer.ts',
    codeSnippet: `await reviewQueue.add('auto-release-48h', {
  taskId: 'tsk_48a9',
  payoutNetBrl: 136.00, // 85% líquido via Pix
  platformFeeBrl: 24.00 // 15% taxa IDev
}, {
  delay: 48 * 60 * 60 * 1000,
  jobId: 'timer:tsk_48a9'
});`,
  },
];

export interface SimulatorTask {
  id: string;
  tier: 'P' | 'M' | 'G';
  badge: string;
  repo: string;
  branch: string;
  title: string;
  description: string;
  basePrice: number;
  slaLabel: string;
  tags: string[];
  prNumber: number;
  onlineDevs: number;
}

export const LIVE_SIMULATOR_TASKS: SimulatorTask[] = [
  {
    id: 'task-p',
    tier: 'P',
    badge: 'Porte P • Ajuste UI',
    repo: 'loja-vibe/storefront',
    branch: 'fix/checkout-mobile-overflow',
    title: 'Corrigir overflow mobile no Checkout e alinhamento do botão Pix',
    description:
      'Layout quebra em telas menores que 375px no resumo do pedido e empurra o CTA para fora da viewport.',
    basePrice: 80,
    slaLabel: 'SLA até 2h',
    tags: ['React', 'Tailwind', 'TypeScript'],
    prNumber: 19,
    onlineDevs: 18,
  },
  {
    id: 'task-m',
    tier: 'M',
    badge: 'Porte M • Bug Crítico',
    repo: 'acme/checkout-api',
    branch: 'fix/stripe-webhook-redis-lock',
    title: 'Race condition no webhook Stripe + Lock atômico no Redis',
    description:
      'Eventos duplicados do Stripe disparam dupla liberação de pedido quando chegam no mesmo milissegundo.',
    basePrice: 160,
    slaLabel: 'SLA até 6h',
    tags: ['Node.js', 'TypeScript', 'Redis'],
    prNumber: 48,
    onlineDevs: 24,
  },
  {
    id: 'task-g',
    tier: 'G',
    badge: 'Porte G • Produção',
    repo: 'fintech-ops/auth-gateway',
    branch: 'fix/ci-cd-jwt-rotation',
    title: 'Restaurar pipeline CI/CD e corrigir falha de rotação JWT em produção',
    description:
      'Refresh tokens expirando prematuramente após deploy e build do GitHub Actions travando nos testes de integração.',
    basePrice: 380,
    slaLabel: 'SLA até 24h',
    tags: ['Fastify', 'PostgreSQL', 'Docker'],
    prNumber: 112,
    onlineDevs: 14,
  },
];

export const TECH_STACKS = [
  { name: 'TypeScript', dot: 'bg-blue-500', tag: 'TS 5.x' },
  { name: 'React', dot: 'bg-cyan-400', tag: 'UI' },
  { name: 'Node.js', dot: 'bg-emerald-500', tag: 'RUNTIME' },
  { name: 'PostgreSQL', dot: 'bg-indigo-500', tag: 'ACID' },
  { name: 'Redis', dot: 'bg-red-500', tag: 'BULLMQ' },
  { name: 'Fastify', dot: 'bg-slate-900', tag: 'API' },
  { name: 'Socket.io', dot: 'bg-amber-500', tag: 'WSS' },
  { name: 'Docker', dot: 'bg-sky-500', tag: 'CONTAINERS' },
  { name: 'Next.js', dot: 'bg-zinc-800', tag: 'SSR' },
  { name: 'Tailwind CSS', dot: 'bg-teal-400', tag: 'DESIGN' },
  { name: 'Python', dot: 'bg-amber-400', tag: 'SCRIPTS' },
  { name: 'GitHub Webhooks', dot: 'bg-emerald-400', tag: 'HMAC' },
];

export const KEY_METRICS = [
  {
    value: '12 min',
    label: 'Tempo médio até o match',
    highlight: 'text-[#FACC15]',
    tag: 'WS_DISPATCH',
  },
  {
    value: '100%',
    label: 'Valor retido em custódia (Escrow)',
    highlight: 'text-emerald-400',
    tag: 'ACID_LOCK',
  },
  {
    value: '48 horas',
    label: 'SLA de Auto-Release garantido',
    highlight: 'text-sky-400',
    tag: 'BULLMQ_QUEUE',
  },
  {
    value: '0 chats',
    label: 'Antes do match para evitar leilão',
    highlight: 'text-[#FACC15]',
    tag: '99NEGOCIA',
  },
];

export interface FlowStep {
  step: string;
  title: string;
  desc: string;
  detail: string;
}

export const CLIENT_FLOW_STEPS: FlowStep[] = [
  {
    step: '01',
    title: 'Conecte o repo e defina a oferta',
    desc: 'Entre com GitHub OAuth, escolha repositório e branch, descreva o bug e informe o valor inicial.',
    detail: 'Custódia preliminar criada na hora com proteção total.',
  },
  {
    step: '02',
    title: 'Aceite ou responda em 1 clique',
    desc: 'Devs online com a stack compatível recebem no Radar e podem aceitar ou enviar contraproposta rápida.',
    detail: 'Sem ler 40 currículos nem responder "me chama no WhatsApp".',
  },
  {
    step: '03',
    title: 'Acesso invisível sem dor de cabeça',
    desc: 'Assim que ocorre o match, a GitHub API envia e gerencia o convite de colaborador em segundo plano.',
    detail: 'Nenhuma configuração manual de permissões ou troca de links.',
  },
  {
    step: '04',
    title: 'Merge do PR libera o pagamento',
    desc: 'Teste o Pull Request em até 48h. Se estiver tudo certo, dê Merge no GitHub; se precisar de ajuste, pause o timer.',
    detail: 'Webhook detecta o merge e finaliza a demanda automaticamente.',
  },
];

export const DEV_FLOW_STEPS: FlowStep[] = [
  {
    step: '01',
    title: 'Fique ONLINE no Radar Técnico',
    desc: 'Ative sua disponibilidade no tempo livre e receba alertas em tempo real apenas das stacks que você domina.',
    detail: 'Zero tempo gasto escrevendo propostas para competir por preço.',
  },
  {
    step: '02',
    title: 'Negocie com botões 99Negocia',
    desc: 'Curtiu o chamado? Aceite pelo valor em custódia ou dispare +R$ 20, +R$ 40 ou +R$ 60 em 1 clique.',
    detail: 'O saldo já está travado em Escrow antes de você escrever 1 linha.',
  },
  {
    step: '03',
    title: 'Clone em 1 clique e abra o PR',
    desc: 'Aceite o acesso pela interface do IDev, receba o comando git clone + branch pronta e suba sua solução via Pull Request.',
    detail: 'Chat técnico liberado pós-match apenas para dúvidas do código.',
  },
  {
    step: '04',
    title: 'Receba no Merge ou Auto-Release 48h',
    desc: 'Assim que o cliente faz Merge, 85% do valor cai na carteira para saque via Pix. Cliente sumiu? Auto-Release em 48h.',
    detail: 'Proteção total contra cliente fantasma via fila BullMQ.',
  },
];

export interface ComplexityTier {
  tier: 'P' | 'M' | 'G';
  label: string;
  slaHours: number;
  recommendedMin: number;
  recommendedMax: number;
  defaultPrice: number;
  description: string;
  examples: string[];
}

export const COMPLEXITY_TIERS: ComplexityTier[] = [
  {
    tier: 'P',
    label: 'Pequeno',
    slaHours: 2,
    recommendedMin: 60,
    recommendedMax: 100,
    defaultPrice: 80,
    description:
      'Ajustes visuais, correção de texto/regex, variáveis de ambiente e botões desalinhados.',
    examples: [
      'Corrigir overflow mobile',
      'Ajustar validação Zod / regex',
      'Corrigir estado de hover ou CSS',
    ],
  },
  {
    tier: 'M',
    label: 'Médio',
    slaHours: 6,
    recommendedMin: 130,
    recommendedMax: 250,
    defaultPrice: 160,
    description:
      'Bugs em rotas de API, filtros dinâmicos, queries SQL lentas e integração de webhooks simples.',
    examples: [
      'Corrigir endpoint retornando erro 500',
      'Otimizar JOIN ou índice em query SQL',
      'Integrar webhook com idempotência',
    ],
  },
  {
    tier: 'G',
    label: 'Grande',
    slaHours: 24,
    recommendedMin: 300,
    recommendedMax: 600,
    defaultPrice: 380,
    description:
      'Falhas de autenticação JWT, deploys quebrados em produção, migrações de banco e CORS complexo.',
    examples: [
      'Restaurar build falhando no GitHub Actions',
      'Corrigir memory leak em worker/fila',
      'Resolver falha crítica de JWT ou CORS',
    ],
  },
];

export interface ComparisonRow {
  criterion: string;
  traditional: string;
  idev: string;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    criterion: 'Tempo até o match',
    traditional: 'Horas ou dias esperando propostas e avaliando perfis.',
    idev: 'Despacho ao vivo via WebSockets com match médio em minutos.',
  },
  {
    criterion: 'Modelo de precificação',
    traditional: 'Leilão predatório: vence quem aceita cobrar menos.',
    idev: '99Negocia transacional: preço fechado ou contraproposta em 1 clique.',
  },
  {
    criterion: 'Comunicação pré-contrato',
    traditional: 'Chats longos, reuniões de alinhamento e ghosting.',
    idev: 'Zero chat antes do match; foco 100% em escopo técnico fechado.',
  },
  {
    criterion: 'Acesso ao repositório',
    traditional: 'Convites manuais, troca de emails e arquivos ZIP inseguros.',
    idev: 'Convite invisível automatizado via GitHub API com 1 clique.',
  },
  {
    criterion: 'Homologação e pagamento',
    traditional: 'Cliente precisa lembrar de aprovar manualmente na plataforma.',
    idev: 'Merge do Pull Request no GitHub dispara Webhook e libera o Escrow.',
  },
  {
    criterion: 'Cliente fantasma pós-entrega',
    traditional: 'Desenvolvedor fica semanas sem resposta nem pagamento.',
    idev: 'Timer resiliente de 48h com Auto-Release automático para o dev.',
  },
];

export interface SecurityPillar {
  code: string;
  title: string;
  summary: string;
  techSpec: string;
}

export const SECURITY_PILLARS: SecurityPillar[] = [
  {
    code: 'HMAC-SHA256',
    title: 'Webhooks GitHub Verificados',
    summary:
      'Todo evento de Pull Request recebido em /api/webhooks/github exige assinatura criptográfica válida via header X-Hub-Signature-256.',
    techSpec: 'Proteção contra payloads forjados e homologação atômica no Merge.',
  },
  {
    code: 'AES-256-GCM',
    title: 'Tokens OAuth Criptografados',
    summary:
      'Os tokens de acesso GitHub de clientes e desenvolvedores nunca ficam expostos em texto plano e usam escopos estritamente necessários.',
    techSpec: 'Criptografia simétrica autenticada em repouso no banco de dados.',
  },
  {
    code: 'BULLMQ + REDIS',
    title: 'Timer de 48h Imune a Quedas',
    summary:
      'A contagem regressiva de homologação roda em fila persistente com Redis + BullMQ, pausando automaticamente em solicitações de correção.',
    techSpec: 'Auto-Release garantido mesmo após reinicializações do servidor.',
  },
  {
    code: 'POSTGRES ACID',
    title: 'Escrow com Lock Pessimista',
    summary:
      'Operações de retenção, reajuste de contraproposta, liberação e estorno rodam sob transações atômicas isoladas.',
    techSpec: 'Zero saldo duplicado, zero corrida em aceites simultâneos.',
  },
];

export interface ValidationQuote {
  name: string;
  role: string;
  channel: string;
  quote: string;
  highlight: string;
  status: string;
}

export const FIELD_VALIDATION_QUOTES: ValidationQuote[] = [
  {
    name: 'Gean Carlos',
    role: 'Desenvolvedor Freelancer',
    channel: 'LinkedIn',
    quote:
      'Usaria sim, com certeza! Principalmente pela praticidade de pegar tarefas rápidas sem precisar ficar enviando propostas.',
    highlight: 'Abandonou Workana/Fiverr por falta de retorno.',
    status: 'Aderiu ao modelo',
  },
  {
    name: 'Enzo Alberto',
    role: 'Desenvolvedor de Software',
    channel: 'LinkedIn',
    quote:
      'Achei muito interessante a ideia, e sim: quando já tem um preço definido e alguém interessado, já ter esse contato é bem melhor!',
    highlight: 'Relatou desgaste com o leilão predatório pelo menor preço.',
    status: 'Aderiu ao modelo',
  },
  {
    name: 'Airla Guimarães',
    role: 'Desenvolvedora Full Stack',
    channel: 'LinkedIn',
    quote: 'A proposta do app é bem interessante, eu usaria o sistema.',
    highlight: 'Trabalha para 2 empresas e precisa de encaixe rápido sem candidaturas.',
    status: 'Aderiu ao modelo',
  },
  {
    name: 'Bruno Pessino',
    role: 'Desenvolvedor de Software',
    channel: 'LinkedIn',
    quote:
      'Claro. Um dos principais desafios é enviar diversas propostas e gastar tempo sem garantia de retorno. Vejo bastante potencial em simplificar esse processo.',
    highlight: 'Validou a eliminação do custo oculto da candidatura.',
    status: 'Aderiu ao modelo',
  },
  {
    name: 'Laís Cardoso',
    role: 'Desenvolvedora de Software',
    channel: 'LinkedIn',
    quote: 'Sim! Com certeza!',
    highlight: 'Nunca usou plataformas antigas por burocracia e descredibilidade.',
    status: 'Aderiu ao modelo',
  },
  {
    name: 'Lucas Gabriel',
    role: 'Suporte & Infraestrutura de TI',
    channel: 'LinkedIn',
    quote:
      'Funciona muito bem para quem está focado em fazer renda extra urgente com demandas curtas e práticas.',
    highlight: 'Validou com precisão o recorte de persona focado em código.',
    status: 'Validou nicho',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Por que não existe chat livre antes do match no IDev?',
    answer:
      'O chat aberto antes do aceite gera leilões demorados, mensagens genéricas e perda de tempo dos dois lados. No IDev, toda negociação de valor acontece em 1 clique via botões transacionais (modelo 99Negocia). Depois que o match é fechado, uma sala técnica é liberada exclusivamente para dúvidas do repositório e da entrega.',
  },
  {
    question: 'Como funciona o acesso a repositórios privados sem risco?',
    answer:
      'Ambos os perfis entram com GitHub OAuth. No exato segundo do match, o back-end cria o convite de colaborador via GitHub API em segundo plano, e o dev aceita pela interface do IDev em 1 clique trabalhando em uma branch dedicada com entrega via Pull Request.',
  },
  {
    question: 'E se o desenvolvedor entregar o Pull Request com algum erro?',
    answer:
      'O cliente nunca é forçado a aceitar código quebrado. Dentro da janela de 48h, basta clicar em "Solicitar Correção" no painel do IDev descrevendo o problema. O cronômetro de 48h é imediatamente pausado, o dinheiro continua retido em Escrow e o dev ajusta no mesmo PR antes de reiniciar o timer.',
  },
  {
    question: 'Como o desenvolvedor é protegido se o cliente sumir após o PR?',
    answer:
      'Assim que o desenvolvedor submete o PR em "Entregar Tarefa", um job resiliente em BullMQ + Redis inicia a contagem de 48 horas. Se o cliente não fizer o Merge nem solicitar correção dentro do prazo, o Auto-Release é disparado automaticamente e libera o pagamento ao desenvolvedor.',
  },
  {
    question: 'Qual é a taxa da plataforma e como funciona o saque?',
    answer:
      'A taxa de serviço do IDev é de 15% sobre o valor acordado da microtarefa — ou seja, 85% do valor vai líquido para a carteira do desenvolvedor assim que o Merge do PR é detectado via Webhook (ou no Auto-Release de 48h), pronto para solicitação de saque via Pix.',
  },
  {
    question: 'Posso testar a plataforma agora mesmo?',
    answer:
      'Sim! A aplicação web do IDev está no ar com modo demonstrativo e fluxo interativo tanto para quem quer publicar uma tarefa quanto para quem quer entrar no Radar Dev.',
  },
];
