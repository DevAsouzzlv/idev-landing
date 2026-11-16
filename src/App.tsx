import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Cpu,
  Database,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Github,
  KeyRound,
  Lock,
  Menu,
  MessageSquareQuote,
  PauseCircle,
  Play,
  Radio,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import {
  CLIENT_FLOW_STEPS,
  COMPARISON_ROWS,
  COMPLEXITY_TIERS,
  COUNTER_OFFER_INCREMENTS,
  DEV_FLOW_STEPS,
  DEV_NET_RATE,
  FAQ_ITEMS,
  FIELD_VALIDATION_QUOTES,
  KEY_METRICS,
  LANDING_REPO_URL,
  LIVE_SIMULATOR_TASKS,
  PLATFORM_FEE_RATE,
  PLATFORM_REPO_URL,
  PLATFORM_URL,
  SECURITY_PILLARS,
  TECH_STACKS,
} from './data/landingData';

type SimulatorTab = 'radar' | 'github' | 'timer';
type TimerState = 'counting' | 'paused' | 'auto_released';
type FlowAudience = 'client' | 'developer';

const NAV_LINKS = [
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#simulador', label: 'Simulador' },
  { href: '#comparativo', label: 'Comparativo' },
  { href: '#precos', label: 'Preços & SLA' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#validacao', label: 'Validação' },
  { href: '#faq', label: 'FAQ' },
];

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function IdvTechBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Malha técnica base com pontos âmbar */}
      <div className="absolute inset-0 idev-bg-grid opacity-85" />

      {/* Orbes volumétricos suaves em movimento */}
      <div className="absolute -top-32 -left-24 h-[460px] w-[460px] rounded-full bg-[#FACC15]/25 blur-[120px] bg-orbit" />
      <div className="absolute top-[36%] -right-28 h-[480px] w-[480px] rounded-full bg-[#0D0F17]/10 blur-[130px] bg-float-reverse" />
      <div className="absolute -bottom-36 left-[18%] h-[420px] w-[420px] rounded-full bg-[#FACC15]/20 blur-[120px] bg-float-slow" />

      {/* Linhas de Circuito SVG com feixes de energia IDev */}
      <svg
        className="absolute inset-0 w-full h-full opacity-55"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Trilhas estáticas sutis */}
        <path
          d="M -60 150 H 240 L 310 220 H 620 L 680 160 H 1120 L 1200 240 H 1500"
          stroke="rgba(13, 15, 23, 0.10)"
          strokeWidth="1.5"
        />
        <path
          d="M -40 480 H 180 L 260 560 H 540 L 610 490 H 980 L 1060 570 H 1500"
          stroke="rgba(13, 15, 23, 0.08)"
          strokeWidth="1.5"
        />
        <path
          d="M 1500 760 H 1180 L 1110 690 H 740 L 660 770 H 290 L 220 700 H -60"
          stroke="rgba(13, 15, 23, 0.09)"
          strokeWidth="1.5"
        />
        <path
          d="M 120 -40 V 260 L 190 330 V 640 L 120 710 V 960"
          stroke="rgba(13, 15, 23, 0.07)"
          strokeWidth="1.5"
        />
        <path
          d="M 1310 -40 V 210 L 1240 280 V 620 L 1310 690 V 960"
          stroke="rgba(13, 15, 23, 0.07)"
          strokeWidth="1.5"
        />

        {/* Feixes luminosos animados percorrendo as trilhas */}
        <path
          d="M -60 150 H 240 L 310 220 H 620 L 680 160 H 1120 L 1200 240 H 1500"
          stroke="#FACC15"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="bg-beam-line"
        />
        <path
          d="M -40 480 H 180 L 260 560 H 540 L 610 490 H 980 L 1060 570 H 1500"
          stroke="#0D0F17"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
          className="bg-beam-line-slow"
        />
        <path
          d="M 1500 760 H 1180 L 1110 690 H 740 L 660 770 H 290 L 220 700 H -60"
          stroke="#EAB308"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="bg-beam-line"
        />

        {/* Nós de conexão pulsantes */}
        <circle cx="240" cy="150" r="4" fill="#FACC15" className="bg-circuit-pulse" />
        <circle cx="680" cy="160" r="4" fill="#0D0F17" fillOpacity="0.45" className="bg-circuit-pulse" />
        <circle cx="1200" cy="240" r="4" fill="#FACC15" className="bg-circuit-pulse" />
        <circle cx="260" cy="560" r="4" fill="#FACC15" className="bg-circuit-pulse" />
        <circle cx="1060" cy="570" r="4" fill="#0D0F17" fillOpacity="0.4" className="bg-circuit-pulse" />
        <circle cx="1110" cy="690" r="4" fill="#FACC15" className="bg-circuit-pulse" />
      </svg>

      {/* Emblemas Oficiais IDev flutuando no background */}
      <img
        src="/assets/brand/symbol-dark.png"
        alt=""
        className="hidden md:block absolute top-24 left-[2.5%] w-20 h-20 rounded-3xl opacity-[0.16] shadow-lg bg-float-slow"
      />
      <img
        src="/assets/brand/symbol-light.png"
        alt=""
        className="hidden md:block absolute bottom-20 right-[2.5%] w-24 h-24 rounded-3xl opacity-[0.18] shadow-lg bg-float-reverse"
      />

      {/* Símbolos tipográficos de código da marca IDev */}
      <div className="hidden lg:block absolute top-[18%] right-[6%] font-mono-code text-4xl font-extrabold text-[#0D0F17]/[0.07] bg-float-reverse">
        &lt;IDev /&gt;
      </div>
      <div className="hidden lg:block absolute bottom-[22%] left-[5%] font-mono-code text-5xl font-extrabold text-[#0D0F17]/[0.06] bg-float-slow">
        &gt;_
      </div>

      {/* Elementos flutuantes temáticos do IDev distribuídos nas laterais do fundo */}
      <div className="hidden xl:flex items-center gap-2 absolute top-44 left-[2%] px-3.5 py-2 rounded-2xl bg-[#0D0F17]/85 text-white border border-white/10 shadow-lg opacity-75 bg-float-slow">
        <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-mono-code text-[11px] font-bold">PR #48 MERGED</span>
      </div>

      <div className="hidden xl:flex items-center gap-2 absolute top-32 right-[2%] px-3.5 py-2 rounded-2xl bg-white/90 text-[#0D0F17] border border-slate-200/90 shadow-md opacity-80 bg-float-reverse">
        <Lock className="w-3.5 h-3.5 text-[#EAB308]" />
        <span className="font-mono-code text-[11px] font-bold">ESCROW R$ 160</span>
      </div>

      <div className="hidden xl:flex items-center gap-2 absolute top-[54%] left-[1.5%] px-3.5 py-2 rounded-2xl bg-white/90 text-slate-700 border border-slate-200/90 shadow-md opacity-75 bg-orbit">
        <Terminal className="w-3.5 h-3.5 text-[#0D0F17]" />
        <span className="font-mono-code text-[11px] font-semibold">
          git push origin fix/idev
        </span>
      </div>

      <div className="hidden xl:flex items-center gap-2 absolute top-[50%] right-[1.8%] px-3.5 py-2 rounded-2xl bg-[#FACC15]/90 text-[#0D0F17] border border-amber-300 shadow-md opacity-80 bg-float-slow">
        <Zap className="w-3.5 h-3.5 fill-[#0D0F17]" />
        <span className="font-mono-code text-[11px] font-extrabold">Match • 1-Click</span>
      </div>

      <div className="hidden xl:flex items-center gap-2 absolute bottom-32 left-[3%] px-3.5 py-2 rounded-2xl bg-[#0D0F17]/85 text-emerald-400 border border-white/10 shadow-lg opacity-75 bg-float-reverse">
        <Clock className="w-3.5 h-3.5 text-[#FACC15]" />
        <span className="font-mono-code text-[11px] font-bold">48h Auto-Release</span>
      </div>
    </div>
  );
}

function HeroSimulator() {
  const [activeTab, setActiveTab] = useState<SimulatorTab>('radar');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(LIVE_SIMULATOR_TASKS[1].id);
  const [offerPrice, setOfferPrice] = useState<number>(LIVE_SIMULATOR_TASKS[1].basePrice);
  const [matched, setMatched] = useState<boolean>(false);
  const [ghStep, setGhStep] = useState<0 | 1 | 2 | 3>(0);
  const [timerState, setTimerState] = useState<TimerState>('counting');

  const task =
    LIVE_SIMULATOR_TASKS.find((item) => item.id === selectedTaskId) ?? LIVE_SIMULATOR_TASKS[1];

  const handleSelectTask = (id: string) => {
    const found = LIVE_SIMULATOR_TASKS.find((item) => item.id === id);
    if (!found) return;
    setSelectedTaskId(found.id);
    setOfferPrice(found.basePrice);
    setMatched(false);
    setGhStep(0);
    setTimerState('counting');
  };

  const handleResetRadar = () => {
    setOfferPrice(task.basePrice);
    setMatched(false);
  };

  return (
    <div
      id="simulador"
      className="animate-float-slow relative bg-[#0D0F17] text-white rounded-3xl p-5 sm:p-6 shadow-dark-float border border-slate-800 space-y-4 scroll-mt-28"
    >
      {/* Header estilo janela de terminal */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-3 w-3 rounded-full bg-rose-500/80 shrink-0" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90 shrink-0" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90 shrink-0" />
          <span className="ml-1.5 font-mono-code text-[11px] text-slate-400 truncate">
            idev://simulador-ao-vivo
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 shrink-0">
          <Radio className="w-3 h-3 animate-pulse" />
          ONLINE
        </span>
      </div>

      {/* Seletor das 3 abas do Simulador */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
        {(
          [
            { id: 'radar', label: '1. Radar Ao Vivo' },
            { id: 'github', label: '2. GitHub API' },
            { id: 'timer', label: '3. Timer 48h' },
          ] as const
        ).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-2 rounded-xl text-[11px] font-bold transition-all ${
                isActive
                  ? 'bg-[#FACC15] text-[#0D0F17] shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ABA 1: RADAR AO VIVO */}
      {activeTab === 'radar' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400 font-semibold">
              Escolha um chamado real:
            </span>
            <div className="flex items-center gap-1.5">
              {LIVE_SIMULATOR_TASKS.map((item) => {
                const selected = item.id === task.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTask(item.id)}
                    className={`px-2.5 py-1 rounded-lg font-mono-code text-[11px] font-bold transition-colors ${
                      selected
                        ? 'bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/50'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    Porte {item.tier}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/30 text-[10px] font-bold">
                {task.badge} • {task.slaLabel}
              </span>
              <span className="font-mono-code text-[11px] text-slate-400">{task.repo}</span>
            </div>

            <h3 className="text-sm font-bold text-white leading-snug">{task.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono-code text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Oferta em Custódia (Escrow)
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#FACC15] font-mono-code">
                    R$ {offerPrice}
                  </span>
                  <span className="text-[11px] font-mono-code text-emerald-400">
                    ({formatBRL(offerPrice * DEV_NET_RATE)} líq. dev)
                  </span>
                </div>
              </div>

              {!matched ? (
                <div className="flex flex-wrap items-center gap-1.5">
                  {COUNTER_OFFER_INCREMENTS.map((inc) => (
                    <button
                      key={inc}
                      type="button"
                      onClick={() => setOfferPrice((p) => p + inc)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-white border border-slate-700 transition-colors"
                    >
                      +R${inc}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setMatched(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0D0F17] text-xs font-extrabold transition-colors"
                  >
                    Aceitar Agora
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setGhStep(1);
                      setActiveTab('github');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Match! Ir ao GitHub →
                  </button>
                  <button
                    type="button"
                    onClick={handleResetRadar}
                    title="Resetar simulação"
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-black/50 rounded-2xl p-3.5 border border-slate-800/80 font-mono-code text-[11px] space-y-1.5">
            <div className="flex items-center gap-2 text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-[#FACC15] shrink-0" />
              <span className="truncate">$ git checkout -b {task.branch}</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400 gap-2">
              <span className="inline-flex items-center gap-1.5 truncate">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                {matched
                  ? `Match atômico concluído • Escrow R$ ${offerPrice} travado`
                  : 'Escrow preliminar ativo • Sem chat pré-match'}
              </span>
              <span className="text-[10px] text-slate-500 shrink-0">{task.slaLabel}</span>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: GITHUB API & WEBHOOK */}
      {activeTab === 'github' && (
        <div className="space-y-3.5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Github className="w-4 h-4 text-[#FACC15]" />
                Automação Invisível via GitHub API
              </span>
              <button
                type="button"
                onClick={() => setGhStep(0)}
                className="text-[11px] text-slate-400 hover:text-white inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reiniciar
              </button>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setGhStep(1)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                  ghStep >= 1
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-[#FACC15]/60'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold">1. Aceitar Convite Invisível (1 Clique)</div>
                  <div className="font-mono-code text-[10px] text-slate-400 truncate mt-0.5">
                    PATCH /user/repository_invitations/{'{id}'}
                  </div>
                </div>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-800 shrink-0">
                  {ghStep >= 1 ? 'ACEITO' : 'SIMULAR'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setGhStep(2)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                  ghStep >= 2
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-[#FACC15]/60'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold">2. Abrir Pull Request #{task.prNumber}</div>
                  <div className="font-mono-code text-[10px] text-slate-400 truncate mt-0.5">
                    git push origin {task.branch} → IN_REVIEW (Timer 48h ON)
                  </div>
                </div>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-800 shrink-0">
                  {ghStep >= 2 ? 'PR ABERTO' : 'SIMULAR'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setGhStep(3)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                  ghStep >= 3
                    ? 'bg-[#FACC15]/15 border-[#FACC15]/50 text-[#FACC15]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-[#FACC15]/60'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold">3. Cliente dá Merge no GitHub</div>
                  <div className="font-mono-code text-[10px] text-slate-400 truncate mt-0.5">
                    Webhook: pull_request.closed (merged: true)
                  </div>
                </div>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-800 shrink-0">
                  {ghStep >= 3 ? 'PAGO!' : 'SIMULAR'}
                </span>
              </button>
            </div>
          </div>

          <div className="bg-black/50 rounded-2xl p-3.5 border border-slate-800/80 font-mono-code text-[11px] space-y-1">
            {ghStep === 0 && (
              <div className="text-slate-400">
                Clique nos passos acima para simular a integração real GitHub API + HMAC Webhook.
              </div>
            )}
            {ghStep === 1 && (
              <>
                <div className="text-sky-400">$ git clone https://github.com/{task.repo}.git</div>
                <div className="text-emerald-400">
                  ✓ Permissão push concedida automaticamente sem painel manual
                </div>
              </>
            )}
            {ghStep === 2 && (
              <>
                <div className="text-[#FACC15] flex items-center gap-1.5">
                  <GitPullRequest className="w-3.5 h-3.5" />
                  PR #{task.prNumber} entregue • Status: IN_REVIEW
                </div>
                <div className="text-slate-300">
                  ✓ BullMQ disparou Timer de Proteção de 48h para o cliente testar
                </div>
              </>
            )}
            {ghStep === 3 && (
              <>
                <div className="text-emerald-400 flex items-center gap-1.5">
                  <GitMerge className="w-3.5 h-3.5" />
                  X-Hub-Signature-256 validado • COMPLETED
                </div>
                <div className="text-[#FACC15]">
                  ✓ {formatBRL(offerPrice * DEV_NET_RATE)} liberado na carteira do dev (Pix)
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ABA 3: TIMER 48H & PROTEÇÃO BILATERAL */}
      {activeTab === 'timer' && (
        <div className="space-y-3.5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Janela de Homologação (BullMQ)
                </div>
                <div className="text-2xl font-extrabold font-mono-code text-white mt-0.5">
                  {timerState === 'counting' && '47h : 59m : 42s'}
                  {timerState === 'paused' && '42h : 18m : 05s (PAUSADO)'}
                  {timerState === 'auto_released' && '00h : 00m : 00s'}
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                  timerState === 'counting'
                    ? 'bg-[#FACC15]/15 text-[#FACC15] border-[#FACC15]/40'
                    : timerState === 'paused'
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {timerState === 'counting' && 'IN_REVIEW'}
                {timerState === 'paused' && 'REVISION_REQUESTED'}
                {timerState === 'auto_released' && 'AUTO_RELEASE'}
              </span>
            </div>

            <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  timerState === 'counting'
                    ? 'w-11/12 bg-[#FACC15]'
                    : timerState === 'paused'
                      ? 'w-3/4 bg-rose-500'
                      : 'w-full bg-emerald-400'
                }`}
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {timerState === 'counting' &&
                'O cliente tem 48h para testar o PR. Se não aprovar nem pedir correção, o pagamento é liberado automaticamente ao dev.'}
              {timerState === 'paused' &&
                'Cliente encontrou falha e clicou em "Solicitar Correção". O timer congela e o Escrow permanece 100% retido até o novo commit.'}
              {timerState === 'auto_released' &&
                `Cliente inativo após 48h ("cliente fantasma"). O worker BullMQ executou Auto-Release e transferiu ${formatBRL(
                  offerPrice * DEV_NET_RATE
                )} para o dev!`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {timerState !== 'paused' ? (
                <button
                  type="button"
                  onClick={() => setTimerState('paused')}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 border border-rose-500/30 text-xs font-bold transition-colors"
                >
                  <PauseCircle className="w-3.5 h-3.5" />
                  Solicitar Correção (Pausa)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setTimerState('counting')}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-200 border border-sky-500/30 text-xs font-bold transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  Reenviar PR (Reinicia 48h)
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  setTimerState((prev) =>
                    prev === 'auto_released' ? 'counting' : 'auto_released'
                  )
                }
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0D0F17] text-xs font-extrabold transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                {timerState === 'auto_released'
                  ? 'Resetar Cronômetro'
                  : 'Simular 48h (Auto-Release)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NetEarningsCalculator() {
  const [selectedTier, setSelectedTier] = useState<'P' | 'M' | 'G'>('M');
  const [offerAmount, setOfferAmount] = useState<number>(160);

  const handleTierSelect = (tier: 'P' | 'M' | 'G', defaultPrice: number) => {
    setSelectedTier(tier);
    setOfferAmount(defaultPrice);
  };

  const platformFee = offerAmount * PLATFORM_FEE_RATE;
  const devPayout = offerAmount * DEV_NET_RATE;
  const activeTierInfo =
    COMPLEXITY_TIERS.find((item) => item.tier === selectedTier) ?? COMPLEXITY_TIERS[1];

  return (
    <section
      id="precos"
      className="bg-white/95 backdrop-blur-md rounded-4xl p-7 sm:p-10 lg:p-12 border border-slate-200/80 shadow-soft space-y-8 scroll-mt-28"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
            Transparência de Mercado & Simulador Financeiro
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0F17] mt-1">
            Tabela Referencial de Porte, SLA e Ganho Líquido
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md">
          O contratante define a oferta inicial com base nos portes P, M e G; o desenvolvedor aceita
          ou negocia em 1 clique e recebe 85% líquidos via Pix.
        </p>
      </div>

      {/* Cards P / M / G */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COMPLEXITY_TIERS.map((info) => {
          const isSelected = info.tier === selectedTier;
          return (
            <button
              key={info.tier}
              type="button"
              onClick={() => handleTierSelect(info.tier, info.defaultPrice)}
              className={`text-left p-6 rounded-3xl transition-all duration-300 space-y-4 hover:-translate-y-1 ${
                isSelected
                  ? 'bg-[#0D0F17] text-white border-2 border-[#FACC15] shadow-xl'
                  : 'bg-[#F8FAFC] text-[#0D0F17] border border-slate-200/90 hover:border-[#FACC15]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isSelected ? 'bg-[#FACC15] text-[#0D0F17]' : 'bg-[#0D0F17] text-white'
                  }`}
                >
                  Porte {info.tier} • {info.label}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-amber-300' : 'text-slate-500'
                  }`}
                >
                  SLA até {info.slaHours}h
                </span>
              </div>

              <div className="text-2xl font-extrabold font-mono-code">
                R$ {info.recommendedMin} – R$ {info.recommendedMax}
              </div>

              <p
                className={`text-xs leading-relaxed ${
                  isSelected ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {info.description}
              </p>

              <ul className="space-y-1.5 pt-2 border-t border-current/10">
                {info.examples.map((ex) => (
                  <li
                    key={ex}
                    className={`text-[11px] flex items-center gap-2 ${
                      isSelected ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isSelected ? 'text-[#FACC15]' : 'text-emerald-500'
                      }`}
                    />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {/* Calculadora Interativa de Escrow & Repasse */}
      <div className="bg-[#0D0F17] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#FACC15] uppercase tracking-wider">
              <Wallet className="w-4 h-4" />
              Simulador de Escrow & Repasse (Porte {activeTierInfo.tier})
            </span>
            <span className="font-mono-code text-xs text-slate-400">Taxa única IDev: 15%</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Valor acordado da microtarefa</span>
              <span className="font-mono-code text-lg font-extrabold text-[#FACC15]">
                {formatBRL(offerAmount)}
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={600}
              step={10}
              value={offerAmount}
              onChange={(e) => setOfferAmount(Number(e.target.value))}
              aria-label="Valor acordado da microtarefa"
              className="w-full accent-[#FACC15] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono-code text-slate-400">
              <span>R$ 40</span>
              <span>R$ 150</span>
              <span>R$ 300</span>
              <span>R$ 600</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
            <div className="text-[11px] text-slate-400 font-medium">Líquido para o Dev (Pix)</div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono-code mt-1">
              {formatBRL(devPayout)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">85% no Merge ou 48h</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
            <div className="text-[11px] text-slate-400 font-medium">Taxa de Custódia & Git</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono-code mt-1">
              {formatBRL(platformFee)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">15% Escrow + BullMQ</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [audience, setAudience] = useState<FlowAudience>('client');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const activeSteps = audience === 'client' ? CLIENT_FLOW_STEPS : DEV_FLOW_STEPS;

  return (
    <div className="relative min-h-screen text-[#0D0F17] flex flex-col">
      {/* CAMADA DE BACKGROUND TECNOLÓGICO ANIMADO COM ELEMENTOS DO IDEV */}
      <IdvTechBackground />

      {/* FLOATING PILL NAVBAR */}
      <header className="sticky top-0 z-50 px-4 pt-4 pb-2">
        <div className="max-w-6xl mx-auto rounded-full bg-[#0D0F17]/95 backdrop-blur-md text-white px-5 sm:px-7 py-3 flex items-center justify-between shadow-dark-float border border-white/10">
          <a href="#topo" className="flex items-center gap-3 shrink-0">
            <img
              src="/assets/brand/logo-full-dark.png"
              alt="IDev"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-300">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#FACC15] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Radar Ativo
            </span>

            <a
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0D0F17] text-xs font-extrabold transition-all shadow-amber-pill"
            >
              <span>Acessar App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Abrir menu de navegação"
              className="lg:hidden p-2 rounded-full bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden max-w-6xl mx-auto mt-2 rounded-3xl bg-[#0D0F17] text-white p-4 border border-white/10 shadow-dark-float">
            <nav className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main
        id="topo"
        className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 pt-6 pb-16 space-y-14"
      >
        {/* HERO SPLIT-SCREEN ASSIMÉTRICO */}
        <section className="relative bg-white/92 backdrop-blur-md rounded-4xl sm:rounded-5xl p-6 sm:p-10 lg:p-14 shadow-soft border border-slate-200/80 overflow-hidden">
          <div className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-slate-900/5 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Coluna Esquerda */}
            <div className="lg:col-span-6 space-y-7">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D0F17] text-white text-xs font-bold shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span>RADAR AO VIVO</span>
                <span className="text-slate-400">•</span>
                <span className="text-[#FACC15]">Microtarefas Sob Demanda</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-[#0D0F17] tracking-tight leading-[1.08]">
                  Bugs travando seu deploy?{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500">
                      Resolva em minutos.
                    </span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-200/45 -rotate-1 rounded-full -z-0" />
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  O marketplace on-demand de microtarefas técnicas. Poste o escopo fechado, negocie o
                  valor em <strong>1 clique</strong> sem leilão chato e receba o código
                  via{' '}
                  <span className="font-mono-code text-xs bg-slate-100 px-2 py-0.5 rounded-md text-[#0D0F17] font-semibold">
                    Pull Request
                  </span>{' '}
                  com pagamento protegido em custódia.
                </p>
              </div>

              {/* Botões de Conversão */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={PLATFORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0D0F17] font-extrabold text-sm shadow-amber-pill transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4 fill-[#0D0F17]" />
                  <span>Publicar Tarefa Agora</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={PLATFORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#0D0F17] hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Code2 className="w-4 h-4 text-[#FACC15]" />
                  <span>Entrar no Radar Dev</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Nota de teste rápido */}
              <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0D0F17]">
                  <span className="h-8 w-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </span>
                  <span>Modo demonstração e autenticação GitHub OAuth disponíveis no app</span>
                </div>
                <a
                  href="#simulador"
                  className="text-xs font-extrabold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                >
                  Testar fluxo ao lado →
                </a>
              </div>

              {/* Mini Garantias */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Escrow 100% Protegido
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  Auto-Release em 48h
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#0D0F17]" />
                  Zero Leilão & Zero Chat Pré-Match
                </span>
              </div>
            </div>

            {/* Coluna Direita: Simulador Interativo Multi-Etapas */}
            <div className="lg:col-span-6">
              <HeroSimulator />
            </div>
          </div>
        </section>

        {/* FAIXA DE STACKS SUPORTADAS */}
        <section
          aria-label="Stacks suportadas"
          className="flex flex-wrap items-center justify-center gap-2.5 px-2"
        >
          {TECH_STACKS.map((tech) => (
            <div
              key={tech.name}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-sm text-xs font-bold text-[#0D0F17] hover:border-[#FACC15] hover:-translate-y-0.5 transition-all"
            >
              <span className={`h-2 w-2 rounded-full ${tech.dot}`} />
              <span>{tech.name}</span>
            </div>
          ))}
        </section>

        {/* BARRA DE MÉTRICAS DARK */}
        <section className="bg-[#0D0F17] text-white rounded-4xl p-8 sm:p-10 shadow-xl border border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {KEY_METRICS.map((metric) => (
            <div key={metric.label}>
              <div
                className={`text-3xl sm:text-4xl font-extrabold font-mono-code ${metric.highlight}`}
              >
                {metric.value}
              </div>
              <div className="text-xs text-slate-400 mt-1.5 font-medium">{metric.label}</div>
            </div>
          ))}
        </section>

        {/* COMO FUNCIONA (TOGGLE DUAL: CONTRATANTE VS DESENVOLVEDOR) */}
        <section id="como-funciona" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
                Fluxo Ponta a Ponta
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0F17] mt-1">
                Do chamado ao Merge em 4 passos sem atrito
              </h2>
            </div>

            <div className="inline-flex items-center p-1.5 rounded-full bg-white/95 border border-slate-200 shadow-sm self-start">
              <button
                type="button"
                onClick={() => setAudience('client')}
                className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                  audience === 'client'
                    ? 'bg-[#0D0F17] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0D0F17]'
                }`}
              >
                Visão do Contratante
              </button>
              <button
                type="button"
                onClick={() => setAudience('developer')}
                className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                  audience === 'developer'
                    ? 'bg-[#FACC15] text-[#0D0F17] shadow-sm'
                    : 'text-slate-600 hover:text-[#0D0F17]'
                }`}
              >
                Visão do Desenvolvedor
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {activeSteps.map((item) => (
              <div
                key={`${audience}-${item.step}`}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="h-10 w-10 rounded-2xl bg-[#0D0F17] text-[#FACC15] font-mono-code text-xs font-extrabold flex items-center justify-center">
                      {item.step}
                    </span>
                    <GitBranch className="w-4 h-4 text-slate-300" />
                  </div>
                  <h3 className="text-base font-bold text-[#0D0F17] leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-600 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CARDS LADO A LADO: CONTRATAR VS SER CONTRATADO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contratante */}
          <div className="group bg-white/95 backdrop-blur-sm hover:border-[#FACC15] border-2 border-slate-200/80 rounded-4xl p-8 sm:p-10 transition-all duration-300 shadow-sm hover:shadow-card-hover flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#0D0F17] text-white">
                  Para Quem Precisa de Ajuda
                </span>
                <span className="h-10 w-10 rounded-full bg-[#F8FAFC] group-hover:bg-[#FACC15] text-slate-500 group-hover:text-[#0D0F17] flex items-center justify-center font-bold transition-colors">
                  →
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0F17]">
                Quero Contratar
              </h2>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Tem um bug travando sua aplicação ou precisa de uma entrega pontual? Poste a tarefa,
                defina a oferta inicial e aprove direto via Pull Request no seu repositório.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs font-semibold text-slate-600">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Pagamento só é liberado após o Merge ou 48h sem apontamentos
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Botão “Solicitar Correção” pausa o timer se o código falhar
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Convite automático de repositório privado via GitHub API
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <a
                href={PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-[#0D0F17] hover:bg-slate-800 text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <span>Criar Pedido de Tarefa</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Desenvolvedor */}
          <div className="group bg-[#0D0F17] text-white border-2 border-slate-800 hover:border-[#FACC15] rounded-4xl p-8 sm:p-10 transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#FACC15]/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#FACC15] text-[#0D0F17]">
                  Para Desenvolvedores
                </span>
                <span className="h-10 w-10 rounded-full bg-slate-800 group-hover:bg-[#FACC15] text-slate-300 group-hover:text-[#0D0F17] flex items-center justify-center font-bold transition-colors">
                  →
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Quero Ser Contratado
              </h2>

              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                Monetize suas horas livres resolvendo microtarefas na sua stack favorita, sem
                escrever propostas longas e com o valor já travado em Escrow.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs font-semibold text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
                  Contraproposta (+R$20 / +R$40 / +R$60) em 1 clique
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
                  85% líquido na carteira pronto para saque via Pix
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
                  Blindagem de 48h contra cliente ausente (Auto-Release)
                </li>
              </ul>
            </div>

            <div className="relative mt-8">
              <a
                href={PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0D0F17] font-extrabold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-amber-pill"
              >
                <span>Abrir Radar de Tarefas</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* COMPARATIVO DIRETO: IDEV VS PLATAFORMAS TRADICIONAIS */}
        <section
          id="comparativo"
          className="bg-white/95 backdrop-blur-md rounded-4xl p-7 sm:p-10 lg:p-12 border border-slate-200/80 shadow-soft space-y-6 scroll-mt-28"
        >
          <div>
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
              Fim do Leilão Predatório
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0F17] mt-1">
              Por que o IDev substitui o freelancer tradicional?
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 pr-4 font-bold">Critério</th>
                  <th className="py-3.5 px-4 font-bold">Plataformas Tradicionais</th>
                  <th className="py-3.5 pl-4 font-extrabold text-[#0D0F17] bg-[#FACC15]/15 rounded-t-2xl">
                    IDev (On-Demand)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.criterion}>
                    <td className="py-4 pr-4 font-bold text-[#0D0F17]">{row.criterion}</td>
                    <td className="py-4 px-4 text-slate-500">{row.traditional}</td>
                    <td className="py-4 pl-4 pr-3 font-semibold text-[#0D0F17] bg-[#FACC15]/10">
                      <span className="inline-flex items-start gap-2">
                        <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.idev}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CALCULADORA & TABELA REFERENCIAL P, M, G */}
        <NetEarningsCalculator />

        {/* ARQUITETURA & SEGURANÇA BANCÁRIA */}
        <section
          id="seguranca"
          className="bg-[#0D0F17] text-white rounded-4xl sm:rounded-5xl p-7 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-8 scroll-mt-28"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#FACC15] uppercase tracking-widest">
                Engenharia & Confiança
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Arquitetura pensada para zero falhas de pagamento ou código
              </h2>
            </div>
            <span className="font-mono-code text-xs text-slate-400">
              Fastify • Socket.io • BullMQ • Drizzle/PostgreSQL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SECURITY_PILLARS.map((pillar, index) => {
              const icons = [KeyRound, Lock, Cpu, Database];
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={pillar.code}
                  className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 hover:border-[#FACC15]/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-mono-code text-xs font-bold text-[#FACC15] bg-[#FACC15]/10 px-3 py-1 rounded-full border border-[#FACC15]/25">
                      <Icon className="w-3.5 h-3.5" />
                      {pillar.code}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.summary}
                  </p>
                  <div className="pt-2 border-t border-slate-800 font-mono-code text-[11px] text-emerald-400">
                    ✓ {pillar.techSpec}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* VALIDAÇÃO DE MERCADO REAL */}
        <section id="validacao" className="space-y-6 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
                Pesquisa de Campo Real
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0F17] mt-1">
                100% de validação entre desenvolvedores entrevistados
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D0F17] text-white text-xs font-bold self-start">
              <MessageSquareQuote className="w-4 h-4 text-[#FACC15]" />
              <span>8 especialistas consultados • Tese validada</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FIELD_VALIDATION_QUOTES.map((item) => (
              <div
                key={item.name}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      {item.status}
                    </span>
                    <span className="text-[11px] font-mono-code text-slate-400">
                      {item.channel}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-[#0D0F17] leading-relaxed">
                    “{item.quote}”
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1">
                  <div className="text-xs font-extrabold text-[#0D0F17]">{item.name}</div>
                  <div className="text-[11px] text-slate-500">{item.role}</div>
                  <div className="text-[11px] font-semibold text-amber-700">{item.highlight}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ INTERATIVO */}
        <section
          id="faq"
          className="bg-white/95 backdrop-blur-md rounded-4xl p-7 sm:p-10 lg:p-12 border border-slate-200/80 shadow-soft space-y-6 scroll-mt-28"
        >
          <div>
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
              Dúvidas Frequentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0F17] mt-1">
              Tudo sobre o funcionamento do IDev
            </h2>
          </div>

          <div className="divide-y divide-slate-200/80">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={faq.question} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0D0F17]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0D0F17]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BANNER CTA FINAL */}
        <section className="relative bg-[#0D0F17] text-white rounded-4xl sm:rounded-5xl p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-xl overflow-hidden text-center space-y-6">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-[#FACC15]/15 blur-3xl" />

          <div className="relative flex justify-center">
            <img
              src="/assets/brand/symbol-dark.png"
              alt="Símbolo IDev"
              className="h-14 w-14 rounded-2xl object-contain"
            />
          </div>

          <div className="relative max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pronto para resolver ou monetizar sua próxima microtarefa em minutos?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Entre na plataforma em produção agora mesmo e experimente a negociação em 1 clique +
              GitHub API + Escrow 48h.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0D0F17] font-extrabold text-sm shadow-amber-pill transition-all"
            >
              <Zap className="w-4 h-4 fill-[#0D0F17]" />
              <span>Abrir Plataforma IDev</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={PLATFORM_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-bold text-sm transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Ver Projeto no GitHub</span>
            </a>
          </div>
        </section>
      </main>

      {/* RODAPÉ */}
      <footer className="relative z-10 bg-[#0D0F17] text-slate-400 border-t border-slate-800 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src="/assets/brand/logo-full-dark.png"
              alt="IDev"
              className="h-7 w-auto object-contain"
            />
            <span className="text-xs text-slate-400">
              Marketplace On-Demand de Microtarefas Técnicas • Idealizado por Arthur Miguel Souza de
              Oliveira
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold">
            <a
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FACC15] hover:underline"
            >
              Plataforma Web
            </a>
            <a
              href={LANDING_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Repo Landing Page
            </a>
            <a
              href={PLATFORM_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Repo Plataforma
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
