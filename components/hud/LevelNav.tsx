import Link from "next/link";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { getAdjacentSections, type SectionId } from "@/content/sections";

export default function LevelNav({ sectionId }: { sectionId: SectionId }) {
  const { prev, next } = getAdjacentSections(sectionId);

  return (
    <nav aria-label="Navegación entre niveles" className="container-main pb-16">
      <div className="flex items-center justify-between gap-3 border-t border-border-subtle pt-8">
        {prev ? (
          <Link
            href={prev.path}
            className="inline-flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            {prev.label}
          </Link>
        ) : (
          <span />
        )}

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-text-muted hover:text-text-primary transition-colors"
        >
          <LayoutGrid className="w-4 h-4" strokeWidth={1.75} />
          Hub
        </Link>

        {next ? (
          <Link
            href={next.path}
            className="inline-flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-text-primary transition-colors"
          >
            {next.label}
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
