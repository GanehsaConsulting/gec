import { cn } from "@/lib/utils";

/**
 * TipTap / CMS article body — matches CMS `.article-preview-prose` preview.
 * Styles live in globals.css under `.article-preview-prose`.
 */
export function ArticleBody({ html, className = "" }) {
  if (!html) return null;

  return (
    <div
      className={cn("article-preview-prose", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
