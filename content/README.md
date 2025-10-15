{
id="readme",
name="README",
tags=[],
resumo="",
historia="",
context=[],
importancia="critica",
lastupdate=""
}

Place your Markdown content here, organized into category folders.

Supported category folders (case-insensitive):
- Personagens → character
- Eventos → event
- Locais → location
- Tecnologia → technology
- Cultura(s) → culture
- Mistérios/Misterios → mystery

Each .md file may begin with a JSON-like header block:

{
  id="nome-123",
  name="Nome",
  category="event|character|location|technology|culture|mystery",
  tags=[ "consiencia", "misterio", "momento" ],
  resumo="small text",
  historia="introduction text",
  context=[ { title = "titlecontext", subtitle="subtitle" } ],
  importancia="critica",
  lastupdate="2025-01-01T12:34:56Z"
}

Follow the header with your Markdown body. Obsidian-style wikilinks are supported:
- [[PageName]] links to a file named PageName.md (or a story with matching id/name)
- [[Visível|ArquivoReal]] uses the right side as the real target (file base/id/name)
- ![[Asset.png]] embeds are ignored for graph connections

Notes:
- Positions in the 3D graph are generated from id deterministically.
- Era defaults to a generic bucket; only categories affect filtering here.
