# Exemplo de História para SystemPunk

Este é um arquivo de exemplo mostrando o formato recomendado para histórias do SystemPunk.

## Formato com Header JSON-like

```markdown
{
  id: "exemplo-historia",
  name: "A História de Exemplo",
  category: "character",
  tags: [ficção, cyberpunk, 2025],
  resumo: "Um breve resumo sobre o que é esta história e por que ela é importante.",
  importancia: "alta",
  status: "completo",
  autor: "Seu Nome"
}

# A História de Exemplo

Esta é uma história sobre [[outro-personagem]] que viveu durante [[grande-evento]].

## Seção 1

Conteúdo da primeira seção...

## Seção 2

Mais conteúdo com referências a [[localizacao-importante]].

- Item de lista
- Outro item mencionando [[tecnologia-avancada]]
```

## Campos do Header

| Campo | Tipo | Descrição | Valores Válidos |
|-------|------|-----------|----------------|
| `id` | string | Identificador único (sem espaços) | Qualquer string válida |
| `name` | string | Título da história | Qualquer texto |
| `category` | string | Categoria da história | `character`, `event`, `location`, `technology`, `culture`, `mystery` |
| `tags` | array | Tags para busca e filtro | Array de strings |
| `resumo` | string | Resumo breve (exibido no nó) | Texto curto (recomendado <200 chars) |
| `importancia` | string | Relevância na narrativa | `baixa`, `media`, `alta`, `critica` |
| `status` | string | Estado de completude | `rascunho`, `completo`, `arquivado` |
| `autor` | string | Nome do autor | Qualquer texto |

## Links Wiki-Style

Use `[[target]]` para criar conexões entre histórias:

- `[[id-da-historia]]` - Link direto por ID
- `[[Nome da História]]` - Link por nome/título
- `[[Texto Exibido|id-da-historia]]` - Link com texto customizado
- `![[embed]]` - Embeds são ignorados nas conexões

## Categorias e Cores

| Categoria | Cor | Ícone | Uso |
|-----------|-----|-------|-----|
| `character` | Verde | 👤 | Personagens e figuras importantes |
| `event` | Laranja | ⚡ | Eventos históricos e acontecimentos |
| `location` | Roxo | 🏛️ | Locais, cidades, regiões |
| `technology` | Ciano | 🔬 | Tecnologias e descobertas |
| `culture` | Rosa | 🎭 | Movimentos culturais e sociais |
| `mystery` | Vermelho | ❓ | Mistérios e enigmas |

## Determinação de Categoria

A categoria é determinada nesta ordem:

1. **Header explícito** (maior prioridade)
   ```markdown
   { category: "event" }
   ```

2. **Pasta pai** (se header não especificar)
   - `content/Eventos/` → `event`
   - `content/Pessoas ou Entidades/` → `character`
   - `content/Lugares/` → `location`

3. **Fallback** (se nenhum dos anteriores)
   - `mystery`

## Exemplo Completo

```markdown
{
  id: "valorian",
  name: "Valorian, o Guardião",
  category: "character",
  tags: [guardião, lendário, pré-colapso],
  resumo: "Último guardião da Era Dourada, protetor do Código Gênesis.",
  importancia: "critica",
  status: "completo",
  autor: "SystemPunk Team"
}

# Valorian, o Guardião

Valorian foi o último dos guardiões que protegeram [[codigo-genesis]] durante [[grande-colapso]].

## Origem

Nascido em [[cidade-primordial]], Valorian foi treinado nas artes antigas...

## Legado

Sua influência pode ser vista até hoje em [[ordem-dos-sentinelas]].

### Conexões Importantes

- Mentor de [[protagonista]]
- Rival de [[antagonista]]
- Descobridor de [[tecnologia-perdida]]
```

## Dicas

1. **IDs únicos**: Use IDs descritivos e sem espaços
2. **Resumos concisos**: Mantenha resumos curtos e informativos
3. **Links abundantes**: Conecte histórias relacionadas para um grafo rico
4. **Tags relevantes**: Use tags para facilitar buscas
5. **Status atual**: Marque rascunhos para saber o que precisa ser expandido
