"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, Trash2, ArrowUp, ArrowDown, GripVertical, Users } from "lucide-react";
import Link from "next/link";

interface TeamMember {
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

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento dos membros da equipe
    const loadTeamMembers = async () => {
      try {
        // Aqui você faria fetch dos dados reais
        const mockData: TeamMember[] = [
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
          }
        ];
        
        setTeamMembers(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar membros da equipe:', error);
        setIsLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: 'Novo Membro',
      role: 'Função',
      photo: '/team/default.jpg',
      description: 'Descrição do membro da equipe.',
      skills: [],
      availability: 'available'
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string | string[]) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const moveTeamMember = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < teamMembers.length) {
      setTeamMembers(prev => {
        const newMembers = [...prev];
        [newMembers[index], newMembers[targetIndex]] = [newMembers[targetIndex], newMembers[index]];
        return newMembers;
      });
    }
  };

  const duplicateTeamMember = (index: number) => {
    const memberToDuplicate = { ...teamMembers[index] };
    memberToDuplicate.id = Date.now().toString();
    memberToDuplicate.name = `${memberToDuplicate.name} (Cópia)`;
    
    setTeamMembers(prev => {
      const newMembers = [...prev];
      newMembers.splice(index + 1, 0, memberToDuplicate);
      return newMembers;
    });
  };

  const handleSave = () => {
    console.log('Salvando equipe:', teamMembers);
    // Aqui você implementaria a lógica real de salvamento
    alert('Equipe salva com sucesso! (Em modo de demonstração)');
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
              <p className="text-zinc-400">Carregando equipe...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Painel
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-lime-400 mb-2">Gerenciar Equipe</h1>
              <p className="text-zinc-400">Gerencie todos os membros da equipe disponíveis</p>
            </div>
            <Button onClick={handleSave} className="bg-lime-600 hover:bg-lime-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        {/* Team Members */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lime-200">Membros da Equipe</CardTitle>
            <CardDescription>
              Gerencie todos os membros da equipe. Estes membros poderão ser adicionados aos projetos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {teamMembers.map((member, index) => (
                <Card key={member.id} className="bg-zinc-800 border-zinc-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-5 h-5 text-zinc-400 cursor-move" />
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                            <Users className="w-6 h-6 text-zinc-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {member.name || 'Sem nome'}
                            </h3>
                            <p className="text-sm text-zinc-400">
                              {member.role || 'Sem função'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${getAvailabilityColor(member.availability)}`}>
                          {getAvailabilityLabel(member.availability)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveTeamMember(index, 'up')}
                          disabled={index === 0}
                          className="text-zinc-400 hover:text-white hover:bg-zinc-700"
                          title="Mover para cima"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveTeamMember(index, 'down')}
                          disabled={index === teamMembers.length - 1}
                          className="text-zinc-400 hover:text-white hover:bg-zinc-700"
                          title="Mover para baixo"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => duplicateTeamMember(index)}
                          className="text-blue-400 hover:bg-blue-900/20"
                          title="Duplicar membro"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTeamMember(member.id)}
                          className="text-red-400 hover:bg-red-900/20"
                          title="Remover membro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-zinc-200">Nome</Label>
                        <Input
                          value={member.name}
                          onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                          className="bg-zinc-700 border-zinc-600 text-white"
                          placeholder="Nome do membro..."
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-200">Função</Label>
                        <Input
                          value={member.role}
                          onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                          className="bg-zinc-700 border-zinc-600 text-white"
                          placeholder="Função do membro..."
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-zinc-200">Email</Label>
                        <Input
                          value={member.email || ''}
                          onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                          className="bg-zinc-700 border-zinc-600 text-white"
                          placeholder="email@exemplo.com"
                          type="email"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-200">Portfólio</Label>
                        <Input
                          value={member.portfolio || ''}
                          onChange={(e) => updateTeamMember(member.id, 'portfolio', e.target.value)}
                          className="bg-zinc-700 border-zinc-600 text-white"
                          placeholder="https://portfolio.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-zinc-200">Foto</Label>
                        <Input
                          value={member.photo}
                          onChange={(e) => updateTeamMember(member.id, 'photo', e.target.value)}
                          className="bg-zinc-700 border-zinc-600 text-white"
                          placeholder="/path/to/photo.jpg"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-200">Disponibilidade</Label>
                        <select
                          value={member.availability}
                          onChange={(e) => updateTeamMember(member.id, 'availability', e.target.value)}
                          className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white"
                        >
                          <option value="available">✅ Disponível</option>
                          <option value="busy">🟡 Ocupado</option>
                          <option value="unavailable">⛔ Indisponível</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-zinc-200">Descrição</Label>
                      <Textarea
                        value={member.description}
                        onChange={(e) => updateTeamMember(member.id, 'description', e.target.value)}
                        className="bg-zinc-700 border-zinc-600 text-white"
                        placeholder="Descrição do membro da equipe..."
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-zinc-200">Habilidades (separadas por vírgula)</Label>
                      <Input
                        value={member.skills.join(', ')}
                        onChange={(e) => updateTeamMember(member.id, 'skills', e.target.value.split(', ').filter(skill => skill.trim()))}
                        className="bg-zinc-700 border-zinc-600 text-white"
                        placeholder="Unity, C#, Game Design..."
                      />
                      <div className="mt-2 flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-lime-600 text-white text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {teamMembers.length === 0 && (
                <div className="text-center py-12 text-zinc-400">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Nenhum membro da equipe cadastrado ainda</p>
                  <p className="text-sm">Clique no botão abaixo para adicionar o primeiro membro</p>
                </div>
              )}
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={addTeamMember}
                  className="border-lime-600 text-lime-400 hover:bg-lime-900/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Membro
                </Button>
                
                {teamMembers.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const templates = [
                        { name: 'Designer', role: 'UI/UX Designer', photo: '/team/designer.jpg', description: 'Especialista em design de interfaces e experiência do usuário.', skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research'] },
                        { name: 'Desenvolvedor', role: 'Programador Full Stack', photo: '/team/dev.jpg', description: 'Desenvolvedor experiente em múltiplas linguagens.', skills: ['JavaScript', 'React', 'Node.js', 'Python'] },
                        { name: 'Artista', role: 'Artista 3D', photo: '/team/artist.jpg', description: 'Criador de assets visuais e animações.', skills: ['Blender', 'Maya', '3D Modeling', 'Animation'] }
                      ];
                      
                      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
                      const newMember: TeamMember = {
                        id: Date.now().toString(),
                        ...randomTemplate,
                        availability: 'available'
                      };
                      setTeamMembers(prev => [...prev, newMember]);
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
      </div>
    </div>
  );
}
