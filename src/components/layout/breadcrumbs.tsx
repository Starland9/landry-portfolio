import Link from "next/link";

type Crumb = { href: string; label: string };

/** "Accueil / Projets / Secret" — the last item is the current page. */
export function Breadcrumbs({ label, items, current }: { label: string; items: Crumb[]; current: string }) {
  return (
    <nav aria-label={label} className="pt-8">
      <ol className="flex flex-wrap gap-2 text-sm text-muted">
        {items.map((item) => (
          <li key={item.href} className="flex gap-2 after:text-border-strong after:content-['/']">
            <Link href={item.href} className="text-muted hover:text-fg">
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <span aria-current="page" className="font-medium text-fg">
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}
