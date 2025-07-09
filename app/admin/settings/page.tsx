"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save,
  Shield, 
  Database, 
  Mail,
  Globe
} from "lucide-react";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  enableComments: boolean;
  footerText: string;
  enableAnalytics: boolean;
  analyticsId: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'SystemPunk Forum',
    siteDescription: 'Fórum dedicado a projetos de jogos indie e desenvolvimento',
    siteUrl: 'https://systempunk.com',
    contactEmail: 'contato@systempunk.com',
    maintenanceMode: false,
    allowRegistration: true,
    enableComments: true,
    enableAnalytics: false,
    analyticsId: '',
    footerText: '© 2025 SystemPunk. Todos os direitos reservados.'
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Implementar lógica de salvamento
    console.log('Salvando configurações:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleBackup = () => {
    // Implementar lógica de backup
    console.log('Fazendo backup...');
  };

  const handleRestore = () => {
    // Implementar lógica de restauração
    console.log('Restaurando backup...');
  };

  const handleClearCache = () => {
    // Implementar lógica de limpeza de cache
    console.log('Limpando cache...');
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-lime-400 mb-2">Configurações do Site</h1>
              <p className="text-zinc-400">Gerencie as configurações globais do site</p>
            </div>
            <Button onClick={handleSave} className="bg-lime-600 hover:bg-lime-700">
              <Save className="w-4 h-4 mr-2" />
              {saved ? 'Salvo!' : 'Salvar Alterações'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-zinc-900 border-zinc-800">
            <TabsTrigger value="general" className="data-[state=active]:bg-lime-600">
              <Globe className="w-4 h-4 mr-2" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-lime-600">
              <Shield className="w-4 h-4 mr-2" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-lime-600">
              <Database className="w-4 h-4 mr-2" />
              Banco de Dados
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-lime-600">
              <Mail className="w-4 h-4 mr-2" />
              E-mail
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Informações Básicas do Site</CardTitle>
                <CardDescription>Configure as informações principais do site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName" className="text-zinc-200">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings((prev: SiteSettings) => ({ ...prev, siteName: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="siteDescription" className="text-zinc-200">Descrição do Site</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings((prev: SiteSettings) => ({ ...prev, siteDescription: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="siteUrl" className="text-zinc-200">URL do Site</Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(e) => setSettings((prev: SiteSettings) => ({ ...prev, siteUrl: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail" className="text-zinc-200">E-mail de Contato</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings((prev: SiteSettings) => ({ ...prev, contactEmail: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="footerText" className="text-zinc-200">Texto do Rodapé</Label>
                  <Input
                    id="footerText"
                    value={settings.footerText}
                    onChange={(e) => setSettings((prev: SiteSettings) => ({ ...prev, footerText: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Funcionalidades</CardTitle>
                <CardDescription>Ative ou desative funcionalidades do site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-zinc-200">Modo de Manutenção</Label>
                    <p className="text-sm text-zinc-400">Desabilita o acesso público ao site</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings((prev: SiteSettings) => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-zinc-200">Permitir Registro</Label>
                    <p className="text-sm text-zinc-400">Permite que novos usuários se registrem</p>
                  </div>
                  <Switch
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => setSettings((prev: SiteSettings) => ({ ...prev, allowRegistration: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-zinc-200">Habilitar Comentários</Label>
                    <p className="text-sm text-zinc-400">Permite comentários em notícias e projetos</p>
                  </div>
                  <Switch
                    checked={settings.enableComments}
                    onCheckedChange={(checked) => setSettings((prev: SiteSettings) => ({ ...prev, enableComments: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Analytics</CardTitle>
                <CardDescription>Configurações de análise e métricas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-zinc-200">Habilitar Analytics</Label>
                    <p className="text-sm text-zinc-400">Ativa o Google Analytics ou similar</p>
                  </div>
                  <Switch
                    checked={settings.enableAnalytics}
                    onCheckedChange={(checked) => setSettings((prev: SiteSettings) => ({ ...prev, enableAnalytics: checked }))}
                  />
                </div>

                {settings.enableAnalytics && (
                  <div>
                    <Label htmlFor="analyticsId" className="text-zinc-200">ID do Analytics</Label>
                    <Input
                      id="analyticsId"
                      value={settings.analyticsId}
                      onChange={(e) => setSettings((prev: SiteSettings) => ({ ...prev, analyticsId: e.target.value }))}
                      placeholder="G-XXXXXXXXXX"
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Configurações de Segurança</CardTitle>
                <CardDescription>Gerencie a segurança do site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="border-zinc-700">
                    Alterar Senha Admin
                  </Button>
                  <Button variant="outline" className="border-zinc-700">
                    Configurar 2FA
                  </Button>
                  <Button variant="outline" className="border-zinc-700">
                    Ver Logs de Acesso
                  </Button>
                  <Button variant="outline" className="border-zinc-700">
                    IPs Bloqueados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Backup e Restauração</CardTitle>
                <CardDescription>Gerencie backups dos dados do site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button onClick={handleBackup} variant="outline" className="border-zinc-700">
                    Fazer Backup Agora
                  </Button>
                  <Button onClick={handleRestore} variant="outline" className="border-zinc-700">
                    Restaurar Backup
                  </Button>
                  <Button onClick={handleClearCache} variant="outline" className="border-zinc-700">
                    Limpar Cache
                  </Button>
                </div>
                
                <div className="bg-zinc-800 rounded-lg p-4">
                  <h4 className="text-lime-200 font-semibold mb-2">Backups Recentes</h4>
                  <div className="space-y-2 text-sm text-zinc-300">
                    <div className="flex justify-between">
                      <span>backup_2025-07-09_14-30.sql</span>
                      <span className="text-zinc-500">2 horas atrás</span>
                    </div>
                    <div className="flex justify-between">
                      <span>backup_2025-07-08_02-00.sql</span>
                      <span className="text-zinc-500">1 dia atrás</span>
                    </div>
                    <div className="flex justify-between">
                      <span>backup_2025-07-07_02-00.sql</span>
                      <span className="text-zinc-500">2 dias atrás</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Tab */}
          <TabsContent value="email" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Configurações de E-mail</CardTitle>
                <CardDescription>Configure o servidor SMTP para envio de e-mails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-zinc-200">Servidor SMTP</Label>
                    <Input placeholder="smtp.gmail.com" className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                  <div>
                    <Label className="text-zinc-200">Porta</Label>
                    <Input placeholder="587" className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                  <div>
                    <Label className="text-zinc-200">Usuário</Label>
                    <Input placeholder="seu-email@gmail.com" className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                  <div>
                    <Label className="text-zinc-200">Senha</Label>
                    <Input type="password" placeholder="••••••••" className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="border-zinc-700">
                    Testar Conexão
                  </Button>
                  <Button variant="outline" className="border-zinc-700">
                    Enviar E-mail de Teste
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
