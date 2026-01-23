# 🚀 Motor Force-Graph Dinâmico - Systempunk Forum

## ✨ Recursos Implementados

### 🎨 Efeitos Visuais Avançados

#### 1. **Animação de Partículas**
- Partículas fluindo ao longo das conexões ativas
- 3 partículas animadas por link
- Gradiente radial com efeito glow
- Performance otimizada (apenas em zoom > 0.6)

#### 2. **Efeito Glow nos Nós**
- Glow pulsante para nós selecionados
- Gradiente radial multi-camadas
- Inner highlight para nós ativos
- Intensidade baseada na importância do nó

#### 3. **Dimming Inteligente**
- Nós e links não relacionados ficam opacos ao hover/seleção
- Mantém foco visual no que é importante
- Transições suaves de opacidade

#### 4. **Pulsação Animada**
- Nós selecionados pulsam suavemente
- Usando `Math.sin(Date.now() / 300)` para animação contínua
- Escala de 0.85x a 1.15x

### 🎯 Interatividade Aprimorada

#### 1. **Zoom Automático**
- Clique em um nó → zoom automático suave
- `centerAt()` + `zoom()` com timing coordenado
- Animações de 500-1000ms para transições naturais

#### 2. **Highlight de Vizinhos**
- Hover em um nó destaca todos vizinhos conectados
- Sistema de Sets para performance (`highlightNodes`, `highlightLinks`)
- Atualização em tempo real via `graphData.links`

#### 3. **Cursor Dinâmico**
- `pointer` ao hover em nós
- `grab` no canvas
- Feedback visual imediato

#### 4. **Setas Direcionais**
- Setas no meio dos links (apenas em zoom > 1)
- Indicam direção do fluxo de conexão
- Rotação calculada via `Math.atan2()`

### 🎛️ Controles de Física

#### 1. **Presets de Layout**
- 🌌 **Obsidian**: Estilo Obsidian.md (padrão)
- 🔗 **Compact**: Nós mais próximos, grafo denso
- 🌐 **Disperso**: Nós bem espaçados, grafo largo

#### 2. **Layout DAG (Direcional)**
- ↓ **Top-Down**: Hierarquia vertical
- → **Left-Right**: Hierarquia horizontal
- ⊚ **Off**: Força normal (não-hierárquico)

#### 3. **Toggles de Efeitos**
- ✅ **Partículas Animadas**: Liga/desliga animações de partículas
- ✅ **Efeito Glow**: Liga/desliga halos luminosos
- Útil para performance em grafos grandes (1000+ nós)

### 🕹️ Controles de Interface

#### Zoom Controls (canto superior direito)
- **+** : Zoom in (1.5x)
- **−** : Zoom out (0.67x)
- **⊡** : Ajustar à tela (`zoomToFit`)

#### Quick Actions (canto inferior esquerdo)
- **🔄 Reorganizar**: Reinicia simulação física
- **⏸️ Pausar / ▶️ Play**: Pausa/retoma física

### 📊 Modos de Visualização

1. **Global**: Todas as histórias (ideal para < 300 nós)
2. **Local**: Subgrafo centrado (N-hops do nó selecionado)
3. **Minimal**: Apenas histórias de alta importância

### 🎨 Sistema de Renderização

#### LOD (Level of Detail)
- **globalScale > 0.8**: Detalhes completos (bordas, glows)
- **globalScale > 0.5**: Labels visíveis
- **globalScale < 0.5**: Renderização simplificada (60% opacidade)

#### Canvas Painting Custom
- `paintNodeCanvas`: Renderização personalizada de nós
- `paintLinkCanvas`: Renderização personalizada de links
- `requestAnimationFrame` para animações suaves

### ⚡ Otimizações de Performance

1. **Conditional Animation**
   - Só anima quando `selectedStory` ou `hoveredStory` existem
   - `cancelAnimationFrame` quando não necessário

2. **Adaptive Cooldown**
   - 200+ nós: 1500ms cooldown
   - 100-200 nós: 2000ms cooldown
   - < 100 nós: 3000ms cooldown

3. **Warmup Ticks Adaptive**
   - 200+ nós: 50 ticks
   - < 200 nós: 100 ticks

4. **Effect Toggles**
   - Desabilitar partículas/glow em grafos grandes
   - Mantém 60fps mesmo com 500+ nós

### 🎨 Palette de Cores

- **Selecionado**: `#00ffff` (cyan brilhante)
- **Highlighted**: Cor do nó com intensidade aumentada
- **Dimmed**: 30% opacidade
- **Normal**: 80% opacidade

### 🔧 Física Personalizável

Todos os parâmetros ajustáveis no painel:
- Repulsão (charge strength)
- Distância dos links
- Força dos links
- Espaçamento entre nós
- Força central
- Gravidade X/Y
- Fricção (velocity decay)
- Resfriamento (alpha decay)

### 📱 Responsividade

- Grid adaptativo (1 ou 3 colunas)
- Fullscreen mode (tecla F)
- Painel lateral colapsável
- Touch-friendly (pinch to zoom)

## 🎯 Comparação com Obsidian

| Recurso | Obsidian | Systempunk |
|---------|----------|------------|
| Force-directed layout | ✅ | ✅ |
| Local graph | ✅ | ✅ (N-hops configurável) |
| Physics controls | ✅ | ✅ (mais opções) |
| Animated particles | ❌ | ✅ |
| Glow effects | ❌ | ✅ |
| DAG layout | ❌ | ✅ |
| Directional arrows | ❌ | ✅ |
| Auto-zoom on select | ❌ | ✅ |
| Neighbor dimming | Parcial | ✅ Completo |

## 🚀 Performance Targets

- **< 100 nós**: 60 FPS constante
- **100-300 nós**: 60 FPS (com LOD)
- **300-1000 nós**: 30-60 FPS (modo Local recomendado)
- **1000+ nós**: 30 FPS (modo Minimal + effects off)

## 🎮 Atalhos de Teclado

- **F**: Toggle fullscreen
- **ESC**: Fechar painéis/detalhes

## 🔮 Próximas Melhorias Possíveis

1. **Filtros Temporais**: Timeline slider para filtrar por era
2. **Busca Semântica**: Highlight baseado em similaridade de conteúdo
3. **Clustering**: Agrupamento automático por categoria
4. **Export**: Salvar snapshot do grafo atual
5. **VR Mode**: Grafo em 3D com three.js
6. **Mini-map**: Overview do grafo completo
7. **Path Finding**: Mostrar caminho mais curto entre dois nós
8. **Heat Map**: Visualizar "importância" via densidade de conexões

---

**Desenvolvido com ❤️ para o Systempunk Universe**
