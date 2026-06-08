import SkeletonCard from "@/components/SkeletonCard";

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="skeleton h-3 w-10 rounded mb-5" />
        <div className="skeleton h-9 w-36 rounded mb-3" />
        <div className="skeleton h-3 w-52 rounded mb-16" />

        <div className="skeleton h-3 w-16 rounded mb-6" />
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>

        <div className="h-px bg-white/5 mb-14" />

        <div className="skeleton h-3 w-24 rounded mb-6" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  );
}
