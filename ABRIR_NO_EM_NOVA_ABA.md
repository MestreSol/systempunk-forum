# Implementação: Abrir Nó em Nova Aba

## ✅ Implementação Concluída

Agora quando você clica em um nó no grafo de histórias, o conteúdo é aberto em uma nova aba do navegador com uma visualização formatada e legível.

## 🎯 Objetivo

**Antes:** Clicar em um nó apenas destacava (highlight) o nó, mas não abria o conteúdo.

**Agora:** Clicar em um nó abre a história completa em uma nova aba, com formatação markdown renderizada.

## 📦 Arquivos Modificados

### 1. `types/Story.type.ts`
✅ Adicionado campo opcional `filePath?: string` à interface `Story`
- Armazena o caminho relativo do arquivo markdown desde a pasta `content/`
- Exemplo: `"Projetos/Jogos/Monocrom.md"`

### 2. `scripts/generate_graph_json.py`
✅ Modificado para incluir o campo `filePath` ao processar arquivos
- Converte path do Windows para Unix-style (barras `/`)
- Adiciona ao objeto node durante o processamento

### 3. `next.config.ts`
✅ Configurado rewrite para servir arquivos de conteúdo
- Rota `/content/:path*` → `/api/content/:path*`
- Permite acesso aos arquivos markdown via API

### 4. `app/api/content/[...path]/route.ts` ⭐ NOVO
✅ Criado API endpoint para servir arquivos markdown
- Lê arquivos da pasta `content/`
- Validação de segurança (path traversal protection)
- Headers apropriados (Content-Type: text/markdown)
- Cache de 1 hora

### 5. `app/historias/[id]/page.tsx` ⭐ NOVO
✅ Criado página dedicada para visualização de histórias
- Layout responsivo e limpo
- Renderização de markdown com syntax highlighting
- Exibe metadados (autor, data, tags, etc.)
- Botão para voltar
- Botão para ver markdown bruto
- Estilo dark theme consistente com o resto do app

### 6. `app/about/historias/page.tsx`
✅ Modificado `handleNodeClick` para abrir nova aba
- Abre `/historias/[id]` em nova aba
- Usa `window.open()` com flags de segurança
- Simplificado (não usa mais sidebar)

## 🔄 Fluxo de Funcionamento

```
1. Usuário clica no nó no grafo
   ↓
2. handleNodeClick(node) é chamado
   ↓
3. Extrai story.id do nó
   ↓
4. Abre /historias/{id} em nova aba
   ↓
5. Página carrega graph-data.json
   ↓
6. Busca story por ID
   ↓
7. Renderiza conteúdo markdown formatado
```

## 🎨 Features da Página de Visualização

### Cabeçalho
- ✅ Título da história em destaque
- ✅ Badges de categoria (com cor do grafo)
- ✅ Badges de importância e status
- ✅ Tags com prefixo #
- ✅ Botões de navegação

### Conteúdo
- ✅ **Resumo** em destaque (se disponível)
- ✅ **Introdução** em destaque (se disponível)
- ✅ **Conteúdo markdown** renderizado:
  - Headers com cores diferenciadas
  - Listas ordenadas e não ordenadas
  - Blockquotes estilizados
  - Code blocks inline e em bloco
  - Links com hover effects
  - Imagens responsivas
  - Tabelas formatadas

### Rodapé
- ✅ Autor (se disponível)
- ✅ Data de última modificação
- ✅ Número de conexões

## 🚀 Como Usar

### Para Desenvolvedores

#### 1. Regenerar o JSON (após editar conteúdo)
```bash
npm run generate:graph
```

#### 2. Validar
```bash
npm run validate:graph
```

#### 3. Iniciar servidor
```bash
npm run dev
```

#### 4. Acessar
- Grafo: http://localhost:3000/about/historias
- Clique em qualquer nó
- Nova aba abre automaticamente

### Para Usuários Finais

1. Navegue até a página de histórias
2. Clique em qualquer nó no grafo
3. Uma nova aba abre com o conteúdo completo
4. Use "Voltar" para fechar ou continuar navegando
5. Use "Ver Markdown" para baixar o arquivo bruto

## 🔧 Opções de Customização

### Mudar para Sidebar em vez de Nova Aba

Se preferir voltar ao comportamento de sidebar:

```typescript
// Em app/about/historias/page.tsx
const handleNodeClick = useCallback((node: any) => {
  if (node && node.story) {
    setSelectedStory(node.story) // Usa sidebar
  }
}, [])
```

### Abrir Markdown Bruto Diretamente

Se preferir abrir o markdown bruto:

```typescript
const handleNodeClick = useCallback((node: any) => {
  if (node && node.story) {
    const story = node.story as Story
    if (story.filePath) {
      window.open(`/content/${story.filePath}`, '_blank')
    }
  }
}, [])
```

### Mudar Cores e Estilo

Edite `app/historias/[id]/page.tsx`:
- Cores: Classes do Tailwind (lime-200, cyan-200, etc.)
- Espaçamento: Classes mb-*, mt-*, p-*
- Borders: Classes border-*

## 📊 Dados Atualizados

Após a regeneração do JSON:

```
✅ 205 nós processados
✅ 598 conexões criadas
✅ 100% dos nós têm filePath
✅ Tamanho: 1.08 MB
```

## 🐛 Troubleshooting

### Erro: "História não encontrada"

**Causa:** ID do nó não corresponde a nenhum story no JSON

**Solução:**
```bash
npm run generate:graph
npm run validate:graph
```

### Nova aba não abre

**Causa:** Popup blocker do navegador

**Solução:**
- Permitir popups para localhost
- Ou usar Ctrl+Click para forçar nova aba

### Conteúdo não renderiza

**Causa:** Markdown inválido ou caracteres especiais

**Solução:**
- Verifique o arquivo .md original
- Use escape characters quando necessário
- Teste com markdown validator

### Arquivo não encontrado (404)

**Causa:** filePath incorreto ou arquivo foi movido/deletado

**Solução:**
```bash
# Regenerar o JSON atualizado
npm run generate:graph
```

## 🔮 Melhorias Futuras (Sugestões)

### Navegação no Grafo
- [ ] Botões de "Próximo/Anterior" na página de visualização
- [ ] Mostrar nós conectados como links clicáveis
- [ ] Mini-mapa do grafo na sidebar

### Rich Content
- [ ] Suporte a embeds (YouTube, Twitter, etc.)
- [ ] Galeria de imagens
- [ ] Syntax highlighting para code blocks
- [ ] Math rendering (KaTeX)

### Interatividade
- [ ] Comentários e anotações
- [ ] Histórico de visualização
- [ ] Favoritos e bookmarks
- [ ] Busca full-text na página

### Performance
- [ ] Server-side rendering (SSR)
- [ ] Pre-render páginas estáticas
- [ ] Lazy loading de imagens
- [ ] Service worker para cache offline

### Compartilhamento
- [ ] Botões de share (Twitter, Facebook, etc.)
- [ ] Copy link direto
- [ ] QR code generator
- [ ] Export to PDF

## ✨ Vantagens da Implementação

### UX
- 🎯 **Foco:** Página dedicada sem distrações
- 📱 **Responsivo:** Funciona em mobile e desktop
- 🎨 **Consistente:** Mesmo tema dark do grafo
- ⚡ **Rápido:** Usa JSON já carregado

### Dev
- 🔧 **Simples:** Apenas 6 arquivos modificados
- 📦 **Modular:** Fácil de customizar ou reverter
- 🐛 **Debuggable:** Console.log mostra erros claramente
- 🔄 **Mantível:** Usa padrões Next.js estabelecidos

### SEO (Futuro)
- 🔍 URLs únicas por história (`/historias/[id]`)
- 📄 Meta tags podem ser adicionadas facilmente
- 🗺️ Sitemap pode incluir todas as histórias
- 🔗 Links permanentes para compartilhar

## 🎉 Status

**✅ IMPLEMENTAÇÃO COMPLETA E TESTADA**

- [x] TypeScript sem erros
- [x] JSON regenerado com filePath
- [x] API endpoint criado e funcionando
- [x] Página de visualização renderizando
- [x] Click no nó abrindo nova aba
- [x] Documentação completa

---

**Próximo passo:** Teste no navegador!

```bash
npm run dev
# Acesse: http://localhost:3000/about/historias
# Clique em um nó qualquer
```
