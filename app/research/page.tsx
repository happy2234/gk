import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CurrentlyCard from "@/components/CurrentlyCard";
import { getCurrently, getResearch } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research — Gaurav Kumar",
  description:
    "Research interests and current focus — adversarial robustness, uncertainty estimation, and computer vision.",
};

export default function ResearchPage() {
  const research = getResearch();
  const currently = getCurrently();
  const researchItems = currently.items.filter(
    (i) => i.type === "paper" || i.type === "project"
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <h1
        className="text-[2.5rem] font-bold text-gray-900 dark:text-gray-100 leading-tight mb-8"
        style={{ letterSpacing: "-0.02em" }}
      >
        Research
      </h1>

      {/* Research Statement */}
      <section className="mb-14" aria-label="Research statement">
        <div className="prose max-w-[68ch]">
          {research.statement.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* Research Interests */}
      {research.interests.length > 0 && (
        <section className="mb-14" aria-label="Research interests">
          <SectionHeading
            title="Interests"
            subtitle="Areas I actively read and work in."
          />
          <div className="flex flex-col gap-6">
            {research.interests.map((interest) => (
              <div key={interest.area} className="flex gap-4">
                <div
                  className="w-1 flex-shrink-0 bg-gray-200 dark:bg-gray-800 rounded-full"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {interest.area}
                  </h3>
                  <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed m-0">
                    {interest.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Current Focus from currently.json */}
      {researchItems.length > 0 && (
        <section aria-label="Current research focus">
          <SectionHeading
            title="Current Focus"
            subtitle="What I'm actively working on right now."
          />
          <CurrentlyCard items={researchItems} updatedAt={currently.updatedAt} />
        </section>
      )}
    </div>
  );
}
