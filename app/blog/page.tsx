import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on AI/ML research, systems, and engineering.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <h1
        className="text-[2.5rem] font-bold text-[#111827] leading-tight mb-3"
        style={{ letterSpacing: "-0.02em" }}
      >
        Blog
      </h1>
      <p className="text-[17px] text-[#6B7280] mb-12 max-w-[60ch] leading-relaxed">
        Notes on research, systems, and things I&apos;m figuring out.
      </p>

      {posts.length === 0 ? (
        <p className="text-[15px] text-[#9CA3AF]">
          No posts yet — coming soon.
        </p>
      ) : (
        <ol className="list-none m-0 p-0 flex flex-col gap-0 divide-y divide-[#E5E7EB]">
          {posts.map((post) => (
            <li key={post.slug} className="py-5">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <a
                  href={`/blog/${post.slug}`}
                  className="text-[16px] font-semibold text-[#111827] hover:text-[#2563EB] transition-colors duration-150 no-underline"
                >
                  {post.title}
                </a>
                <span className="text-[13px] text-[#9CA3AF] flex-shrink-0">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-[14px] text-[#6B7280] m-0 leading-relaxed">
                {post.excerpt}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
