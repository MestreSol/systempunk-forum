#!/usr/bin/env python3
"""
Script para validar o JSON do grafo
Usage: python scripts/validate_graph_json.py [--input public/data/graph-data.json]
"""

import json
import argparse
from pathlib import Path
from typing import Dict, List, Any

class GraphValidator:
    def __init__(self, json_path: str):
        self.json_path = Path(json_path)
        self.errors = []
        self.warnings = []
        self.data = None

    def load_json(self) -> bool:
        """Carrega e valida estrutura básica do JSON"""
        try:
            with open(self.json_path, 'r', encoding='utf-8') as f:
                self.data = json.load(f)
            return True
        except FileNotFoundError:
            self.errors.append(f"❌ Arquivo não encontrado: {self.json_path}")
            return False
        except json.JSONDecodeError as e:
            self.errors.append(f"❌ JSON inválido: {e}")
            return False

    def validate_structure(self):
        """Valida estrutura esperada do JSON"""
        if not isinstance(self.data, dict):
            self.errors.append("❌ Raiz do JSON deve ser um objeto")
            return

        # Campos obrigatórios
        if 'stories' not in self.data:
            self.errors.append("❌ Campo 'stories' ausente")
        elif not isinstance(self.data['stories'], list):
            self.errors.append("❌ Campo 'stories' deve ser um array")

        if 'connections' not in self.data:
            self.errors.append("❌ Campo 'connections' ausente")
        elif not isinstance(self.data['connections'], list):
            self.errors.append("❌ Campo 'connections' deve ser um array")

        if 'metadata' not in self.data:
            self.warnings.append("⚠️  Campo 'metadata' ausente")

    def validate_stories(self):
        """Valida cada story"""
        stories = self.data.get('stories', [])
        ids = set()

        required_fields = ['id', 'title', 'category', 'summary', 'content',
                          'connections', 'position', 'color', 'importance', 'status']
        valid_categories = {'character', 'event', 'location', 'technology', 'culture', 'mystery'}
        valid_importance = {'low', 'medium', 'high', 'critical'}
        valid_status = {'draft', 'complete', 'archived'}

        for i, story in enumerate(stories):
            # IDs únicos
            story_id = story.get('id', f'<missing-{i}>')
            if story_id in ids:
                self.errors.append(f"❌ ID duplicado: {story_id}")
            ids.add(story_id)

            # Campos obrigatórios
            for field in required_fields:
                if field not in story:
                    self.errors.append(f"❌ Story '{story_id}': campo '{field}' ausente")

            # Validações de tipo
            category = story.get('category')
            if category and category not in valid_categories:
                self.errors.append(f"❌ Story '{story_id}': categoria inválida '{category}'")

            importance = story.get('importance')
            if importance and importance not in valid_importance:
                self.errors.append(f"❌ Story '{story_id}': importância inválida '{importance}'")

            status = story.get('status')
            if status and status not in valid_status:
                self.errors.append(f"❌ Story '{story_id}': status inválido '{status}'")

            # Posição válida
            position = story.get('position', {})
            if not all(k in position for k in ['x', 'y', 'z']):
                self.errors.append(f"❌ Story '{story_id}': posição incompleta")

            # Summary vazio
            if not story.get('summary', '').strip():
                self.warnings.append(f"⚠️  Story '{story_id}': summary vazio")

        return ids

    def validate_connections(self, valid_ids: set):
        """Valida conexões"""
        connections = self.data.get('connections', [])

        for i, conn in enumerate(connections):
            # Campos obrigatórios
            if 'from' not in conn:
                self.errors.append(f"❌ Conexão {i}: campo 'from' ausente")
                continue
            if 'to' not in conn:
                self.errors.append(f"❌ Conexão {i}: campo 'to' ausente")
                continue

            # IDs válidos
            from_id = conn['from']
            to_id = conn['to']

            if from_id not in valid_ids:
                self.errors.append(f"❌ Conexão: 'from' referencia ID inexistente '{from_id}'")

            if to_id not in valid_ids:
                self.errors.append(f"❌ Conexão: 'to' referencia ID inexistente '{to_id}'")

            # Auto-conexão
            if from_id == to_id:
                self.warnings.append(f"⚠️  Conexão: auto-referência '{from_id}' -> '{to_id}'")

            # Tipo e strength
            if 'type' not in conn:
                self.warnings.append(f"⚠️  Conexão {from_id}->{to_id}: sem campo 'type'")

            if 'strength' not in conn:
                self.warnings.append(f"⚠️  Conexão {from_id}->{to_id}: sem campo 'strength'")
            elif not (0 <= conn['strength'] <= 1):
                self.errors.append(f"❌ Conexão {from_id}->{to_id}: strength deve estar entre 0 e 1")

    def validate_metadata(self):
        """Valida metadados"""
        metadata = self.data.get('metadata', {})

        if 'generated_at' not in metadata:
            self.warnings.append("⚠️  Metadata: campo 'generated_at' ausente")

        if 'stats' not in metadata:
            self.warnings.append("⚠️  Metadata: campo 'stats' ausente")
        else:
            stats = metadata['stats']
            actual_stories = len(self.data.get('stories', []))
            actual_connections = len(self.data.get('connections', []))

            if stats.get('total_nodes') != actual_stories:
                self.errors.append(
                    f"❌ Stats: total_nodes ({stats.get('total_nodes')}) "
                    f"não corresponde ao número real ({actual_stories})"
                )

            if stats.get('total_connections') != actual_connections:
                self.errors.append(
                    f"❌ Stats: total_connections ({stats.get('total_connections')}) "
                    f"não corresponde ao número real ({actual_connections})"
                )

    def validate(self) -> bool:
        """Executa todas as validações"""
        print("🔍 Validando JSON do grafo...\n")

        if not self.load_json():
            return False

        print(f"✓ JSON carregado: {self.json_path}")
        print(f"✓ Tamanho: {self.json_path.stat().st_size / 1024:.2f} KB\n")

        self.validate_structure()
        valid_ids = self.validate_stories()
        self.validate_connections(valid_ids)
        self.validate_metadata()

        return self.print_results()

    def print_results(self) -> bool:
        """Imprime resultados da validação"""
        print("\n" + "="*60)

        if self.errors:
            print(f"\n❌ {len(self.errors)} ERRO(S) ENCONTRADO(S):\n")
            for error in self.errors[:20]:  # Limita a 20 erros
                print(f"  {error}")
            if len(self.errors) > 20:
                print(f"\n  ... e mais {len(self.errors) - 20} erros")

        if self.warnings:
            print(f"\n⚠️  {len(self.warnings)} AVISO(S):\n")
            for warning in self.warnings[:10]:  # Limita a 10 avisos
                print(f"  {warning}")
            if len(self.warnings) > 10:
                print(f"\n  ... e mais {len(self.warnings) - 10} avisos")

        if not self.errors and not self.warnings:
            print("\n✅ VALIDAÇÃO PASSOU! Nenhum erro ou aviso encontrado.")
        elif not self.errors:
            print("\n✅ VALIDAÇÃO PASSOU com avisos (não críticos).")
        else:
            print("\n❌ VALIDAÇÃO FALHOU! Corrija os erros acima.")

        print("="*60 + "\n")

        return len(self.errors) == 0

def main():
    parser = argparse.ArgumentParser(description='Valida JSON do grafo de histórias')
    parser.add_argument(
        '--input', '-i',
        default='public/data/graph-data.json',
        help='Caminho do arquivo JSON'
    )

    args = parser.parse_args()

    validator = GraphValidator(args.input)
    success = validator.validate()

    exit(0 if success else 1)

if __name__ == '__main__':
    main()
