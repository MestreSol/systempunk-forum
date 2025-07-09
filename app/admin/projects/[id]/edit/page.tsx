"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, FileText, Settings, Image, Users, Plus, Trash2, ArrowUp, ArrowDown, GripVertical, UserPlus, CheckCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface ProjectEditProps {
  params: Promise<{ id: string }>;
}

interface Item {
  text: string;
  status: 'todo' | 'ongoing' | 'done' | 'stopped';
}

interface Section {
  title: string;
  items: Item[];
}

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  description: string;
}

interface GlobalTeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  description: string;
  skills: string[];
  availability: 'available' | 'busy' | 'unavailable';
  email?: string;
  portfolio?: string;
}

interface LoreItem {
  title: string;
  description: string;
  image: string;
}

interface ProjectData {
  hero: { title: string; subtitle: string; image: string };
  platforms: string[];
  fastDescription: { description: string; video: string };
  lastNews: unknown[];
  lore: LoreItem[];
  media: string[];
  footer: { company: string; rating: string; platforms: string[]; copyright: string };
  customCss: string;
  sprints: unknown[];
  roadmap: unknown[];
  team: TeamMember[];
}

const statusOptions = [
  { value: 'todo', label: '⬜ Todo', color: 'text-gray-400' },
  { value: 'ongoing', label: '🟡 Em andamento', color: 'text-yellow-400' },
  { value: 'done', label: '✅ Concluído', color: 'text-green-400' },
  { value: 'stopped', label: '⛔ Parado', color: 'text-red-400' }
];

export default function EditProject(props: ProjectEditProps) {
  const params = React.use(props.params);
  const [projectData, setProjectData] = useState<ProjectData>({
    hero: { title: '', subtitle: '', image: '' },
    platforms: [],
    fastDescription: { description: '', video: '' },
    lastNews: [],
    lore: [],
    media: [],
    footer: { company: '', rating: '', platforms: [], copyright: '' },
    customCss: '',
    sprints: [],
    roadmap: [],
    team: []
  });

  const [sprintSections, setSprintSections] = useState<Section[]>([]);
  const [todoSections, setTodoSections] = useState<Section[]>([]);
  const [customCss, setCustomCss] = useState('');
  const [globalTeamMembers, setGlobalTeamMembers] = useState<GlobalTeamMember[]>([]);
  const [isSelectTeamModalOpen, setIsSelectTeamModalOpen] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  // Helper para converter markdown para lista de itens
  function parseMarkdownToItems(content: string, type: 'sprint' | 'todo'): Section[] {
    const sections: Section[] = [];
    const lines = content.split('\n');
    
    let currentSection: Section | null = null;
    
    for (const line of lines) {
      if (type === 'sprint' && line.startsWith('## 🟦 Sprint')) {
        if (currentSection) sections.push(currentSection);
        currentSection = {
          title: line.replace(/^## 🟦\s*/, '').trim(),
          items: []
        };
      } else if (type === 'todo' && line.match(/^##\s+[^#]/)) {
        if (currentSection) sections.push(currentSection);
        currentSection = {
          title: line.replace(/^##\s*/, '').replace(/🎮|🛒|🤝|🔼|⚙️|🧪|📈/g, '').trim(),
          items: []
        };
      } else if (currentSection && line.trim().startsWith('* ')) {
        const text = line.replace(/^[*]\s*(✅|🟡|⛔|⬜|\[x\]|\[\s*\])\s*/, '').trim();
        let status: 'todo' | 'ongoing' | 'done' | 'stopped' = 'todo';
        
        if (line.includes('✅') || line.includes('[x]')) status = 'done';
        else if (line.includes('🟡')) status = 'ongoing';
        else if (line.includes('⛔')) status = 'stopped';
        else if (line.includes('⬜') || line.includes('[ ]')) status = 'todo';
        
        if (text) {
          currentSection.items.push({ text, status });
        }
      }
    }
    
    if (currentSection) sections.push(currentSection);
    return sections;
  }

  // Helper para converter lista de itens para markdown
  function convertItemsToMarkdown(sections: Section[], type: 'sprint' | 'todo'): string {
    let markdown = '';
    
    if (type === 'sprint') {
      markdown += '# 📊 Status das Sprints - Dawson Miller Supermarket Systems\n\n';
      markdown += 'Formato simplificado para acompanhamento do progresso do projeto com base em atividades divididas por sprint. Cada item tem um status associado: `✅ done`, `🟡 ongoing`, `⛔ stopped`, `⬜ todo`.\n\n---\n\n';
    } else {
      markdown += '# ✅ TODO - Dawson Miller Supermarket Systems\n\n';
      markdown += 'Este arquivo documenta e acompanha o progresso do desenvolvimento do jogo...\n\n---\n\n';
    }
    
    sections.forEach((section) => {
      if (type === 'sprint') {
        markdown += `## 🟦 ${section.title}\n\n`;
      } else {
        markdown += `## ${section.title}\n\n`;
      }
      
      section.items.forEach((item) => {
        let statusIcon = '⬜';
        if (item.status === 'done') statusIcon = '✅';
        else if (item.status === 'ongoing') statusIcon = '🟡';
        else if (item.status === 'stopped') statusIcon = '⛔';
        
        markdown += `* ${statusIcon} ${item.text}\n`;
      });
      
      markdown += '\n---\n\n';
    });
    
    return markdown;
  }

  useEffect(() => {
    // Carregar dados do projeto e equipe global
    const loadProjectData = async () => {
      try {
        // Carregar dados do projeto
        const response = await fetch(`/projects/jogo/${params.id}/${params.id}.json`);
        if (response.ok) {
          const data = await response.json();
          setProjectData(data);
          setCustomCss(data.customCss || '');
        }

        // Carregar arquivos Markdown
        const [sprintsRes, todoRes] = await Promise.all([
          fetch(`/projects/jogo/${params.id}/Sprints.md`),
          fetch(`/projects/jogo/${params.id}/TODO.md`)
        ]);

        if (sprintsRes.ok) {
          const sprintsContent = await sprintsRes.text();
          setSprintSections(parseMarkdownToItems(sprintsContent, 'sprint'));
        }
        if (todoRes.ok) {
          const todoContent = await todoRes.text();
          setTodoSections(parseMarkdownToItems(todoContent, 'todo'));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do projeto:', error);
      }
    };

    // Carregar membros da equipe global
    const loadGlobalTeam = async () => {
      try {
        // Simulação de dados da equipe global (mesmos do painel de equipe)
        const mockGlobalTeam: GlobalTeamMember[] = [
          {
            id: '1',
            name: 'João Silva',
            role: 'Game Designer',
            photo: '/team/joao.jpg',
            description: 'Responsável pelo design de mecânicas, balanceamento e experiência do jogador.',
            skills: ['Game Design', 'Balanceamento', 'UX'],
            availability: 'available',
            email: 'joao@exemplo.com',
            portfolio: 'https://joao.portfolio.com'
          },
          {
            id: '2',
            name: 'Maria Souza',
            role: 'Desenvolvedora Unity',
            photo: '/team/maria.jpg',
            description: 'Implementação de sistemas, multiplayer e integração com backend.',
            skills: ['Unity', 'C#', 'Multiplayer'],
            availability: 'busy',
            email: 'maria@exemplo.com'
          },
          {
            id: '3',
            name: 'Carlos Lima',
            role: 'Artista 2D/3D',
            photo: '/team/carlos.jpg',
            description: 'Criação de assets visuais, animações e identidade gráfica do jogo.',
            skills: ['Blender', 'Photoshop', 'Animation'],
            availability: 'available',
            email: 'carlos@exemplo.com'
          },
          {
            id: '4',
            name: 'Ana Costa',
            role: 'Sound Designer',
            photo: '/team/ana.jpg',
            description: 'Criação de trilha sonora, efeitos sonoros e implementação de áudio.',
            skills: ['Audio', 'Music', 'Wwise'],
            availability: 'available',
            email: 'ana@exemplo.com'
          },
          {
            id: '5',
            name: 'Pedro Santos',
            role: 'QA Tester',
            photo: '/team/pedro.jpg',
            description: 'Testes de qualidade, detecção de bugs e validação de funcionalidades.',
            skills: ['Testing', 'Bug Tracking', 'QA'],
            availability: 'unavailable',
            email: 'pedro@exemplo.com'
          }
        ];
        
        setGlobalTeamMembers(mockGlobalTeam);
      } catch (error) {
        console.error('Erro ao carregar equipe global:', error);
      }
    };

    loadProjectData();
    loadGlobalTeam();
  }, [params.id]);

  const handleSave = () => {
    const sprintsMarkdown = convertItemsToMarkdown(sprintSections, 'sprint');
    const todoMarkdown = convertItemsToMarkdown(todoSections, 'todo');
    
    // Atualizar o customCss no projectData
    const updatedProjectData = {
      ...projectData,
      customCss: customCss
    };
    
    console.log('Salvando projeto:', updatedProjectData);
    console.log('Sprints Markdown:', sprintsMarkdown);
    console.log('TODO Markdown:', todoMarkdown);
    console.log('Custom CSS:', customCss);
    
    // Aqui você implementaria a lógica real de salvamento
    alert('Dados salvos com sucesso! (Em modo de demonstração)');
  };

  const addSection = (type: 'sprint' | 'todo') => {
    const newSection: Section = {
      title: `Nova ${type === 'sprint' ? 'Sprint' : 'Seção'}`,
      items: []
    };
    
    if (type === 'sprint') {
      setSprintSections(prev => [...prev, newSection]);
    } else {
      setTodoSections(prev => [...prev, newSection]);
    }
  };

  const removeSection = (type: 'sprint' | 'todo', index: number) => {
    if (type === 'sprint') {
      setSprintSections(prev => prev.filter((_, i) => i !== index));
    } else {
      setTodoSections(prev => prev.filter((_, i) => i !== index));
    }
  };

  const moveSection = (type: 'sprint' | 'todo', index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (type === 'sprint') {
      setSprintSections(prev => {
        if (targetIndex >= 0 && targetIndex < prev.length) {
          const newSections = [...prev];
          [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
          return newSections;
        }
        return prev;
      });
    } else {
      setTodoSections(prev => {
        if (targetIndex >= 0 && targetIndex < prev.length) {
          const newSections = [...prev];
          [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
          return newSections;
        }
        return prev;
      });
    }
  };

  const duplicateSection = (type: 'sprint' | 'todo', index: number) => {
    if (type === 'sprint') {
      setSprintSections(prev => {
        const sectionToDuplicate = { ...prev[index] };
        sectionToDuplicate.title = `${sectionToDuplicate.title} (Cópia)`;
        sectionToDuplicate.items = sectionToDuplicate.items.map(item => ({ ...item }));
        const newSections = [...prev];
        newSections.splice(index + 1, 0, sectionToDuplicate);
        return newSections;
      });
    } else {
      setTodoSections(prev => {
        const sectionToDuplicate = { ...prev[index] };
        sectionToDuplicate.title = `${sectionToDuplicate.title} (Cópia)`;
        sectionToDuplicate.items = sectionToDuplicate.items.map(item => ({ ...item }));
        const newSections = [...prev];
        newSections.splice(index + 1, 0, sectionToDuplicate);
        return newSections;
      });
    }
  };

  const updateSectionTitle = (type: 'sprint' | 'todo', index: number, title: string) => {
    if (type === 'sprint') {
      setSprintSections(prev => prev.map((section, i) => 
        i === index ? { ...section, title } : section
      ));
    } else {
      setTodoSections(prev => prev.map((section, i) => 
        i === index ? { ...section, title } : section
      ));
    }
  };

  const addItem = (type: 'sprint' | 'todo', sectionIndex: number) => {
    const newItem: Item = {
      text: 'Novo item',
      status: 'todo'
    };
    
    if (type === 'sprint') {
      setSprintSections(prev => prev.map((section, i) => 
        i === sectionIndex ? { ...section, items: [...section.items, newItem] } : section
      ));
    } else {
      setTodoSections(prev => prev.map((section, i) => 
        i === sectionIndex ? { ...section, items: [...section.items, newItem] } : section
      ));
    }
  };

  const removeItem = (type: 'sprint' | 'todo', sectionIndex: number, itemIndex: number) => {
    if (type === 'sprint') {
      setSprintSections(prev => prev.map((section, i) => 
        i === sectionIndex ? { ...section, items: section.items.filter((_, j) => j !== itemIndex) } : section
      ));
    } else {
      setTodoSections(prev => prev.map((section, i) => 
        i === sectionIndex ? { ...section, items: section.items.filter((_, j) => j !== itemIndex) } : section
      ));
    }
  };

  const updateItem = (type: 'sprint' | 'todo', sectionIndex: number, itemIndex: number, item: Partial<Item>) => {
    if (type === 'sprint') {
      setSprintSections(prev => prev.map((section, i) => 
        i === sectionIndex 
          ? { 
              ...section, 
              items: section.items.map((existingItem, j) => 
                j === itemIndex ? { ...existingItem, ...item } : existingItem
              ) 
            } 
          : section
      ));
    } else {
      setTodoSections(prev => prev.map((section, i) => 
        i === sectionIndex 
          ? { 
              ...section, 
              items: section.items.map((existingItem, j) => 
                j === itemIndex ? { ...existingItem, ...item } : existingItem
              ) 
            } 
          : section
      ));
    }
  };

  const calculateProgress = (items: Item[]) => {
    if (items.length === 0) return 0;
    const doneItems = items.filter(item => item.status === 'done').length;
    return Math.round((doneItems / items.length) * 100);
  };

  // Funções para gerenciar o Lore
  const addLoreItem = () => {
    const newLoreItem: LoreItem = {
      title: 'Novo Item de Lore',
      description: 'Descrição do novo item',
      image: '/default-image.jpg'
    };
    
    setProjectData(prev => ({
      ...prev,
      lore: [...prev.lore, newLoreItem]
    }));
  };

  const removeLoreItem = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      lore: prev.lore.filter((_, i) => i !== index)
    }));
  };

  const updateLoreItem = (index: number, field: keyof LoreItem, value: string) => {
    setProjectData(prev => ({
      ...prev,
      lore: prev.lore.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Funções para reordenar Lore
  const moveLoreItem = (index: number, direction: 'up' | 'down') => {
    setProjectData(prev => {
      const newLore = [...prev.lore];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (targetIndex >= 0 && targetIndex < newLore.length) {
        [newLore[index], newLore[targetIndex]] = [newLore[targetIndex], newLore[index]];
      }
      
      return { ...prev, lore: newLore };
    });
  };

  const duplicateLoreItem = (index: number) => {
    setProjectData(prev => {
      const itemToDuplicate = { ...prev.lore[index] };
      itemToDuplicate.title = `${itemToDuplicate.title} (Cópia)`;
      const newLore = [...prev.lore];
      newLore.splice(index + 1, 0, itemToDuplicate);
      
      return { ...prev, lore: newLore };
    });
  };

  // Funções para gerenciar a seleção de equipe
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-400';
      case 'busy': return 'text-yellow-400';
      case 'unavailable': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'available': return '✅ Disponível';
      case 'busy': return '🟡 Ocupado';
      case 'unavailable': return '⛔ Indisponível';
      default: return '❓ Não definido';
    }
  };

  const openTeamSelectionModal = () => {
    // Encontrar IDs dos membros já no projeto para pré-selecionar
    const currentMemberIds = projectData.team
      .map(member => {
        const globalMember = globalTeamMembers.find(gm => 
          gm.name === member.name && gm.role === member.role
        );
        return globalMember?.id;
      })
      .filter(Boolean) as string[];
    
    setSelectedMemberIds(currentMemberIds);
    setIsSelectTeamModalOpen(true);
  };

  const handleMemberSelection = (memberId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedMemberIds(prev => [...prev, memberId]);
    } else {
      setSelectedMemberIds(prev => prev.filter(id => id !== memberId));
    }
  };

  const confirmMemberSelection = () => {
    // Converter membros selecionados para o formato do projeto
    const selectedMembers = globalTeamMembers
      .filter(member => selectedMemberIds.includes(member.id))
      .map(member => ({
        name: member.name,
        role: member.role,
        photo: member.photo,
        description: member.description
      }));

    setProjectData(prev => ({ ...prev, team: selectedMembers }));
    setIsSelectTeamModalOpen(false);
  };

  const addManualTeamMember = () => {
    const newMember = {
      name: 'Novo Membro',
      role: 'Função',
      photo: '/team/default.jpg',
      description: 'Descrição do membro da equipe.'
    };
    setProjectData(prev => ({ ...prev, team: [...prev.team, newMember] }));
  };

  const renderSectionEditor = (sections: Section[], type: 'sprint' | 'todo') => (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <Card key={sectionIndex} className="bg-zinc-800 border-zinc-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <GripVertical className="w-5 h-5 text-zinc-400 cursor-move" />
                <Input
                  value={section.title}
                  onChange={(e) => updateSectionTitle(type, sectionIndex, e.target.value)}
                  className="bg-zinc-700 border-zinc-600 text-white font-semibold text-lg"
                  placeholder={`Digite o título da ${type === 'sprint' ? 'sprint' : 'seção'}...`}
                />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-lime-400 font-mono text-sm">
                  {calculateProgress(section.items)}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(type, sectionIndex, 'up')}
                  disabled={sectionIndex === 0}
                  className="text-zinc-400 hover:text-white hover:bg-zinc-700"
                  title="Mover para cima"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(type, sectionIndex, 'down')}
                  disabled={sectionIndex === sections.length - 1}
                  className="text-zinc-400 hover:text-white hover:bg-zinc-700"
                  title="Mover para baixo"
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => duplicateSection(type, sectionIndex)}
                  className="text-blue-400 hover:bg-blue-900/20"
                  title="Duplicar seção"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSection(type, sectionIndex)}
                  className="text-red-400 hover:bg-red-900/20"
                  title="Remover seção"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-700">
                  <TableHead className="text-zinc-300">Status</TableHead>
                  <TableHead className="text-zinc-300">Tarefa</TableHead>
                  <TableHead className="text-zinc-300 w-24">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {section.items.map((item, itemIndex) => (
                  <TableRow key={itemIndex} className="border-zinc-700">
                    <TableCell className="w-48">
                      <Select
                        value={item.status}
                        onValueChange={(value: 'todo' | 'ongoing' | 'done' | 'stopped') => 
                          updateItem(type, sectionIndex, itemIndex, { status: value })
                        }
                      >
                        <SelectTrigger className="bg-zinc-700 border-zinc-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {statusOptions.map(option => (
                            <SelectItem key={option.value} value={option.value} className="text-white">
                              <span className={option.color}>{option.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.text}
                        onChange={(e) => updateItem(type, sectionIndex, itemIndex, { text: e.target.value })}
                        className="bg-zinc-700 border-zinc-600 text-white"
                        placeholder="Descreva a tarefa..."
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(type, sectionIndex, itemIndex)}
                        className="text-red-400 hover:bg-red-900/20"
                        title="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {section.items.length === 0 && (
              <div className="text-center py-8 text-zinc-400">
                <p className="text-sm">Nenhuma tarefa adicionada ainda</p>
              </div>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem(type, sectionIndex)}
              className="mt-4 border-zinc-600 hover:bg-zinc-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Item
            </Button>
          </CardContent>
        </Card>
      ))}
      
      {sections.length === 0 && (
        <div className="text-center py-12 text-zinc-400">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">Nenhuma {type === 'sprint' ? 'sprint' : 'seção'} criada ainda</p>
          <p className="text-sm">Clique no botão abaixo para adicionar a primeira {type === 'sprint' ? 'sprint' : 'seção'}</p>
        </div>
      )}
      
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => addSection(type)}
          className="border-lime-600 text-lime-400 hover:bg-lime-900/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar {type === 'sprint' ? 'Sprint' : 'Seção'}
        </Button>
        
        {sections.length > 0 && (
          <Button
            variant="outline"
            onClick={() => {
              const templates = type === 'sprint' ? [
                { title: 'Setup e Configuração', items: [{ text: 'Configurar ambiente de desenvolvimento', status: 'todo' as const }] },
                { title: 'Desenvolvimento de Features', items: [{ text: 'Implementar funcionalidade principal', status: 'todo' as const }] },
                { title: 'Testes e QA', items: [{ text: 'Executar testes unitários', status: 'todo' as const }] }
              ] : [
                { title: 'Bugs e Correções', items: [{ text: 'Corrigir bug reportado', status: 'todo' as const }] },
                { title: 'Melhorias', items: [{ text: 'Otimizar performance', status: 'todo' as const }] },
                { title: 'Documentação', items: [{ text: 'Atualizar documentação', status: 'todo' as const }] }
              ];
              
              const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
              
              if (type === 'sprint') {
                setSprintSections(prev => [...prev, randomTemplate]);
              } else {
                setTodoSections(prev => [...prev, randomTemplate]);
              }
            }}
            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Template
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Painel
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-lime-400 mb-2">Editar Projeto: {params.id}</h1>
              <p className="text-zinc-400">Gerencie todas as informações do projeto</p>
            </div>
            <Button onClick={handleSave} className="bg-lime-600 hover:bg-lime-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        <Tabs defaultValue="sprints" className="space-y-6">
          <TabsList className="bg-zinc-900 border-zinc-800">
            <TabsTrigger value="sprints" className="data-[state=active]:bg-lime-600">
              <FileText className="w-4 h-4 mr-2" />
              Sprints
            </TabsTrigger>
            <TabsTrigger value="todo" className="data-[state=active]:bg-lime-600">
              <FileText className="w-4 h-4 mr-2" />
              TODO
            </TabsTrigger>
            <TabsTrigger value="lore" className="data-[state=active]:bg-lime-600">
              <FileText className="w-4 h-4 mr-2" />
              Lore
            </TabsTrigger>
            <TabsTrigger value="css" className="data-[state=active]:bg-lime-600">
              <Settings className="w-4 h-4 mr-2" />
              CSS
            </TabsTrigger>
            <TabsTrigger value="general" className="data-[state=active]:bg-lime-600">
              <Settings className="w-4 h-4 mr-2" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-lime-600">
              <Image className="w-4 h-4 mr-2" />
              Mídia
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-lime-600">
              <Users className="w-4 h-4 mr-2" />
              Equipe
            </TabsTrigger>
          </TabsList>

          {/* Sprints Tab */}
          <TabsContent value="sprints" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Gerenciar Sprints</CardTitle>
                <CardDescription>
                  Edite as sprints do projeto visualmente. Os dados serão convertidos para Markdown automaticamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderSectionEditor(sprintSections, 'sprint')}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TODO Tab */}
          <TabsContent value="todo" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Gerenciar TODO</CardTitle>
                <CardDescription>
                  Edite a lista TODO do projeto visualmente. Os dados serão convertidos para Markdown automaticamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderSectionEditor(todoSections, 'todo')}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lore Tab */}
          <TabsContent value="lore" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Gerenciar Lore</CardTitle>
                <CardDescription>
                  Edite os itens de lore do projeto. Cada item representa uma seção da história ou mecânica do jogo. Use os botões de seta para reordenar as seções.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projectData.lore.map((loreItem, index) => (
                    <Card key={index} className="bg-zinc-800 border-zinc-700">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-5 h-5 text-zinc-400 cursor-move" />
                            <h3 className="text-lg font-semibold text-white">
                              Item {index + 1}: {loreItem.title || 'Sem título'}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveLoreItem(index, 'up')}
                              disabled={index === 0}
                              className="text-zinc-400 hover:text-white hover:bg-zinc-700"
                              title="Mover para cima"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveLoreItem(index, 'down')}
                              disabled={index === projectData.lore.length - 1}
                              className="text-zinc-400 hover:text-white hover:bg-zinc-700"
                              title="Mover para baixo"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => duplicateLoreItem(index)}
                              className="text-blue-400 hover:bg-blue-900/20"
                              title="Duplicar item"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLoreItem(index)}
                              className="text-red-400 hover:bg-red-900/20"
                              title="Remover item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-zinc-200">Título</Label>
                            <Input
                              value={loreItem.title}
                              onChange={(e) => updateLoreItem(index, 'title', e.target.value)}
                              className="bg-zinc-700 border-zinc-600 text-white"
                              placeholder="Digite o título da seção..."
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-200">Imagem</Label>
                            <Input
                              value={loreItem.image}
                              onChange={(e) => updateLoreItem(index, 'image', e.target.value)}
                              className="bg-zinc-700 border-zinc-600 text-white"
                              placeholder="/path/to/image.jpg"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-zinc-200">Descrição</Label>
                          <Textarea
                            value={loreItem.description}
                            onChange={(e) => updateLoreItem(index, 'description', e.target.value)}
                            className="bg-zinc-700 border-zinc-600 text-white min-h-32"
                            placeholder="Descreva esta seção do lore..."
                          />
                        </div>
                        
                        {/* Preview da seção */}
                        <div className="mt-4 p-4 bg-zinc-900 rounded-lg border border-zinc-600">
                          <h4 className="text-zinc-300 text-sm font-semibold mb-2">Preview:</h4>
                          <div className="bg-zinc-950 p-3 rounded">
                            <h5 className="text-lime-400 font-bold text-lg mb-2">
                              {loreItem.title || 'Título da seção'}
                            </h5>
                            <p className="text-zinc-300 text-sm mb-2">
                              {loreItem.description || 'Descrição da seção aparecerá aqui...'}
                            </p>
                            <div className="text-xs text-zinc-500">
                              Imagem: {loreItem.image || 'Nenhuma imagem definida'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {projectData.lore.length === 0 && (
                    <div className="text-center py-12 text-zinc-400">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Nenhum item de lore criado ainda</p>
                      <p className="text-sm">Clique no botão abaixo para adicionar o primeiro item</p>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={addLoreItem}
                      className="border-lime-600 text-lime-400 hover:bg-lime-900/20"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Item de Lore
                    </Button>
                    
                    {projectData.lore.length > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          const templates = [
                            {
                              title: "Mecânicas de Jogo",
                              description: "Descreva as principais mecânicas e sistemas do jogo.",
                              image: "/gameplay.jpg"
                            },
                            {
                              title: "História e Narrativa",
                              description: "Conte a história principal e o contexto narrativo.",
                              image: "/story.jpg"
                            },
                            {
                              title: "Personagens",
                              description: "Apresente os principais personagens e suas características.",
                              image: "/characters.jpg"
                            }
                          ];
                          
                          const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
                          setProjectData(prev => ({
                            ...prev,
                            lore: [...prev.lore, randomTemplate]
                          }));
                        }}
                        className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Template
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CSS Tab */}
          <TabsContent value="css" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">CSS Customizado</CardTitle>
                <CardDescription>
                  Edite o CSS customizado do projeto. Este CSS será aplicado à página do projeto para personalizar sua aparência.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customCss" className="text-zinc-200">CSS</Label>
                    <Textarea
                      id="customCss"
                      value={customCss}
                      onChange={(e) => setCustomCss(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white font-mono text-sm min-h-96"
                      placeholder="/* Seu CSS customizado aqui */
.hero-section {
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
}

.custom-button {
  background: #10b981;
  color: white;
}

/* Adicione seus estilos personalizados */"
                    />
                  </div>
                  <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                    <h4 className="text-lime-200 font-semibold mb-2">Dicas de CSS:</h4>
                    <ul className="text-zinc-400 text-sm space-y-1">
                      <li>• Use seletores específicos para evitar conflitos</li>
                      <li>• Teste sempre as mudanças antes de salvar</li>
                      <li>• Classes disponíveis: .hero-section, .lore-section, .footer-section</li>
                      <li>• Evite usar !important sempre que possível</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Informações Básicas</CardTitle>
                <CardDescription>Dados principais do projeto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-zinc-200">Título</Label>
                  <Input
                    id="title"
                    value={projectData.hero.title}
                    onChange={(e) => setProjectData(prev => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value }
                    }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle" className="text-zinc-200">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={projectData.hero.subtitle}
                    onChange={(e) => setProjectData(prev => ({
                      ...prev,
                      hero: { ...prev.hero, subtitle: e.target.value }
                    }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-zinc-200">Descrição Rápida</Label>
                  <Textarea
                    id="description"
                    value={projectData.fastDescription.description}
                    onChange={(e) => setProjectData(prev => ({
                      ...prev,
                      fastDescription: { ...prev.fastDescription, description: e.target.value }
                    }))}
                    className="bg-zinc-800 border-zinc-700 text-white min-h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="video" className="text-zinc-200">URL do Vídeo</Label>
                  <Input
                    id="video"
                    value={projectData.fastDescription.video}
                    onChange={(e) => setProjectData(prev => ({
                      ...prev,
                      fastDescription: { ...prev.fastDescription, video: e.target.value }
                    }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Imagens e Mídia</CardTitle>
                <CardDescription>Gerencie as imagens do projeto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heroImage" className="text-zinc-200">Imagem Hero</Label>
                  <Input
                    id="heroImage"
                    value={projectData.hero.image}
                    onChange={(e) => setProjectData(prev => ({
                      ...prev,
                      hero: { ...prev.hero, image: e.target.value }
                    }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-zinc-200">Galeria de Imagens</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {projectData.media.map((img, idx) => (
                      <div key={idx} className="relative aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                        <span className="text-zinc-500 text-sm">{img}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-2 border-zinc-700">
                    Adicionar Imagem
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Membros da Equipe do Projeto</CardTitle>
                <CardDescription>
                  Selecione membros da equipe global ou adicione membros personalizados ao projeto. Os membros podem ser reordenados usando os botões de seta.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Botões de ação */}
                  <div className="flex gap-3 mb-6">
                    <Dialog open={isSelectTeamModalOpen} onOpenChange={setIsSelectTeamModalOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline"
                          className="border-lime-600 text-lime-400 hover:bg-lime-900/20"
                          onClick={openTeamSelectionModal}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Selecionar da Equipe Global
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                          <DialogTitle className="text-lime-200">Selecionar Membros da Equipe Global</DialogTitle>
                          <DialogDescription className="text-zinc-400">
                            Selecione os membros da equipe global que deseja adicionar ao projeto. Membros já no projeto aparecerão selecionados.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="max-h-96 overflow-y-auto">
                          <div className="grid grid-cols-1 gap-4">
                            {globalTeamMembers.map(member => (
                              <Card key={member.id} className={`bg-zinc-800 border-zinc-700 transition-colors ${
                                selectedMemberIds.includes(member.id) ? 'ring-2 ring-lime-400' : ''
                              }`}>
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <Checkbox
                                      checked={selectedMemberIds.includes(member.id)}
                                      onCheckedChange={(checked) => handleMemberSelection(member.id, checked as boolean)}
                                      className="mt-1"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                                        <Badge 
                                          variant="outline" 
                                          className={`${getAvailabilityColor(member.availability)} border-current`}
                                        >
                                          {getAvailabilityLabel(member.availability)}
                                        </Badge>
                                      </div>
                                      <p className="text-lime-400 font-medium mb-2">{member.role}</p>
                                      <p className="text-zinc-300 text-sm mb-3">{member.description}</p>
                                      
                                      <div className="flex flex-wrap gap-2 mb-2">
                                        {member.skills.map((skill, idx) => (
                                          <Badge key={idx} variant="secondary" className="bg-zinc-700 text-zinc-200">
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                      
                                      {(member.email || member.portfolio) && (
                                        <div className="text-xs text-zinc-400 space-y-1">
                                          {member.email && <p>📧 {member.email}</p>}
                                          {member.portfolio && <p>🌐 {member.portfolio}</p>}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                          <p className="text-zinc-400 text-sm">
                            {selectedMemberIds.length} membro(s) selecionado(s)
                          </p>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              onClick={() => setIsSelectTeamModalOpen(false)}
                              className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                            >
                              Cancelar
                            </Button>
                            <Button
                              onClick={confirmMemberSelection}
                              className="bg-lime-600 hover:bg-lime-700"
                              disabled={selectedMemberIds.length === 0}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Confirmar Seleção ({selectedMemberIds.length})
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline"
                      className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                      onClick={addManualTeamMember}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Membro Personalizado
                    </Button>

                    <Link href="/admin/team">
                      <Button 
                        variant="outline"
                        className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Gerenciar Equipe Global
                      </Button>
                    </Link>
                  </div>

                  {/* Lista de membros no projeto */}
                  <div className="space-y-4">
                    {projectData.team.map((member: TeamMember, idx) => {
                      const globalMember = globalTeamMembers.find(gm => 
                        gm.name === member.name && gm.role === member.role
                      );
                      
                      return (
                        <Card key={idx} className="bg-zinc-800 border-zinc-700">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <GripVertical className="w-5 h-5 text-zinc-400 cursor-move" />
                                <div className="flex items-center gap-3">
                                  {globalMember ? (
                                    <Badge variant="outline" className="text-green-400 border-green-400">
                                      Da Equipe Global
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                                      Personalizado
                                    </Badge>
                                  )}
                                  <h3 className="text-lg font-semibold text-white">
                                    {member.name || `Membro ${idx + 1}`}
                                  </h3>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    if (idx > 0) {
                                      const newTeam = [...projectData.team];
                                      [newTeam[idx], newTeam[idx - 1]] = [newTeam[idx - 1], newTeam[idx]];
                                      setProjectData(prev => ({ ...prev, team: newTeam }));
                                    }
                                  }}
                                  disabled={idx === 0}
                                  className="text-zinc-400 hover:text-white hover:bg-zinc-700"
                                  title="Mover para cima"
                                >
                                  <ArrowUp className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    if (idx < projectData.team.length - 1) {
                                      const newTeam = [...projectData.team];
                                      [newTeam[idx], newTeam[idx + 1]] = [newTeam[idx + 1], newTeam[idx]];
                                      setProjectData(prev => ({ ...prev, team: newTeam }));
                                    }
                                  }}
                                  disabled={idx === projectData.team.length - 1}
                                  className="text-zinc-400 hover:text-white hover:bg-zinc-700"
                                  title="Mover para baixo"
                                >
                                  <ArrowDown className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const memberToDuplicate = { ...member };
                                    memberToDuplicate.name = `${memberToDuplicate.name} (Cópia)`;
                                    const newTeam = [...projectData.team];
                                    newTeam.splice(idx + 1, 0, memberToDuplicate);
                                    setProjectData(prev => ({ ...prev, team: newTeam }));
                                  }}
                                  className="text-blue-400 hover:bg-blue-900/20"
                                  title="Duplicar membro"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newTeam = projectData.team.filter((_, i) => i !== idx);
                                    setProjectData(prev => ({ ...prev, team: newTeam }));
                                  }}
                                  className="text-red-400 hover:bg-red-900/20"
                                  title="Remover membro"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {/* Informações do membro */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label className="text-zinc-200">Nome</Label>
                                <Input
                                  value={member.name}
                                  onChange={(e) => {
                                    const newTeam = [...projectData.team];
                                    newTeam[idx] = { ...member, name: e.target.value };
                                    setProjectData(prev => ({ ...prev, team: newTeam }));
                                  }}
                                  className="bg-zinc-700 border-zinc-600 text-white"
                                  placeholder="Nome do membro..."
                                  disabled={!!globalMember}
                                />
                                {globalMember && (
                                  <p className="text-xs text-zinc-400 mt-1">
                                    Este campo é readonly para membros da equipe global
                                  </p>
                                )}
                              </div>
                              <div>
                                <Label className="text-zinc-200">Cargo</Label>
                                <Input
                                  value={member.role}
                                  onChange={(e) => {
                                    const newTeam = [...projectData.team];
                                    newTeam[idx] = { ...member, role: e.target.value };
                                    setProjectData(prev => ({ ...prev, team: newTeam }));
                                  }}
                                  className="bg-zinc-700 border-zinc-600 text-white"
                                  placeholder="Cargo do membro..."
                                  disabled={!!globalMember}
                                />
                                {globalMember && (
                                  <p className="text-xs text-zinc-400 mt-1">
                                    Este campo é readonly para membros da equipe global
                                  </p>
                                )}
                              </div>
                              <div>
                                <Label className="text-zinc-200">Foto</Label>
                                <Input
                                  value={member.photo}
                                  onChange={(e) => {
                                    const newTeam = [...projectData.team];
                                    newTeam[idx] = { ...member, photo: e.target.value };
                                    setProjectData(prev => ({ ...prev, team: newTeam }));
                                  }}
                                  className="bg-zinc-700 border-zinc-600 text-white"
                                  placeholder="/path/to/photo.jpg"
                                  disabled={!!globalMember}
                                />
                                {globalMember && (
                                  <p className="text-xs text-zinc-400 mt-1">
                                    Este campo é readonly para membros da equipe global
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <Label className="text-zinc-200">Descrição</Label>
                              <Textarea
                                value={member.description}
                                onChange={(e) => {
                                  const newTeam = [...projectData.team];
                                  newTeam[idx] = { ...member, description: e.target.value };
                                  setProjectData(prev => ({ ...prev, team: newTeam }));
                                }}
                                className="bg-zinc-700 border-zinc-600 text-white"
                                placeholder="Descrição do membro da equipe..."
                                disabled={!!globalMember}
                              />
                              {globalMember && (
                                <p className="text-xs text-zinc-400 mt-1">
                                  Este campo é readonly para membros da equipe global
                                </p>
                              )}
                            </div>

                            {/* Informações adicionais para membros da equipe global */}
                            {globalMember && (
                              <div className="mt-4 p-3 bg-zinc-900 rounded-lg border border-zinc-600">
                                <h4 className="text-zinc-300 text-sm font-semibold mb-2">Informações da Equipe Global:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-zinc-400">Disponibilidade:</p>
                                    <p className={getAvailabilityColor(globalMember.availability)}>
                                      {getAvailabilityLabel(globalMember.availability)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-zinc-400">Habilidades:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {globalMember.skills.map((skill, skillIdx) => (
                                        <Badge key={skillIdx} variant="secondary" className="bg-zinc-700 text-zinc-200 text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  {globalMember.email && (
                                    <div>
                                      <p className="text-zinc-400">Email:</p>
                                      <p className="text-zinc-300">{globalMember.email}</p>
                                    </div>
                                  )}
                                  {globalMember.portfolio && (
                                    <div>
                                      <p className="text-zinc-400">Portfólio:</p>
                                      <p className="text-zinc-300 truncate">{globalMember.portfolio}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                    
                    {projectData.team.length === 0 && (
                      <div className="text-center py-12 text-zinc-400">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg mb-2">Nenhum membro da equipe adicionado ainda</p>
                        <p className="text-sm mb-4">Selecione membros da equipe global ou adicione membros personalizados</p>
                        <div className="flex gap-3 justify-center">
                          <Button 
                            variant="outline"
                            className="border-lime-600 text-lime-400 hover:bg-lime-900/20"
                            onClick={openTeamSelectionModal}
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Selecionar da Equipe Global
                          </Button>
                          <Button 
                            variant="outline"
                            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                            onClick={addManualTeamMember}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Membro Personalizado
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
