# Scripts do SystemPunk Forum

## generate_graph_json.py

Script Python para gerar JSON estático do grafo de histórias a partir dos arquivos markdown.

### Por que usar?

- ⚡ **Performance**: Carrega todo o grafo de uma vez ao invés de múltiplas requisições paginadas
- 🚀 **Build Time**: Processa markdown durante desenvolvimento, não em runtime
- 💾 **Cache**: JSON estático pode ser cacheado agressivamente pelo navegador
- 🔧 **Manutenção**: Separação clara entre processamento de conteúdo e renderização

### Uso

```bash
# Desenvolvimento (JSON formatado)
npm run generate:graph

# Produção (JSON minificado)
npm run generate:graph:prod
```

### Workflow Recomendado

1. **Durante desenvolvimento**:
   - Edite os arquivos markdown em `content/`
   - Execute `npm run generate:graph` para regenerar o JSON
   - Recarregue a página `/about/historias` para ver mudanças

2. **Antes de commit**:
   - Rode `npm run generate:graph:prod` para minificar
   - Commit tanto os `.md` quanto o `public/data/graph-data.json`

3. **Em produção**:
   - O Next.js serve o JSON estático de `public/data/`
   - Navegador cacheia o arquivo para carregamentos futuros

### Estrutura dos Arquivos Markdown

Os arquivos em `content/` podem ter um header JSON-like:

```markdown
{
  id: "meu-id",
  name: "Título da História",
  category: "character",
  tags: [tag1, tag2],
  resumo: "Um breve resumo...",
  importancia: "alta",
  status: "completo"
}

Corpo do markdown com [[links wiki-style]] para outras histórias...
```

### Categorização

A categoria é determinada por:
1. **Header explícito** (prioridade): `category: "event"`
2. **Nome da pasta**: `content/Eventos/` → `event`
3. **Fallback**: `mystery`

Categorias válidas:
- `character` - Personagens
- `event` - Eventos
- `location` - Locais
- `technology` - Tecnologia
- `culture` - Cultura
- `mystery` - Mistérios

### Links e Conexões

Use sintaxe wiki-style para criar conexões:

```markdown
- [[outro-arquivo]] - Link simples
- [[Texto Exibido|outro-arquivo]] - Link com texto customizado
- ![[embed]] - Embeds são ignorados para conexões
```

O script resolve links por:
1. ID direto
2. Nome do arquivo (case-insensitive)
3. Título da história (case-insensitive)

### Saída

O JSON gerado tem a estrutura:

```json
{
  "stories": [
    {
      "id": "string",
      "title": "string",
      "category": "character|event|location|technology|culture|mystery",
      "era": "neon-renaissance",
      "summary": "string",
      "content": "string (markdown)",
      "tags": ["string"],
      "connections": ["string (IDs)"],
      "position": { "x": 0, "y": 0, "z": 0 },
      "color": "#hex",
      "importance": "low|medium|high|critical",
      "status": "draft|complete|archived",
      "lastModified": "ISO date"
    }
  ],
  "connections": [
    {
      "from": "string (ID)",
      "to": "string (ID)",
      "type": "mentions",
      "strength": 0.6
    }
  ],
  "metadata": {
    "generated_at": "ISO date",
    "version": "1.0.0",
    "stats": {
      "total_nodes": 0,
      "total_connections": 0,
      "categories": {},
      "importance": {},
      "status": {}
    }
  }
}
```

### Troubleshooting

**Arquivo não aparece no grafo:**
- Verifique se o arquivo tem conteúdo (mínimo 10 caracteres)
- Confirme que está em `content/` ou subpasta
- Rode o script com output verbose para ver erros

**Conexão não aparece:**
- Ambos os nós devem existir
- Link deve seguir sintaxe `[[target]]`
- IDs/nomes devem corresponder (case-insensitive)

**Erro de parsing no header:**
- Use sintaxe JSON válida ou deixe sem header
- Backticks `` ` `` são convertidos para `"`
- Arrays: `[item1, item2]`

### Automação Futura

Considere adicionar:
- Pre-commit hook: `husky` para regenerar antes de commit
- Watch mode: `--watch` para desenvolvimento contínuo
- Validação: Schema validation do JSON gerado
- Incremental: Apenas processar arquivos modificados
