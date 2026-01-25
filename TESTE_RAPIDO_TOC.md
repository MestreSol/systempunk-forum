# 🔍 Teste Rápido - Navegador de Partes (TOC)

## ✅ Correção Aplicada

O problema do navegador de partes (índice) não aparecer foi **CORRIGIDO**.

## 🚀 Como Testar AGORA

### 1. Abra uma História
```
http://localhost:3001/about/historias
```
Escolha qualquer história e clique nela.

### 2. Abra o Console do Browser
- Pressione **F12**
- Vá para a aba **Console**
- Você deve ver:
  ```
  Extracted headings: [...]
  Content being analyzed: ...
  ```

### 3. Teste Desktop (≥1024px de largura)

**O que você DEVE VER:**
```
┌─────────────┬──────────────────────────┐
│             │                          │
│  📖 Índice  │  Conteúdo da História   │
│  ────────   │                          │
│  Introdução │                          │
│  Contexto   │                          │
│  História   │                          │
│  Final      │                          │
│             │                          │
│ (sidebar    │  (conteúdo principal)    │
│  à esq.)    │                          │
└─────────────┴──────────────────────────┘
```

**Como testar:**
- ✅ Sidebar à esquerda deve mostrar o índice
- ✅ Click em qualquer item → scroll suave para seção
- ✅ Ao scrollar, seção ativa fica em destaque (lime-400)
- ✅ H3 deve estar mais indentado que H2

### 4. Teste Mobile (<1024px de largura)

**Como redimensionar:**
- F12 → Toggle device toolbar (Ctrl+Shift+M)
- Ou redimensione a janela para <1024px

**O que você DEVE VER:**
```
┌─────────────────────────────────────┐
│  Conteúdo da História                │
│  (largura completa)                  │
│                                      │
│                         [📜]         │
│                    (botão verde      │
│                    canto inf. dir.)  │
└─────────────────────────────────────┘
```

**Como testar:**
- ✅ Botão redondo verde (☰) no canto inferior direito
- ✅ Tap/click no botão → abre drawer do bottom
- ✅ Drawer mostra "📖 Índice" no topo
- ✅ Lista de seções scrollável
- ✅ Tap em item → scrolla para seção E fecha drawer

## 🐛 Se NÃO Funcionar

### Checklist de Debug

1. **Console mostra headings: []?**
   - ❌ A história não tem ## ou ### no conteúdo
   - ✅ Abra outra história com mais seções

2. **Console tem erros vermelhos?**
   - Compartilhe a mensagem de erro
   - Pode ser necessário outro fix

3. **Sidebar não aparece no desktop?**
   - Verifique largura da janela (precisa ≥1024px)
   - Faça hard refresh (Ctrl+Shift+R)

4. **FAB não aparece no mobile?**
   - Verifique se largura <1024px
   - Verifique se há headings no console
   - Scroll para baixo (pode estar abaixo do scroll-to-top)

5. **Click não scrolla?**
   - Verifique IDs no HTML (F12 → Elements)
   - H2/H3 devem ter atributo `id="..."`
   - IDs devem ser: lowercase, sem acentos, hífens

## ✅ Exemplo de História Boa Para Testar

Procure histórias que tenham:
- ✅ Múltiplas seções com ##
- ✅ Subseções com ###
- ✅ Conteúdo longo (várias telas)

## 📸 Screenshots Esperados

### Desktop - Sidebar
```
┌─────────────────────┐
│ 📖 Índice           │
│ ─────────────────── │
│ ▶ Introdução        │  ← Ativo (lime)
│   Contexto          │
│   História          │
│     Primeira Era    │  ← H3 indentado
│     Segunda Era     │
│   Conclusão         │
└─────────────────────┘
```

### Mobile - Bottom Sheet
```
┌─────────────────────────────────────┐
│ 📖 Índice                      [✕]  │
├─────────────────────────────────────┤
│                                     │
│ ▶ Introdução                        │
│   Contexto                          │
│   História                          │
│     Primeira Era                    │
│     Segunda Era                     │
│   Conclusão                         │
│                                     │
│ (scrollável)                        │
│                                     │
└─────────────────────────────────────┘
```

## 🎯 Resultados Esperados

### ✅ Funcionando Corretamente
- Console mostra headings extraídos
- Desktop: Sidebar visível à esquerda
- Mobile: FAB botão visível
- Click/tap navega suavemente
- Seção ativa destacada
- Sem erros no console (exceto warnings regex)

### ❌ Ainda Não Funciona
- Console não mostra headings
- Sidebar não aparece
- FAB não aparece
- Erro vermelho no console
- Click não faz nada

## 🚑 Suporte

Se ainda não funcionar, forneça:
1. **URL da história** que está testando
2. **Screenshot** do console (F12)
3. **Largura** da janela (desktop/mobile)
4. **Mensagem de erro** (se houver)

---

## 📋 Checklist Final

Antes de reportar problema, verifique:
- [ ] Servidor rodando (localhost:3001)
- [ ] História aberta no browser
- [ ] Console aberto (F12)
- [ ] Hard refresh feito (Ctrl+Shift+R)
- [ ] Largura testada (>1024px e <1024px)
- [ ] História tem ## e ### no conteúdo
- [ ] Sem erros vermelhos no console

---

**Tempo estimado de teste**: 2-3 minutos  
**Dificuldade**: Fácil  
**Status**: Pronto para testar! ✅

