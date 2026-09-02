// Pilha de navegação entre notas de Histórias, independente do histórico nativo
// do navegador — comportamento similar ao Obsidian (Voltar/Avançar entre notas
// realmente visitadas, persistido por aba via sessionStorage). Quando a pilha se
// esgota, o chamador (useStoryNavigation) cai de volta para a página do grafo.

const STORAGE_KEY = 'historias-nav-stack'

interface NavState {
  stack: string[]
  index: number
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function readState(): NavState {
  if (!isBrowser()) return { stack: [], index: -1 }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { stack: [], index: -1 }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed.stack) && typeof parsed.index === 'number') {
      return parsed
    }
  } catch (e) {
    // ignore malformed storage
  }

  return { stack: [], index: -1 }
}

function writeState(state: NavState) {
  if (!isBrowser()) return
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function canGoBack(): boolean {
  return readState().index > 0
}

export function canGoForward(): boolean {
  const { stack, index } = readState()
  return index >= 0 && index < stack.length - 1
}

// Registra uma visita, truncando qualquer histórico "futuro" (igual ao
// comportamento padrão de navegação: visitar um novo destino descarta o "avançar").
// Não faz nada se o id já for o atual (evita duplicar entradas em re-renders/refresh).
export function visit(id: string): void {
  const state = readState()
  if (state.index >= 0 && state.stack[state.index] === id) return

  const truncated = state.stack.slice(0, state.index + 1)
  truncated.push(id)
  writeState({ stack: truncated, index: truncated.length - 1 })
}

export function goBack(): string | null {
  const state = readState()
  if (state.index <= 0) return null

  const newIndex = state.index - 1
  writeState({ ...state, index: newIndex })
  return state.stack[newIndex]
}

export function goForward(): string | null {
  const state = readState()
  if (state.index < 0 || state.index >= state.stack.length - 1) return null

  const newIndex = state.index + 1
  writeState({ ...state, index: newIndex })
  return state.stack[newIndex]
}
