import type { CurrentlyItem } from "@/lib/content";

interface CurrentlyCardProps {
  items: CurrentlyItem[];
  updatedAt: string;
}

function daysSince(dateStr: string): number {
  const now = new Date();
  const then = new Date(dateStr);
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

export default function CurrentlyCard({ items, updatedAt }: CurrentlyCardProps) {
  const days = daysSince(updatedAt);
  const isStale = days > 60;
  const hasActiveItem = items.some((i) => i.status === "active");

  if (items.length === 0) return null;

  return (
    <section
      className="border border-gray-200 dark:border-gray-800 rounded-[8px] p-5 transition-colors duration-200"
      aria-label="Currently working on"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        {/* CSS dot — renders identically everywhere, matches palette exactly */}
        <span
          className={[
            "w-2 h-2 rounded-full flex-shrink-0",
            hasActiveItem
              ? "bg-blue-600 dark:bg-blue-500 animate-pulse-dot"
              : "bg-gray-300 dark:bg-gray-700",
          ].join(" ")}
          aria-hidden="true"
        />
        <h2 className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest m-0">
          Currently
        </h2>
        {isStale && (
          <span className="ml-auto text-[12px] text-gray-400 dark:text-gray-500">
            last updated {days}d ago
          </span>
        )}
      </div>

      <ul className="list-none m-0 p-0 flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* Status dot — CSS only, no emoji */}
            <span
              className={[
                "w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0",
                item.status === "active" ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-300 dark:bg-gray-700",
              ].join(" ")}
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[14px] text-gray-900 dark:text-gray-100 leading-snug">
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 underline underline-offset-2 decoration-gray-200 dark:decoration-gray-800 hover:decoration-blue-600 dark:hover:decoration-blue-400"
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </span>
              {item.note && (
                <p className="text-[13px] text-gray-500 dark:text-gray-400 m-0 mt-0.5 leading-snug">
                  {item.note}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
