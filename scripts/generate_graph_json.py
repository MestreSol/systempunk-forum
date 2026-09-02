#!/usr/bin/env python3
"""
Script para gerar JSON do grafo de histórias do SystemPunk
Usage: python scripts/generate_graph_json.py [--input content/] [--output public/data/graph-data.json]
"""

import os
import re
import json
import argparse
from pathlib import Path
from typing import Dict, List, Set, Tuple, Any
from datetime import datetime

class StoryGraphGenerator:
    def __init__(self, content_dir: str):
        self.content_dir = Path(content_dir)
        self.nodes = []
        self.connections = []
        self.node_ids = set()

        # Mapeamento de categorias (baseado em markdownLoader.ts)
        self.category_map = {
            'personagens': 'character',
            'personagem': 'character',
            'characters': 'character',
            'pessoas ou entidades': 'character',
            'pessoas': 'character',
            'eventos': 'event',
            'evento': 'event',
            'eras': 'event',
            'era': 'event',
            'locations': 'location',
            'locais': 'location',
            'local': 'location',
            'lugares': 'location',
            'dominios': 'location',
            'domínio': 'location',
            'dominios2': 'location',
            'dominio': 'location',
            'tecnologia': 'technology',
            'tecnologias': 'technology',
            'technology': 'technology',
            'cultura': 'culture',
            'culturas': 'culture',
            'culture': 'culture',
            'misterio': 'mystery',
            'misterios': 'mystery',
            'mistérios': 'mystery',
            'mysteries': 'mystery'
        }

        # Cores por categoria
        self.category_colors = {
            'character': '#10B981',
            'event': '#F59E0B',
            'location': '#8B5CF6',
            'technology': '#06B6D4',
            'culture': '#EC4899',
            'mystery': '#EF4444'
        }

        # Index maps para resolução de links
        self.by_id = {}
        self.by_name = {}
        self.by_file = {}

    def normalize_category(self, folder_name: str) -> str:
        """Normaliza nome de pasta para categoria"""
        key = folder_name.strip().lower()
        return self.category_map.get(key, 'mystery')

    def generate_position_from_id(self, story_id: str) -> Dict[str, int]:
        """Gera posição determinística baseada no ID (seeded random)"""
        import math

        # Implementação simples de hash seeded
        h = 2166136261
        for char in story_id:
            h ^= ord(char)
            h = (h * 16777619) & 0xFFFFFFFF

        x = h or 123456789

        def rand():
            nonlocal x
            x ^= (x << 13) & 0xFFFFFFFF
            x ^= (x >> 17)
            x ^= (x << 5) & 0xFFFFFFFF
            return ((x & 0xFFFFFFFF) % 100000) / 100000

        # Gera coordenadas em esfera 3D
        r = 10 + rand() * 30
        theta = rand() * math.pi * 2
        phi = math.acos(2 * rand() - 1)

        x_pos = r * math.sin(phi) * math.cos(theta)
        y_pos = r * math.sin(phi) * math.sin(theta)
        z_pos = r * math.cos(phi)

        return {
            'x': round(x_pos),
            'y': round(y_pos),
            'z': round(z_pos)
        }

    def normalize_jsonish(self, block: str) -> str:
        """Normaliza sintaxe JSON-like customizada para JSON válido"""
        t = block.strip()
        # Substitui backticks por aspas
        t = t.replace('`', '"')
        # Converte key=value para "key":value
        t = re.sub(r'(\b[a-zA-Z_][a-zA-Z0-9_]*)\s*=', r'"\1":', t)
        # Remove vírgulas antes de } ou ]
        t = re.sub(r',\s*([}\]])', r'\1', t)
        return t

    def extract_header_and_body(self, content: str) -> Tuple[Dict[str, Any], str]:
        """Extrai header JSON-like e corpo do markdown"""
        trimmed = content.lstrip()

        # Tenta extrair header JSON-like
        if trimmed.startswith('{'):
            depth = 0
            end_index = -1
            for i, ch in enumerate(trimmed):
                if ch == '{':
                    depth += 1
                elif ch == '}':
                    depth -= 1
                    if depth == 0:
                        end_index = i
                        break

            if end_index != -1:
                header_raw = trimmed[:end_index + 1]
                body = trimmed[end_index + 1:].lstrip()
                try:
                    header_normalized = self.normalize_jsonish(header_raw)
                    header = json.loads(header_normalized)
                    return header, body
                except json.JSONDecodeError:
                    # Se falhar, tenta parsing mais agressivo
                    try:
                        # Converte valores não-quoted
                        header_fixed = re.sub(
                            r'(\"[^\"]+\"\s*:\s*)([^\s\"\[{][^,}\]]*)',
                            lambda m: f'{m.group(1)}"{m.group(2).strip()}"',
                            header_normalized
                        )
                        header = json.loads(header_fixed)
                        return header, body
                    except:
                        pass

        return {}, content

    def parse_wiki_links(self, markdown: str) -> List[str]:
        """Extrai links wiki-style [[link]] ou [[text|link]]"""
        results = []
        pattern = r'(?:!)?\[\[(.+?)\]\]'
        matches = re.finditer(pattern, markdown)

        for match in matches:
            inside = match.group(1).strip()
            # Se tem pipe, pega o que vem antes (o target real)
            if '|' in inside:
                target = inside.split('|')[0].strip()
            else:
                target = inside

            # Remove extensão de arquivo
            target = re.sub(r'\.[a-zA-Z0-9]+$', '', target)
            results.append(target)

        return results

    def list_markdown_files(self) -> List[Path]:
        """Lista todos os arquivos .md recursivamente"""
        return list(self.content_dir.rglob('*.md'))

    def build_image_index(self) -> Dict[str, str]:
        """Varre content_dir procurando imagens e monta um índice
        nome-de-arquivo (lowercase) -> caminho relativo real em content/.
        Usado para resolver embeds ![[imagem.png]] sem precisar adivinhar
        a pasta no cliente (imagens ficam espalhadas em várias subpastas,
        não seguem um padrão único)."""
        image_exts = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'}
        index = {}
        for path in self.content_dir.rglob('*'):
            if path.is_file() and path.suffix.lower() in image_exts:
                rel = path.relative_to(self.content_dir)
                index[path.name.lower()] = str(rel).replace('\\', '/')
        return index

    def get_folder_category(self, file_path: Path) -> str:
        """Determina categoria pela pasta pai"""
        rel_path = file_path.relative_to(self.content_dir)
        parts = rel_path.parts

        if len(parts) > 1:
            # Pega a pasta de nível 1
            top_folder = parts[0]
            return self.normalize_category(top_folder)

        return 'mystery'

    def normalize_importance(self, value: str) -> str:
        """Normaliza importância para valores válidos"""
        if not value:
            return 'medium'

        value_lower = value.lower()
        importance_map = {
            'baixa': 'low',
            'low': 'low',
            'media': 'medium',
            'média': 'medium',
            'medium': 'medium',
            'alta': 'high',
            'high': 'high',
            'critica': 'critical',
            'crítica': 'critical',
            'critical': 'critical'
        }

        return importance_map.get(value_lower, 'medium')

    def normalize_status(self, value: str) -> str:
        """Normaliza status para valores válidos"""
        if not value:
            return 'draft'

        value_lower = value.lower()
        status_map = {
            'draft': 'draft',
            'rascunho': 'draft',
            'completo': 'complete',
            'complete': 'complete',
            'concluido': 'complete',
            'concluído': 'complete',
            'archived': 'archived',
            'arquivado': 'archived'
        }

        return status_map.get(value_lower, 'draft')

    def process_markdown_file(self, file_path: Path) -> Dict[str, Any]:
        """Processa um arquivo .md e retorna dados do nó"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Ignora arquivos vazios ou muito pequenos
            if len(content.strip()) < 10:
                return None

            header, body = self.extract_header_and_body(content)

            # Gera ID único baseado no caminho relativo para evitar duplicatas
            rel_path = file_path.relative_to(self.content_dir)
            file_base = file_path.stem

            # Se há ID no header, usa ele; senão cria um baseado no caminho
            if 'id' in header:
                story_id = header['id']
            else:
                # Para arquivos em subpastas, inclui o nome da pasta no ID
                if len(rel_path.parts) > 1:
                    parent_folder = rel_path.parts[-2]
                    story_id = f"{parent_folder.lower().replace(' ', '-')}-{file_base}"
                else:
                    story_id = file_base

            # Título
            title = header.get('name', file_base.replace('-', ' ').title())

            # Categoria (header tem prioridade sobre pasta)
            header_category = header.get('category', '').lower()
            folder_category = self.get_folder_category(file_path)

            if header_category in ['character', 'event', 'location', 'technology', 'culture', 'mystery']:
                category = header_category
            elif header_category in self.category_map:
                category = self.category_map[header_category]
            else:
                category = folder_category

            # Tags
            tags = header.get('tags', [])
            if isinstance(tags, str):
                tags = [t.strip() for t in tags.split(',')]

            # Summary
            summary = header.get('resumo', '')
            if not summary and body:
                # Extrai primeiro parágrafo não-vazio
                paragraphs = [p.strip() for p in body.split('\n\n') if p.strip() and not p.strip().startswith('>')]
                if paragraphs:
                    summary = paragraphs[0][:200]
                    if len(paragraphs[0]) > 200:
                        summary += '...'

            # Outras propriedades
            importance = self.normalize_importance(header.get('importancia', ''))
            status = self.normalize_status(header.get('status', ''))

            # Data de modificação
            last_modified = header.get('lastupdate', '')
            if not last_modified:
                mtime = file_path.stat().st_mtime
                last_modified = datetime.fromtimestamp(mtime).isoformat()

            # Extrai conexões do corpo
            connections = self.parse_wiki_links(body)

            # Posição
            position = self.generate_position_from_id(story_id)

            # Caminho relativo do arquivo (para abrir em nova aba)
            file_path_str = str(rel_path).replace('\\', '/')

            node = {
                'id': story_id,
                'title': title,
                'category': category,
                'era': 'neon-renaissance',
                'summary': summary,
                'content': body,
                'tags': tags,
                'connections': connections,
                'position': position,
                'color': self.category_colors[category],
                'importance': importance,
                'status': status,
                'lastModified': last_modified,
                'filePath': file_path_str
            }

            # Campos opcionais
            if 'autor' in header:
                node['author'] = header['autor']
            elif 'author' in header:
                node['author'] = header['author']

            if 'historia' in header:
                node['intro'] = header['historia']

            return node

        except Exception as e:
            print(f"⚠️  Erro ao processar {file_path.name}: {e}")
            return None

    def build_index_maps(self):
        """Constrói mapas de índice para resolução de links"""
        for node in self.nodes:
            node_id = node['id']
            self.by_id[node_id] = node_id
            self.by_name[node['title'].lower()] = node_id

            # Também indexa por variações do nome
            file_name = node_id.lower()
            self.by_file[file_name] = node_id

    def resolve_link_target(self, key: str) -> str:
        """Resolve um link para o ID do nó"""
        # Tenta match direto por ID
        if key in self.by_id:
            return self.by_id[key]

        # Tenta por nome
        key_lower = key.lower()
        if key_lower in self.by_name:
            return self.by_name[key_lower]

        # Tenta por nome de arquivo
        if key_lower in self.by_file:
            return self.by_file[key_lower]

        return None

    def generate_connections(self):
        """Gera conexões bidirecionais validadas"""
        connection_set = set()

        for node in self.nodes:
            source_id = node['id']

            for target_key in node['connections']:
                target_id = self.resolve_link_target(target_key)

                if target_id and target_id != source_id and target_id in self.node_ids:
                    # Cria chave única ordenada para evitar duplicatas
                    conn_key = tuple(sorted([source_id, target_id]))

                    if conn_key not in connection_set:
                        connection_set.add(conn_key)

                        # Adiciona conexão bidirecional
                        self.connections.append({
                            'from': source_id,
                            'to': target_id,
                            'type': 'mentions',
                            'strength': 0.6
                        })

                        self.connections.append({
                            'from': target_id,
                            'to': source_id,
                            'type': 'mentions',
                            'strength': 0.6
                        })

    def generate_graph(self) -> Dict[str, Any]:
        """Gera estrutura completa do grafo"""
        print(f"🔍 Buscando arquivos markdown em {self.content_dir}...")

        md_files = self.list_markdown_files()
        print(f"📄 Encontrados {len(md_files)} arquivos markdown")

        # Processa todos os arquivos
        for file_path in md_files:
            node = self.process_markdown_file(file_path)
            if node:
                self.nodes.append(node)
                self.node_ids.add(node['id'])
                print(f"  ✓ {node['id']}: {node['title']}")

        print(f"\n📦 Total de nós processados: {len(self.nodes)}")

        # Constrói índices
        print(f"🔗 Construindo índices...")
        self.build_index_maps()

        # Gera conexões
        print(f"🔗 Gerando conexões...")
        self.generate_connections()
        print(f"  ✓ {len(self.connections)} conexões criadas")

        # Estatísticas
        stats = {
            'total_nodes': len(self.nodes),
            'total_connections': len(self.connections),
            'categories': {},
            'importance': {},
            'status': {}
        }

        for node in self.nodes:
            cat = node['category']
            stats['categories'][cat] = stats['categories'].get(cat, 0) + 1

            imp = node['importance']
            stats['importance'][imp] = stats['importance'].get(imp, 0) + 1

            status = node['status']
            stats['status'][status] = stats['status'].get(status, 0) + 1

        print(f"\n📊 Estatísticas:")
        print(f"  • Nós: {stats['total_nodes']}")
        print(f"  • Conexões: {stats['total_connections']}")
        print(f"  • Por categoria: {stats['categories']}")
        print(f"  • Por importância: {stats['importance']}")
        print(f"  • Por status: {stats['status']}")

        return {
            'stories': self.nodes,
            'connections': self.connections,
            'metadata': {
                'generated_at': datetime.now().isoformat(),
                'version': '1.0.0',
                'stats': stats
            }
        }

    def save_split(self, output_path: str, stories_dir: str, image_index_path: str, pretty: bool = False):
        """Salva os dados do grafo em 3 partes, para que nenhuma página
        precise baixar mais do que precisa:
          - output_path: índice leve com todas as histórias SEM o campo
            'content' (usado pelo grafo e para montar listas de
            relacionadas/referenciadas)
          - stories_dir: um arquivo JSON por história, com o objeto
            completo (incluindo 'content'), buscado sob demanda ao abrir
            aquela história específica
          - image_index_path: mapa nome-de-arquivo -> caminho real,
            construído por build_image_index()
        """
        graph_data = self.generate_graph()

        def dump(obj, path: str):
            file_path = Path(path)
            file_path.parent.mkdir(parents=True, exist_ok=True)
            with open(file_path, 'w', encoding='utf-8') as f:
                if pretty:
                    json.dump(obj, f, ensure_ascii=False, indent=2)
                else:
                    json.dump(obj, f, ensure_ascii=False)
            return os.path.getsize(file_path)

        # Histórias completas, uma por arquivo
        stories_dir_path = Path(stories_dir)
        stories_dir_path.mkdir(parents=True, exist_ok=True)
        # Limpa arquivos de uma geração anterior (histórias removidas/renomeadas)
        for old_file in stories_dir_path.glob('*.json'):
            old_file.unlink()

        stories_total_size = 0
        for story in graph_data['stories']:
            stories_total_size += dump(story, str(stories_dir_path / f"{story['id']}.json"))

        # Índice leve (sem 'content') para o grafo e listas de conexões
        light_stories = [{k: v for k, v in s.items() if k != 'content'} for s in graph_data['stories']]
        light_data = {**graph_data, 'stories': light_stories}
        main_size = dump(light_data, output_path)

        # Índice de imagens
        image_index = self.build_image_index()
        image_index_size = dump(image_index, image_index_path)

        print(f"\n✅ Índice salvo em: {output_path} ({main_size / 1024:.2f} KB)")
        print(f"✅ {len(graph_data['stories'])} histórias salvas em: {stories_dir} ({stories_total_size / 1024:.2f} KB total)")
        print(f"✅ Índice de {len(image_index)} imagens salvo em: {image_index_path} ({image_index_size / 1024:.2f} KB)")

def main():
    parser = argparse.ArgumentParser(description='Gera JSON do grafo de histórias SystemPunk')
    parser.add_argument('--input', '-i', default='content/', help='Diretório com arquivos .md')
    parser.add_argument('--output', '-o', default='public/data/graph-data.json',
                         help='Arquivo JSON de saída (índice leve, sem o content completo de cada história)')
    parser.add_argument('--stories-dir', default='public/data/stories',
                         help='Diretório onde salvar o JSON completo (com content) de cada história')
    parser.add_argument('--image-index', default='public/data/image-index.json',
                         help='Arquivo JSON com o índice nome-de-arquivo -> caminho real das imagens em content/')
    parser.add_argument('--pretty', action='store_true', help='Formata JSON com indentação (aumenta o tamanho dos arquivos)')

    args = parser.parse_args()

    print("🚀 SystemPunk Graph Generator\n")

    generator = StoryGraphGenerator(args.input)
    generator.save_split(args.output, args.stories_dir, args.image_index, pretty=args.pretty)

    print("\n🎉 Concluído!")

if __name__ == '__main__':
    main()
