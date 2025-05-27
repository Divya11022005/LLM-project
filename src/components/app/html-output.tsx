"use client";

import { ClipboardCopy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface HtmlOutputProps {
  htmlContent: string;
}

export function HtmlOutput({ htmlContent }: HtmlOutputProps) {
  const { toast } = useToast();

  const handleCopyHtml = async () => {
    if (!htmlContent) {
      toast({
        variant: "destructive",
        title: "Nothing to Copy",
        description: "No HTML content available to copy.",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(htmlContent);
      toast({
        title: "HTML Copied!",
        description: "The HTML content has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy HTML: ", err);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy HTML to clipboard.",
      });
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">HTML Output</CardTitle>
        <Button variant="outline" size="sm" onClick={handleCopyHtml} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <ClipboardCopy className="mr-2 h-4 w-4" />
          Copy HTML
        </Button>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-[300px] md:h-full rounded-md border m-4">
          {htmlContent ? (
            <div
              className="prose dark:prose-invert p-4"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <div className="p-4 text-muted-foreground">
              HTML output will appear here...
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
