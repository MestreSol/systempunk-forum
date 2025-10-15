# ✅ TODO - Dawson Miller Supermarket Systems

Este arquivo documenta e acompanha o progresso do desenvolvimento do jogo _Dawson Miller Supermarket Systems_, um projeto ambicioso criado com Unity 3D e suporte multiplayer via tecnologia Mirror. O objetivo deste documento é organizar e rastrear cada sistema, modo de jogo, funcionalidade técnica e aspectos narrativos/imersivos que estão sendo desenvolvidos, desde o planejamento até os testes finais. O projeto visa oferecer uma experiência rica em simulação e estratégia de gestão, com diversos modos de jogo e dezenas de sistemas interativos.

---

## 🎮 Modos de Jogo

### 👭 Modo Coop

- [x] Documento de design criado
- [ ] Implementação base do modo cooperativo
- [ ] Sincronização de tarefas com Mirror
- [ ] Divisão de tarefas entre jogadores (ex: caixa, estoque, limpeza)
- [ ] Sistema de comunicação (ping, chat, comandos rápidos e emojis)
- [ ] Restrição de contratação de faxineiros/repositores
- [ ] Lógica de falha/sucesso colaborativo
- [ ] Sistema de progresso conjunto (XP e estatísticas compartilhadas)
- [ ] Interface de matchmaking e criação de salas

### 👀 Modo Concorrência

- [x] Documento de design criado
- [ ] Implementação base do modo competitivo
- [ ] Criação de mercados independentes para cada jogador
- [ ] Competição ativa por clientes, promoções e fornecedores
- [ ] Sistema de sabotagem, espionagem e fake news
- [ ] IA reativa para mercados controlados por NPCs
- [ ] Sistema de pontuação, ranking e economia paralela
- [ ] Lógica de confrontos diretos e impacto cruzado entre mercados

### 🛒 Modo Mercado (Sandbox)

- [x] Documento de design criado
- [ ] Estrutura de gameplay livre com todos os sistemas disponíveis
- [ ] Opções de personalização sem limites narrativos
- [ ] Permissões para edição e expansão de loja desde o início
- [ ] Sistema de cheats e sandbox avançado para testes
- [ ] Ajuste de dificuldades manuais e clima econômico livre

### 📗 Modo História

- [x] Documento de design criado
- [ ] Narrativa principal dividida em capítulos e arcos temáticos
- [ ] Eventos únicos e missões com consequências de longo prazo
- [ ] Árvores de decisão com múltiplos finais
- [ ] Personagens marcantes e interações impactantes
- [ ] Integração com sistemas de Lore, crises, eleições e imprensa
- [ ] Sistema de checkpoint e save específico para modo história

---

## 🛒 Mecânicas de Mercado

### Sistema de Estoque

- [ ] Registro completo e categorizado de produtos
- [ ] Atualização em tempo real com entrada e saída
- [ ] Sistema de empilhamento, paletização e códigos de barra
- [ ] Interface de gráficos, históricos e alertas de escassez
- [ ] Logística de espaço e zoneamento da loja

### Sistema de Entrega com Caminhão

- [ ] Agendamento inteligente de pedidos por demanda
- [ ] Custos variáveis conforme distância e fornecedor
- [ ] Eventos de falha (engarrafamento, roubo, falha mecânica)
- [ ] Rastreamento do caminhão em tempo real com GPS fictício
- [ ] Configuração de rotas prioritárias e terceirização logística

### Sistema de Fornecedores Dinâmicos

- [ ] Geração de perfis com reputação e histórico
- [ ] Ofertas variáveis por escassez, qualidade e promoções
- [ ] Eventos aleatórios e sistema de contratos
- [ ] Riscos de monopólio, quebra de contrato e boicote
- [ ] Sistema de reputação e exclusividade de fornecimento

### Sistema de Validade dos Produtos

- [ ] Produtos com datas de validade distintas
- [ ] Descarte automático ou manual de produtos vencidos
- [ ] Sistema de desconto automático e manual
- [ ] Interface com alertas visuais, sonoros e relatórios semanais
- [ ] Possibilidade de perdas por falta de rotação de estoque

### Sistema de Conforto no Mercado

- [ ] Parâmetros de limpeza, organização, decoração e temperatura
- [ ] Reação emocional dos clientes (animações e feedback)
- [ ] Avaliação geral visível no mapa de calor do ambiente
- [ ] Módulo de som ambiente, música e aromatização

### Sistema de Segurança e Furtos

- [ ] Detecção de furtos com câmeras e IA
- [ ] Empregados e clientes podem cometer furtos
- [ ] Investimento em equipamentos de segurança
- [ ] Registros de perdas com estatísticas de ocorrências
- [ ] Resposta da segurança e perseguições animadas

### Sistema de Clima e Estações

- [ ] Clima dinâmico integrado ao calendário (chuva, calor, frio)
- [ ] Impacto nas vendas (ex: mais sorvete no verão)
- [ ] Eventos sazonais afetam comportamento e logística
- [ ] Customização regional do clima por cidade fictícia

### Sistema de Produção Interna

- [ ] Criação de setores próprios: padaria, hortifruti, açougue
- [ ] Consumo de insumos e controle de qualidade
- [ ] Gestão de funcionários especializados
- [ ] Cálculo de custo-benefício em comparação com compra externa

### Sistema de Franquia

- [ ] Desbloqueio de novas localizações no mapa global
- [ ] Reputação e renome afetam demanda regional
- [ ] Contratação de gerentes e configuração automatizada
- [ ] Transferência de itens e dados entre filiais
- [ ] Relatórios independentes e visão macro do império

### Sistema de Economia e Flutuação de Preços

- [ ] Simulação de oferta e demanda com base em eventos
- [ ] Histórico de preços e gráficos comparativos
- [ ] Eventos como inflação, greve, impostos, incentivos
- [ ] Intervenção governamental e campanhas públicas

### Sistema de Promoção por E-mail

- [ ] Caixa de entrada com propostas e alertas
- [ ] Botão de auto-compra e sistema de resposta rápida
- [ ] Promoções limitadas por tempo e quantidade
- [ ] Histórico de promoções aproveitadas

### Sistema de Publicidade e Marketing

- [ ] Campanhas baseadas em orçamento e canal
- [ ] Público segmentado por região, classe e preferência
- [ ] Medidor de impacto em reputação e fluxo de clientes
- [ ] Integração com NPCs e eventos (ex: rádio local)

### Sistema de Espionagem Empresarial

- [ ] Missões de espionagem com recompensas e penalidades
- [ ] Risco de exposição, chantagem e retaliação
- [ ] Coleta de informações estratégicas (concorrência direta)

### Sistema de Rivalidade Inteligente (IA ou Multiplayer)

- [ ] IA adaptativa com decisões baseadas em dados do jogador
- [ ] Estratégias ofensivas e defensivas automáticas
- [ ] Modo "batalha de mercado" com estatísticas em tempo real

### Sistema de Expansão Modular

- [ ] Interface modular de construção de loja
- [ ] Variação de setores (eletrônicos, brinquedos, utilidades)
- [ ] Impacto direto na clientela e ticket médio

### Sistema de Metas Semanais/Mensais

- [ ] Geração de missões e metas com bônus reais
- [ ] Painel de progresso com metas futuras visíveis
- [ ] Recompensas cumulativas e achievements

### Sistema de Leilão de Fornecedores

- [ ] Evento ao vivo com animação e lances escaláveis
- [ ] Regras de exclusividade e penalidade por desistência

### Sistema de Parcerias Locais

- [ ] Sistema de contratos com restaurantes, cafés, feiras
- [ ] Acesso a produtos exclusivos e campanhas colaborativas
- [ ] Feedback cruzado de reputação entre parceiros

---

## 🤝 Interação e História

### Sistema de Lore nos Diálogos

- [ ] Interações profundas com NPCs e clientes recorrentes
- [ ] Subtramas reveladas por diálogos e pistas visuais

### Sistema de Funcionários com Personalidade

- [ ] Atributos emocionais e comportamentais
- [ ] Conflitos internos e histórias pessoais
- [ ] Sistema de amizades, rivalidades e promoções

### Sistema de Clientes VIP

- [ ] Clientes únicos com requisitos específicos
- [ ] Fidelização com recompensas visuais e narrativas

### Sistema de Problemas Internos

- [ ] Greves, demandas por férias, burnout
- [ ] Sistema de motivação, bônus e RH

### Sistema de Desaparecido no Leite

- [ ] Investigação com pistas visuais e minigame
- [ ] Final alternativo (cômico, sombrio, realista)

### Sistema de Eventos Temáticos

- [ ] Natal, Halloween, Páscoa, Black Friday
- [ ] Decoração especial e eventos limitados

### Sistema de Crises e Emergências

- [ ] Eventos randômicos (apagão, protesto, sabotagem)
- [ ] Decisões rápidas com impactos duradouros

---

## 🔼 Progressão

### Level Up do Mercado

- [ ] Sistema de XP por ações bem-sucedidas
- [ ] Desbloqueios orgânicos e expansão de setor

### Level Up do Jogador

- [ ] Habilidades passivas e perks customizáveis
- [ ] Árvores de progressão e especializações múltiplas

### Customização da Loja

- [ ] Layout interno, cor, iluminação, tema
- [ ] Loja como reflexo da personalidade do jogador

### Decoração do Apartamento

- [ ] Sistema paralelo com ganho de conforto
- [ ] Efeitos na motivação e performance do jogador

---

## ⚙️ Infraestrutura e Arquitetura

- [x] Unity Project Configurado com padrão
- [x] Mirror Instalado, testado e documentado
- [ ] Steam Manager com lobby e matchmaking
- [ ] Sistema de transição entre cenas com persistência
- [ ] Sistema de salvamento seguro para multiplayer
- [ ] Controle de tempo, estações e ciclo de vida global
- [ ] Arquitetura modular para fácil expansão

---

## 🧪 Testes e QA

- [ ] Testes unitários para todos os sistemas principais
- [ ] Testes de integração multiplayer e sincronização
- [ ] Simulação de crises e eventos aleatórios
- [ ] Balanceamento econômico, IA e dificuldade
- [ ] Testes UX/UI com feedback de jogadores
- [ ] Testes de performance e otimização

---

## 📈 Documentação e Organização

- [x] GDD estruturado com diagramas
- [ ] Wireframes completos de menus e HUD
- [ ] Roadmap com marcos e entregas planejadas
- [ ] Checklists semanais e mensais
- [ ] Integração com Trello/Notion para gestão ágil
