import { NewsArticle } from '@/types/NewsArticle.type'

export const categoryOptions = [
  { value: 'updates', label: 'Atualizações' },
  { value: 'releases', label: 'Lançamentos' },
  { value: 'devlogs', label: 'Dev Logs' },
  { value: 'announcements', label: 'Anúncios' },
  { value: 'tutorials', label: 'Tutoriais' },
  { value: 'community', label: 'Comunidade' }
]

export const getCategoryLabel = (value: string): string => {
  const option = categoryOptions.find((opt) => opt.value === value)
  return option ? option.label : value
}

// Mock de dados dos artigos (em um app real, isso viria de uma API)
export const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Dawson Miller Supermarket Systems - Beta 0.8 Lançada!',
    excerpt:
      'Nova versão beta com sistema de funcionários aprimorado, novos produtos e correções de bugs importantes.',
    content: `# Dawson Miller Supermarket Systems - Beta 0.8

Estamos empolgados em anunciar o lançamento da **Beta 0.8** do Dawson Miller Supermarket Systems! Esta atualização traz várias melhorias significativas e novos recursos que irão aprimorar sua experiência de gestão de supermercado.

## ✨ Principais Novidades

### 🧑‍💼 Sistema de Funcionários Renovado
- Interface completamente redesenhada para contratação e gestão de funcionários
- Novos níveis de habilidade e especialização
- Sistema de treinamento aprimorado
- Métricas de desempenho em tempo real

### 🛒 Novos Produtos e Categorias
- Mais de 50 novos produtos adicionados
- Categoria de produtos orgânicos
- Seção de eletrônicos expandida
- Produtos sazonais dinâmicos

### 🐛 Correções Importantes
- Corrigido bug de salvamento automático
- Melhorada a performance do sistema de inventário
- Resolvidos problemas de sincronização online
- Interface mais responsiva em dispositivos móveis

## 📊 Estatísticas da Comunidade

Desde o lançamento da Beta 0.7:
- **15.000+** downloads
- **500+** supermercados criados
- **98%** de satisfação dos usuários

## 🔄 Como Atualizar

A atualização será instalada automaticamente no próximo início do jogo. Para usuários que preferem atualização manual:

1. Acesse a página de downloads
2. Faça backup dos seus dados
3. Instale a nova versão
4. Importe seus dados salvos

## 🚀 Próximos Passos

Estamos trabalhando na versão 1.0 que incluirá:
- Modo multiplayer cooperativo
- Sistema de franquias
- Integração com redes sociais
- Editor de mapas personalizado

Obrigado por fazer parte da nossa comunidade beta! Seus feedbacks são essenciais para o desenvolvimento do jogo.

**Equipe SystemPunk**`,
    status: 'published',
    category: 'releases',
    tags: ['Beta', 'Update', 'RR', 'Gameplay'],
    featuredImage: '/news/beta-08-release.jpg',
    author: 'SystemPunk Team',
    publishDate: '2025-01-08',
    lastModified: '2025-01-08',
    views: 1250,
    slug: 'dawson-miller-beta-08-lancada'
  },
  {
    id: '2',
    title: 'Dev Log #15: Sistema de Inventário Redesenhado',
    excerpt:
      'Detalhes sobre as melhorias no sistema de inventário e como isso impacta a experiência do jogador.',
    content: `# Dev Log #15: Sistema de Inventário Redesenhado

Olá, desenvolvedores e jogadores! Hoje queremos compartilhar com vocês as grandes mudanças que estamos implementando no sistema de inventário do Dawson Miller Supermarket Systems.

## 🎯 O Problema

O sistema anterior tinha algumas limitações:
- Interface confusa para gerenciar grandes quantidades de produtos
- Dificuldade para encontrar itens específicos
- Falta de automação para reposição
- Performance ruim com inventários grandes

## 💡 A Solução

### Interface Redesenhada
Nova UI mais intuitiva com:
- Categorização visual melhorada
- Sistema de busca avançado
- Filtros por categoria, preço e disponibilidade
- Visualização em grid e lista

### Automação Inteligente
- Alertas automáticos para produtos em baixo estoque
- Sugestões de reposição baseadas em vendas históricas
- Sistema de pedidos automáticos configurável
- Previsão de demanda por IA

### Performance Otimizada
- Renderização virtual para grandes listas
- Cache inteligente de dados
- Carregamento lazy de imagens
- Redução de 80% no tempo de carregamento

## 🧪 Testes da Comunidade

Durante os testes beta:
- **45%** de redução no tempo gasto gerenciando inventário
- **92%** dos testadores aprovaram a nova interface
- **Zero** crashes relacionados ao inventário
- **3x** mais rápido para encontrar produtos específicos

## 📈 Impacto no Gameplay

As mudanças permitem que vocês:
- Foquem mais na estratégia do que na microgestão
- Gerenciem supermercados maiores com eficiência
- Tomem decisões mais informadas sobre estoque
- Tenham uma experiência mais fluida

## 🔮 Próximos Passos

Na próxima atualização:
- Integração com fornecedores externos
- Sistema de contratos de exclusividade
- Análise avançada de margem de lucro
- Importação/exportação de configurações

Aguardamos seu feedback sobre essas mudanças!

**João Silva - Lead Developer**`,
    status: 'published',
    category: 'devlogs',
    tags: ['DevLog', 'Inventory', 'UX', 'Design'],
    featuredImage: '/news/inventory-redesign.jpg',
    author: 'João Silva',
    publishDate: '2025-01-05',
    lastModified: '2025-01-06',
    views: 892,
    slug: 'dev-log-15-sistema-inventario-redesenhado'
  }
]
