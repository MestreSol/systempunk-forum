# 🔍 Debug: Por Que o TOC Não Aparece?

## Checklist de Verificação

Siga estes passos na ordem para identificar o problema:

### 1. ✅ Verificar se o Servidor Está Rodando
```
Status: ✅ Servidor rodando em localhost:3001
```

### 2. 🔄 HARD REFRESH (OBRIGATÓRIO!)

**IMPORTANTE**: O navegador pode estar usando cache antigo!

**Como fazer Hard Refresh:**
- **Chrome/Edge**: `Ctrl + Shift + R` ou `Ctrl + F5`
- **Firefox**: `Ctrl + Shift + R` ou `Ctrl + F5`  
- **Safari**: `Cmd + Option + R`

OU:

1. Abra DevTools (F12)
2. Clique com botão direito no ícone de refresh
3. Escolha "Limpar cache e atualizar forçadamente"

### 3. 📋 Abrir Console do Navegador

Pressione **F12** e vá para a aba **Console**

### 4. 🔍 Procurar pelos Logs de Debug

Você DEVE ver estas mensagens no console:

```javascript
🔍 DEBUG TOC - Extracted headings: [...]
🔍 DEBUG TOC - Number of headings: X
🔍 DEBUG TOC - Content sample: ...
🔍 DEBUG TOC - Full content length: XXXX
🎯 DEBUG RENDER - TOC length: X
🎯 DEBUG RENDER - TOC data: [...]
```

## 🧪 Cenários Possíveis

### Cenário A: Console Mostra `Number of headings: 0`

**Problema**: O markdown não tem títulos # ## ###

**Solução**: 
1. Click em "Ver Markdown" no topo da página
2. Verifique se há linhas começando com `#`, `##` ou `###`
3. Se não houver, o TOC está vazio por design

### Cenário B: Console Mostra `Number of headings: 3` (ou mais)

**Problema**: TOC foi extraído mas não está sendo exibido

**Possíveis causas:**

#### B1. Cache do Navegador
- Faça hard refresh (Ctrl+Shift+R)
- Limpe todo o cache do site
- Tente em aba anônima

#### B2. Viewport muito pequeno (Mobile)
- Se largura < 1024px, sidebar não aparece
- Procure pelo botão FAB verde (📜) no canto inferior direito
- Click nele para ver o bottom sheet

#### B3. Problema de CSS/Z-index
- Abra DevTools (F12)
- Vá em Elements
- Procure por `<aside className="hidden lg:block..."`
- Verifique se tem classe `hidden` ativa

### Cenário C: Nenhum Log Aparece

**Problema**: Código novo não carregou

**Solução**:
1. Verifique se o servidor está rodando
2. Veja se há erros no terminal
3. Mate o servidor (Ctrl+C) e reinicie: `npm run dev`
4. Hard refresh no navegador

### Cenário D: Console Mostra Erro Vermelho

**Problema**: Erro de JavaScript

**Solução**:
1. Copie a mensagem de erro completa
2. Compartilhe comigo para análise

## 🎯 Teste Manual Rápido

### Passo a Passo (2 minutos)

1. **Abra a página**: `http://localhost:3001/historias/nanopunk-noir`

2. **Largura da janela**: Garanta que está > 1024px (desktop)
   - Maximize a janela
   - Ou veja a largura nas DevTools

3. **Hard Refresh**: `Ctrl + Shift + R`

4. **Abra Console**: `F12`

5. **Procure logs**: Devem começar com 🔍 ou 🎯

6. **Verifique sidebar**: Lado esquerdo da página

## 📸 Como Deve Parecer

### Desktop (Largura > 1024px)

```
┌─────────────┬────────────────────────────┐
│             │  ← Voltar  📄 Ver Markdown│
│  📖 Índice  │                            │
│  ─────────  │  Nanopunk Noir             │
│  Início     │  #event #medium            │
│    Context  │  ─────────────────────────│
│  A Crise    │                            │
│    Conseq.  │  📋 Resumo                 │
│             │  ...                       │
│             │                            │
│ (sidebar    │  Conteúdo...               │
│  à esq)     │                            │
└─────────────┴────────────────────────────┘
```

### Mobile (Largura < 1024px)

```
┌──────────────────────────────────┐
│  ← Voltar  📄 Ver Markdown       │
│                                  │
│  Nanopunk Noir                   │
│  ─────────────────────────────  │
│                                  │
│  Conteúdo da história...         │
│                                  │
│                      [📜]        │
│                  (FAB verde)     │
└──────────────────────────────────┘
```

## 🔧 Se AINDA Não Funcionar

### Informações para Debug

Me envie estas informações:

1. **Screenshot do console** (F12 → Console tab)
2. **Screenshot da página inteira**
3. **Largura da janela** (px)
4. **Navegador e versão**
5. **URL exata** que está acessando
6. **Responda**:
   - Vê algum log com 🔍 ou 🎯 no console?
   - Qual é o valor de "Number of headings"?
   - Fez hard refresh?
   - Testou em outra aba/navegador?

### Testes Adicionais

#### Teste 1: Inspecionar Elemento
1. F12 → Elements (ou Inspetor)
2. Ctrl+F (buscar)
3. Busque por: `Índice`
4. Vê algum resultado?
   - **SIM**: Elemento existe mas está escondido (CSS)
   - **NÃO**: Elemento não foi renderizado

#### Teste 2: Verificar Estado React
1. Instale React DevTools
2. Abra a aba Components
3. Procure por `StoryViewerPage`
4. Veja o estado `tableOfContents`
5. Está vazio ou cheio?

#### Teste 3: Testar outra História
Tente com diferentes histórias:
```
http://localhost:3001/historias/[outro-id]
```

Algumas podem ter TOC, outras não.

## ✅ Checklist Final

Antes de reportar bug, confirme:

- [ ] Servidor rodando (vejo "Ready" no terminal)
- [ ] Hard refresh feito (Ctrl+Shift+R)
- [ ] Console aberto (F12)
- [ ] Largura > 1024px (desktop) OU procurei FAB mobile
- [ ] Vi os logs de debug (🔍 🎯)
- [ ] História tem títulos # ## ### no markdown
- [ ] Testei em aba anônima
- [ ] Nenhum erro vermelho no console

---

## 🚨 Ações Imediatas

**AGORA, FAÇA ISTO:**

1. ✅ Abra: `http://localhost:3001/historias/nanopunk-noir`
2. ✅ Pressione: `Ctrl + Shift + R` (hard refresh)
3. ✅ Pressione: `F12` (console)
4. ✅ Procure: Logs começando com 🔍 ou 🎯
5. ✅ Me diga: O que você vê no console?

**Aguardando seu feedback com as informações do console!** 🔍

