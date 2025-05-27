"use client";

import type React from 'react';
import { UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onFileContent: (content: string) => void;
}

export function FileUploader({ onFileContent }: FileUploaderProps) {
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/markdown' || file.name.endsWith('.md') || file.name.endsWith('.markdown')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          onFileContent(content);
          toast({
            title: "File Uploaded",
            description: `${file.name} loaded successfully.`,
          });
        };
        reader.readAsText(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a Markdown (.md) file.",
        });
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="markdown-file" className="flex items-center gap-2 cursor-pointer">
        <UploadCloud className="h-5 w-5" />
        <span>Upload Markdown File</span>
      </Label>
      <Input
        id="markdown-file"
        type="file"
        accept=".md,.markdown,text/markdown"
        onChange={handleFileChange}
        className="file:text-primary file:font-semibold hover:file:bg-primary/10"
      />
    </div>
  );
}
