import { FileText } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center gap-2">
        <FileText className="h-8 w-8" />
        <h1 className="text-2xl font-semibold tracking-tight">Markup Alchemist</h1>
      </div>
    </header>
  );
}
