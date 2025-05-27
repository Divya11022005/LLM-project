
"use client";

import { Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GptExplanationProps {
  explanation: string;
  isLoading: boolean;
}

export function GptExplanation({ explanation, isLoading }: GptExplanationProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          AI Explanation
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-grow rounded-md border m-4">
          <div className="p-4">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : explanation ? (
              <p className="text-sm whitespace-pre-wrap">{explanation}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                AI-generated explanation will appear here once content is processed...
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
