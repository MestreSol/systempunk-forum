"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Eye, Trash2 } from "lucide-react";

interface NewsActionsProps {
  isSaving: boolean;
  onSaveAsDraft: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

export function NewsActions({ 
  isSaving, 
  onSaveAsDraft, 
  onArchive, 
  onDelete 
}: NewsActionsProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200">Ações Avançadas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={onSaveAsDraft}
          disabled={isSaving}
          variant="outline"
          className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-900/20"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar como Rascunho
        </Button>
        
        <Button
          onClick={onArchive}
          disabled={isSaving}
          variant="outline"
          className="w-full border-gray-500 text-gray-400 hover:bg-gray-900/20"
        >
          <Eye className="w-4 h-4 mr-2" />
          Arquivar Artigo
        </Button>
        
        <Button
          onClick={onDelete}
          variant="outline"
          className="w-full border-red-500 text-red-400 hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir Artigo
        </Button>
      </CardContent>
    </Card>
  );
}
