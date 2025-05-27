// src/lib/actions.ts
"use server";

import { explainMarkdownContent as gen explicaciónMarkdownContent } from "@/ai/flows/explain-markdown";
import type { ExplainMarkdownContentOutput } from "@/ai/flows/explain-markdown";
import { marked } from 'marked';

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  try {
    // Configure marked for basic security and common usage
    marked.setOptions({
      renderer: new marked.Renderer(),
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false, // Important: Ensure sanitization if displaying user-generated HTML that could be malicious. For this app, output is for user only.
      smartypants: false,
      xhtml: false
    });
    const html = await marked.parse(markdown);
    return html;
  } catch (error) {
    console.error("Error converting Markdown to HTML:", error);
    throw new Error("Failed to convert Markdown to HTML.");
  }
}

export async function getMarkdownExplanation(markdownContent: string): Promise<string> {
  if (!markdownContent.trim()) {
    return "Please provide some Markdown content to explain.";
  }
  try {
    const result: ExplainMarkdownContentOutput = await gen explicaciónMarkdownContent({ markdownContent });
    return result.explanation;
  } catch (error) {
    console.error("Error getting Markdown explanation:", error);
    // Check if error is an object and has a message property
    if (error && typeof error === 'object' && 'message' in error) {
      return `An error occurred while generating the explanation: ${error.message}`;
    }
    return "An unexpected error occurred while generating the explanation.";
  }
}
