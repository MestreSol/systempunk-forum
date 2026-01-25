# Obsidian-like Graph Physics Implementation

## ✅ Implementação Completa

Este documento descreve as melhorias implementadas no mapa mental de histórias para torná-lo similar ao grafo do Obsidian, com física dinâmica e controles avançados.

## 🎯 Funcionalidades Implementadas

### 1. **Parâmetros de Física Obsidian-like**

#### Estados Adicionados:
- `dynamicsOpen`: Controla visibilidade do painel de física
- `physicsPreset`: Preset ativo ('obsidian' | 'tight' | 'wide' | 'custom')
- `linkDistancePadding`: Distância adicional entre nós conectados (50px padrão)
- `linkStrengthMultiplier`: Multiplicador de força dos links (0.6 padrão)
- `chargeStrengthFactor`: Fator de repulsão entre nós (3 padrão)
- `collisionPadding`: Espaçamento para evitar sobreposição (8px padrão)
- `centerForceStrength`: Força de atração ao centro (0.1 padrão)
- `enableCenterForce`: Toggle da força central (ativo)
- `enableGravity`: Toggle da gravidade X/Y (ativo)
- `gravityStrength`: Intensidade da gravidade (0.05 padrão)
- `velocityDecay`: Fricção/amortecimento (0.4 padrão)
- `alphaDecay`: Taxa de resfriamento da simulação (0.02 padrão)
- `physicsActive`: Estado da simulação (pausar/resumir)

### 2. **Sistema de Presets**

Três presets pré-configurados + custom:

#### 🌌 **Obsidian** (Padrão)
- Espaçamento médio, gravidade suave
- Ideal para grafos médios (50-200 nós)
- Nós críticos ficam naturalmente no centro

#### 🔗 **Compact (Tight)**
- Nós mais próximos, links fortes
- Ideal para grafos pequenos (< 50 nós)
- Boa para visualizar clusters densos

#### 🌐 **Disperso (Wide)**
- Nós bem espaçados, repulsão alta
- Ideal para grafos grandes (> 200 nós)
- Melhor legibilidade em datasets complexos

#### 🎨 **Custom**
- Ativado automaticamente ao ajustar qualquer parâmetro
- Salvo no localStorage

### 3. **Forças D3 Implementadas**

#### **Charge (Repulsão)**
```javascript
forceManyBody().strength((n) => {
  const baseCharge = -Math.max(30, n.val * chargeStrengthFactor)
  // Nós críticos repelem mais forte
  const multiplier = n.importance === 'critical' ? 1.5 : 
                     n.importance === 'high' ? 1.2 : 1
  return baseCharge * multiplier
})
```

#### **Collision (Colisão)**
```javascript
forceCollide()
  .radius(n => n.val + collisionPadding)
  .strength(0.9)
  .iterations(2) // Melhor resolução
```

#### **Link (Atração entre Conexões)**
```javascript
forceLink()
  .distance(l => {
    const avgVal = (l.source.val + l.target.val) / 2
    return Math.max(30, avgVal * 2) + linkDistancePadding
  })
  .strength(l => (...) * linkStrengthMultiplier * l.strength)
```

#### **Center (Força Central)**
```javascript
forceCenter(0, 0).strength(centerForceStrength)
```

#### **Gravity X/Y (Gravidade Direcional)**
```javascript
forceX/Y(0).strength(n => {
  // Nós críticos são puxados 2x mais ao centro
  if (n.importance === 'critical') return gravityStrength * 2
  if (n.importance === 'high') return gravityStrength * 1.5
  return gravityStrength
})
```

### 4. **Painel de Controle Dinâmico**

Localização: Botão ⚡ no header → Painel flutuante direito

#### Seções:

1. **Presets** (4 botões): Obsidian, Compact, Disperso, Custom
2. **Controles de Estado**: 
   - ⏸️/▶️ Pausar/Resumir física
   - 🔄 Reset (limpa posições fixas)
3. **Forças**:
   - Repulsão (0.5-6x)
   - Distância Links (0-150px)
   - Força Links (0.1-2x)
   - Espaçamento Nós (0-32px)
4. **Gravidade**:
   - Toggle Força Central (on/off)
   - Intensidade Central (0-0.5)
   - Toggle Gravidade X/Y (on/off)
   - Intensidade Gravidade (0-0.2)
5. **Simulação**:
   - Fricção (0.1-0.9)
   - Resfriamento (0.005-0.1)
6. **Dicas**: Orientações rápidas de uso

### 5. **Persistência Local**

As configurações são salvas em `localStorage` como:
```javascript
{
  preset: 'obsidian' | 'tight' | 'wide' | 'custom',
  custom: { /* parâmetros customizados */ }
}
```

Carregadas automaticamente ao abrir a página.

### 6. **Funções Helper**

#### `togglePhysics()`
Pausa/resume a simulação física sem perder estado

#### `resetGraphLayout()`
Limpa posições fixas e reinicia simulação

#### `updatePhysicsParam(setter, value)`
Atualiza parâmetro e marca preset como 'custom'

#### `applyPreset(preset)`
Aplica preset pré-configurado

## 🎨 UI/UX

### Botão de Acesso
- Ícone: ⚡ (Zap/Lightning)
- Localização: Header, ao lado de Filtros/Info/Fullscreen
- Estado ativo: Fundo verde claro + texto lime

### Painel
- Posição: Fixed, direita superior
- Largura: 320px (80 rem units)
- Backdrop blur + shadow para destaque
- Scroll interno quando conteúdo excede altura
- Sticky header com título e botão fechar

### Controles
- Sliders com accent color theme-aware
- Toggles customizados (switch style)
- Valores exibidos em tempo real ao lado dos labels
- Cores semânticas:
  - Cyan: Valores numéricos
  - Amber/Orange: Forças/Simulação
  - Purple: Gravidade
  - Green/Red: Estado ativo/pausado

## 📊 Comportamento da Física

### Hierarquia por Importância

A física cria automaticamente uma hierarquia visual:

1. **Nós Críticos**
   - Maior tamanho (val: 20)
   - Repulsão 1.5x mais forte
   - Gravidade 2x ao centro
   - Ficam naturalmente no núcleo do grafo

2. **Nós High**
   - Tamanho médio-grande (val: 15)
   - Repulsão 1.2x
   - Gravidade 1.5x
   - Orbitam o núcleo

3. **Nós Medium/Low**
   - Tamanho menor (val: 10/5)
   - Repulsão/gravidade padrão
   - Ficam na periferia

### Dinâmica dos Links

- Distância proporcional à importância dos nós conectados
- Links mais fortes puxam nós com mais força
- Animação suave de reconfiguração

## 🚀 Performance

### Otimizações Mantidas
- LOD (Level of Detail) no canvas rendering
- Collision com 2 iterações (balanço qualidade/performance)
- Alpha decay adaptativo baseado em tamanho do dataset
- Cooldown time progressivo

### Recomendações de Uso
- **< 100 nós**: Qualquer preset, modo Global
- **100-300 nós**: Preset Obsidian ou Wide, modo Global
- **300-1000 nós**: Preset Wide, modo Local recomendado
- **> 1000 nós**: Modo Local obrigatório para boa UX

## 🔧 Como Usar

### Exploração Básica
1. Abra a página de Histórias
2. Clique no ícone ⚡ no header
3. Experimente os presets (Obsidian → Compact → Disperso)
4. Observe como o grafo se reorganiza

### Customização Avançada
1. Selecione um preset como base
2. Ajuste parâmetros individuais:
   - ↑ Repulsão = Nós mais espaçados
   - ↑ Distância Links = Conexões mais longas
   - ↑ Gravidade = Mais centralização
   - ↑ Fricção = Estabiliza mais rápido
3. O preset mudará automaticamente para "Custom"
4. Configuração é salva automaticamente

### Controle Fino
- **Pausar física**: Útil para arrastar nós manualmente
- **Reset**: Volta layout inicial quando bagunçou
- **Toggle Gravidade**: Liga/desliga centralização
- **Toggle Centro**: Força adicional ao meio do canvas

## 🐛 Troubleshooting

### Grafo não se move
- Verifique se física está pausada (botão ▶️)
- Tente Reset para reiniciar simulação

### Nós muito próximos
- ↑ Repulsão
- ↑ Espaçamento Nós
- ↑ Distância Links
- Ou use preset "Disperso"

### Nós muito distantes
- ↓ Repulsão
- ↑ Força Links
- ↑ Gravidade
- Ou use preset "Compact"

### Simulação instável
- ↑ Fricção (velocity decay)
- ↑ Resfriamento (alpha decay)
- Reduzir Força Links

## 📝 Código Principal

### Localização dos Arquivos
- **Componente**: `app/about/historias/page.tsx`
- **Tipos**: `types/Story.type.ts`
- **Mocks**: `mocks/Stories.ts`

### Dependências
- `react-force-graph-2d`: Renderização do grafo
- `d3-force`: Engine de física
- `lucide-react`: Ícones
- `@/components/ui/*`: Componentes UI

## ✨ Resultado Final

O mapa mental agora se comporta como o grafo do Obsidian:

✅ Gravidade natural puxa nós importantes ao centro
✅ Física responsiva e ajustável em tempo real
✅ Presets para casos de uso comuns
✅ Controles intuitivos e visual profissional
✅ Persistência de preferências
✅ Performance otimizada para grandes datasets
✅ Hierarquia visual automática por importância

---

**Implementado em**: Janeiro 2026
**Versão**: 1.0.0
**Status**: ✅ Completo e funcional
