"use client";

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AppHeader } from '@/components/app/app-header';
import { FileUploader } from '@/components/app/file-uploader';
import { HtmlOutput } from '@/components/app/html-output';
import { GptExplanation } from '@/components/app/gpt-explanation';
import { convertMarkdownToHtml, getMarkdownExplanation } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wand2 } from 'lucide-react';


export default function MarkupAlchemistPage() {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [gptExplanation, setGptExplanation] = useState<string>('');
  
  const [isProcessing, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFileContent = (content: string) => {
    setMarkdownContent(content);
  };

  const handleProcessContent = () => {
    if (!markdownContent.trim()) {
      toast({
        variant: "destructive",
        title: "No Content",
        description: "Please upload a file or enter Markdown text to process.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const html = await convertMarkdownToHtml(markdownContent);
        setHtmlContent(html);
        toast({
          title: "Conversion Successful",
          description: "Markdown converted to HTML.",
        });

        const explanation = await getMarkdownExplanation(markdownContent);
        setGptExplanation(explanation);
         toast({
          title: "Explanation Ready",
          description: "AI explanation generated.",
        });
      } catch (error) {
        console.error("Processing error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        toast({
          variant: "destructive",
          title: "Processing Failed",
          description: errorMessage,
        });
        setHtmlContent(''); // Clear previous successful results on error
        setGptExplanation('');
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 grid md:grid-cols-2 gap-6 p-4 sm:p-6 transition-all duration-300 ease-in-out">
        <Card className="shadow-lg rounded-xl flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Markdown Input</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 flex flex-col">
            <FileUploader onFileContent={handleFileContent} />
            <div className="flex-grow flex flex-col">
              <label htmlFor="markdown-input" className="mb-1 text-sm font-medium">Edit Markdown:</label>
              <ScrollArea className="flex-grow border rounded-md">
                <Textarea
                  id="markdown-input"
                  placeholder="Enter or paste Markdown here..."
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                  className="h-full min-h-[200px] md:min-h-[300px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </ScrollArea>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleProcessContent} 
              disabled={isProcessing} 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {isProcessing ? 'Processing...' : 'Convert & Explain'}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6 flex flex-col">
          <div className="flex-1 min-h-[300px] md:min-h-0"> {/* Ensure HtmlOutput takes space */}
            <HtmlOutput htmlContent={htmlContent} />
          </div>
          <div className="flex-1 min-h-[300px] md:min-h-0"> {/* Ensure GptExplanation takes space */}
            <GptExplanation explanation={gptExplanation} isLoading={isProcessing && !gptExplanation} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm border-t">
        Powered by Next.js, ShadCN UI, and Genkit AI
      </footer>
    </div>
  );
}
